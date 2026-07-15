(() => {
  "use strict";

  const API_URL = "https://script.google.com/macros/s/AKfycbxuGAYkdygkpMsxFQvxmSdu2TnRs7svrudmgwDVOQg9YKIAa1T-Q-v5YmXOf4b5fQCSJw/exec";
  const DEFAULT_DATA = {
  "hero": {
    "eyebrow": "Stress Check",
    "title": "ストレスチェックを、\n実施して終わらせない。\n安心して働ける職場へ。",
    "lead": "ストレスチェック制度は、労働者自身がストレス状態に気づき、必要な支援につながることと、職場環境の改善を進めることを目的とした制度です。法令対応に必要な体制、実施の流れ、個人情報の取扱い、面接指導、集団分析まで、導入前に整理しておくことが重要です。",
    "badge1": "法令対応",
    "badge2": "個人情報保護",
    "badge3": "面接指導",
    "badge4": "集団分析・職場改善"
  },
  "sections": {
    "obligation": {
      "title": "2028年4月1日から、\n50人未満の事業場にも\nストレスチェックが義務化されます。",
      "lead": "2026年7月現在、労働者数50人以上の事業場では実施義務があり、50人未満の事業場は移行準備の段階です。制度開始直前に慌てないよう、実施者、個人情報、面接指導、周知方法などを早めに確認します。"
    },
    "purpose": {
      "title": "ストレスチェックは、\n病気を診断する検査ではありません。",
      "lead": "本人の気づきとセルフケアを促し、高ストレス者への面接指導や職場環境の改善へつなげるための仕組みです。"
    },
    "difference": {
      "title": "法定ストレスチェックと、\n組織診断は別の仕組みです。",
      "lead": "クロスメソッド™を含む組織診断を実施しても、それだけで法定ストレスチェックの要件を満たすものではありません。このページでは、法定制度としてのストレスチェック導入支援を案内します。"
    },
    "flow": {
      "title": "導入から実施後まで、\n必要な流れを整理します。",
      "lead": "質問票を配布するだけではなく、役割決定、結果通知、面接指導、記録、職場改善までを一つの運用として設計します。"
    },
    "roles": {
      "title": "誰が何を担うのかを、\n実施前に決めておきます。",
      "lead": "事業者、実施者、実施事務従事者、面接指導を行う医師、外部機関など、それぞれの役割と情報の閲覧範囲を明確にします。"
    },
    "privacy": {
      "title": "個人結果を、\n人事評価の材料にしない仕組みが必要です。",
      "lead": "個人結果は慎重に扱い、閲覧者、保存方法、本人同意、相談導線を明確にします。受検や面接指導の申出を理由とする不利益な取扱いを防ぐ運用も必要です。"
    },
    "interview": {
      "title": "高ストレスと判定された後の、\n面接指導への導線を整えます。",
      "lead": "結果を通知するだけでなく、申出方法、医師との調整、就業上の措置を検討する流れまで準備しておきます。"
    },
    "group": {
      "title": "集団分析は、\n個人を探すためではなく、\n職場の傾向を整えるために使います。",
      "lead": "部署や職場単位の傾向を確認し、業務量、裁量、上司・同僚の支援など、職場環境の改善テーマへつなげます。"
    },
    "support": {
      "title": "制度導入に必要な準備を、\n順番に支援します。",
      "lead": "初めて実施する事業場も、現在の運用を見直したい事業場も、必要な部分から整理できます。"
    },
    "faq": {
      "title": "よくある質問",
      "lead": "制度の対象、実施方法、個人情報、面接指導について、よくいただく質問をまとめています。"
    },
    "cta": {
      "title": "ストレスチェックの導入準備を、\n今から始めませんか。",
      "lead": "事業場の規模、実施時期、現在の体制を確認し、必要な準備と支援範囲を整理します。",
      "button1": "ストレスチェック導入を申し込む",
      "button2": "健康経営支援を見る"
    }
  },
  "cards": {
    "purpose": [
      {
        "order": 1,
        "title": "本人の気づき",
        "text": "自分のストレス状態を知り、セルフケアや相談につなげます。",
        "icon": "awareness",
        "tone": "blue"
      },
      {
        "order": 2,
        "title": "面接指導への接続",
        "text": "高ストレス者が希望した場合に、医師の面接指導へつなげます。",
        "icon": "doctor",
        "tone": "purple"
      },
      {
        "order": 3,
        "title": "職場環境の改善",
        "text": "集団の傾向を確認し、働き方や職場環境を見直す材料にします。",
        "icon": "workplace",
        "tone": "green"
      }
    ],
    "flow": [
      {
        "order": 1,
        "title": "方針・体制決定",
        "text": "実施目的、時期、対象者、実施者、事務担当者を決めます。",
        "icon": "policy",
        "tone": "blue"
      },
      {
        "order": 2,
        "title": "労働者への周知",
        "text": "制度の目的、個人情報、受検方法、相談先を事前に伝えます。",
        "icon": "notice",
        "tone": "aqua"
      },
      {
        "order": 3,
        "title": "質問票の実施",
        "text": "紙またはWeb等で、対象者が回答できる環境を整えます。",
        "icon": "questionnaire",
        "tone": "purple"
      },
      {
        "order": 4,
        "title": "個人結果の通知",
        "text": "結果は本人へ適切に通知し、セルフケア情報を案内します。",
        "icon": "result",
        "tone": "green"
      },
      {
        "order": 5,
        "title": "面接指導",
        "text": "該当者から申出があった場合、医師の面接指導へつなげます。",
        "icon": "doctor",
        "tone": "coral"
      },
      {
        "order": 6,
        "title": "集団分析・改善",
        "text": "職場単位の傾向を確認し、必要な職場改善を検討します。",
        "icon": "analysis",
        "tone": "gold"
      },
      {
        "order": 7,
        "title": "記録・次年度準備",
        "text": "実施記録と課題を整理し、次年度の運用改善へつなげます。",
        "icon": "record",
        "tone": "navy"
      }
    ],
    "roles": [
      {
        "order": 1,
        "title": "事業者",
        "text": "実施方針、体制、就業上の措置、職場改善を判断します。",
        "icon": "company",
        "tone": "blue"
      },
      {
        "order": 2,
        "title": "実施者",
        "text": "制度に基づき、評価や高ストレス者の選定等を担います。",
        "icon": "implementer",
        "tone": "aqua"
      },
      {
        "order": 3,
        "title": "実施事務従事者",
        "text": "実施者の指示のもとで、回答回収や結果管理等を補助します。",
        "icon": "admin",
        "tone": "purple"
      },
      {
        "order": 4,
        "title": "面接指導を行う医師",
        "text": "申出のあった労働者へ面接指導を行い、必要な意見を述べます。",
        "icon": "doctor",
        "tone": "coral"
      },
      {
        "order": 5,
        "title": "外部実施機関",
        "text": "質問票、システム、結果通知、運用支援等を提供します。",
        "icon": "vendor",
        "tone": "green"
      }
    ],
    "privacy": [
      {
        "order": 1,
        "title": "個人結果は本人へ",
        "text": "結果の通知経路と閲覧権限を明確にします。",
        "icon": "personal",
        "tone": "blue"
      },
      {
        "order": 2,
        "title": "本人同意の確認",
        "text": "事業者が個人結果を取得する場合の同意手続きを整えます。",
        "icon": "consent",
        "tone": "aqua"
      },
      {
        "order": 3,
        "title": "閲覧者を限定",
        "text": "人事権を持つ立場との分離や、担当者の守秘を確認します。",
        "icon": "lock",
        "tone": "purple"
      },
      {
        "order": 4,
        "title": "不利益取扱いを防ぐ",
        "text": "受検結果や面接指導の申出を理由とする不利益を防止します。",
        "icon": "protect",
        "tone": "green"
      }
    ],
    "support": [
      {
        "order": 1,
        "title": "導入スケジュール設計",
        "text": "社内調整、周知、実施、結果通知までの日程を整理します。",
        "icon": "calendar",
        "tone": "blue"
      },
      {
        "order": 2,
        "title": "実施体制の整理",
        "text": "実施者、事務担当者、医師、外部機関の役割を整理します。",
        "icon": "team",
        "tone": "aqua"
      },
      {
        "order": 3,
        "title": "実施方法の選定",
        "text": "紙・Web、対象者管理、未受検者への案内方法を検討します。",
        "icon": "select",
        "tone": "purple"
      },
      {
        "order": 4,
        "title": "社内周知文の準備",
        "text": "目的、個人情報、受検方法、相談先を分かりやすく案内します。",
        "icon": "notice",
        "tone": "green"
      },
      {
        "order": 5,
        "title": "面接指導導線の整備",
        "text": "申出窓口、医師との日程調整、記録方法を整理します。",
        "icon": "doctor",
        "tone": "coral"
      },
      {
        "order": 6,
        "title": "集団分析の活用",
        "text": "分析結果の読み方と、職場改善への進め方を整理します。",
        "icon": "analysis",
        "tone": "gold"
      }
    ]
  },
  "faq": [
    {
      "q": "50人未満の事業場は、いつから義務になりますか？",
      "a": "厚生労働省は、2028年4月1日から労働者数50人未満の事業場にもストレスチェックが義務化されると案内しています。準備時期や最新の要件は公式情報をご確認ください。"
    },
    {
      "q": "ストレスチェックは病気の診断ですか？",
      "a": "病気を診断する検査ではありません。本人のストレスへの気づき、高ストレス者への面接指導、職場環境改善へつなげる制度です。"
    },
    {
      "q": "会社は個人の結果を見ることができますか？",
      "a": "個人結果の取扱いには厳格な配慮が必要です。本人同意、閲覧権限、保存方法などを実施前に整理します。"
    },
    {
      "q": "高ストレス者と判定されたら、必ず医師面接を受けますか？",
      "a": "面接指導の対象となった労働者が申出を行った場合に、事業者が医師による面接指導を実施する流れを整えます。"
    },
    {
      "q": "集団分析は何のために行いますか？",
      "a": "部署や職場のストレス傾向を確認し、業務量、裁量、職場の支援など、職場環境改善の検討材料にします。"
    },
    {
      "q": "クロスメソッド™の診断で代用できますか？",
      "a": "代用できません。クロスメソッド™を含む組織診断と、労働安全衛生法に基づくストレスチェック制度は別の仕組みです。"
    },
    {
      "q": "初めての実施でも相談できますか？",
      "a": "相談できます。対象者、実施者、質問票、個人情報、面接指導、集団分析まで、必要な準備を順番に整理します。"
    }
  ]
};
  const ICONS = {"awareness": "<svg viewBox=\"0 0 64 64\"><path d=\"M18 49c-5-4-8-10-7-17 1-12 10-21 22-21s21 9 21 21c0 7-3 13-9 17\"/><path d=\"M25 28h16M24 38c3 3 6 5 9 5s6-2 9-5\"/></svg>", "doctor": "<svg viewBox=\"0 0 64 64\"><circle cx=\"24\" cy=\"20\" r=\"8\"/><path d=\"M10 51c1-14 7-22 14-22s13 8 14 22\"/><path d=\"M43 14h12v32H43zM46 24h6M46 32h6\"/></svg>", "workplace": "<svg viewBox=\"0 0 64 64\"><path d=\"M9 52V18h46v34\"/><path d=\"M17 27h8v8h-8zM39 27h8v8h-8z\"/><path d=\"M24 52V41h16v11M6 52h52\"/></svg>", "policy": "<svg viewBox=\"0 0 64 64\"><path d=\"M14 10h36v44H14z\"/><path d=\"M22 22h20M22 31h20M22 40h13\"/><path d=\"m37 46 5 5 9-11\"/></svg>", "notice": "<svg viewBox=\"0 0 64 64\"><path d=\"M11 14h42v30H29L18 54V44h-7z\"/><path d=\"M21 27h22M21 35h15\"/></svg>", "questionnaire": "<svg viewBox=\"0 0 64 64\"><rect x=\"13\" y=\"10\" width=\"38\" height=\"44\" rx=\"7\"/><path d=\"M22 23h20M22 32h12M22 41h16\"/><path d=\"m39 43 4 4 8-10\"/></svg>", "result": "<svg viewBox=\"0 0 64 64\"><path d=\"M13 50h38\"/><rect x=\"17\" y=\"33\" width=\"7\" height=\"17\" rx=\"2\"/><rect x=\"29\" y=\"23\" width=\"7\" height=\"27\" rx=\"2\"/><rect x=\"41\" y=\"14\" width=\"7\" height=\"36\" rx=\"2\"/></svg>", "analysis": "<svg viewBox=\"0 0 64 64\"><circle cx=\"27\" cy=\"27\" r=\"16\"/><path d=\"m40 40 14 14M19 32l7-8 6 5 8-10\"/></svg>", "record": "<svg viewBox=\"0 0 64 64\"><path d=\"M14 10h28l8 8v36H14z\"/><path d=\"M42 10v10h10M22 31h20M22 40h20\"/></svg>", "company": "<svg viewBox=\"0 0 64 64\"><path d=\"M9 52V18h46v34\"/><path d=\"M18 26h7v7h-7zM39 26h7v7h-7zM24 52V40h16v12M6 52h52\"/></svg>", "implementer": "<svg viewBox=\"0 0 64 64\"><circle cx=\"32\" cy=\"19\" r=\"9\"/><path d=\"M16 52c1-14 7-22 16-22s15 8 16 22\"/><path d=\"M24 40h16M32 32v16\"/></svg>", "admin": "<svg viewBox=\"0 0 64 64\"><path d=\"M13 12h38v40H13z\"/><path d=\"M22 23h20M22 32h14M22 41h18\"/><circle cx=\"46\" cy=\"46\" r=\"5\"/></svg>", "vendor": "<svg viewBox=\"0 0 64 64\"><rect x=\"9\" y=\"14\" width=\"46\" height=\"34\" rx=\"5\"/><path d=\"M16 48v6M48 48v6M7 54h50\"/><path d=\"M22 26h20M22 35h13\"/></svg>", "personal": "<svg viewBox=\"0 0 64 64\"><circle cx=\"32\" cy=\"19\" r=\"9\"/><path d=\"M16 52c1-14 7-22 16-22s15 8 16 22\"/><path d=\"M45 37h10v14H45z\"/></svg>", "consent": "<svg viewBox=\"0 0 64 64\"><rect x=\"11\" y=\"11\" width=\"42\" height=\"42\" rx=\"8\"/><path d=\"m20 32 8 8 17-19\"/></svg>", "lock": "<svg viewBox=\"0 0 64 64\"><rect x=\"12\" y=\"27\" width=\"40\" height=\"28\" rx=\"6\"/><path d=\"M21 27v-8c0-7 5-12 11-12s11 5 11 12v8\"/><circle cx=\"32\" cy=\"40\" r=\"4\"/></svg>", "protect": "<svg viewBox=\"0 0 64 64\"><path d=\"M32 8 52 16v15c0 13-8 21-20 27C20 52 12 44 12 31V16z\"/><path d=\"m22 32 7 7 14-16\"/></svg>", "calendar": "<svg viewBox=\"0 0 64 64\"><rect x=\"10\" y=\"15\" width=\"44\" height=\"39\" rx=\"6\"/><path d=\"M10 26h44M20 9v12M44 9v12\"/><path d=\"M20 35h7M33 35h7M20 44h7\"/></svg>", "team": "<svg viewBox=\"0 0 64 64\"><circle cx=\"22\" cy=\"21\" r=\"8\"/><circle cx=\"43\" cy=\"21\" r=\"8\"/><path d=\"M9 52c1-13 6-20 13-20s12 7 13 20M30 52c1-13 6-20 13-20s12 7 13 20\"/></svg>", "select": "<svg viewBox=\"0 0 64 64\"><rect x=\"10\" y=\"10\" width=\"44\" height=\"44\" rx=\"8\"/><path d=\"m20 32 8 8 17-19\"/></svg>"};
  const BRAND_PATTERN = /クロスメソッド™︎?/g;
  const BRAND_NAME = "クロスメソッド™";
  const $ = (selector) => document.querySelector(selector);

  const MOBILE_TITLES = {
    "#hero-title": [
      "ストレスチェックを、",
      "実施して終わらせない。",
      "安心して働ける",
      "職場へ。"
    ],
    "#obligation-title": [
      "2028年4月1日から、",
      "50人未満の事業場にも",
      "ストレスチェックが",
      "義務化されます。"
    ],
    "#purpose-title": [
      "ストレスチェックは、",
      "病気を診断する",
      "検査ではありません。"
    ],
    "#difference-title": [
      "法定ストレスチェックと、",
      "組織診断は",
      "別の仕組みです。"
    ],
    "#flow-title": [
      "導入から実施後まで、",
      "必要な流れを整理します。"
    ],
    "#roles-title": [
      "誰が何を担うのかを、",
      "実施前に決めておきます。"
    ],
    "#privacy-title": [
      "個人結果を、",
      "人事評価の材料にしない",
      "仕組みが必要です。"
    ],
    "#interview-title": [
      "高ストレスと",
      "判定された後の、",
      "面接指導への導線を",
      "整えます。"
    ],
    "#group-title": [
      "集団分析は、",
      "個人を探すためではなく、",
      "職場の傾向を整えるために",
      "使います。"
    ],
    "#support-title": [
      "制度導入に必要な準備を、",
      "順番に支援します。"
    ],
    "#faq-title": [
      "よくある質問"
    ],
    "#cta-title": [
      "ストレスチェックの",
      "導入準備を、",
      "今から始めませんか。"
    ]
  };

  let currentPageData = null;
  let resizeTimer = 0;

  function getTitleLines(selector, value) {
    if (
      window.matchMedia("(max-width: 760px)").matches &&
      MOBILE_TITLES[selector]
    ) {
      return MOBILE_TITLES[selector];
    }

    return String(value || "").split("\n").filter(Boolean);
  }


  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function brandHtml(value) {
    return escapeHtml(value).replace(
      BRAND_PATTERN,
      '<span class="sc-inline-brand">クロスメソッド™</span>'
    );
  }

  function appendBrandAwareText(parent, value) {
    const text = String(value || "");
    let lastIndex = 0;

    text.replace(BRAND_PATTERN, (match, offset) => {
      if (offset > lastIndex) {
        parent.appendChild(document.createTextNode(text.slice(lastIndex, offset)));
      }

      const brand = document.createElement("span");
      brand.className = "sc-inline-brand";
      brand.textContent = BRAND_NAME;
      parent.appendChild(brand);

      lastIndex = offset + match.length;
      return match;
    });

    if (lastIndex < text.length) {
      parent.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
  }

  function setText(selector, value) {
    const el = $(selector);
    if (el) el.textContent = value || "";
  }

  function setRichText(selector, value) {
    const el = $(selector);
    if (!el) return;
    el.innerHTML = "";
    appendBrandAwareText(el, value);
  }

  function setTitle(selector, value) {
    const el = $(selector);
    if (!el) return;

    el.innerHTML = "";

    getTitleLines(selector, value).forEach((line) => {
      const span = document.createElement("span");
      span.className = "sc-title-line";
      appendBrandAwareText(span, line);
      el.appendChild(span);
    });
  }

  async function fetchData() {
    try {
      const url = new URL(API_URL);
      url.searchParams.set("action", "stressCheckPage");

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

      return normalizeLegacyCopy({
        hero: Object.assign({}, DEFAULT_DATA.hero, result.data.hero || {}),
        sections: Object.assign({}, DEFAULT_DATA.sections, result.data.sections || {}),
        cards: Object.assign({}, DEFAULT_DATA.cards, result.data.cards || {}),
        faq: Array.isArray(result.data.faq) && result.data.faq.length
          ? result.data.faq
          : DEFAULT_DATA.faq
      });
    } catch (error) {
      console.warn("stress-check fallback", error);
      return normalizeLegacyCopy(structuredClone(DEFAULT_DATA));
    }
  }

  function normalizeLegacyCopy(data) {
    if (
      data.sections?.cta?.button1 === "導入について相談する"
    ) {
      data.sections.cta.button1 =
        "ストレスチェック導入を申し込む";
    }

    return data;
  }

  function renderHero(data) {
    setText("#hero-eyebrow", data.hero.eyebrow);
    setTitle("#hero-title", data.hero.title);
    setRichText("#hero-lead", data.hero.lead);

    const wrap = $("#hero-badges");
    if (!wrap) return;

    wrap.innerHTML = "";
    [data.hero.badge1, data.hero.badge2, data.hero.badge3, data.hero.badge4]
      .filter(Boolean)
      .forEach((label) => {
        const span = document.createElement("span");
        span.textContent = label;
        wrap.appendChild(span);
      });
  }

  function renderSectionTitles(sections) {
    [
      "obligation","purpose","difference","flow","roles",
      "privacy","interview","group","support","faq","cta"
    ].forEach((key) => {
      setTitle(`#${key}-title`, sections[key]?.title);
      setRichText(`#${key}-lead`, sections[key]?.lead);
    });

    setText("#cta-button-1", sections.cta?.button1);
    setText("#cta-button-2", sections.cta?.button2);
  }

  function renderCards(items, selector, className, renderer) {
    const wrap = $(selector);
    if (!wrap) return;

    wrap.innerHTML = "";

    (items || [])
      .slice()
      .sort((a, b) => Number(a.order || 999) - Number(b.order || 999))
      .forEach((item, index) => {
        const article = document.createElement("article");
        article.className = `${className} tone-${item.tone || "blue"}`;
        article.innerHTML = renderer(item, index);
        wrap.appendChild(article);
      });
  }

  function iconSvg(type) {
    return ICONS[type] || ICONS.questionnaire;
  }

  function renderAllCards(cards) {
    renderCards(cards.purpose, "#purpose-list", "sc-card", (item) => `
      <div class="sc-card-icon" aria-hidden="true">${iconSvg(item.icon)}</div>
      <h3>${brandHtml(item.title)}</h3>
      <p>${brandHtml(item.text)}</p>
    `);

    renderCards(cards.flow, "#flow-list", "sc-flow-card", (item, index) => `
      <div class="sc-flow-number">${String(index + 1).padStart(2, "0")}</div>
      <h3>${brandHtml(item.title)}</h3>
      <p>${brandHtml(item.text)}</p>
    `);

    renderCards(cards.roles, "#roles-list", "sc-card", (item) => `
      <div class="sc-card-icon" aria-hidden="true">${iconSvg(item.icon)}</div>
      <h3>${brandHtml(item.title)}</h3>
      <p>${brandHtml(item.text)}</p>
    `);

    renderCards(cards.privacy, "#privacy-list", "sc-privacy-card", (item) => `
      <div class="sc-card-icon" aria-hidden="true">${iconSvg(item.icon)}</div>
      <h3>${brandHtml(item.title)}</h3>
      <p>${brandHtml(item.text)}</p>
    `);

    renderCards(cards.support, "#support-list", "sc-card", (item) => `
      <div class="sc-card-icon" aria-hidden="true">${iconSvg(item.icon)}</div>
      <h3>${brandHtml(item.title)}</h3>
      <p>${brandHtml(item.text)}</p>
    `);
  }

  function renderFaq(items) {
    const wrap = $("#faq-list");
    if (!wrap) return;

    wrap.innerHTML = "";

    (items || []).forEach((item, index) => {
      const article = document.createElement("article");
      article.className = "sc-faq-item";
      article.innerHTML = `
        <button type="button" aria-expanded="false" aria-controls="sc-faq-${index}">
          Q. ${brandHtml(item.q || "")}
        </button>
        <div class="sc-faq-answer" id="sc-faq-${index}">
          <p>A. ${brandHtml(item.a || "")}</p>
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

  async function setup() {
    const data = await fetchData();
    currentPageData = data;

    renderHero(data);
    renderSectionTitles(data.sections || {});
    renderAllCards(data.cards || {});
    renderFaq(data.faq || []);

    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!currentPageData) return;
        renderHero(currentPageData);
        renderSectionTitles(currentPageData.sections || {});
      }, 120);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup, { once: true });
  } else {
    setup();
  }
})();
