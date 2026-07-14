(() => {
  "use strict";

  const API_URL = "https://script.google.com/macros/s/AKfycbxuGAYkdygkpMsxFQvxmSdu2TnRs7svrudmgwDVOQg9YKIAa1T-Q-v5YmXOf4b5fQCSJw/exec";

  const DEFAULT_DATA = {
    hero: {
      eyebrow: "Customer Voice",
      title: "お客様の声から、\n選ばれる理由と\u200B改善点を視える化。",
      lead: "顧客満足は、商品やサービスの品質だけで決まりません。問い合わせ、案内、待ち時間、説明、接客、利用中の安心感、会計、アフターフォローまで、体験全体が再利用・継続・紹介・口コミに影響します。クロスメソッド™は、お客様の声を集め、顧客体験のどこに強みや課題があるかを視える化し、教育・業務・サービス改善へつなげます。",
      badge1: "飲食店",
      badge2: "ホテル",
      badge3: "介護・福祉",
      badge4: "一般企業"
    },
    sections: {
      difference: {
        title: "満足度だけでは、\n改善すべき接点までは\u200B分かりません。",
        lead: "「おいしいのに再来店が増えない」「クレームは少ないのに紹介されにくい」「スタッフは頑張っているのに評価が安定しない」。こうした状態は、体験のどこかに小さな違和感が残っている可能性があります。クロスメソッド™は、総合満足だけでは見えない接点ごとの声を整理します。"
      },
      scope: {
        title: "顧客体験は、\n利用前から利用後まで\u200Bつながっています。",
        lead: "業種が違っても、顧客体験は接点の連続でできています。まずは共通構造を押さえ、そのうえで業種ごとの動線へ落とし込みます。"
      },
      restaurant: {
        title: "飲食店を例に、\n店内体験の流れを\u200B見てみましょう。",
        lead: "飲食店は顧客体験の流れがイメージしやすく、改善テーマも見つけやすい代表例です。味の評価だけでなく、店内で起きている一連の体験を確認します。"
      },
      industries: {
        title: "ホテル・介護・一般企業にも、\n同じ考え方を\u200B応用できます。",
        lead: "代表例は飲食店ですが、顧客体験を接点ごとに見る考え方は、予約・受付・説明・利用・継続があるすべての業種に応用できます。"
      },
      signals: {
        title: "業種が違っても、\n確認すべき声には\u200B共通点があります。",
        lead: "以下の視点は、飲食店、ホテル、介護・福祉、一般企業のどれでも確認できます。"
      },
      improvement: {
        title: "お客様の声を、\n教育と業務改善へ。",
        lead: "一件の低評価を個人責任で終わらせず、接点を特定し、教育・連携・手順・説明資料・導線の改善テーマへ変換します。"
      },
      deliverables: {
        title: "声を集めた後に、\n整理されること",
        lead: "声を集めた後は、現場で使える形へ整えて返します。"
      },
      faq: {
        title: "よくある質問",
        lead: "初回相談でよくいただく質問をまとめています。"
      },
      cta: {
        title: "お客様の声を、\n改善のきっかけに変えたい方へ。",
        lead: "飲食店、ホテル、介護・福祉、一般企業まで。まずは、どの接点の声を確認したいかをご相談ください。",
        button1: "無料体験診断を見る",
        button2: "相談する"
      }
    },
    flows: {
      commonFlow: [],
      restaurantFlow: [],
      industryHotel: [],
      industryCare: [],
      industryBusiness: [],
      commonSignals: [],
      improvementFlow: [],
      deliverables: []
    },
    faq: []
  };

  const COMMON_PHASES = [
    {
      title: "知る・問い合わせる",
      indexes: [0, 1]
    },
    {
      title: "訪れる・説明を受ける",
      indexes: [2, 3]
    },
    {
      title: "利用する・手続きする",
      indexes: [4, 5]
    },
    {
      title: "利用後につながる",
      indexes: [6, 7]
    }
  ];

  const RESTAURANT_SCENES = [
    {
      label: "来店前",
      title: "検索・予約",
      indexes: [0],
      icon: "search"
    },
    {
      label: "第一印象",
      title: "入店・案内・着席",
      indexes: [1, 2],
      icon: "entrance"
    },
    {
      label: "注文から提供",
      title: "注文・待ち時間・料理提供",
      indexes: [3, 4, 5],
      icon: "order"
    },
    {
      label: "店内体験",
      title: "食事中対応・会計",
      indexes: [6, 7],
      icon: "dining"
    },
    {
      label: "利用後",
      title: "見送り・口コミ・再来店",
      indexes: [8, 9],
      icon: "review"
    }
  ];

  const INDUSTRY_ICONS = ["hotel", "care", "business"];

  function qs(selector) {
    return document.querySelector(selector);
  }

  function setText(selector, value) {
    const element = qs(selector);
    if (element) element.textContent = value || "";
  }

  function setTitle(selector, value) {
    const element = qs(selector);
    if (!element) return;

    element.innerHTML = "";

    String(value || "")
      .split("\n")
      .filter((line) => line !== "")
      .forEach((line) => {
        const span = document.createElement("span");
        span.className = "cv-title-line";
        span.textContent = line;
        element.appendChild(span);
      });
  }

  async function fetchData() {
    try {
      const url = new URL(API_URL);
      url.searchParams.set("action", "customerVoicePage");

      const response = await fetch(url.toString(), {
        method: "GET",
        cache: "no-store",
        redirect: "follow"
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const result = await response.json();
      if (!result?.success || !result?.data) {
        throw new Error(result?.message || "API error");
      }

      return mergeData(DEFAULT_DATA, result.data);
    } catch (error) {
      console.warn("customer-voice page fallback", error);
      return DEFAULT_DATA;
    }
  }

  function mergeData(base, incoming) {
    return {
      hero: Object.assign({}, base.hero, incoming.hero || {}),
      sections: Object.assign({}, base.sections, incoming.sections || {}),
      flows: Object.assign({}, base.flows, incoming.flows || {}),
      faq: Array.isArray(incoming.faq) && incoming.faq.length
        ? incoming.faq
        : base.faq
    };
  }

  function renderHero(data) {
    setText("#hero-eyebrow", data.hero.eyebrow);
    setTitle("#hero-title", data.hero.title);
    setText("#hero-lead", data.hero.lead);

    const badges = qs("#hero-badges");
    if (!badges) return;

    badges.innerHTML = "";

    [
      data.hero.badge1,
      data.hero.badge2,
      data.hero.badge3,
      data.hero.badge4
    ]
      .filter(Boolean)
      .forEach((label) => {
        const span = document.createElement("span");
        span.textContent = label;
        badges.appendChild(span);
      });
  }

  function renderSectionTitles(sections) {
    const fields = [
      "difference",
      "scope",
      "restaurant",
      "industries",
      "signals",
      "improvement",
      "deliverables",
      "faq",
      "cta"
    ];

    fields.forEach((key) => {
      setTitle(`#${key}-title`, sections[key]?.title);
      setText(`#${key}-lead`, sections[key]?.lead);
    });

    setText("#cta-button-1", sections.cta?.button1);
    setText("#cta-button-2", sections.cta?.button2);
  }

  function renderCommonFlow(items) {
    const wrap = qs("#common-flow-list");
    if (!wrap) return;

    wrap.innerHTML = "";

    COMMON_PHASES.forEach((phase, phaseIndex) => {
      const article = document.createElement("article");
      article.className = "cv-phase-card";

      const details = phase.indexes
        .map((index) => items[index])
        .filter(Boolean);

      article.innerHTML = `
        <div class="cv-phase-number">0${phaseIndex + 1}</div>
        <h3>${escapeHtml(phase.title)}</h3>
        <ul>
          ${details
            .map((item) => `
              <li>
                <strong>${escapeHtml(item.label || "")}</strong>
                ${escapeHtml(item.text || "")}
              </li>
            `)
            .join("")}
        </ul>
      `;

      wrap.appendChild(article);
    });
  }

  function renderRestaurantFlow(items) {
    const wrap = qs("#restaurant-flow-list");
    if (!wrap) return;

    wrap.innerHTML = "";

    RESTAURANT_SCENES.forEach((scene) => {
      const details = scene.indexes
        .map((index) => items[index])
        .filter(Boolean);

      const article = document.createElement("article");
      article.className = "cv-scene-card";
      article.innerHTML = `
        <div class="cv-scene-visual" aria-hidden="true">
          ${sceneSvg(scene.icon)}
        </div>
        <span class="cv-scene-label">${escapeHtml(scene.label)}</span>
        <h3>${escapeHtml(scene.title)}</h3>
        <ul>
          ${details
            .map((item) => `
              <li>
                <strong>${escapeHtml(item.scene || "")}</strong>
                ${escapeHtml(item.voice || "")}
              </li>
            `)
            .join("")}
        </ul>
      `;

      wrap.appendChild(article);
    });
  }

  function renderIndustryExamples(flows) {
    const wrap = qs("#industry-example-list");
    if (!wrap) return;

    const groups = []
      .concat(flows.industryHotel || [])
      .concat(flows.industryCare || [])
      .concat(flows.industryBusiness || []);

    wrap.innerHTML = "";

    groups.forEach((item, index) => {
      const article = document.createElement("article");
      article.className = "cv-industry-card";
      article.innerHTML = `
        <div class="cv-industry-icon" aria-hidden="true">
          ${industrySvg(INDUSTRY_ICONS[index] || "business")}
        </div>
        <h3>${escapeHtml(item.label || "")}</h3>
        <p>${escapeHtml(item.text || "")}</p>
      `;

      wrap.appendChild(article);
    });
  }

  function renderSignalList(items) {
    const wrap = qs("#common-signal-list");
    if (!wrap) return;

    wrap.innerHTML = "";

    (items || []).forEach((item) => {
      const article = document.createElement("article");
      article.className = "cv-signal-card";
      article.innerHTML = `
        <span aria-hidden="true"></span>
        <h3>${escapeHtml(item.label || "")}</h3>
        <p>${escapeHtml(item.text || "")}</p>
      `;
      wrap.appendChild(article);
    });
  }

  function renderImprovementFlow(items) {
    const wrap = qs("#improvement-flow-list");
    if (!wrap) return;

    wrap.innerHTML = "";

    (items || []).forEach((item, index) => {
      const article = document.createElement("article");
      article.className = "cv-process-card";
      article.innerHTML = `
        <div class="cv-process-number">0${index + 1}</div>
        <h3>${escapeHtml(item.label || "")}</h3>
        <p>${escapeHtml(item.text || "")}</p>
      `;
      wrap.appendChild(article);
    });
  }

  function renderDeliverables(items) {
    const wrap = qs("#deliverable-list");
    if (!wrap) return;

    wrap.innerHTML = "";

    (items || []).forEach((item) => {
      const article = document.createElement("article");
      article.className = "cv-deliverable-card";
      article.innerHTML = `
        <h3>${escapeHtml(item.label || "")}</h3>
        <p>${escapeHtml(item.text || "")}</p>
      `;
      wrap.appendChild(article);
    });
  }

  function renderFaq(items) {
    const wrap = qs("#faq-list");
    if (!wrap) return;

    wrap.innerHTML = "";

    (items || []).forEach((item, index) => {
      const article = document.createElement("article");
      article.className = "cv-faq-item";
      article.innerHTML = `
        <button
          type="button"
          aria-expanded="false"
          aria-controls="cv-faq-answer-${index}"
        >
          Q. ${escapeHtml(item.q || "")}
        </button>
        <div class="cv-faq-answer" id="cv-faq-answer-${index}">
          <p>A. ${escapeHtml(item.a || "")}</p>
        </div>
      `;

      const button = article.querySelector("button");
      button.addEventListener("click", () => {
        const open = article.classList.toggle("is-open");
        button.setAttribute("aria-expanded", open ? "true" : "false");
      });

      wrap.appendChild(article);
    });
  }

  function sceneSvg(type) {
    const icons = {
      search: `
        <svg viewBox="0 0 120 120">
          <rect x="26" y="14" width="68" height="92" rx="12"/>
          <path d="M40 34h40M40 48h24"/>
          <circle cx="71" cy="76" r="15"/>
          <path d="m82 87 13 13"/>
          <circle cx="47" cy="76" r="4"/>
        </svg>
      `,
      entrance: `
        <svg viewBox="0 0 120 120">
          <path d="M24 102V20h50v82"/>
          <path d="M36 102V32h27v70"/>
          <circle cx="57" cy="67" r="3"/>
          <path d="M80 102V54h22v48"/>
          <path d="M82 54h18M90 54V43"/>
          <path d="M17 102h92"/>
        </svg>
      `,
      order: `
        <svg viewBox="0 0 120 120">
          <rect x="18" y="18" width="42" height="72" rx="8"/>
          <path d="M29 35h20M29 48h15M29 62h20"/>
          <path d="M69 81h36"/>
          <path d="M75 81c1-22 8-34 18-34s17 12 18 34"/>
          <path d="M72 88h42"/>
          <circle cx="91" cy="35" r="9"/>
          <path d="M91 27v9l6 4"/>
        </svg>
      `,
      dining: `
        <svg viewBox="0 0 120 120">
          <path d="M20 62h80"/>
          <path d="M28 62v40M92 62v40"/>
          <circle cx="42" cy="39" r="13"/>
          <circle cx="78" cy="39" r="13"/>
          <path d="M40 52v10M80 52v10"/>
          <rect x="49" y="70" width="22" height="14" rx="3"/>
          <path d="M55 77h10"/>
        </svg>
      `,
      review: `
        <svg viewBox="0 0 120 120">
          <path d="M17 24h70v50H46L27 92V74H17z"/>
          <path d="M32 42h38M32 56h24"/>
          <path d="m92 21 4 8 9 1-7 7 2 9-8-4-8 4 2-9-7-7 9-1z"/>
          <path d="M83 78h20M93 68v20"/>
        </svg>
      `
    };

    return icons[type] || icons.search;
  }

  function industrySvg(type) {
    const icons = {
      hotel: `
        <svg viewBox="0 0 64 64">
          <path d="M10 54V16h44v38"/>
          <path d="M18 25h8v8h-8zM38 25h8v8h-8zM18 39h8v8h-8zM38 39h8v8h-8z"/>
          <path d="M7 54h50"/>
        </svg>
      `,
      care: `
        <svg viewBox="0 0 64 64">
          <path d="M32 54C22 45 12 38 12 27c0-7 5-12 12-12 4 0 7 2 8 5 2-3 5-5 9-5 7 0 12 5 12 12 0 11-10 18-21 27z"/>
          <path d="M32 25v15M24 32h16"/>
        </svg>
      `,
      business: `
        <svg viewBox="0 0 64 64">
          <rect x="9" y="18" width="46" height="34" rx="5"/>
          <path d="M23 18v-6h18v6M9 31h46"/>
          <path d="M27 29h10v6H27z"/>
        </svg>
      `
    };

    return icons[type] || icons.business;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  async function setup() {
    const data = await fetchData();

    renderHero(data);
    renderSectionTitles(data.sections || {});
    renderCommonFlow(data.flows?.commonFlow || []);
    renderRestaurantFlow(data.flows?.restaurantFlow || []);
    renderIndustryExamples(data.flows || {});
    renderSignalList(data.flows?.commonSignals || []);
    renderImprovementFlow(data.flows?.improvementFlow || []);
    renderDeliverables(data.flows?.deliverables || []);
    renderFaq(data.faq || []);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup, { once: true });
  } else {
    setup();
  }
})();
