const SITE_CONFIG = {
  // 今回作成する「HP管理GAS」のWebアプリURLを1か所だけ設定します。
  hpApiUrl: "https://script.google.com/macros/s/AKfycbxuGAYkdygkpMsxFQvxmSdu2TnRs7svrudmgwDVOQg9YKIAa1T-Q-v5YmXOf4b5fQCSJw/exec",

  // 無料体験診断は別GASのため、従来URLを使用します。
  experienceGasUrl: "GAS_WEB_APP_URL_HERE",

  // hpApiUrl設定後は自動生成されます。個別指定したい場合だけ入力します。
  inquiryGasUrl: "",
  foodOrderGasUrl: "",
  newsFeedUrl: "",
  achievementLogosUrl: "",
  roomKeyValidationUrl: "",

  // HTML確認用。後からGoogle Driveのロゴ取得へ切り替えます。
  achievementLogoFiles: [],

  // キー認証後にGASからURLを返す方式へ移行予定
  counselingMeetingUrl: "",
  seminarMeetingUrl: "",

  // スプレッドシート連携前の表示確認用
  showNewsSection: true,
  showAchievementsSection: true
};

let FOOD_ITEMS = [
  {
    code: "03461005",
    name: "赤魚の麹味噌焼き",
    image: "assets/healthyfood/03461005_akauo_kouji_miso.jpg",
    amount: "160g",
    price: 660,
    description: "赤魚に甘味と旨みの強い麹味噌を漬け込み、じっくりと焼き上げました。副菜は彩り鮮やかな「ピーマンと油揚げ炒め」と食物繊維豊富なきのこを使用した「きのこの当座煮」です。",
    nutrition: {"エネルギー":"207kcal","たんぱく質":"15.5g","脂質":"9.3g","炭水化物":"19.1g","食塩相当量":"1.6g","水分":"129.7g","カリウム":"489mg","カルシウム":"102mg"},
    allergen: "小麦・ごま・大豆・鶏肉",
    method: "レンジ約3分20秒（500W）／600Wの場合：約2分40秒"
  },
  {
    code: "03461024",
    name: "あじ西京焼き",
    image: "assets/healthyfood/03461024_aji_saikyo_yaki.jpg",
    amount: "151g",
    price: 660,
    description: "香ばしい香りと味噌のコクを感じられるあじの西京焼きと「大根の塩きんぴら」、「まごわやさしい煮」などの野菜をたっぷりとれる和風おかずを組み合わせた商品です。",
    nutrition: {"エネルギー":"203kcal","たんぱく質":"15.1g","脂質":"10.1g","炭水化物":"15.1g","食塩相当量":"1.5g","水分":"110.5g","カリウム":"543mg","カルシウム":"81mg"},
    allergen: "小麦・乳・ごま・大豆・鶏肉・ゼラチン",
    method: "レンジ約3分20秒（500W）"
  },
  {
    code: "03461008",
    name: "厚揚げとそぼろの和風煮",
    image: "assets/healthyfood/03461008_atsuage_soboro_wafuni.jpg",
    amount: "239g",
    price: 660,
    description: "厚揚げと鶏ひき肉を使用した和風煮です。だしの旨みを活かしたやさしい味付けに仕立てています。副菜は木の葉型がかわいらしい「かぼちゃと人参の煮物」と辛味を抑えた「白菜のキムチ煮」です。",
    nutrition: {"エネルギー":"240kcal","たんぱく質":"16.1g","脂質":"12.8g","炭水化物":"17.2g","食塩相当量":"1.9g","水分":"200.5g","カリウム":"531mg","カルシウム":"189mg"},
    allergen: "小麦・乳・ごま・大豆・鶏肉・豚肉・りんご",
    method: "レンジ約5分30秒（500W）／600Wの場合：約4分30秒"
  }
];

let ROOM_STAGES = {
  front: {
    image: "assets/rooms/metaverse_gate_front_01.png",
    label: "入口正面",
    title: "オンライン相談へようこそ",
    copy: "扉の向こうに、カウンセリング室とセミナー室が広がります。",
    buttons: [{ label: "入室する", step: "inside", type: "primary" }]
  },
  inside: {
    image: "assets/rooms/metaverse_gate_inside_01.png",
    label: "入口を抜けて中へ",
    title: "目的に合わせた部屋へ進めます",
    copy: "個別相談やセミナー参加を、わかりやすく選べます。",
    buttons: [{ label: "ロビーへ進む", step: "lobby", type: "primary" }, { label: "入口へ戻る", step: "front", type: "ghost" }]
  },
  lobby: {
    image: "assets/rooms/metaverse_lobby_01.png",
    label: "分岐ロビー",
    title: "相談室・セミナー室を選べます",
    copy: "ご希望の内容に合わせて、入室先を選んでください。",
    buttons: [{ label: "カウンセリング室へ", step: "counseling", type: "primary" }, { label: "セミナー室へ", step: "seminar", type: "ghost" }]
  },
  counseling: {
    image: "assets/rooms/room_counseling_01.png",
    label: "カウンセリング室",
    title: "安心して本音を話せる個別相談室",
    copy: "導入相談、課題整理、ストレスチェックや健康経営の相談に対応します。",
    buttons: [{ label: "Zoom / Meetで入室", action: "counseling", type: "primary" }, { label: "ロビーへ戻る", step: "lobby", type: "ghost" }]
  },
  seminar: {
    image: "assets/rooms/room_seminar_01.png",
    label: "セミナー室",
    title: "説明会・研修・オンラインセミナーへ",
    copy: "健康経営、ストレスチェック、離職防止、職場改善の学びに活用できます。",
    buttons: [{ label: "Zoom / Meetで入室", action: "seminar", type: "primary" }, { label: "ロビーへ戻る", step: "lobby", type: "ghost" }]
  }
};

let HP_MANAGED_DATA = null;
const ORDER_SETTINGS = {
  shippingFee: 891,
  freeShippingThreshold: 5000,
  roomIdleSeconds: 60
};

document.addEventListener("DOMContentLoaded", async () => {
  await setupManagedSite();
  setupMobileNavigation();
  setupMobileMotion();
  setupExperienceFrame();
  setupCounters();
  setupFoodDetail();
  setupFoodGalleryCollapse();
  setupOrderModal();
  setupContactModal();
  setupNewsSection();
  setupAchievementSlider();
  setupRoomKeyModal();
  setupBackToTop();
  // setupRoomExperience(); // v5 automatic room experience
  setupModalClose();
});

function setupExperienceFrame() {
  const frame = document.getElementById("crossmethod-experience-frame");
  const note = document.getElementById("embed-note");
  if (!frame) return;

  setupTrialFrameAutoHeight(frame);

  if (SITE_CONFIG.experienceGasUrl && SITE_CONFIG.experienceGasUrl !== "GAS_WEB_APP_URL_HERE") {
    frame.src = SITE_CONFIG.experienceGasUrl;
    if (note) note.style.display = "none";
  }
}

/**
 * 体験診断iframe 自動高さ調整
 */
function setupTrialFrameAutoHeight(frame) {
  const MESSAGE_TYPE = "CROSS_METHOD_TRIAL_FRAME_HEIGHT_V1";
  const MIN_HEIGHT = 280;
  const MAX_HEIGHT = 30000;
  const EXTRA_SPACE = 12;
  const CHANGE_THRESHOLD = 2;

  let lastAppliedHeight = 0;

  window.addEventListener("message", (event) => {
    if (event.source !== frame.contentWindow) return;

    const data = event.data;
    if (!data || data.type !== MESSAGE_TYPE) return;

    const receivedHeight = Math.ceil(Number(data.height));
    if (!Number.isFinite(receivedHeight)) return;
    if (receivedHeight < MIN_HEIGHT || receivedHeight > MAX_HEIGHT) return;
    if (Math.abs(receivedHeight - lastAppliedHeight) < CHANGE_THRESHOLD) return;

    lastAppliedHeight = receivedHeight;
    frame.style.height = `${receivedHeight + EXTRA_SPACE}px`;
  });
}

function setupCounters() {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count || 0);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 42));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current;
    }, 34);
  });
}

