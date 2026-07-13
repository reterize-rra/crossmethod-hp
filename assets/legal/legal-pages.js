(() => {
  "use strict";

  const config = window.CROSSMETHOD_LEGAL_CONFIG || {};
  const hpApiUrl = String(config.hpApiUrl || "").trim();
  const body = document.body;
  const pageType = body?.dataset?.legalPage || "";
  const status = document.getElementById("legal-status");
  const content = document.getElementById("legal-content");
  const updated = document.getElementById("legal-updated-date");

  if (!body || !pageType || !hpApiUrl || !content) return;

  const setStatus = (message, type = "") => {
    if (!status) return;
    status.hidden = !message;
    status.textContent = message || "";
    status.className = "legal-status";
    if (type) status.classList.add(`is-${type}`);
  };

  const buildApiUrl = (action, params = {}) => {
    const url = new URL(hpApiUrl);
    url.searchParams.set("action", action);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
    return url.toString();
  };

  const fetchJson = async (url) => {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      redirect: "follow"
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  };

  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const replaceTokens = (value, settings) => {
    const replacements = {
      company_name: settings.company_name || "合同会社 TSUNAGARI",
      company_address: settings.company_address || "公式サイトの運営会社情報に記載",
      shipping_fee: Number(settings.shipping_fee || 0).toLocaleString(),
      free_shipping_threshold: Number(settings.free_shipping_threshold || 0).toLocaleString(),
      contact_url: "https://www.tsunagari-jp.com/#contact"
    };
    return String(value ?? "").replace(/\{\{([a-z0-9_]+)\}\}/gi, (_, key) => {
      return Object.hasOwn(replacements, key) ? replacements[key] : "";
    });
  };

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Tokyo"
    }).format(date);
  };

  const applySettings = (settings) => {
    document.querySelectorAll('[data-managed-setting="company_name"]').forEach((element) => {
      element.textContent = settings.company_name || "合同会社 TSUNAGARI";
    });
    document.querySelectorAll('[data-managed-setting="company_address"]').forEach((element) => {
      element.textContent = settings.company_address
        ? `所在地：${settings.company_address}`
        : "所在地は公式サイトの運営会社情報をご確認ください。";
    });
  };

  const renderPrivacy = (items, settings) => {
    content.innerHTML = items.map((item) => `
      <section class="legal-section">
        <h2>${escapeHtml(item.heading)}</h2>
        <p>${escapeHtml(replaceTokens(item.body, settings))}</p>
      </section>
    `).join("");
  };

  const renderCommerce = (items, settings) => {
    content.innerHTML = items.map((item) => `
      <div class="legal-table-row">
        <dt>${escapeHtml(item.heading)}</dt>
        <dd>${escapeHtml(replaceTokens(item.body, settings))}</dd>
      </div>
    `).join("");
  };

  const load = async () => {
    setStatus("スプレッドシートから最新情報を読み込んでいます。", "loading");

    try {
      const [bootstrapResult, legalResult] = await Promise.all([
        fetchJson(buildApiUrl("bootstrap")),
        fetchJson(buildApiUrl("legalPage", { page: pageType }))
      ]);

      const settings = bootstrapResult?.data?.settings || {};
      const items = Array.isArray(legalResult?.data?.items) ? legalResult.data.items : [];

      if (!legalResult?.success || !items.length) {
        throw new Error(legalResult?.message || "公開データがありません。");
      }

      applySettings(settings);

      if (pageType === "privacy") {
        renderPrivacy(items, settings);
      } else if (pageType === "commerce") {
        renderCommerce(items, settings);
      }

      const lastUpdated = legalResult?.data?.lastUpdated;
      if (updated && lastUpdated) updated.textContent = formatDate(lastUpdated);

      setStatus("", "");
    } catch (error) {
      console.error("法務ページの最新情報を取得できませんでした。", error);
      const message = pageType === "commerce"
        ? "最新の販売条件を取得できませんでした。内容をご確認いただくまで注文を確定せず、お問い合わせフォームからご連絡ください。"
        : "最新情報を取得できなかったため、ページ内の基本方針を表示しています。";
      setStatus(message, "error");
    }
  };

  load();
})();
