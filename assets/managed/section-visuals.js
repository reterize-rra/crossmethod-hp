(() => {
  "use strict";

  const API_URL = "https://script.google.com/macros/s/AKfycbxuGAYkdygkpMsxFQvxmSdu2TnRs7svrudmgwDVOQg9YKIAa1T-Q-v5YmXOf4b5fQCSJw/exec";
  const TONE_CLASSES = [
    "cm-menu-tone-turquoise",
    "cm-menu-tone-blue",
    "cm-menu-tone-green",
    "cm-menu-tone-gold",
    "cm-menu-tone-purple",
    "cm-menu-tone-coral",
    "cm-menu-tone-navy"
  ];

  let managedItems = [];
  let applyTimer = 0;

  function normalizeTone(value) {
    const key = String(value || "").trim().toLowerCase();
    const map = {
      "ターコイズ": "turquoise",
      "turquoise": "turquoise",
      "ブルー": "blue",
      "blue": "blue",
      "グリーン": "green",
      "green": "green",
      "ゴールド": "gold",
      "gold": "gold",
      "パープル": "purple",
      "purple": "purple",
      "コーラル": "coral",
      "coral": "coral",
      "ネイビー": "navy",
      "navy": "navy"
    };
    return map[key] || "";
  }

  function normalizeEffect(value) {
    const key = String(value || "").trim().toLowerCase();
    const map = {
      "なし": "",
      "none": "",
      "hero": "hero",
      "news": "news",
      "graph": "graph",
      "trial": "trial",
      "chat": "chat",
      "voice": "voice",
      "services": "services",
      "diagnostics": "diagnostics",
      "connections": "connections",
      "food": "food",
      "certification": "certification",
      "flow": "flow",
      "rooms": "rooms",
      "faq": "faq",
      "contact": "contact"
    };
    return Object.hasOwn(map, key) ? map[key] : "";
  }

  function normalizeLink(value) {
    const raw = String(value || "").trim();
    if (!raw) return "";

    try {
      const url = new URL(raw, window.location.origin);
      return `${url.pathname}${url.hash}`;
    } catch (error) {
      return raw;
    }
  }

  function findSection(sectionId) {
    const id = String(sectionId || "").trim();
    if (!id) return null;

    return Array.from(document.querySelectorAll("section")).find((section) => {
      return section.id === id || section.dataset.sectionId === id;
    }) || null;
  }

  function applyBackgroundEffect(item) {
    const section = findSection(item.id);
    if (!section) return;

    const effect = normalizeEffect(item.backgroundEffect);
    section.dataset.managedBackground = effect;

    let layer = section.querySelector(":scope > .cm-managed-effect-layer");

    if (!effect) {
      section.classList.remove("cm-has-managed-bg");
      if (layer) layer.remove();
      return;
    }

    section.classList.add("cm-has-managed-bg");

    if (!layer) {
      layer = document.createElement("span");
      layer.className = "cm-managed-effect-layer";
      layer.setAttribute("aria-hidden", "true");
      section.insertBefore(layer, section.firstChild);
    }
  }

  function findMenuLinks(item) {
    const configuredLink = normalizeLink(item.menuLink);
    const configuredName = String(item.menuName || "").trim();

    return Array.from(document.querySelectorAll(
      ".main-nav a, .mobile-menu-links a"
    )).filter((anchor) => {
      const anchorLink = normalizeLink(anchor.getAttribute("href"));
      const anchorName = String(anchor.textContent || "").trim();

      if (configuredLink && anchorLink === configuredLink) return true;
      return Boolean(configuredName && anchorName === configuredName);
    });
  }

  function applyMenuColor(item) {
    const tone = normalizeTone(item.menuColor);

    findMenuLinks(item).forEach((anchor) => {
      anchor.classList.remove(...TONE_CLASSES);
      if (tone) anchor.classList.add(`cm-menu-tone-${tone}`);
    });
  }

  function applyAll() {
    managedItems.forEach((item) => {
      applyBackgroundEffect(item);
      applyMenuColor(item);
    });
  }

  function scheduleApply() {
    window.clearTimeout(applyTimer);
    applyTimer = window.setTimeout(applyAll, 40);
  }

  function addStyles() {
    if (document.getElementById("crossmethod-section-visuals-style")) return;

    const style = document.createElement("style");
    style.id = "crossmethod-section-visuals-style";
    style.textContent = `
      .main-nav a[class*="cm-menu-tone-"],
      .mobile-menu-links a[class*="cm-menu-tone-"] {
        border: 1px solid transparent !important;
        border-radius: 999px !important;
        padding: 8px 12px !important;
        transition: transform .18s ease, box-shadow .18s ease, filter .18s ease !important;
      }

      .main-nav a[class*="cm-menu-tone-"]:hover,
      .mobile-menu-links a[class*="cm-menu-tone-"]:hover {
        transform: translateY(-1px);
        filter: brightness(1.02);
      }

      .main-nav a.cm-menu-tone-turquoise,
      .mobile-menu-links a.cm-menu-tone-turquoise {
        color: #087a82 !important;
        background: #e7f8f8 !important;
        border-color: #bde6e8 !important;
        box-shadow: 0 7px 20px rgba(16,174,182,.11);
      }

      .main-nav a.cm-menu-tone-blue,
      .mobile-menu-links a.cm-menu-tone-blue {
        color: #155f99 !important;
        background: #eaf4ff !important;
        border-color: #c9def2 !important;
        box-shadow: 0 7px 20px rgba(21,95,153,.10);
      }

      .main-nav a.cm-menu-tone-green,
      .mobile-menu-links a.cm-menu-tone-green {
        color: #317b38 !important;
        background: #edf8eb !important;
        border-color: #cce8c8 !important;
        box-shadow: 0 7px 20px rgba(49,123,56,.10);
      }

      .main-nav a.cm-menu-tone-gold,
      .mobile-menu-links a.cm-menu-tone-gold {
        color: #856217 !important;
        background: #fff6da !important;
        border-color: #ecd99e !important;
        box-shadow: 0 7px 20px rgba(190,139,30,.12);
      }

      .main-nav a.cm-menu-tone-purple,
      .mobile-menu-links a.cm-menu-tone-purple {
        color: #6c4891 !important;
        background: #f4edff !important;
        border-color: #d9c8ef !important;
        box-shadow: 0 7px 20px rgba(108,72,145,.10);
      }

      .main-nav a.cm-menu-tone-coral,
      .mobile-menu-links a.cm-menu-tone-coral {
        color: #a34e3c !important;
        background: #fff0ec !important;
        border-color: #efcfc6 !important;
        box-shadow: 0 7px 20px rgba(163,78,60,.10);
      }

      .main-nav a.cm-menu-tone-navy,
      .mobile-menu-links a.cm-menu-tone-navy {
        color: #ffffff !important;
        background: #123d56 !important;
        border-color: #123d56 !important;
        box-shadow: 0 8px 22px rgba(18,61,86,.20);
      }

      section.cm-has-managed-bg {
        position: relative;
        isolation: isolate;
        overflow: hidden;
      }

      section.cm-has-managed-bg > .container {
        position: relative;
        z-index: 2;
      }

      .cm-managed-effect-layer {
        position: absolute;
        inset: 0;
        z-index: 0;
        display: block;
        overflow: hidden;
        pointer-events: none;
      }

      .cm-managed-effect-layer::before,
      .cm-managed-effect-layer::after {
        content: "";
        position: absolute;
        pointer-events: none;
      }

      section[data-managed-background="hero"] .cm-managed-effect-layer {
        background:
          radial-gradient(circle at 82% 22%, rgba(16,182,189,.15), transparent 31%),
          radial-gradient(circle at 14% 78%, rgba(212,165,61,.12), transparent 28%);
      }

      section[data-managed-background="hero"] .cm-managed-effect-layer::before {
        right: 7%;
        top: 10%;
        width: min(34vw, 480px);
        height: min(34vw, 480px);
        border-radius: 50%;
        background: radial-gradient(circle, rgba(16,182,189,.18), transparent 68%);
        animation: cmManagedFloat 8s ease-in-out infinite alternate;
      }

      section[data-managed-background="news"] .cm-managed-effect-layer {
        opacity: .42;
        background:
          repeating-linear-gradient(0deg, rgba(18,61,86,.025) 0 1px, transparent 1px 28px),
          linear-gradient(90deg, rgba(16,182,189,.05), transparent 34%, rgba(212,165,61,.04));
      }

      section[data-managed-background="graph"] .cm-managed-effect-layer {
        opacity: .62;
        background-image:
          linear-gradient(rgba(16,182,189,.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(16,182,189,.055) 1px, transparent 1px),
          radial-gradient(circle at 84% 28%, rgba(16,182,189,.12), transparent 25%);
        background-size: 42px 42px, 42px 42px, auto;
      }

      section[data-managed-background="graph"] .cm-managed-effect-layer::after {
        inset: -30% -12%;
        background: linear-gradient(110deg, transparent 42%, rgba(255,255,255,.38) 50%, transparent 58%);
        animation: cmManagedSweep 8s linear infinite;
      }

      section[data-managed-background="trial"] .cm-managed-effect-layer {
        background:
          radial-gradient(circle at 50% 12%, rgba(255,255,255,.82), transparent 24%),
          radial-gradient(circle at 18% 68%, rgba(16,182,189,.12), transparent 26%),
          radial-gradient(circle at 86% 72%, rgba(212,165,61,.10), transparent 24%);
      }

      section[data-managed-background="chat"] .cm-managed-effect-layer {
        background:
          radial-gradient(circle at 14% 30%, rgba(16,182,189,.12) 0 34px, transparent 35px),
          radial-gradient(circle at 87% 62%, rgba(212,165,61,.10) 0 52px, transparent 53px),
          radial-gradient(circle at 72% 20%, rgba(21,95,153,.08) 0 24px, transparent 25px);
      }

      section[data-managed-background="voice"] .cm-managed-effect-layer::before {
        right: -100px;
        top: 50%;
        width: 430px;
        height: 430px;
        border: 1px solid rgba(16,182,189,.14);
        border-radius: 50%;
        box-shadow:
          0 0 0 42px rgba(16,182,189,.045),
          0 0 0 88px rgba(16,182,189,.025);
        transform: translateY(-50%);
        animation: cmManagedPulse 6s ease-in-out infinite;
      }

      section[data-managed-background="services"] .cm-managed-effect-layer {
        background:
          linear-gradient(135deg, rgba(16,182,189,.055), transparent 42%),
          linear-gradient(315deg, rgba(212,165,61,.055), transparent 38%);
      }

      section[data-managed-background="services"] .cm-managed-effect-layer::before {
        left: 5%;
        top: 14%;
        width: 220px;
        height: 120px;
        border-radius: 32px;
        border: 1px solid rgba(16,182,189,.10);
        transform: rotate(-7deg);
        background: rgba(255,255,255,.24);
      }

      section[data-managed-background="diagnostics"] .cm-managed-effect-layer::before {
        left: 50%;
        top: 50%;
        width: min(72vw, 850px);
        height: min(72vw, 850px);
        border: 1px solid rgba(16,182,189,.11);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        box-shadow:
          0 0 0 70px rgba(21,95,153,.025),
          0 0 0 145px rgba(212,165,61,.018);
        animation: cmManagedOrbit 18s linear infinite;
      }

      section[data-managed-background="connections"] .cm-managed-effect-layer {
        opacity: .48;
        background:
          repeating-linear-gradient(90deg, transparent 0 70px, rgba(16,182,189,.045) 70px 72px),
          linear-gradient(180deg, transparent, rgba(16,182,189,.045), transparent);
      }

      section[data-managed-background="food"] .cm-managed-effect-layer {
        background:
          radial-gradient(circle at 12% 24%, rgba(83,182,72,.10), transparent 25%),
          radial-gradient(circle at 88% 76%, rgba(212,165,61,.11), transparent 25%),
          linear-gradient(180deg, rgba(255,255,255,.15), rgba(247,253,248,.36));
      }

      section[data-managed-background="certification"] .cm-managed-effect-layer {
        background:
          radial-gradient(circle at 84% 18%, rgba(212,165,61,.15), transparent 28%),
          linear-gradient(120deg, transparent 0 56%, rgba(212,165,61,.045) 56% 58%, transparent 58% 100%);
      }

      section[data-managed-background="flow"] .cm-managed-effect-layer {
        opacity: .58;
        background-image: radial-gradient(circle, rgba(16,182,189,.12) 0 3px, transparent 4px);
        background-size: 48px 48px;
        mask-image: linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent);
        -webkit-mask-image: linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent);
      }

      section[data-managed-background="rooms"] .cm-managed-effect-layer {
        background:
          radial-gradient(circle at 74% 22%, rgba(16,182,189,.15), transparent 28%),
          radial-gradient(circle at 18% 82%, rgba(212,165,61,.10), transparent 26%);
      }

      section[data-managed-background="rooms"] .cm-managed-effect-layer::after {
        inset: -20%;
        background: linear-gradient(112deg, transparent 42%, rgba(255,255,255,.15) 50%, transparent 58%);
        animation: cmManagedSweep 10s linear infinite;
      }

      section[data-managed-background="faq"] .cm-managed-effect-layer {
        background:
          radial-gradient(circle at 12% 24%, rgba(212,165,61,.11), transparent 25%),
          radial-gradient(circle at 86% 70%, rgba(16,182,189,.11), transparent 27%),
          linear-gradient(180deg, rgba(255,250,236,.40), rgba(255,255,255,.20));
      }

      section[data-managed-background="faq"] .cm-managed-effect-layer::before {
        right: 8%;
        top: 16%;
        width: 110px;
        height: 110px;
        border: 18px solid rgba(212,165,61,.08);
        border-bottom-color: transparent;
        border-radius: 50%;
        transform: rotate(18deg);
      }

      section[data-managed-background="contact"] .cm-managed-effect-layer {
        background:
          radial-gradient(circle at 50% 0%, rgba(255,255,255,.18), transparent 26%),
          radial-gradient(circle at 12% 84%, rgba(16,182,189,.18), transparent 28%),
          radial-gradient(circle at 88% 78%, rgba(212,165,61,.13), transparent 24%);
      }

      @keyframes cmManagedFloat {
        from { transform: translate3d(0, 0, 0) scale(.94); opacity: .56; }
        to { transform: translate3d(-20px, 18px, 0) scale(1.06); opacity: .90; }
      }

      @keyframes cmManagedSweep {
        from { transform: translateX(-42%); }
        to { transform: translateX(42%); }
      }

      @keyframes cmManagedPulse {
        0%, 100% { transform: translateY(-50%) scale(.94); opacity: .50; }
        50% { transform: translateY(-50%) scale(1.05); opacity: .92; }
      }

      @keyframes cmManagedOrbit {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
      }

      @media (prefers-reduced-motion: reduce) {
        .cm-managed-effect-layer,
        .cm-managed-effect-layer::before,
        .cm-managed-effect-layer::after {
          animation: none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  async function loadManagedItems() {
    const url = new URL(API_URL);
    url.searchParams.set("action", "sectionVisuals");

    const response = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
      redirect: "follow"
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const result = await response.json();
    if (!result?.success || !Array.isArray(result?.data?.items)) {
      throw new Error(result?.message || "表示設定を取得できませんでした。");
    }

    managedItems = result.data.items;
    scheduleApply();
  }

  function setupObserver() {
    const observer = new MutationObserver(scheduleApply);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function setup() {
    addStyles();
    setupObserver();
    loadManagedItems().catch((error) => {
      console.warn("メニュー色・背景演出を取得できませんでした。", error);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup, { once: true });
  } else {
    setup();
  }

  window.addEventListener("hpmanageddataready", () => {
    loadManagedItems().catch(() => {});
  });
})();
