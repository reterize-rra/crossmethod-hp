(() => {
  "use strict";

  const EFFECTS = new Set([
    "hero",
    "news",
    "graph",
    "trial",
    "chat",
    "voice",
    "services",
    "diagnostics",
    "connections",
    "food",
    "certification",
    "flow",
    "rooms",
    "faq",
    "contact"
  ]);

  const SVG = {
    radar: `
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <polygon points="60,8 102,34 94,86 60,110 20,86 14,36" />
        <polygon points="60,25 86,42 82,75 60,92 34,76 30,44" />
        <polyline points="60,8 60,110" />
        <polyline points="14,36 102,34" />
        <polyline points="20,86 94,86" />
      </svg>
    `,
    bars: `
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <line x1="18" y1="98" x2="104" y2="98" />
        <rect x="24" y="63" width="12" height="35" rx="3" />
        <rect x="46" y="44" width="12" height="54" rx="3" />
        <rect x="68" y="28" width="12" height="70" rx="3" />
        <rect x="90" y="52" width="12" height="46" rx="3" />
      </svg>
    `,
    line: `
      <svg viewBox="0 0 140 100" aria-hidden="true">
        <line x1="14" y1="82" x2="126" y2="82" />
        <line x1="14" y1="18" x2="14" y2="82" />
        <polyline points="18,70 42,58 62,64 84,38 106,46 124,24" />
        <circle cx="42" cy="58" r="4" />
        <circle cx="84" cy="38" r="4" />
        <circle cx="124" cy="24" r="4" />
      </svg>
    `,
    orbit: `
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="18" />
        <ellipse cx="60" cy="60" rx="48" ry="22" />
        <ellipse cx="60" cy="60" rx="48" ry="22" transform="rotate(60 60 60)" />
        <ellipse cx="60" cy="60" rx="48" ry="22" transform="rotate(120 60 60)" />
        <circle cx="102" cy="58" r="5" />
        <circle cx="34" cy="26" r="5" />
        <circle cx="38" cy="94" r="5" />
      </svg>
    `,
    cards: `
      <svg viewBox="0 0 130 110" aria-hidden="true">
        <rect x="15" y="20" width="58" height="42" rx="10" />
        <rect x="54" y="48" width="58" height="42" rx="10" />
        <line x1="28" y1="34" x2="56" y2="34" />
        <line x1="28" y1="46" x2="46" y2="46" />
        <line x1="68" y1="63" x2="96" y2="63" />
        <line x1="68" y1="75" x2="88" y2="75" />
      </svg>
    `,
    rings: `
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="48" />
        <circle cx="60" cy="60" r="31" />
        <circle cx="60" cy="60" r="15" />
        <path d="M60 12 A48 48 0 0 1 101 84" />
      </svg>
    `,
    dots: `
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="24" cy="24" r="5" />
        <circle cx="52" cy="18" r="4" />
        <circle cx="78" cy="31" r="6" />
        <circle cx="99" cy="18" r="4" />
        <circle cx="30" cy="63" r="4" />
        <circle cx="60" cy="57" r="6" />
        <circle cx="94" cy="68" r="5" />
        <circle cx="18" cy="96" r="6" />
        <circle cx="55" cy="94" r="4" />
        <circle cx="99" cy="99" r="6" />
      </svg>
    `,
    leaf: `
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <path d="M22 90 C25 42 54 17 99 20 C96 66 69 97 22 90 Z" />
        <path d="M28 84 C49 64 68 48 92 29" />
        <path d="M48 67 C39 59 34 49 33 38" />
        <path d="M65 52 C72 61 78 72 78 83" />
      </svg>
    `,
    portal: `
      <svg viewBox="0 0 130 120" aria-hidden="true">
        <rect x="25" y="14" width="80" height="94" rx="8" />
        <rect x="40" y="29" width="50" height="79" rx="5" />
        <circle cx="80" cy="69" r="4" />
        <path d="M40 108 L20 118" />
        <path d="M90 108 L112 118" />
      </svg>
    `
  };

  const EFFECT_SHAPES = {
    hero: ["radar", "rings", "dots"],
    news: ["cards", "dots", "line"],
    graph: ["bars", "line", "radar"],
    trial: ["rings", "cards", "dots"],
    chat: ["cards", "dots", "rings"],
    voice: ["rings", "line", "dots"],
    services: ["cards", "bars", "dots"],
    diagnostics: ["radar", "orbit", "rings"],
    connections: ["orbit", "cards", "dots"],
    food: ["leaf", "rings", "dots"],
    certification: ["rings", "radar", "dots"],
    flow: ["line", "orbit", "dots"],
    rooms: ["portal", "orbit", "dots"],
    faq: ["cards", "rings", "dots"],
    contact: ["orbit", "line", "dots"]
  };

  let refreshTimer = 0;

  function addStyles() {
    if (document.getElementById("crossmethod-section-ambient-style")) return;

    const style = document.createElement("style");
    style.id = "crossmethod-section-ambient-style";
    style.textContent = `
      section[data-managed-background] {
        position: relative;
        isolation: isolate;
      }

      .cm-section-ambient {
        position: absolute;
        inset: 0;
        z-index: 1;
        overflow: hidden;
        pointer-events: none;
      }

      section[data-managed-background] > .container,
      section[data-managed-background] > .section-pad,
      section[data-managed-background] > .room-experience {
        position: relative;
        z-index: 2;
      }

      .cm-ambient-shape {
        position: absolute;
        display: block;
        opacity: .52;
        filter: drop-shadow(0 10px 24px rgba(13,61,82,.05));
        transform-origin: center;
      }

      .cm-ambient-shape svg {
        width: 100%;
        height: 100%;
        display: block;
        overflow: visible;
      }

      .cm-ambient-shape svg * {
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        vector-effect: non-scaling-stroke;
      }

      .cm-ambient-shape svg rect,
      .cm-ambient-shape svg circle {
        fill: rgba(255,255,255,.08);
      }

      .cm-ambient-left {
        left: max(12px, calc((100vw - 1440px) / 2));
      }

      .cm-ambient-right {
        right: max(12px, calc((100vw - 1440px) / 2));
      }

      .cm-ambient-one {
        top: 9%;
        width: clamp(72px, 7vw, 118px);
        height: clamp(72px, 7vw, 118px);
        color: rgba(33,155,194,.34);
        animation: cmAmbientFloatOne 8.5s ease-in-out infinite alternate;
      }

      .cm-ambient-two {
        bottom: 8%;
        width: clamp(84px, 8vw, 136px);
        height: clamp(84px, 8vw, 136px);
        color: rgba(89,180,111,.30);
        animation: cmAmbientFloatTwo 10s ease-in-out infinite alternate;
      }

      .cm-ambient-three {
        top: 24%;
        width: clamp(76px, 6.4vw, 110px);
        height: clamp(76px, 6.4vw, 110px);
        color: rgba(221,158,57,.28);
        animation: cmAmbientPulse 7.5s ease-in-out infinite;
      }

      .cm-ambient-four {
        bottom: 14%;
        width: clamp(78px, 7vw, 120px);
        height: clamp(78px, 7vw, 120px);
        color: rgba(125,94,181,.24);
        animation: cmAmbientDrift 12s ease-in-out infinite alternate;
      }

      .cm-ambient-dots {
        position: absolute;
        width: 92px;
        height: 26px;
        opacity: .56;
      }

      .cm-ambient-dots::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at 8px 13px, currentColor 0 4px, transparent 5px),
          radial-gradient(circle at 33px 10px, currentColor 0 3px, transparent 4px),
          radial-gradient(circle at 58px 7px, currentColor 0 4px, transparent 5px),
          radial-gradient(circle at 84px 4px, currentColor 0 3px, transparent 4px);
      }

      .cm-ambient-dots-left {
        left: max(18px, calc((100vw - 1440px) / 2 + 10px));
        top: 42%;
        color: rgba(33,155,194,.24);
        animation: cmAmbientDots 9s ease-in-out infinite alternate;
      }

      .cm-ambient-dots-right {
        right: max(18px, calc((100vw - 1440px) / 2 + 10px));
        top: 18%;
        color: rgba(221,158,57,.25);
        animation: cmAmbientDots 11s ease-in-out infinite alternate-reverse;
      }

      section[data-managed-background="food"] .cm-ambient-shape {
        color: rgba(73,166,86,.30);
      }

      section[data-managed-background="certification"] .cm-ambient-shape,
      section[data-managed-background="faq"] .cm-ambient-shape {
        color: rgba(207,150,38,.28);
      }

      section[data-managed-background="rooms"] .cm-ambient-one,
      section[data-managed-background="rooms"] .cm-ambient-three {
        color: rgba(35,160,196,.32);
      }

      section[data-managed-background="contact"] .cm-ambient-shape {
        color: rgba(255,255,255,.20);
      }

      @keyframes cmAmbientFloatOne {
        from { transform: translate3d(0,0,0) rotate(-6deg) scale(.95); }
        to { transform: translate3d(14px,20px,0) rotate(10deg) scale(1.05); }
      }

      @keyframes cmAmbientFloatTwo {
        from { transform: translate3d(0,0,0) rotate(8deg) scale(.92); }
        to { transform: translate3d(-18px,-14px,0) rotate(-8deg) scale(1.06); }
      }

      @keyframes cmAmbientPulse {
        0%,100% { transform: scale(.90) rotate(-5deg); opacity: .34; }
        50% { transform: scale(1.08) rotate(7deg); opacity: .64; }
      }

      @keyframes cmAmbientDrift {
        from { transform: translate3d(0,0,0) rotate(-10deg); }
        to { transform: translate3d(-20px,16px,0) rotate(11deg); }
      }

      @keyframes cmAmbientDots {
        from { transform: translateX(0); opacity: .32; }
        to { transform: translateX(20px); opacity: .72; }
      }

      @media (max-width: 1280px) {
        .cm-section-ambient {
          opacity: .55;
        }

        .cm-ambient-shape {
          transform: scale(.82);
        }
      }

      @media (max-width: 1024px) {
        .cm-section-ambient {
          display: none;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .cm-ambient-shape,
        .cm-ambient-dots {
          animation: none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function createShape(name, className) {
    const span = document.createElement("span");
    span.className = `cm-ambient-shape ${className}`;
    span.setAttribute("aria-hidden", "true");
    span.innerHTML = SVG[name] || SVG.rings;
    return span;
  }

  function createDots(className) {
    const span = document.createElement("span");
    span.className = `cm-ambient-dots ${className}`;
    span.setAttribute("aria-hidden", "true");
    return span;
  }

  function buildAmbient(section, effect) {
    const current = section.querySelector(":scope > .cm-section-ambient");

    if (!EFFECTS.has(effect)) {
      if (current) current.remove();
      return;
    }

    if (current && current.dataset.effect === effect) return;
    if (current) current.remove();

    const shapes = EFFECT_SHAPES[effect] || EFFECT_SHAPES.graph;
    const layer = document.createElement("span");
    layer.className = "cm-section-ambient";
    layer.dataset.effect = effect;
    layer.setAttribute("aria-hidden", "true");

    layer.appendChild(createShape(shapes[0], "cm-ambient-left cm-ambient-one"));
    layer.appendChild(createShape(shapes[1], "cm-ambient-right cm-ambient-two"));
    layer.appendChild(createShape(shapes[2], "cm-ambient-left cm-ambient-three"));
    layer.appendChild(createShape(shapes[0], "cm-ambient-right cm-ambient-four"));
    layer.appendChild(createDots("cm-ambient-dots-left"));
    layer.appendChild(createDots("cm-ambient-dots-right"));

    section.insertBefore(layer, section.firstChild);
  }

  function sync() {
    document.querySelectorAll("section").forEach((section) => {
      const effect = String(section.dataset.managedBackground || "").trim();
      buildAmbient(section, effect);
    });
  }

  function scheduleSync() {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(sync, 60);
  }

  function setupObserver() {
    const observer = new MutationObserver((mutations) => {
      const needsSync = mutations.some((mutation) => {
        if (mutation.type === "childList") return true;
        return mutation.type === "attributes" &&
          mutation.attributeName === "data-managed-background";
      });

      if (needsSync) scheduleSync();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-managed-background"]
    });
  }

  function setup() {
    addStyles();
    setupObserver();
    sync();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup, { once: true });
  } else {
    setup();
  }

  window.addEventListener("hpmanageddataready", scheduleSync);
})();