/* HP送信時認証 v1. 秘密キーはこのファイルに設定しません。 */
(() => {
  'use strict';
  const forms = new WeakMap();
  const configs = new Map();
  let scriptReady;
  const retryMessage = '送信前の確認を完了できませんでした。入力内容はそのままで、もう一度送信してください。';

  async function loadConfig(apiUrl) {
    if (!configs.has(apiUrl)) {
      const pending = (async () => {
        const url = new URL(apiUrl, window.location.href);
        url.searchParams.set('action', 'formSecurity');
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);
        let response;
        try { response = await fetch(url.href, { method: 'GET', cache: 'no-store', redirect: 'follow', signal: controller.signal }); }
        finally { clearTimeout(timer); }
        if (!response.ok) throw new Error(retryMessage);
        const result = await response.json();
        if (result?.success !== true || result.data?.ready !== true || !result.data.siteKey) {
          throw new Error('送信受付の設定を確認中です。時間をおいて再度お試しください。');
        }
        return result.data;
      })();
      configs.set(apiUrl, pending);
      pending.catch(() => configs.delete(apiUrl));
    }
    return configs.get(apiUrl);
  }

  function loadTurnstile() {
    if (window.turnstile) return Promise.resolve(window.turnstile);
    if (!scriptReady) {
      scriptReady = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        const timer = setTimeout(() => { script.remove(); reject(new Error(retryMessage)); }, 20000);
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        script.onload = () => {
          clearTimeout(timer);
          if (window.turnstile) resolve(window.turnstile);
          else { script.remove(); reject(new Error(retryMessage)); }
        };
        script.onerror = () => { clearTimeout(timer); script.remove(); reject(new Error(retryMessage)); };
        document.head.appendChild(script);
      });
      scriptReady.catch(() => { scriptReady = undefined; });
    }
    return scriptReady;
  }

  function stateFor(form) {
    if (!form) throw new Error(retryMessage);
    let state = forms.get(form);
    if (!state) {
      const block = document.createElement('div');
      block.className = 'hp-form-security';
      block.style.margin = '12px 0';
      const status = document.createElement('p');
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      status.style.fontSize = '14px';
      const widget = document.createElement('div');
      block.appendChild(status);
      block.appendChild(widget);
      form.insertBefore(block, form.querySelector('button[type="submit"]'));
      state = { status, widget, pending: null, busy: false };
      forms.set(form, state);
    }
    return state;
  }

  function finish(state, error, token) {
    const pending = state.pending;
    if (!pending) return;
    state.pending = null;
    clearTimeout(pending.timer);
    if (error) pending.reject(error);
    else pending.resolve(token);
  }

  function requestToken(state, api) {
    return new Promise((resolve, reject) => {
      // 前回の認証結果を破棄し、再送時も必ず新しいトークンを取得します。
      try { api.reset(state.widgetId); }
      catch (error) { reject(new Error(retryMessage)); return; }
      state.pending = { resolve, reject, timer: setTimeout(() => finish(state, new Error(retryMessage)), 90000) };
      try { api.execute(state.widgetId); }
      catch (error) { finish(state, new Error(retryMessage)); }
    });
  }

  function stableRequestId(state, action, payload) {
    const snapshot = { ...payload };
    delete snapshot.requestId;
    delete snapshot.createdAt;
    delete snapshot.turnstileToken;
    const signature = action + ':' + JSON.stringify(snapshot);
    if (state.signature !== signature) {
      state.signature = signature;
      state.requestId = window.crypto?.randomUUID ? window.crypto.randomUUID() :
        'REQ-' + Date.now() + '-' + Math.random().toString(36).slice(2);
    }
    return state.requestId;
  }

  async function prepare(form, action, apiUrl, payload) {
    if (!['food_order', 'inquiry'].includes(action)) throw new Error(retryMessage);
    const state = stateFor(form);
    if (state.busy) throw new Error('送信前の確認中です。しばらくお待ちください。');
    state.busy = true;
    state.status.textContent = '送信前の確認を行っています…';
    try {
      const config = await loadConfig(apiUrl);
      const api = await loadTurnstile();
      if (state.widgetId === undefined) {
        state.widgetId = api.render(state.widget, {
          sitekey: config.siteKey, action, execution: 'execute', appearance: 'interaction-only',
          size: 'flexible', theme: 'light', language: 'ja', retry: 'never',
          'response-field': false, 'refresh-expired': 'manual', 'refresh-timeout': 'manual',
          callback: (token) => finish(state, null, token),
          'error-callback': () => { finish(state, new Error(retryMessage)); return true; },
          'expired-callback': () => finish(state, new Error(retryMessage)),
          'timeout-callback': () => finish(state, new Error(retryMessage)),
          'unsupported-callback': () => finish(state, new Error(retryMessage))
        });
      }
      const token = await requestToken(state, api);
      if (typeof token !== 'string' || !token) throw new Error(retryMessage);
      state.status.textContent = '確認できました。送信しています…';
      return { turnstileToken: token, requestId: stableRequestId(state, action, payload) };
    } catch (error) {
      state.status.textContent = error.message || retryMessage;
      throw error;
    } finally {
      state.busy = false;
    }
  }

  function accepted(form) {
    const state = forms.get(form);
    if (state) { delete state.signature; delete state.requestId; state.status.textContent = ''; }
  }
  function failed(form, message) {
    const state = forms.get(form);
    if (state) state.status.textContent = message || retryMessage;
  }
  window.HPFormSecurity = Object.freeze({ prepare, accepted, failed });
})();