function setupFoodDetail() {
  const modal = document.getElementById("food-detail-modal");
  const content = document.getElementById("food-detail-content");
  document.querySelectorAll("[data-food]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = FOOD_ITEMS.find((food) => food.code === button.dataset.food);
      if (!item || !modal || !content) return;
      const nutritionHtml = Object.entries(item.nutrition || {})
        .filter(([, value]) => String(value || "").trim())
        .map(([key, value]) => `<div><dt>${escapeHtml(key)}</dt><dd>${escapeHtml(value)}</dd></div>`)
        .join("");
      const detailRows = [
        ["1人前量", item.amount],
        ["価格", `${Number(item.price || 0).toLocaleString()}円（税込）`],
        ["調理方法", item.method],
        ["包装状態", item.packaging],
        ["保管方法", item.storage],
        ["調理注意点", item.cookingNotes]
      ].filter(([, value]) => String(value || "").trim())
        .map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`)
        .join("");
      const notes = [
        item.allergen ? `<div><h3>アレルゲン</h3><p>${escapeHtml(item.allergen)}</p></div>` : "",
        item.commonIngredients ? `<div><h3>問い合わせの多い原材料</h3><p>${escapeHtml(item.commonIngredients)}</p></div>` : "",
        item.ingredients ? `<div class="food-ingredients"><h3>原材料名</h3><p>${escapeHtml(item.ingredients)}</p></div>` : ""
      ].join("");
      content.innerHTML = `
        <div class="food-detail-grid">
          <div><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}"></div>
          <div>
            <p class="section-label">商品コード：${escapeHtml(item.code)}</p>
            <h2>${escapeHtml(item.name)}</h2>
            <p>${escapeHtml(item.description)}</p>
            <dl class="food-detail-meta">${detailRows}</dl>
            ${nutritionHtml ? `<h3 class="food-subheading">栄養価（1人前あたり）</h3><dl class="nutrition-list">${nutritionHtml}</dl>` : ""}
            <div class="food-extra-details">${notes}</div>
          </div>
        </div>`;
      openModal(modal);
    });
  });
}


const FOOD_DESKTOP_VISIBLE_COUNT = 8;
const FOOD_MOBILE_VISIBLE_COUNT = 6;

function getFoodInitialVisibleCount() {
  return window.matchMedia("(max-width: 767px)").matches
    ? FOOD_MOBILE_VISIBLE_COUNT
    : FOOD_DESKTOP_VISIBLE_COUNT;
}

/**
 * 健康食一覧：
 * PCは最初の8商品、スマホは最初の6商品を表示し、
 * それ以降を「もっと見る」で展開します。
 */
function setupFoodGalleryCollapse() {
  const gallery = document.getElementById("food-gallery");
  if (!gallery) return;

  const items = Array.from(gallery.querySelectorAll(".food-item"));
  let control = document.getElementById("food-gallery-toggle-control");

  // 再初期化時に状態をリセット
  items.forEach((item) => {
    item.hidden = false;
    item.classList.remove("food-item-extra", "is-revealed");
  });

  const initialVisibleCount = getFoodInitialVisibleCount();

  if (items.length <= initialVisibleCount) {
    if (control) control.remove();
    gallery.classList.remove("has-collapsed-items", "is-expanded");
    return;
  }

  const extraItems = items.slice(initialVisibleCount);
  extraItems.forEach((item) => {
    item.hidden = true;
    item.classList.add("food-item-extra");
  });

  gallery.classList.add("has-collapsed-items");
  gallery.classList.remove("is-expanded");

  if (!control) {
    control = document.createElement("div");
    control.id = "food-gallery-toggle-control";
    control.className = "food-gallery-toggle-control";
    control.innerHTML = `
      <button
        class="food-gallery-toggle-button"
        id="food-gallery-toggle-button"
        type="button"
        aria-expanded="false"
        aria-controls="food-gallery"
      >
        <span class="food-toggle-label">もっと見る</span>
        <span class="food-toggle-icon" aria-hidden="true"></span>
      </button>
    `;
    gallery.insertAdjacentElement("afterend", control);
  }

  const button = control.querySelector("#food-gallery-toggle-button");
  const label = control.querySelector(".food-toggle-label");
  if (!button || !label) return;

  // 既存リスナーを確実に除去するため、ボタンを複製して差し替える
  const cleanButton = button.cloneNode(true);
  button.replaceWith(cleanButton);
  const cleanLabel = cleanButton.querySelector(".food-toggle-label");

  cleanButton.addEventListener("click", () => {
    const isExpanded = cleanButton.getAttribute("aria-expanded") === "true";
    const nextExpanded = !isExpanded;
    const beforeTop = cleanButton.getBoundingClientRect().top;

    cleanButton.setAttribute("aria-expanded", String(nextExpanded));
    gallery.classList.toggle("is-expanded", nextExpanded);

    if (nextExpanded) {
      extraItems.forEach((item, index) => {
        item.hidden = false;
        item.style.setProperty("--food-reveal-delay", `${Math.min(index, 12) * 35}ms`);
        requestAnimationFrame(() => item.classList.add("is-revealed"));
      });
      if (cleanLabel) cleanLabel.textContent = "閉じる";
    } else {
      extraItems.forEach((item) => {
        item.classList.remove("is-revealed");
        item.hidden = true;
      });
      if (cleanLabel) cleanLabel.textContent = "もっと見る";

      // 折りたたんだ際にボタンの位置が大きく動いても、画面上の位置を維持
      requestAnimationFrame(() => {
        const afterTop = cleanButton.getBoundingClientRect().top;
        window.scrollBy(0, afterTop - beforeTop);
      });
    }
  });

  if (!window.__foodGalleryResponsiveBound) {
    window.__foodGalleryResponsiveBound = true;
    let resizeTimer = 0;
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setupFoodGalleryCollapse();
      }, 180);
    });
  }
}

function setupOrderModal() {
  const openButton = document.getElementById("open-order-modal");
  const modal = document.getElementById("order-modal");
  const table = document.getElementById("order-table");
  const form = document.getElementById("order-form");
  if (!openButton || !modal || !table || !form) return;

  table.innerHTML = FOOD_ITEMS.map((item) => `
    <div class="order-row">
      <strong>${item.code}</strong>
      <span>${item.name}</span>
      <input type="number" min="0" step="1" value="0" data-order-code="${item.code}" aria-label="${item.name}の個数">
    </div>`).join("");

  table.querySelectorAll("[data-order-code]").forEach((input) => input.addEventListener("input", updateOrderSummary));
  openButton.addEventListener("click", () => { updateOrderSummary(); openModal(modal); });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const orderItems = getOrderItems();
    if (orderItems.length === 0) { alert("商品個数を1つ以上入力してください。"); return; }
    const formData = new FormData(form);
    /* CROSSMETHOD_PAYMENT_METHOD_V1 */
    const customer = Object.fromEntries(formData.entries());
    const paymentMethod = String(customer.paymentMethod || "").trim();
    if (!paymentMethod) {
      alert("支払い方法を選択してください。");
      return;
    }
    customer.paymentMethod = paymentMethod;
    customer.message = `【支払い方法】${paymentMethod}${customer.message ? "\n" + customer.message : ""}`;
    const subtotal = calcSubtotal(orderItems);
    const shipping = calcShipping(subtotal);
    const payload = {
      action: "submitFoodOrder",
      type: "food_order",
      items: orderItems,
      subtotal,
      shipping,
      total: subtotal + shipping,
      customer,
      paymentMethod,
      requestId: createRequestId(),
      createdAt: new Date().toISOString()
    };
    if (!SITE_CONFIG.foodOrderGasUrl) {
      console.log("注文依頼データ", payload);
      alert("ローカル確認中です。GAS URL設定後、注文内容をスプレッドシート保存＋自動返信メールへ接続できます。");
      return;
    }
    await postToGas(SITE_CONFIG.foodOrderGasUrl, payload, "注文依頼を送信しました。");
    form.reset();
    updateOrderSummary();
    closeAllModals();
  });
}

function getOrderItems() {
  return Array.from(document.querySelectorAll("[data-order-code]"))
    .map((input) => {
      const item = FOOD_ITEMS.find((food) => food.code === input.dataset.orderCode);
      const quantity = Number(input.value || 0);
      if (!item || quantity <= 0) return null;
      return { code: item.code, name: item.name, unitPrice: item.price, quantity, lineTotal: item.price * quantity };
    })
    .filter(Boolean);
}
function calcSubtotal(items) { return items.reduce((sum, item) => sum + item.lineTotal, 0); }
function calcShipping(subtotal) {
  if (subtotal === 0) return 0;
  return subtotal >= ORDER_SETTINGS.freeShippingThreshold ? 0 : ORDER_SETTINGS.shippingFee;
}
function updateOrderSummary() {
  const items = getOrderItems();
  const subtotal = calcSubtotal(items);
  const shipping = calcShipping(subtotal);
  const total = subtotal + shipping;
  setText("order-subtotal", `${subtotal.toLocaleString()}円`);
  setText("order-shipping", `${shipping.toLocaleString()}円`);
  setText("order-total", `${total.toLocaleString()}円`);
}
function setText(id, value) { const el = document.getElementById(id); if (el) el.textContent = value; }

function setupContactModal() {
  const modal = document.getElementById("contact-modal");
  const form = document.getElementById("contact-form");

  document.querySelectorAll("[data-open-contact]").forEach((button) => {
    button.addEventListener("click", () => {
      const typeSelect = document.getElementById("contact-type");
      const requestedType = button.dataset.openContact || "";
      if (typeSelect && requestedType) {
        const hasOption = Array.from(typeSelect.options).some((option) => option.value === requestedType);
        if (hasOption) typeSelect.value = requestedType;
      }
      if (modal) openModal(modal);
    });
  });

  if (!form) return;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const payload = {
      action: "submitInquiry",
      type: "inquiry",
      data: Object.fromEntries(formData.entries()),
      requestId: createRequestId(),
      createdAt: new Date().toISOString()
    };
    if (!SITE_CONFIG.inquiryGasUrl) {
      console.log("相談フォームデータ", payload);
      alert("ローカル確認中です。GAS URL設定後、問い合わせ内容をHP管理スプレッドシートへ保存できます。");
      return;
    }
    try {
      if (submitButton) { submitButton.disabled = true; submitButton.textContent = "送信しています…"; }
      await postToGas(SITE_CONFIG.inquiryGasUrl, payload, "相談内容を送信しました。");
      form.reset();
      closeAllModals();
    } finally {
      if (submitButton) { submitButton.disabled = false; submitButton.textContent = "相談内容を送る"; }
    }
  });
}

async function postToGas(url, payload, successMessage) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow"
    });
    const result = await response.json();
    if (!result?.success) throw new Error(result?.message || "送信に失敗しました。");
    alert(result.message || successMessage);
    return result;
  } catch (error) {
    console.error(error);
    alert(error.message || "送信中にエラーが発生しました。");
    throw error;
  }
}

function setupRoomExperience() {
  const image = document.getElementById("room-stage-image");
  const label = document.getElementById("room-stage-label");
  const title = document.getElementById("room-stage-title");
  const copy = document.getElementById("room-stage-copy");
  const buttons = document.getElementById("room-stage-buttons");
  const viewport = document.querySelector(".room-viewport");
  const stepperButtons = document.querySelectorAll("[data-room-step]");

  if (!image || !label || !title || !copy || !buttons) return;

  function renderStage(stageKey) {
    const stage = ROOM_STAGES[stageKey];
    if (!stage) return;

    if (viewport) viewport.classList.add("is-transitioning");

    setTimeout(() => {
      image.src = stage.image;
      image.alt = stage.title;
      label.textContent = stage.label;
      title.textContent = stage.title;
      copy.textContent = stage.copy;
      buttons.innerHTML = stage.buttons.map((btn) => {
        if (btn.action) return `<button class="button ${btn.type === "primary" ? "primary" : "white"}" type="button" data-room-action="${btn.action}">${btn.label}</button>`;
        return `<button class="button ${btn.type === "primary" ? "primary" : "white"}" type="button" data-room-go="${btn.step}">${btn.label}</button>`;
      }).join("");

      document.querySelectorAll("[data-room-go]").forEach((btn) => btn.addEventListener("click", () => renderStage(btn.dataset.roomGo)));
      document.querySelectorAll("[data-room-action]").forEach((btn) => btn.addEventListener("click", () => openMeeting(btn.dataset.roomAction)));

      stepperButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.roomStep === stageKey));

      if (viewport) viewport.classList.remove("is-transitioning");
    }, 260);
  }

  stepperButtons.forEach((btn) => btn.addEventListener("click", () => renderStage(btn.dataset.roomStep)));
  renderStage("front");
}

function openMeeting(type) {
  const authorizedUrl = window.AUTHORIZED_ROOM_URLS?.[type] || "";
  const fallbackUrl = type === "counseling"
    ? SITE_CONFIG.counselingMeetingUrl
    : SITE_CONFIG.seminarMeetingUrl;
  const url = authorizedUrl || fallbackUrl;

  if (!url) {
    alert("Zoom / Google Meet のURLは未設定です。スプレッドシート連携後は、入室キー認証に成功した場合だけ接続先が表示されます。");
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
}

function setupModalClose() {
  document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeAllModals));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeAllModals(); });
}
function openModal(modal) { modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
function closeAllModals() {
  document.querySelectorAll(".modal").forEach((modal) => { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); });
  document.body.style.overflow = "";
}



/* ===== v5 virtual room automatic walkthrough ===== */
(function setupV5RoomOverrides(){
  document.addEventListener('DOMContentLoaded',()=>{
    const stageImage=document.getElementById('room-stage-image');
    const roomButtons=document.getElementById('room-stage-buttons');
    const viewport=document.querySelector('.room-viewport');
    const overlay=document.querySelector('.room-overlay');
    if(!stageImage||!roomButtons||!viewport||!overlay||typeof ROOM_STAGES==='undefined') return;
    const roomImageCandidates={
      front:['assets/rooms/metaverse_gate_front_01.png','assets/images/rooms/metaverse_gate_front_01.png','assets/images/metaverse/metaverse_gate_front_01.png'],
      inside:['assets/rooms/metaverse_gate_inside_01.png','assets/images/rooms/metaverse_gate_inside_01.png','assets/images/metaverse/metaverse_gate_inside_01.png'],
      lobby:['assets/rooms/metaverse_lobby_01.png','assets/images/rooms/metaverse_lobby_01.png','assets/images/metaverse/metaverse_lobby_01.png'],
      counseling:['assets/rooms/room_counseling_01.png','assets/images/rooms/room_counseling_01.png','assets/images/metaverse/room_counseling_01.png'],
      seminar:['assets/rooms/room_seminar_01.png','assets/images/rooms/room_seminar_01.png','assets/images/metaverse/room_seminar_01.png']
    };
    function setImageWithFallback(stageKey){
      const candidates=roomImageCandidates[stageKey]||[ROOM_STAGES[stageKey]?.image].filter(Boolean);
      let i=0;
      function tryNext(){
        if(i>=candidates.length) return;
        stageImage.onerror=()=>{i+=1;tryNext();};
        stageImage.src=candidates[i];
      }
      tryNext();
    }
    window.renderRoomStageV5=function(stageKey){
      const stage=ROOM_STAGES[stageKey]; if(!stage) return;
      const label=document.getElementById('room-stage-label');
      const title=document.getElementById('room-stage-title');
      const copy=document.getElementById('room-stage-copy');
      viewport.classList.add('is-moving'); overlay.classList.add('is-waiting');
      setTimeout(()=>{
        setImageWithFallback(stageKey);
        if(label) label.textContent=stage.label;
        if(title) title.textContent=stage.title;
        if(copy) copy.textContent=stage.copy;
        roomButtons.innerHTML=stage.buttons.map(btn=>{
          if(btn.action) return `<button class="button ${btn.type==='primary'?'primary':'white'}" type="button" data-room-action="${btn.action}">${btn.label}</button>`;
          return `<button class="button ${btn.type==='primary'?'primary':'white'}" type="button" data-room-go="${btn.step}">${btn.label}</button>`;
        }).join('');
        roomButtons.querySelectorAll('[data-room-go]').forEach(btn=>btn.addEventListener('click',()=>{
          if(btn.dataset.roomGo==='inside') playEntrySequence(); else window.renderRoomStageV5(btn.dataset.roomGo);
        }));
        roomButtons.querySelectorAll('[data-room-action]').forEach(btn=>btn.addEventListener('click',()=>{if(typeof openMeeting==='function') openMeeting(btn.dataset.roomAction)}));
        setTimeout(()=>{viewport.classList.remove('is-moving');overlay.classList.remove('is-waiting');},260);
      },360);
    };
    function playEntrySequence(){window.renderRoomStageV5('inside');setTimeout(()=>window.renderRoomStageV5('lobby'),1450)}
    ROOM_STAGES.front.title='オンライン相談へようこそ';
    ROOM_STAGES.front.copy='個別相談やセミナー参加へ、ここから安心して進めます。';
    ROOM_STAGES.front.buttons=[{label:'入室する',step:'inside',type:'primary'}];
    ROOM_STAGES.inside.title='中へ進みます';
    ROOM_STAGES.inside.copy='入口を抜けると、目的に合わせた部屋へ進めます。';
    ROOM_STAGES.inside.buttons=[];
    ROOM_STAGES.lobby.title='目的の部屋をお選びください';
    ROOM_STAGES.lobby.copy='個別相談はカウンセリング室へ。説明会や研修はセミナー室へ。';
    ROOM_STAGES.lobby.buttons=[{label:'カウンセリング室はこちら',step:'counseling',type:'primary'},{label:'セミナー室はこちら',step:'seminar',type:'primary'}];
    window.renderRoomStageV5('front');
  });
})();


/* ===== v7 slow virtual room walkthrough ===== */
(function setupV7RoomWalkthrough(){
  document.addEventListener("DOMContentLoaded", () => {
    if (typeof ROOM_STAGES === "undefined") return;
    const image = document.getElementById("room-stage-image");
    const label = document.getElementById("room-stage-label");
    const title = document.getElementById("room-stage-title");
    const copy = document.getElementById("room-stage-copy");
    const buttons = document.getElementById("room-stage-buttons");
    const viewport = document.querySelector(".room-viewport");
    const overlay = document.querySelector(".room-overlay");
    if (!image || !label || !title || !copy || !buttons || !viewport || !overlay) return;

    const candidates = {
      front: [
        "assets/rooms/metaverse_gate_front_01.png", "assets/rooms/metaverse_gate_front_01.jpg",
        "assets/images/rooms/metaverse_gate_front_01.png", "assets/images/metaverse/metaverse_gate_front_01.png",
        "assets/rooms/温かみのあるモダンなエントランス.png"
      ],
      inside: [
        "assets/rooms/metaverse_gate_inside_01.png", "assets/rooms/metaverse_gate_inside_01.jpg",
        "assets/images/rooms/metaverse_gate_inside_01.png", "assets/images/metaverse/metaverse_gate_inside_01.png",
        "assets/rooms/温かみのあるモダンなエントランス.png"
      ],
      lobby: [
        "assets/rooms/metaverse_lobby_01.png", "assets/rooms/metaverse_lobby_01.jpg",
        "assets/images/rooms/metaverse_lobby_01.png", "assets/images/metaverse/metaverse_lobby_01.png",
        "assets/rooms/洗練されたモダンなロビー空間.png"
      ],
      counseling: [
        "assets/rooms/room_counseling_01.png", "assets/rooms/room_counseling_01.jpg",
        "assets/images/rooms/room_counseling_01.png", "assets/images/metaverse/room_counseling_01.png",
        "assets/rooms/静かなモダンな会議室の景観.png"
      ],
      seminar: [
        "assets/rooms/room_seminar_01.png", "assets/rooms/room_seminar_01.jpg",
        "assets/images/rooms/room_seminar_01.png", "assets/images/metaverse/room_seminar_01.png",
        "assets/rooms/モダンなセミナールームの内部.png"
      ]
    };

    const defaultStageText = {
      front: { label:"入口正面", title:"オンライン相談へようこそ", copy:"個別相談やセミナー参加へ、ここから安心して進めます。", buttons:[{label:"入室する", step:"inside"}] },
      inside: { label:"中へ進んでいます", title:"ゆっくり中へご案内します", copy:"扉の先に、目的に合わせた部屋が広がります。", buttons:[] },
      lobby: { label:"ロビー", title:"目的の部屋をお選びください", copy:"個別相談はカウンセリング室へ。説明会や研修はセミナー室へ。", buttons:[{label:"カウンセリング室はこちら", step:"counseling"},{label:"セミナー室はこちら", step:"seminar"}] },
      counseling: { label:"カウンセリング室", title:"安心して本音を話せる個別相談室", copy:"導入相談、課題整理、職場改善の相談に対応します。", buttons:[{label:"Zoom / Meetで入室", action:"counseling"},{label:"ロビーへ戻る", step:"lobby"}] },
      seminar: { label:"セミナー室", title:"説明会・研修・オンラインセミナーへ", copy:"健康経営、ストレスチェック、離職防止、職場改善の学びに活用できます。", buttons:[{label:"Zoom / Meetで入室", action:"seminar"},{label:"ロビーへ戻る", step:"lobby"}] }
    };

    function getStageData(stageKey) {
      return window.MANAGED_ROOM_STAGES?.[stageKey] || defaultStageText[stageKey] || defaultStageText.front;
    }

    let resetTimer = null;
    let sequenceTimer = null;

    function resetInactivityTimer(){
      clearTimeout(resetTimer);
      const idleMs = Math.max(15, Number(ORDER_SETTINGS.roomIdleSeconds || 60)) * 1000;
      resetTimer = setTimeout(() => renderStage("front", false), idleMs);
    }

    function setImage(stageKey){
      const managedImage = window.MANAGED_ROOM_STAGES?.[stageKey]?.image;
      const list = [managedImage, ...(candidates[stageKey] || [])].filter(Boolean);
      let i = 0;
      function trySrc(){
        if (i >= list.length) return;
        image.onerror = () => { i++; trySrc(); };
        image.src = list[i];
      }
      trySrc();
    }

    function renderButtons(stageKey){
      const stage = getStageData(stageKey);
      buttons.innerHTML = (stage.buttons || []).map(btn => {
        if (btn.action) return `<button class="button primary" type="button" data-v7-action="${btn.action}">${btn.label}</button>`;
        return `<button class="button ${stageKey === 'lobby' ? 'primary' : 'primary'}" type="button" data-v7-step="${btn.step}">${btn.label}</button>`;
      }).join("");

      buttons.querySelectorAll("[data-v7-step]").forEach(btn => {
        btn.addEventListener("click", () => {
          resetInactivityTimer();
          const targetRoom = btn.dataset.v7Step;

          if (targetRoom === "inside") {
            playEntrySequence();
            return;
          }

          if (targetRoom === "counseling" || targetRoom === "seminar") {
            if (typeof window.requestRoomKeyAccess === "function") {
              window.requestRoomKeyAccess(targetRoom, () => renderStage(targetRoom, true));
            } else {
              renderStage(targetRoom, true);
            }
            return;
          }

          renderStage(targetRoom, true);
        });
      });
      buttons.querySelectorAll("[data-v7-action]").forEach(btn => {
        btn.addEventListener("click", () => {
          resetInactivityTimer();
          if (typeof openMeeting === "function") openMeeting(btn.dataset.v7Action);
        });
      });
    }

    function renderStage(stageKey, animate=true){
      clearTimeout(sequenceTimer);
      const data = getStageData(stageKey);
      if (animate) {
        viewport.classList.add("is-moving");
        overlay.classList.add("is-waiting");
      }
      setTimeout(() => {
        setImage(stageKey);
        label.textContent = data.label;
        title.textContent = data.title;
        copy.textContent = data.copy;
        renderButtons(stageKey);
        setTimeout(() => {
          viewport.classList.remove("is-moving");
          overlay.classList.remove("is-waiting");
        }, animate ? 1850 : 0);
      }, animate ? 1350 : 0);
      resetInactivityTimer();
    }

    function playEntrySequence(){
      renderStage("inside", true);
      sequenceTimer = setTimeout(() => renderStage("lobby", true), 5600);
    }

    window.addEventListener("hpmanageddataready", () => renderStage("front", false));
    renderStage("front", false);
  });
})();



/* ==========================================================
   v15 ambient chart background
   完成済みのセクション内部は変更せず、外側の余白へ
   抽象的な動くグラフを追加します。
   ========================================================== */
(function initAmbientChartBackgrounds() {
  const sectionConfigs = [
    {
      selector: ".news-section",
      scene: "news",
      shapes: ["cards", "line", "progress", "network", "donut", "bars"]
    },
    {
      selector: ".evidence",
      scene: "evidence",
      shapes: ["donut", "bars", "line", "network", "arrow", "radar"]
    },
    {
      selector: ".experience",
      scene: "experience",
      shapes: ["radar", "cards", "bars", "network", "donut", "line"]
    },
    {
      selector: ".chat-warning",
      scene: "warning",
      shapes: ["wave", "network", "line", "cards", "donut", "bars"]
    },
    {
      selector: ".voice-behind",
      scene: "numbers",
      shapes: ["bars", "donut", "line", "radar", "progress", "arrow"]
    },
    {
      selector: ".services",
      scene: "services",
      shapes: ["cards", "network", "arrow", "donut", "progress", "bars"]
    },
    {
      selector: ".diagnostics",
      scene: "diagnostics",
      shapes: ["radar", "network", "line", "donut", "bars", "wave"]
    },
    {
      selector: ".achievements",
      scene: "achievements",
      shapes: ["network", "cards", "line", "donut", "wave", "progress"]
    },
    {
      selector: ".healthyfood",
      scene: "food",
      shapes: ["donut", "bars", "progress", "line", "network", "radar"]
    },
    {
      selector: ".certification",
      scene: "certification",
      shapes: ["progress", "cards", "donut", "bars", "network", "arrow"]
    },
    {
      selector: ".flow",
      scene: "flow",
      shapes: ["arrow", "line", "progress", "bars", "network", "donut"]
    },
    {
      selector: ".virtualrooms",
      scene: "rooms",
      shapes: ["network", "wave", "radar", "line", "donut", "cards"]
    },
    {
      selector: ".final-cta",
      scene: "contact",
      shapes: ["bars", "donut", "line", "arrow", "network", "progress"]
    }
  ];

  const positions = [
    "ambient-pos-lt",
    "ambient-pos-rt",
    "ambient-pos-lm",
    "ambient-pos-rm",
    "ambient-pos-lb",
    "ambient-pos-rb"
  ];

  const floatClasses = [
    "ambient-float-a",
    "ambient-float-b",
    "ambient-float-c"
  ];

  function createShape(type) {
    const item = document.createElement("div");
    item.className = `ambient-chart-item ambient-${type}`;

    if (type === "bars") {
      item.innerHTML = "<i></i><i></i><i></i><i></i><i></i>";
    }

    if (type === "donut") {
      item.setAttribute("role", "presentation");
    }

    if (type === "line") {
      item.innerHTML = `
        <svg viewBox="0 0 120 90" aria-hidden="true">
          <polyline points="5,72 31,57 52,64 77,35 112,17"></polyline>
          <circle cx="5" cy="72" r="4"></circle>
          <circle cx="31" cy="57" r="4"></circle>
          <circle cx="77" cy="35" r="4"></circle>
          <circle cx="112" cy="17" r="4"></circle>
        </svg>`;
    }

    if (type === "radar") {
      item.innerHTML = `
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <polygon class="radar-grid" points="60,7 108,35 108,84 60,113 12,84 12,35"></polygon>
          <polygon class="radar-grid" points="60,24 91,42 91,77 60,95 29,77 29,42"></polygon>
          <line class="radar-grid" x1="60" y1="7" x2="60" y2="113"></line>
          <line class="radar-grid" x1="12" y1="35" x2="108" y2="84"></line>
          <line class="radar-grid" x1="108" y1="35" x2="12" y2="84"></line>
          <polygon class="radar-data" points="60,17 98,43 83,83 54,101 22,72 31,39"></polygon>
        </svg>`;
    }

    if (type === "network") {
      item.innerHTML = "<i></i><i></i><i></i><i></i><i></i>";
    }

    if (type === "progress") {
      item.innerHTML = "<i></i><i></i><i></i><i></i>";
    }

    if (type === "wave") {
      item.innerHTML = `
        <svg viewBox="0 0 140 90" aria-hidden="true">
          <path d="M2,48 C18,10 30,82 48,43 C64,9 80,84 96,38 C110,5 123,76 138,30"></path>
        </svg>`;
    }

    if (type === "arrow") {
      item.setAttribute("role", "presentation");
    }

    if (type === "cards") {
      item.innerHTML = "<i></i><i></i><i></i>";
    }

    return item;
  }

  function addAmbientCharts(section, config) {
    if (!section || section.querySelector(":scope > .ambient-chart-layer")) {
      return;
    }

    section.classList.add("section-ambient-ready");

    const layer = document.createElement("div");
    layer.className = `ambient-chart-layer ambient-scene-${config.scene}`;
    layer.setAttribute("aria-hidden", "true");

    config.shapes.forEach((type, index) => {
      const shape = createShape(type);
      shape.classList.add(
        positions[index % positions.length],
        floatClasses[index % floatClasses.length]
      );
      layer.appendChild(shape);
    });

    section.prepend(layer);
  }

  function initialize() {
    sectionConfigs.forEach((config) => {
      document.querySelectorAll(config.selector).forEach((section) => {
        addAmbientCharts(section, config);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();



/* ==========================================================
   v17 健康食セクション専用背景
   既存のグラフ背景を、食材・和食モチーフへ置換します。
   ========================================================== */
(function initHealthyFoodAmbient() {
  function createFoodItem(type) {
    const item = document.createElement("div");
    item.className = `food-ambient-item food-${type} food-watercolor`;

    if (type === "carrot") {
      item.innerHTML = `
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <g class="carrot-group">
            <path class="soft-fill" fill="#ef8d32" d="M42 43 C50 30 78 32 85 44 C80 67 67 91 55 105 C43 86 37 61 42 43Z"/>
            <path class="soft-line" stroke="#d66c22" stroke-width="3" d="M54 52 C59 62 61 76 58 88"/>
            <path class="soft-fill" fill="#5ebd45" d="M52 42 C39 34 34 21 40 13 C53 18 59 27 58 39Z"/>
            <path class="soft-fill" fill="#79cb55" d="M59 40 C60 24 70 15 80 14 C82 29 75 39 62 45Z"/>
            <path class="soft-fill" fill="#45a842" d="M57 42 C48 27 50 15 58 8 C68 18 68 31 60 44Z"/>
          </g>
        </svg>`;
    }

    if (type === "broccoli") {
      item.innerHTML = `
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <path class="soft-fill" fill="#79be48" d="M52 61 H69 L76 105 H45Z"/>
          <g class="crown">
            <circle class="soft-fill" fill="#3da55b" cx="42" cy="48" r="21"/>
            <circle class="soft-fill" fill="#4fb463" cx="63" cy="37" r="25"/>
            <circle class="soft-fill" fill="#67bf5d" cx="82" cy="50" r="20"/>
            <circle class="soft-fill" fill="#2e9450" cx="61" cy="59" r="24"/>
          </g>
        </svg>`;
    }

    if (type === "tomato") {
      item.innerHTML = `
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <g class="tomato-body">
            <circle class="soft-fill" fill="#ed695b" cx="60" cy="65" r="39"/>
            <circle fill="#f58a78" opacity=".55" cx="47" cy="51" r="10"/>
            <path class="soft-fill" fill="#46a84b" d="M60 28 L68 40 L84 34 L75 48 L90 55 L70 55 L61 70 L54 54 L34 57 L48 46 L37 34 L54 40Z"/>
          </g>
        </svg>`;
    }

    if (type === "leaf") {
      item.innerHTML = `
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <g class="leaf-main">
            <path class="soft-fill" fill="#64bd56" d="M20 86 C28 37 66 15 101 20 C98 60 74 94 31 101Z"/>
            <path class="soft-line" stroke="#2d8f4b" stroke-width="4" d="M29 94 C50 72 69 53 93 29"/>
            <path class="soft-line" stroke="#4ba84e" stroke-width="2.5" d="M49 75 L39 54 M65 60 L58 39 M78 47 L81 30"/>
          </g>
        </svg>`;
    }

    if (type === "fish") {
      item.innerHTML = `
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <g class="fish-body">
            <path class="soft-fill" fill="#5aaec7" d="M22 60 C42 33 76 31 96 54 C78 83 44 88 22 60Z"/>
            <path class="soft-fill" fill="#80cbd5" d="M90 55 L110 36 L108 78 L90 66Z"/>
            <circle fill="#164f66" cx="43" cy="54" r="4"/>
            <path class="soft-line" stroke="#2d7992" stroke-width="3" d="M55 42 C65 52 66 68 56 79"/>
            <path class="soft-line" stroke="#d8ad55" stroke-width="3" d="M36 67 C52 71 67 70 82 62"/>
          </g>
        </svg>`;
    }

    if (type === "rice") {
      item.innerHTML = `
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <path class="rice-steam" d="M43 37 C34 25 51 20 43 8"/>
          <path class="rice-steam" d="M68 37 C58 25 76 20 68 7"/>
          <path class="rice-steam" d="M86 40 C77 29 93 24 87 14"/>
          <ellipse class="soft-fill" fill="#fbfaf2" cx="61" cy="54" rx="38" ry="18"/>
          <path class="soft-fill" fill="#2e8792" d="M22 57 C27 89 42 104 61 104 C81 104 96 88 101 57Z"/>
          <path fill="#60b6b6" opacity=".5" d="M29 65 C43 76 79 76 94 64 C88 87 77 97 61 97 C45 97 34 87 29 65Z"/>
        </svg>`;
    }

    return item;
  }

  function initializeFoodAmbient() {
    const section = document.querySelector(".healthyfood");
    if (!section || section.querySelector(":scope > .food-ambient-layer")) {
      return;
    }

    const existingGraphLayer = section.querySelector(":scope > .ambient-chart-layer");
    if (existingGraphLayer) {
      existingGraphLayer.remove();
    }

    const layer = document.createElement("div");
    layer.className = "food-ambient-layer";
    layer.setAttribute("aria-hidden", "true");

    const config = [
      ["carrot", "food-pos-lt", "food-float-a"],
      ["broccoli", "food-pos-rt", "food-float-b"],
      ["tomato", "food-pos-lm", "food-float-c"],
      ["fish", "food-pos-rm", "food-float-a"],
      ["leaf", "food-pos-lb", "food-float-b"],
      ["rice", "food-pos-rb", "food-float-c"]
    ];

    config.forEach(([type, position, animation]) => {
      const item = createFoodItem(type);
      item.classList.add(position, animation);
      layer.appendChild(item);
    });

    section.prepend(layer);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeFoodAmbient, { once: true });
  } else {
    initializeFoodAmbient();
  }
})();



/* ==========================================================
   v18 お知らせ・つながり実績・オンラインルーム入室キー
   ========================================================== */

const DEFAULT_NEWS_ITEMS = [
  {
    date: "2026.07.10",
    category: "ご案内",
    title: "無料体験診断をご利用いただけます",
    text: "組織に眠る声や、次に確認すべき課題を知る入口としてご利用ください。",
    url: "#experience",
    visible: true,
    important: true
  },
  {
    date: "2026.07.10",
    category: "オンライン",
    title: "カウンセリング・セミナーのご相談を受け付けています",
    text: "個別相談や説明会、オンラインセミナーの入口をご用意しています。",
    url: "#virtualrooms",
    visible: true,
    important: false
  },
  {
    date: "2026.07.10",
    category: "健康食",
    title: "健康食・社食導入のご相談を受け付けています",
    text: "毎日の食事から、働く人の健康を支える福利厚生をご提案します。",
    url: "#healthyfood",
    visible: true,
    important: false
  }
];

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeNewsPayload(payload) {
  const source = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.items)
      ? payload.items
      : [];

  return source
    .filter((item) => item && item.visible !== false && item.status !== "非表示")
    .map((item) => ({
      date: item.date || item.publishDate || item.publicDate || "",
      category: item.category || "お知らせ",
      title: item.title || "",
      text: item.text || item.body || item.description || "",
      url: item.url || item.linkUrl || "",
      important: Boolean(item.important || item.isImportant)
    }))
    .filter((item) => item.title);
}

async function setupNewsSection() {
  const section = document.getElementById("news");
  const list = document.getElementById("news-list");
  const featuredShell = document.getElementById("featured-topics-shell");
  const featured = document.getElementById("featured-topics");
  if (!section || !list) return;

  if (SITE_CONFIG.showNewsSection === false) {
    section.hidden = true;
    return;
  }

  let items = Array.isArray(HP_MANAGED_DATA?.news) && HP_MANAGED_DATA.news.length
    ? HP_MANAGED_DATA.news
    : DEFAULT_NEWS_ITEMS;

  if ((!HP_MANAGED_DATA?.news || !HP_MANAGED_DATA.news.length) && SITE_CONFIG.newsFeedUrl) {
    try {
      const response = await fetch(SITE_CONFIG.newsFeedUrl, {
        method: "GET",
        cache: "no-store"
      });
      if (!response.ok) throw new Error(`お知らせ取得エラー: ${response.status}`);
      const payload = await response.json();
      const fetchedItems = normalizeNewsPayload(payload);
      if (fetchedItems.length) items = fetchedItems;
    } catch (error) {
      console.warn("お知らせはHTML確認用データを表示しています。", error);
    }
  }

  if (!items.length) {
    section.hidden = true;
    return;
  }

  const normalizedItems = normalizeNewsPayload(items);
  const importantItems = normalizedItems.filter((item) => item.important).slice(0, 8);
  const regularItems = normalizedItems.filter((item) => !item.important).slice(0, 5);
  const latestItems = regularItems.length ? regularItems : normalizedItems.slice(0, 5);

  if (featuredShell && featured && importantItems.length) {
    featuredShell.hidden = false;
    featured.innerHTML = importantItems.map((item, index) => {
      const href = item.url ? ` href="${escapeHtml(item.url)}"` : "";
      const tag = item.url ? "a" : "article";
      return `
        <${tag} class="featured-topic-card"${href}>
          <span class="featured-topic-index">${String(index + 1).padStart(2, "0")}</span>
          <span class="featured-topic-category">${escapeHtml(item.category || "注目")}</span>
          <strong>${escapeHtml(item.title)}</strong>
          ${item.text ? `<p>${escapeHtml(item.text)}</p>` : ""}
          ${item.url ? '<span class="featured-topic-arrow" aria-hidden="true">→</span>' : ""}
        </${tag}>
      `;
    }).join("");
  } else if (featuredShell) {
    featuredShell.hidden = true;
  }

  list.innerHTML = latestItems.map((item) => {
    const tag = item.url ? "a" : "article";
    const href = item.url ? ` href="${escapeHtml(item.url)}"` : "";
    return `
      <${tag} class="news-item"${href}>
        <time>${escapeHtml(item.date || "----.--.--")}</time>
        <span class="news-category">${escapeHtml(item.category)}</span>
        <div class="news-copy">
          <h3>${escapeHtml(item.title)}</h3>
          ${item.text ? `<p>${escapeHtml(item.text)}</p>` : ""}
        </div>
        ${item.url ? '<span class="news-arrow" aria-hidden="true">→</span>' : ""}
      </${tag}>
    `;
  }).join("");
}

const DEFAULT_ACHIEVEMENT_LOGOS = [
  { placeholder: true, label: "企業ロゴ", mark: "T" },
  { placeholder: true, label: "企業ロゴ", mark: "C" },
  { placeholder: true, label: "企業ロゴ", mark: "M" },
  { placeholder: true, label: "企業ロゴ", mark: "S" },
  { placeholder: true, label: "企業ロゴ", mark: "L" },
  { placeholder: true, label: "企業ロゴ", mark: "W" },
  { placeholder: true, label: "企業ロゴ", mark: "N" },
  { placeholder: true, label: "企業ロゴ", mark: "R" }
];

function shuffleItems(items) {
  const copied = [...items];
  for (let index = copied.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copied[index], copied[randomIndex]] = [copied[randomIndex], copied[index]];
  }
  return copied;
}

function normalizeAchievementPayload(payload) {
  const source = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.logos)
      ? payload.logos
      : [];

  return source
    .map((item) => {
      if (typeof item === "string") {
        return { src: item, alt: "つながり実績の企業ロゴ" };
      }

      return {
        src: item?.src || item?.url || item?.imageUrl || "",
        alt: item?.alt || item?.name || "つながり実績の企業ロゴ"
      };
    })
    .filter((item) => item.src);
}

function buildAchievementLogoCard(item, duplicate = false) {
  if (item.placeholder) {
    return `
      <div class="achievement-logo-card achievement-placeholder"${duplicate ? ' aria-hidden="true"' : ""}>
        <span class="achievement-placeholder-mark">${escapeHtml(item.mark)}</span>
        <span>${escapeHtml(item.label)}</span>
      </div>
    `;
  }

  return `
    <div class="achievement-logo-card"${duplicate ? ' aria-hidden="true"' : ""}>
      <img src="${escapeHtml(item.src)}" alt="${duplicate ? "" : escapeHtml(item.alt)}" loading="lazy">
    </div>
  `;
}

async function setupAchievementSlider() {
  const section = document.getElementById("achievements");
  const track = document.getElementById("achievement-logo-track");
  if (!section || !track) return;

  if (SITE_CONFIG.showAchievementsSection === false) {
    section.hidden = true;
    return;
  }

  let logos = normalizeAchievementPayload(SITE_CONFIG.achievementLogoFiles);
  const achievementSettings = HP_MANAGED_DATA?.achievements || {};
  const marquee = document.getElementById("achievement-marquee");
  if (marquee && achievementSettings.speedSeconds) {
    marquee.style.setProperty("--achievement-duration", `${achievementSettings.speedSeconds}s`);
  }

  if (achievementSettings.visible === false) {
    section.hidden = true;
    return;
  }

  if (SITE_CONFIG.achievementLogosUrl) {
    try {
      const response = await fetch(SITE_CONFIG.achievementLogosUrl, {
        method: "GET",
        cache: "no-store"
      });

      if (!response.ok) {
        throw new Error(`ロゴ取得エラー: ${response.status}`);
      }

      const payload = await response.json();
      const fetchedLogos = normalizeAchievementPayload(payload);
      if (fetchedLogos.length) logos = fetchedLogos;
    } catch (error) {
      console.warn("つながり実績はHTML確認用表示です。", error);
    }
  }

  const isPlaceholder = logos.length === 0;
  const randomized = shuffleItems(isPlaceholder ? DEFAULT_ACHIEVEMENT_LOGOS : logos);

  // 少数でも途切れず流れるように最低表示数を確保
  let displayItems = [...randomized];
  while (displayItems.length < 8) {
    displayItems = [...displayItems, ...randomized];
  }

  const firstSet = displayItems.map((item) => buildAchievementLogoCard(item, false)).join("");
  const secondSet = displayItems.map((item) => buildAchievementLogoCard(item, true)).join("");
  track.innerHTML = firstSet + secondSet;

  if (!isPlaceholder) {
    const caption = section.querySelector(".achievement-caption");
    if (caption) {
      caption.textContent = "掲載許可をいただいた企業・事業所のロゴをご紹介しています。";
    }
  }
}

window.AUTHORIZED_ROOM_URLS = window.AUTHORIZED_ROOM_URLS || {};

function setupRoomKeyModal() {
  const modal = document.getElementById("room-key-modal");
  const form = document.getElementById("room-key-form");
  const input = document.getElementById("room-key-input");
  const typeInput = document.getElementById("room-key-type");
  const title = document.getElementById("room-key-title");
  const description = document.getElementById("room-key-description");
  const status = document.getElementById("room-key-status");
  const submitButton = document.getElementById("room-key-submit");

  if (!modal || !form || !input || !typeInput || !title || !status || !submitButton) {
    return;
  }

  let successCallback = null;

  const roomNames = {
    counseling: "カウンセリング室",
    seminar: "セミナー室"
  };

  function setStatus(message = "", type = "") {
    status.textContent = message;
    status.className = "room-key-status";
    if (type) status.classList.add(`is-${type}`);
  }

  window.requestRoomKeyAccess = (roomType, onSuccess) => {
    const roomName = roomNames[roomType] || "オンラインルーム";
    typeInput.value = roomType;
    input.value = "";
    successCallback = typeof onSuccess === "function" ? onSuccess : null;

    title.textContent = `${roomName}の入室キー`;
    description.textContent = `主催者から案内された${roomName}用の入室キーをご入力ください。`;
    setStatus("");

    submitButton.disabled = false;
    submitButton.textContent = "キーを確認して入室する";

    openModal(modal);
    window.setTimeout(() => input.focus(), 120);
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const roomType = typeInput.value;
    const roomKey = input.value.trim().toUpperCase();

    if (!roomKey) {
      setStatus("入室キーを入力してください。", "error");
      input.focus();
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "キーを確認しています…";
    setStatus("入室キーの有効性を確認しています。", "checking");

    try {
      let result = {
        success: true,
        previewMode: true,
        message: "HTML確認用モードで入室を許可しました。"
      };

      if (SITE_CONFIG.roomKeyValidationUrl) {
        const response = await fetch(SITE_CONFIG.roomKeyValidationUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: JSON.stringify({
            action: "validateRoomKey",
            roomType,
            roomKey,
            userAgent: navigator.userAgent
          }),
          redirect: "follow"
        });

        if (!response.ok) {
          throw new Error(`入室キー確認エラー: ${response.status}`);
        }

        result = await response.json();
      }

      if (!result?.success) {
        setStatus(
          result?.message || "入室キーを確認できませんでした。有効期限や入力内容をご確認ください。",
          "error"
        );
        input.select();
        return;
      }

      if (result.meetingUrl) {
        window.AUTHORIZED_ROOM_URLS[roomType] = result.meetingUrl;
      }

      setStatus(result.message || "入室キーを確認しました。", "success");

      window.setTimeout(() => {
        closeAllModals();

        if (successCallback) {
          const callback = successCallback;
          successCallback = null;
          callback();
        }
      }, 650);
    } catch (error) {
      console.error(error);
      setStatus(
        "入室キーの確認中にエラーが発生しました。時間をおいて再度お試しください。",
        "error"
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "キーを確認して入室する";
    }
  });

  input.addEventListener("input", () => {
    input.value = input.value.toUpperCase();
    if (status.classList.contains("is-error")) setStatus("");
  });
}

function setupBackToTop() {
  const button = document.getElementById("back-to-top");
  if (!button) return;

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });
}


/* ==========================================================
   v19 HP管理スプレッドシート／GAS連携
   ========================================================== */

function isConfiguredHpApi() {
  return Boolean(
    SITE_CONFIG.hpApiUrl &&
    !SITE_CONFIG.hpApiUrl.includes("GAS_HP管理_WEB_APP_URL_HERE")
  );
}

function buildHpApiUrl(action) {
  if (!isConfiguredHpApi()) return "";
  const separator = SITE_CONFIG.hpApiUrl.includes("?") ? "&" : "?";
  return `${SITE_CONFIG.hpApiUrl}${separator}action=${encodeURIComponent(action)}`;
}

function configureManagedEndpoints() {
  if (!isConfiguredHpApi()) return;
  if (!SITE_CONFIG.inquiryGasUrl) SITE_CONFIG.inquiryGasUrl = SITE_CONFIG.hpApiUrl;
  if (!SITE_CONFIG.foodOrderGasUrl) SITE_CONFIG.foodOrderGasUrl = SITE_CONFIG.hpApiUrl;
  if (!SITE_CONFIG.roomKeyValidationUrl) SITE_CONFIG.roomKeyValidationUrl = SITE_CONFIG.hpApiUrl;
  if (!SITE_CONFIG.newsFeedUrl) SITE_CONFIG.newsFeedUrl = buildHpApiUrl("news");
  if (!SITE_CONFIG.achievementLogosUrl) SITE_CONFIG.achievementLogosUrl = buildHpApiUrl("logos");
}

async function setupManagedSite() {
  configureManagedEndpoints();
  if (!isConfiguredHpApi()) return;

  try {
    const response = await fetch(buildHpApiUrl("bootstrap"), {
      method: "GET",
      cache: "no-store",
      redirect: "follow"
    });
    const result = await response.json();
    if (!result?.success || !result.data) {
      throw new Error(result?.message || "HP管理データを取得できませんでした。");
    }

    HP_MANAGED_DATA = result.data;
    applyManagedSettings(result.data.settings || {});
    applySectionManagement(result.data.sections || []);
    renderManagedFoodProducts(result.data.products || []);
    renderManagedCertifications(result.data.certifications || []);
    renderManagedDiagnostics(result.data.diagnostics || []);
    renderManagedEvidence(result.data.evidence || []);
    applyManagedRooms(result.data.rooms || []);
    renderManagedInquiryForm(result.data.inquiryForm || {});
    window.dispatchEvent(new CustomEvent("hpmanageddataready", { detail: result.data }));
  } catch (error) {
    console.warn("HP管理スプレッドシートとの接続に失敗したため、HTML内の初期データを表示します。", error);
  }
}

function applyManagedSettings(settings) {
  if (settings.experience_url && SITE_CONFIG.experienceGasUrl === "GAS_WEB_APP_URL_HERE") {
    SITE_CONFIG.experienceGasUrl = String(settings.experience_url);
  }
  ORDER_SETTINGS.shippingFee = Number(settings.shipping_fee ?? ORDER_SETTINGS.shippingFee);
  ORDER_SETTINGS.freeShippingThreshold = Number(settings.free_shipping_threshold ?? ORDER_SETTINGS.freeShippingThreshold);
  ORDER_SETTINGS.roomIdleSeconds = Number(settings.room_idle_seconds ?? ORDER_SETTINGS.roomIdleSeconds);

  const footerCompanyLines = document.querySelectorAll(".footer-company p");
  if (footerCompanyLines[0] && settings.company_name) {
    footerCompanyLines[0].textContent = `運営会社：${String(settings.company_name).trim()}`;
  }
  if (footerCompanyLines[1] && settings.company_address) {
    footerCompanyLines[1].textContent = `所在地：${String(settings.company_address).trim()}`;
  }
}

function applySectionManagement(sections) {
  if (!Array.isArray(sections) || !sections.length) return;
  const main = document.querySelector("main");
  if (!main) return;

  const sectionElements = Array.from(main.children).filter((element) => element.matches?.("section[data-section-id]"));
  const byId = new Map(sectionElements.map((section) => [section.dataset.sectionId, section]));
  const contact = byId.get("contact");
  const managedIds = new Set();

  sections
    .slice()
    .sort((a, b) => Number(a.order || 9999) - Number(b.order || 9999))
    .forEach((config) => {
      const section = byId.get(config.id);
      if (!section) return;
      managedIds.add(config.id);
      section.hidden = config.fixed ? false : config.visible === false;
      if (!config.fixed && contact) main.insertBefore(section, contact);
    });

  // 管理表に未登録の既存セクションは削除せず、問い合わせの直前へ残します。
  sectionElements.forEach((section) => {
    const id = section.dataset.sectionId;
    if (!managedIds.has(id) && id !== "hero" && id !== "contact" && contact) {
      main.insertBefore(section, contact);
    }
  });

  rebuildManagedNavigation(sections);
}

function rebuildManagedNavigation(sections) {
  const nav = document.querySelector(".main-nav");
  if (!nav) return;
  const consultButton = nav.querySelector(".nav-consult");
  nav.querySelectorAll("a").forEach((anchor) => anchor.remove());

  sections
    .filter((item) => item.visible !== false && item.menuVisible && item.menuName && item.menuLink)
    .sort((a, b) => Number(a.order || 9999) - Number(b.order || 9999))
    .forEach((item) => {
      const anchor = document.createElement("a");
      anchor.href = item.menuLink;
      anchor.textContent = item.menuName;
      nav.insertBefore(anchor, consultButton || null);
    });
}


function renderManagedInquiryForm(config) {
  const form = document.getElementById("contact-form");
  if (!form || !Array.isArray(config?.fields) || !config.fields.length) return;
  const grid = form.querySelector(".form-grid");
  if (!grid) return;

  const fields = config.fields.slice().sort((a, b) => Number(a.order || 9999) - Number(b.order || 9999));
  grid.innerHTML = fields.map((field) => buildManagedInquiryField(field, config.defaultType || "")).join("");
}

function buildManagedInquiryField(field, defaultType) {
  const id = escapeHtml(field.id || "");
  const label = escapeHtml(field.label || "");
  const placeholder = escapeHtml(field.placeholder || "");
  const required = field.required ? " required" : "";
  const requiredBadge = field.required ? '<span class="field-required">必須</span>' : '<span class="field-optional">任意</span>';
  const widthClass = field.width === "half" ? "field-half" : "field-full";
  const help = field.help ? `<small class="field-help">${escapeHtml(field.help)}</small>` : "";
  let control = "";

  if (field.type === "textarea") {
    control = `<textarea name="${id}" rows="5" placeholder="${placeholder}"${required}></textarea>`;
  } else if (field.type === "select") {
    const options = Array.isArray(field.options) ? field.options : [];
    control = `<select name="${id}"${id === "type" ? ' id="contact-type"' : ""}${required}>${options.map((option) => {
      const value = String(option.value ?? option.label ?? "");
      const selected = value === defaultType ? " selected" : "";
      return `<option value="${escapeHtml(value)}"${selected}>${escapeHtml(option.label ?? value)}</option>`;
    }).join("")}</select>`;
  } else {
    const inputType = ["email", "tel", "text"].includes(field.type) ? field.type : "text";
    control = `<input name="${id}" type="${inputType}" placeholder="${placeholder}"${required}>`;
  }

  return `<label class="managed-form-field ${widthClass}"><span class="managed-field-label">${label}${requiredBadge}</span>${control}${help}</label>`;
}

function renderManagedFoodProducts(products) {
  if (!Array.isArray(products) || !products.length) return;
  FOOD_ITEMS = products.map((item) => ({
    code: String(item.code || ""),
    name: String(item.name || ""),
    image: String(item.image || ""),
    amount: String(item.amount || ""),
    price: Number(item.price || 0),
    description: String(item.description || ""),
    nutrition: item.nutrition || {},
    allergen: String(item.allergen || ""),
    method: String(item.method || ""),
    packaging: String(item.packaging || ""),
    storage: String(item.storage || ""),
    commonIngredients: String(item.commonIngredients || ""),
    cookingNotes: String(item.cookingNotes || ""),
    ingredients: String(item.ingredients || "")
  })).filter((item) => item.code && item.name && item.price > 0);

  const gallery = document.getElementById("food-gallery");
  if (gallery) {
    gallery.innerHTML = FOOD_ITEMS.map((item) => `
      <button class="food-item" type="button" data-food="${escapeHtml(item.code)}">
        <span class="food-image-frame"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}"></span>
        <span class="food-name">${escapeHtml(item.name)}</span>
      </button>
    `).join("");
  }

  const priceLine = document.querySelector(".food-price-line");
  if (priceLine && FOOD_ITEMS.length) {
    const prices = FOOD_ITEMS.map((item) => item.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceText = minPrice === maxPrice
      ? `1食 ${minPrice.toLocaleString()}円（税込）`
      : `1食 ${minPrice.toLocaleString()}円〜（税込）`;
    priceLine.innerHTML = `
      <strong>${priceText}</strong>
      <span>送料 ${ORDER_SETTINGS.shippingFee.toLocaleString()}円 ／ ${ORDER_SETTINGS.freeShippingThreshold.toLocaleString()}円以上購入で送料無料</span>
    `;
  }
}

function renderManagedCertifications(items) {
  if (!Array.isArray(items) || !items.length) return;
  const list = document.querySelector(".cert-list");
  if (!list) return;
  list.innerHTML = items.map((item) => {
    const link = item.url
      ? `<a class="cert-detail-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">詳細はこちら</a>`
      : "";
    return `<article><b>${escapeHtml(item.name)}</b><span>${escapeHtml(item.description || "")}</span>${link}</article>`;
  }).join("");
}

function renderManagedDiagnostics(items) {
  if (!Array.isArray(items) || !items.length) return;
  const nodes = Array.from(document.querySelectorAll(".voice-orbit-map .orbit-node"));
  nodes.forEach((node, index) => {
    const item = items[index];
    if (!item) {
      node.hidden = true;
      return;
    }
    node.hidden = false;
    node.innerHTML = `<b>${index + 1}</b>${escapeHtml(item.name)}`;
  });
}

function renderManagedEvidence(items) {
  if (!Array.isArray(items) || !items.length) return;
  const grid = document.querySelector(".infographic-grid");
  if (!grid) return;

  grid.innerHTML = items.map((item, index) => `
    <article class="info-card ${escapeHtml(item.color || "blue")}">
      <div class="round-index">${index + 1}</div>
      ${getEvidenceIconMarkup(item.icon)}
      <h3>${escapeHtml(item.title)}</h3>
      <p class="big">${escapeHtml(item.value)}</p>
      <p>${escapeHtml(item.description)}</p>
      <small>${item.sourceUrl ? `<a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noopener">出典：${escapeHtml(item.source)}</a>` : `出典：${escapeHtml(item.source)}`}</small>
    </article>
  `).join("");
}

function getEvidenceIconMarkup(icon) {
  const icons = {
    donut: '<div class="info-icon donut-chart" aria-hidden="true"></div>',
    trio: '<div class="pictogram trio" aria-hidden="true"><i></i><i></i><i></i></div>',
    upbars: '<div class="mini-upbars" aria-hidden="true"><i></i><i></i><i></i><i></i></div>',
    people: '<div class="people-row" aria-hidden="true"><i></i><i></i><i></i><i></i><i class="off"></i></div>',
    stairs: '<div class="mini-stairs" aria-hidden="true"><i></i><i></i><i></i><i></i></div>',
    health: '<div class="health-circle" aria-hidden="true"></div>',
    line: '<div class="line-graph" aria-hidden="true"><i></i></div>',
    check: '<div class="check-graph" aria-hidden="true"></div>'
  };
  return icons[icon] || icons.check;
}

function applyManagedRooms(rooms) {
  if (!Array.isArray(rooms) || !rooms.length) return;
  const map = {};
  rooms.forEach((room) => {
    map[room.id] = {
      label: room.label || room.name || "",
      title: room.title || "",
      copy: room.description || "",
      description: room.description || "",
      image: room.image || "",
      buttons: Array.isArray(room.buttons) ? room.buttons : []
    };
  });
  window.MANAGED_ROOM_STAGES = map;
  ROOM_STAGES = { ...ROOM_STAGES, ...map };
}

function createRequestId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `REQ-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}


