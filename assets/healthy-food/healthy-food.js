(() => {
  "use strict";

  const API_URL =
    "https://script.google.com/macros/s/AKfycbxuGAYkdygkpMsxFQvxmSdu2TnRs7svrudmgwDVOQg9YKIAa1T-Q-v5YmXOf4b5fQCSJw/exec";

  const FALLBACK_PRODUCTS = [
    {
      code: "03461005",
      name: "赤魚の麹味噌焼き",
      image: "/assets/healthyfood/03461005_akauo_kouji_miso.jpg",
      amount: "160g",
      price: 660,
      description:
        "赤魚に麹味噌を漬け込み、じっくりと焼き上げた和風メニューです。",
      nutrition: {
        "エネルギー": "207kcal",
        "たんぱく質": "15.5g",
        "脂質": "9.3g",
        "炭水化物": "19.1g",
        "食塩相当量": "1.6g"
      },
      allergen: "小麦・ごま・大豆・鶏肉",
      method: "電子レンジで加熱"
    },
    {
      code: "03461024",
      name: "あじ西京焼き",
      image: "/assets/healthyfood/03461024_aji_saikyo_yaki.jpg",
      amount: "151g",
      price: 660,
      description:
        "味噌のコクと香ばしさを楽しめる、あじの西京焼きです。",
      nutrition: {
        "エネルギー": "203kcal",
        "たんぱく質": "15.1g",
        "脂質": "10.1g",
        "炭水化物": "15.1g",
        "食塩相当量": "1.5g"
      },
      allergen: "小麦・乳・ごま・大豆・鶏肉・ゼラチン",
      method: "電子レンジで加熱"
    },
    {
      code: "03461008",
      name: "厚揚げとそぼろの和風煮",
      image: "/assets/healthyfood/03461008_atsuage_soboro_wafuni.jpg",
      amount: "239g",
      price: 660,
      description:
        "厚揚げと鶏ひき肉を、だしを活かしたやさしい味付けに仕立てています。",
      nutrition: {
        "エネルギー": "240kcal",
        "たんぱく質": "16.1g",
        "脂質": "12.8g",
        "炭水化物": "17.2g",
        "食塩相当量": "1.9g"
      },
      allergen: "小麦・乳・ごま・大豆・鶏肉・豚肉・りんご",
      method: "電子レンジで加熱"
    }
  ];

  const state = {
    products: FALLBACK_PRODUCTS,
    shippingFee: 891,
    freeShippingThreshold: 5000
  };

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalizeImagePath(value) {
    const path = String(value || "").trim();
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    if (path.startsWith("/")) return path;
    return `/${path.replace(/^\.?\//, "")}`;
  }

  function normalizeProduct(item) {
    return {
      code: String(item?.code || "").trim(),
      name: String(item?.name || "").trim(),
      image: normalizeImagePath(item?.image),
      amount: String(item?.amount || "").trim(),
      price: Number(item?.price || 0),
      description: String(item?.description || "").trim(),
      nutrition:
        item?.nutrition && typeof item.nutrition === "object"
          ? item.nutrition
          : {},
      allergen: String(item?.allergen || "").trim(),
      method: String(item?.method || "").trim(),
      packaging: String(item?.packaging || "").trim(),
      storage: String(item?.storage || "").trim(),
      commonIngredients: String(item?.commonIngredients || "").trim(),
      cookingNotes: String(item?.cookingNotes || "").trim(),
      ingredients: String(item?.ingredients || "").trim()
    };
  }

  async function fetchManagedProducts() {
    try {
      const url = new URL(API_URL);
      url.searchParams.set("action", "bootstrap");

      const response = await fetch(url.toString(), {
        method: "GET",
        cache: "no-store",
        redirect: "follow"
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();

      if (!result?.success || !result?.data) {
        throw new Error(result?.message || "商品情報を取得できませんでした。");
      }

      const products = Array.isArray(result.data.products)
        ? result.data.products
            .map(normalizeProduct)
            .filter(
              (item) =>
                item.code &&
                item.name &&
                item.image &&
                Number.isFinite(item.price) &&
                item.price > 0
            )
        : [];

      if (products.length) {
        state.products = products;
      }

      const settings = result.data.settings || {};
      state.shippingFee = Number(
        settings.shipping_fee ?? state.shippingFee
      );
      state.freeShippingThreshold = Number(
        settings.free_shipping_threshold ??
          state.freeShippingThreshold
      );
    } catch (error) {
      console.warn(
        "管理スプレッドシートを取得できないため、初期商品を表示します。",
        error
      );
    }
  }

  function formatPrice(value) {
    return `${Number(value || 0).toLocaleString()}円`;
  }

  function getPriceSummary() {
    const prices = state.products
      .map((item) => Number(item.price || 0))
      .filter((price) => price > 0);

    if (!prices.length) return "価格はお問い合わせください";

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return minPrice === maxPrice
      ? `1食 ${minPrice.toLocaleString()}円（税込）`
      : `1食 ${minPrice.toLocaleString()}円〜（税込）`;
  }

  function updatePriceDisplays() {
    const priceText = getPriceSummary();
    const shippingText = `送料 ${state.shippingFee.toLocaleString()}円`;
    const freeShippingText =
      `${state.freeShippingThreshold.toLocaleString()}円以上で送料無料`;
    const combinedText = `${shippingText} ／ ${freeShippingText}`;

    const heroPrice = $("#hero-price");
    const heroShipping = $("#hero-shipping");
    const heroFreeShipping = $("#hero-free-shipping");
    const menuPrice = $("#menu-price");
    const menuShipping = $("#menu-shipping");

    if (heroPrice) heroPrice.textContent = priceText;
    if (heroShipping) heroShipping.textContent = shippingText;
    if (heroFreeShipping) {
      heroFreeShipping.textContent = freeShippingText;
    }
    if (menuPrice) menuPrice.textContent = priceText;
    if (menuShipping) menuShipping.textContent = combinedText;
  }

  function renderProducts() {
    const grid = $("#product-grid");
    const loading = $("#product-loading");

    if (!grid) return;

    grid.innerHTML = state.products
      .map(
        (item) => `
          <button
            class="hf-product-card"
            type="button"
            data-product-code="${escapeHtml(item.code)}"
            aria-label="${escapeHtml(item.name)}の詳細を見る"
          >
            <span class="hf-product-image">
              <img
                src="${escapeHtml(item.image)}"
                alt="${escapeHtml(item.name)}"
                loading="lazy"
              >
            </span>
            <span class="hf-product-copy">
              <strong>${escapeHtml(item.name)}</strong>
              <span>栄養成分を見る →</span>
            </span>
          </button>
        `
      )
      .join("");

    if (loading) loading.hidden = true;

    grid
      .querySelectorAll("[data-product-code]")
      .forEach((button) => {
        button.addEventListener("click", () => {
          openProductDetail(button.dataset.productCode);
        });
      });

    const firstProduct = state.products[0];
    const heroImage = $("#hero-food-image");

    if (firstProduct?.image && heroImage) {
      heroImage.src = firstProduct.image;
      heroImage.alt = firstProduct.name;
    }
  }

  function buildDefinitionRows(item) {
    return [
      ["1人前量", item.amount],
      ["価格", `${formatPrice(item.price)}（税込）`],
      ["調理方法", item.method],
      ["包装状態", item.packaging],
      ["保管方法", item.storage],
      ["調理注意点", item.cookingNotes]
    ]
      .filter(([, value]) => String(value || "").trim())
      .map(
        ([label, value]) => `
          <div>
            <dt>${escapeHtml(label)}</dt>
            <dd>${escapeHtml(value)}</dd>
          </div>
        `
      )
      .join("");
  }

  function buildNutritionRows(item) {
    return Object.entries(item.nutrition || {})
      .filter(([, value]) => String(value || "").trim())
      .map(
        ([label, value]) => `
          <div>
            <dt>${escapeHtml(label)}</dt>
            <dd>${escapeHtml(value)}</dd>
          </div>
        `
      )
      .join("");
  }

  function buildDetailNotes(item) {
    const notes = [
      ["アレルゲン", item.allergen],
      ["問い合わせの多い原材料", item.commonIngredients],
      ["原材料名", item.ingredients]
    ].filter(([, value]) => String(value || "").trim());

    if (!notes.length) return "";

    return `
      <div class="hf-detail-notes">
        ${notes
          .map(
            ([title, value]) => `
              <section>
                <h3>${escapeHtml(title)}</h3>
                <p>${escapeHtml(value)}</p>
              </section>
            `
          )
          .join("")}
      </div>
    `;
  }

  function openProductDetail(code) {
    const item = state.products.find(
      (product) => product.code === code
    );
    const modal = $("#food-detail-modal");
    const content = $("#food-detail-content");

    if (!item || !modal || !content) return;

    const detailRows = buildDefinitionRows(item);
    const nutritionRows = buildNutritionRows(item);

    content.innerHTML = `
      <div class="hf-detail-grid">
        <div class="hf-detail-image">
          <img
            src="${escapeHtml(item.image)}"
            alt="${escapeHtml(item.name)}"
          >
        </div>
        <div class="hf-detail-copy">
          <p class="hf-section-label">
            商品コード：${escapeHtml(item.code)}
          </p>
          <h2>${escapeHtml(item.name)}</h2>
          ${
            item.description
              ? `<p>${escapeHtml(item.description)}</p>`
              : ""
          }
          ${
            detailRows
              ? `<dl class="hf-detail-meta">${detailRows}</dl>`
              : ""
          }
          ${
            nutritionRows
              ? `
                <h3>栄養価（1人前あたり）</h3>
                <dl class="hf-nutrition-list">
                  ${nutritionRows}
                </dl>
              `
              : ""
          }
          ${buildDetailNotes(item)}
        </div>
      </div>
    `;

    openModal(modal);
  }

  function renderOrderTable() {
    const table = $("#order-table");
    if (!table) return;

    table.innerHTML = state.products
      .map(
        (item) => `
          <div class="hf-order-row">
            <strong>${escapeHtml(item.code)}</strong>
            <span>${escapeHtml(item.name)}</span>
            <input
              type="number"
              min="0"
              step="1"
              value="0"
              data-order-code="${escapeHtml(item.code)}"
              aria-label="${escapeHtml(item.name)}の個数"
            >
          </div>
        `
      )
      .join("");

    table
      .querySelectorAll("[data-order-code]")
      .forEach((input) => {
        input.addEventListener("input", updateOrderSummary);
      });

    updateOrderSummary();
  }

  function getOrderItems() {
    return $$("[data-order-code]")
      .map((input) => {
        const item = state.products.find(
          (product) => product.code === input.dataset.orderCode
        );
        const quantity = Number(input.value || 0);

        if (!item || quantity <= 0) return null;

        return {
          code: item.code,
          name: item.name,
          unitPrice: item.price,
          quantity,
          lineTotal: item.price * quantity
        };
      })
      .filter(Boolean);
  }

  function calculateSubtotal(items) {
    return items.reduce(
      (total, item) => total + item.lineTotal,
      0
    );
  }

  function calculateShipping(subtotal) {
    if (!subtotal) return 0;

    return subtotal >= state.freeShippingThreshold
      ? 0
      : state.shippingFee;
  }

  function updateOrderSummary() {
    const items = getOrderItems();
    const subtotal = calculateSubtotal(items);
    const shipping = calculateShipping(subtotal);
    const total = subtotal + shipping;

    const subtotalNode = $("#order-subtotal");
    const shippingNode = $("#order-shipping");
    const totalNode = $("#order-total");

    if (subtotalNode) {
      subtotalNode.textContent = formatPrice(subtotal);
    }
    if (shippingNode) {
      shippingNode.textContent = formatPrice(shipping);
    }
    if (totalNode) {
      totalNode.textContent = formatPrice(total);
    }
  }

  function createRequestId() {
    if (window.crypto?.randomUUID) {
      return window.crypto.randomUUID();
    }

    return (
      `REQ-${Date.now()}-` +
      Math.random().toString(36).slice(2, 10)
    );
  }

  async function submitOrder(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const submitButton = form.querySelector(
      'button[type="submit"]'
    );
    const items = getOrderItems();

    if (!items.length) {
      window.alert("商品個数を1つ以上入力してください。");
      return;
    }

    const formData = new FormData(form);
    const subtotal = calculateSubtotal(items);
    const shipping = calculateShipping(subtotal);

    const payload = {
      action: "submitFoodOrder",
      type: "food_order",
      items,
      subtotal,
      shipping,
      total: subtotal + shipping,
      customer: Object.fromEntries(formData.entries()),
      requestId: createRequestId(),
      createdAt: new Date().toISOString()
    };

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "送信しています…";
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload),
        redirect: "follow"
      });

      const result = await response.json();

      if (!result?.success) {
        throw new Error(
          result?.message || "注文依頼を送信できませんでした。"
        );
      }

      window.alert(
        result.message || "注文依頼を送信しました。"
      );

      form.reset();
      renderOrderTable();
      closeAllModals();
    } catch (error) {
      console.error(error);
      window.alert(
        error.message ||
          "送信中にエラーが発生しました。"
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "注文を依頼する";
      }
    }
  }

  function openModal(modal) {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeAllModals() {
    $$(".hf-modal").forEach((modal) => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
    });

    document.body.style.overflow = "";
  }

  function setupModals() {
    $$("[data-close-modal]").forEach((button) => {
      button.addEventListener("click", closeAllModals);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeAllModals();
    });

    const orderModal = $("#order-modal");

    [
      "#hero-order-button",
      "#menu-order-button",
      "#cta-order-button"
    ].forEach((selector) => {
      const button = $(selector);

      if (button && orderModal) {
        button.addEventListener("click", () => {
          renderOrderTable();
          openModal(orderModal);
        });
      }
    });

    const orderForm = $("#order-form");
    if (orderForm) {
      orderForm.addEventListener("submit", submitOrder);
    }
  }

  function setupFaq() {
    $$(".hf-faq-item").forEach((item) => {
      const button = item.querySelector("button");
      if (!button) return;

      button.addEventListener("click", () => {
        const open = item.classList.toggle("is-open");
        button.setAttribute(
          "aria-expanded",
          open ? "true" : "false"
        );
      });
    });
  }

  function createFoodAmbient(section) {
    if (
      !section ||
      section.querySelector(":scope > .hf-food-ambient")
    ) {
      return;
    }

    const layer = document.createElement("div");
    layer.className = "hf-food-ambient";
    layer.setAttribute("aria-hidden", "true");

    const icons = [
      `<svg viewBox="0 0 64 64"><path d="M16 52c5-25 19-39 38-42-1 21-12 38-38 42z"/><path d="M18 50 49 17"/></svg>`,
      `<svg viewBox="0 0 64 64"><path d="M10 38h44c0 11-8 18-22 18S10 49 10 38z"/><path d="M18 32c0-6 4-8 4-14M32 32c0-6 4-8 4-14M46 32c0-6 4-8 4-14"/></svg>`,
      `<svg viewBox="0 0 64 64"><path d="M10 32c11-15 30-17 43-4-10 18-29 22-43 4z"/><path d="m49 29 11-10-1 22z"/><circle cx="22" cy="29" r="2"/></svg>`,
      `<svg viewBox="0 0 64 64"><circle cx="32" cy="34" r="20"/><path d="m32 10 5 8 10-3-5 9 9 5-11 1-3 10-5-9-10 5 4-10-9-6 11 1z"/></svg>`
    ];

    icons.forEach((markup) => {
      const item = document.createElement("span");
      item.className = "hf-food-shape";
      item.innerHTML = markup;
      layer.appendChild(item);
    });

    section.prepend(layer);
  }

  function setupFoodAmbient() {
    $$("section[data-food-ambient]").forEach(
      createFoodAmbient
    );
  }

  async function setup() {
    setupFoodAmbient();
    setupFaq();
    setupModals();

    await fetchManagedProducts();

    updatePriceDisplays();
    renderProducts();
    renderOrderTable();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      setup,
      { once: true }
    );
  } else {
    setup();
  }
})();
