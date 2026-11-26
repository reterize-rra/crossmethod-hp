'use strict';
const endpoint = 'https://uxsdddejthdpoxghuzca.supabase.co/functions/v1/juniku-enterprise-contact';
const publicKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4c2RkZGVqdGhkcG94Z2h1emNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4Nzg2MDQsImV4cCI6MjEwMzQ1NDYwNH0.SU5kJuwRw-uTEhnpKN8Zz0Cxmz9eimDf_HcAWoiftFk';
const form = document.querySelector('#contact');
const statusText = document.querySelector('#status');
let requestId, previous;
form.addEventListener('submit', async event => {
  event.preventDefault();
  const button = form.querySelector('button');
  if (button.disabled) return;
  const payload = Object.fromEntries(new FormData(form));
  payload.consent = form.elements.consent.checked;
  const fields = JSON.stringify(payload);
  if (fields !== previous) { requestId = crypto.randomUUID(); previous = fields; }
  button.disabled = true;
  statusText.textContent = '送信しています…';
  try {
    const response = await fetch(endpoint, {method:'POST', headers:{'Content-Type':'application/json',Authorization:'Bearer '+publicKey,apikey:publicKey},body:JSON.stringify({...payload,requestId})});
    const result = await response.json();
    if (response.ok && result.code === 'sent') {
      form.reset(); form.hidden = true;
      const done = document.querySelector('#done'); done.hidden = false; done.focus();
    } else {
      const messages = {limited:'送信回数の上限に達しました。時間をおいてお試しください。', invalid:'メールアドレスと入力内容を確認してください。',pending:'受付結果を確認中です。入力内容を保ったまま、しばらくしてからもう一度ご確認ください。'};
      statusText.textContent = messages[result.code] || '送信結果を確認できませんでした。時間をおいてもう一度お試しください。';
    }
  } catch { statusText.textContent = '通信できませんでした。接続を確認してもう一度お試しください。'; }
  finally { button.disabled = false; }
});