/* ==========================================================
   スマートフォン専用ナビゲーション
   PCレイアウトには影響しません。
   ========================================================== */
function setupMobileNavigation() {
  const toggle = document.getElementById("mobile-menu-toggle");
  const drawer = document.getElementById("mobile-menu-drawer");
  const backdrop = document.getElementById("mobile-menu-backdrop");
  const closeButton = document.getElementById("mobile-menu-close");
  const linkContainer = document.getElementById("mobile-menu-links");
  const bottomNav = document.getElementById("mobile-bottom-nav");

  if (!toggle || !drawer || !backdrop || !closeButton || !linkContainer) return;

  const mobileMenuItems = [
    { sectionId: "evidence", targetId: "evidence", label: "数字で見る現実", color: "menu-color-1" },
    { sectionId: "experience", targetId: "experience", label: "無料診断体験", color: "menu-color-2" },
    { sectionId: "voice-behind", targetId: "visible-voices", label: "声の裏に隠れた価値", color: "menu-color-3" },
    { sectionId: "services", targetId: "services", label: "主な支援メニュー", color: "menu-color-4" },
    { sectionId: "diagnostics", targetId: "diagnostics", label: "“声の診断”一覧", color: "menu-color-5" },
    { sectionId: "healthyfood", targetId: "healthyfood", label: "社食検討の方へ", color: "menu-color-6" },
    { sectionId: "certification", targetId: "certification", label: "認定支援", color: "menu-color-7" },
    { sectionId: "flow", targetId: "flow", label: "導入の流れ", color: "menu-color-8" },
    { sectionId: "virtualrooms", targetId: "virtualrooms", label: "カウンセリング・セミナー", color: "menu-color-9" }
  ];

  function buildDrawerLinks() {
    const links = mobileMenuItems
      .filter((item) => {
        const section = document.querySelector(
          `main > section[data-section-id="${item.sectionId}"]`
        );
        return section && !section.hidden;
      })
      .map((item, index) => `
        <a class="mobile-menu-link ${item.color}" href="#${escapeHtml(item.targetId)}">
          <span class="mobile-menu-number">${String(index + 1).padStart(2, "0")}</span>
          <strong>${escapeHtml(item.label)}</strong>
          <span class="mobile-menu-arrow" aria-hidden="true">→</span>
        </a>
      `);

    linkContainer.innerHTML = links.join("");
  }

  function openDrawer() {
    buildDrawerLinks();
    document.body.classList.add("mobile-menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "メニューを閉じる");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.setAttribute("aria-hidden", "false");
    window.setTimeout(() => closeButton.focus(), 80);
  }

  function closeDrawer({ returnFocus = false } = {}) {
    document.body.classList.remove("mobile-menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "メニューを開く");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.setAttribute("aria-hidden", "true");
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener("click", () => {
    if (document.body.classList.contains("mobile-menu-open")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  closeButton.addEventListener("click", () => closeDrawer({ returnFocus: true }));
  backdrop.addEventListener("click", () => closeDrawer());
  linkContainer.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeDrawer();
  });
  drawer.querySelectorAll("[data-open-contact]").forEach((button) => {
    button.addEventListener("click", () => closeDrawer());
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("mobile-menu-open")) {
      closeDrawer({ returnFocus: true });
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 767 && document.body.classList.contains("mobile-menu-open")) {
      closeDrawer();
    }
  });

  if (bottomNav && "IntersectionObserver" in window) {
    const bottomLinks = Array.from(bottomNav.querySelectorAll("[data-mobile-target]"));
    const observedSections = bottomLinks
      .map((link) => document.getElementById(link.dataset.mobileTarget))
      .filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      bottomLinks.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.mobileTarget === visible.target.id);
      });
    }, {
      rootMargin: "-20% 0px -58% 0px",
      threshold: [0.05, 0.2, 0.5]
    });

    observedSections.forEach((section) => observer.observe(section));
  }
}



/* ==========================================================
   スマートフォン専用：スクロール登場演出
   ========================================================== */
function setupMobileMotion() {
  if (!window.matchMedia("(max-width: 767px)").matches) return;

  const targets = Array.from(document.querySelectorAll(`
    main > section .section-head,
    main > section .compact-head,
    main > section article,
    .memo-note,
    .mini-chart,
    .hero-graph-card,
    .menu-signboard,
    .orbit-center-card,
    .orbit-node,
    .achievement-logo-card,
    .food-item,
    .room-experience,
    .final-box,
    .embed-shell
  `));

  const cardSelector = `
    main > section article,
    .memo-note,
    .mini-chart,
    .hero-graph-card,
    .menu-signboard,
    .orbit-center-card,
    .orbit-node,
    .achievement-logo-card,
    .food-item,
    .room-experience,
    .final-box,
    .embed-shell
  `;

  let cardIndex = 0;

  targets.forEach((target, index) => {
    target.classList.add("mobile-motion-ready");
    target.classList.add(
      index % 3 === 0
        ? "mobile-motion-left"
        : index % 3 === 1
          ? "mobile-motion-right"
          : "mobile-motion-pop"
    );
    target.style.setProperty("--mobile-motion-delay", `${Math.min(index % 8, 7) * 45}ms`);

    if (target.matches(cardSelector)) {
      target.classList.add("mobile-card-motion");
      target.classList.add(`mobile-card-dance-${(cardIndex % 3) + 1}`);
      target.style.setProperty(
        "--mobile-card-delay",
        `${850 + (cardIndex % 7) * 120}ms`
      );
      cardIndex += 1;
    }
  });

  if (!("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("mobile-in-view"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("mobile-in-view");
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: "0px 0px -8% 0px",
    threshold: 0.08
  });

  targets.forEach((target) => observer.observe(target));
}
