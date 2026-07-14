(() => {
  "use strict";

  const API_URL = "https://script.google.com/macros/s/AKfycbxuGAYkdygkpMsxFQvxmSdu2TnRs7svrudmgwDVOQg9YKIAa1T-Q-v5YmXOf4b5fQCSJw/exec";
  const DEFAULT_DATA = {
  "hero": {
    "eyebrow": "Health Management",
    "title": "健康を、個人任せにしない。\n働く力を守る経営へ。",
    "lead": "健康経営は、健康診断や福利厚生の制度をそろえるだけではありません。心身の不調、疲労、ストレス、治療や介護との両立、管理者の抱え込み、食生活など、働く人の状態を経営課題として捉え、働き続けられる環境へつなげる取り組みです。クロスメソッド™は、数字だけでは見えにくい現場の声を集め、優先して整えるテーマを視える化します。",
    "badge1": "心身の健康",
    "badge2": "働き続けられる環境",
    "badge3": "両立支援",
    "badge4": "組織改善"
  },
  "sections": {
    "definition": {
      "title": "健康経営は、\n制度を導入することではなく、\n働く力を守る仕組みづくりです。",
      "lead": "健康診断、ストレスチェック、相談窓口、両立支援、食生活支援。施策を用意するだけでなく、利用される状態をつくり、現場の変化を確かめ、改善を続けることが重要です。"
    },
    "signals": {
      "title": "健康課題は、\n大きな不調になる前に、\n小さな声として表れます。",
      "lead": "欠勤や離職として数字に表れる前に、疲労、睡眠、相談しにくさ、抱え込み、食生活、両立の難しさなど、日常の声にサインが表れることがあります。"
    },
    "framework": {
      "title": "健康経営を、\n5つの視点で整理します。",
      "lead": "方針だけ、施策だけ、認定だけで終わらせず、経営の意思から評価・改善までを一つの流れとして整えます。"
    },
    "voices": {
      "title": "クロスメソッド™で確認する、\n健康経営につながる声",
      "lead": "健康経営に関係するのは、健康状態だけではありません。働き続けたい気持ち、相談できる空気、管理者の負担、評価や組織の支え方まで確認します。"
    },
    "support": {
      "title": "会社ごとに必要な支援は、\n同じではありません。",
      "lead": "現在の課題や体制に合わせて、必要な領域を選び、無理のない順番で取り組みます。"
    },
    "recognition": {
      "title": "認定取得は、\nゴールではなく、取り組みを続けるための節目です。",
      "lead": "認定制度への対応だけを目的にせず、現場で使われる仕組みと継続的な改善を整えます。"
    },
    "flow": {
      "title": "声を集めて、\n実行できる健康経営へ。",
      "lead": "現状確認から再確認まで、経営と現場の両方が納得できる流れを設計します。"
    },
    "deliverables": {
      "title": "支援後に整理される内容",
      "lead": "経営判断と現場共有に使える形で、現在地と次の行動を整理します。"
    },
    "faq": {
      "title": "よくある質問",
      "lead": "健康経営支援について、よくいただく質問をまとめています。"
    },
    "cta": {
      "title": "健康経営を、\n制度から実行へ進めたい方へ。",
      "lead": "何から始めるべきか分からない場合も、現在の体制と現場の声を確認し、優先順位から一緒に整理します。",
      "button1": "無料体験診断を見る",
      "button2": "健康経営について相談する"
    }
  },
  "cards": {
    "signals": [
      {
        "order": 1,
        "title": "疲労・睡眠",
        "text": "休んでも疲れが取れない、睡眠が不安定、集中しにくい。",
        "icon": "sleep",
        "tone": "blue"
      },
      {
        "order": 2,
        "title": "ストレス・心の余裕",
        "text": "不安や緊張が続き、仕事へ向かう気持ちが重くなっている。",
        "icon": "mind",
        "tone": "purple"
      },
      {
        "order": 3,
        "title": "管理者の抱え込み",
        "text": "相談対応、調整、欠員対応を一人で引き受けている。",
        "icon": "manager",
        "tone": "coral"
      },
      {
        "order": 4,
        "title": "治療と仕事の両立",
        "text": "通院や治療について伝えにくく、働き方を相談できない。",
        "icon": "treatment",
        "tone": "aqua"
      },
      {
        "order": 5,
        "title": "介護と仕事の両立",
        "text": "家族の介護を抱えながら、職場へ相談できずにいる。",
        "icon": "care",
        "tone": "green"
      },
      {
        "order": 6,
        "title": "食生活・生活習慣",
        "text": "忙しさから食事が偏り、健康を整える余裕がない。",
        "icon": "food",
        "tone": "gold"
      }
    ],
    "framework": [
      {
        "order": 1,
        "title": "経営方針",
        "text": "なぜ健康経営に取り組むのかを、経営課題と結びつけて明確にします。",
        "icon": "policy",
        "tone": "blue"
      },
      {
        "order": 2,
        "title": "推進体制",
        "text": "担当者、管理者、産業保健、人事などの役割と相談経路を整理します。",
        "icon": "team",
        "tone": "aqua"
      },
      {
        "order": 3,
        "title": "状態把握",
        "text": "健康データだけでなく、働く人の声や職場の状態も確認します。",
        "icon": "diagnosis",
        "tone": "purple"
      },
      {
        "order": 4,
        "title": "施策・支援",
        "text": "ストレス、両立、食生活、管理職支援など必要な施策を選びます。",
        "icon": "support",
        "tone": "green"
      },
      {
        "order": 5,
        "title": "評価・改善",
        "text": "実施して終わらず、利用状況と変化を確認し、次の改善へつなげます。",
        "icon": "improve",
        "tone": "gold"
      }
    ],
    "voices": [
      {
        "order": 1,
        "title": "従業員は今、幸せか",
        "text": "健康状態だけでなく、心の余裕や働く実感を確認します。",
        "icon": "smile",
        "tone": "green",
        "number": "2"
      },
      {
        "order": 2,
        "title": "ここで働き続けたいか",
        "text": "健康不安や職場環境が、継続意向へ影響していないか確認します。",
        "icon": "continue",
        "tone": "blue",
        "number": "3"
      },
      {
        "order": 3,
        "title": "管理者は抱え込んでいないか",
        "text": "管理者自身の負担と、相談を受け止める体制を確認します。",
        "icon": "manager",
        "tone": "coral",
        "number": "7"
      },
      {
        "order": 4,
        "title": "相談できる空気があるか",
        "text": "不調や家庭事情を早い段階で伝えられる職場かを確認します。",
        "icon": "conversation",
        "tone": "purple",
        "number": "15"
      },
      {
        "order": 5,
        "title": "緊急時に本当に動けるか",
        "text": "不調者や事故が起きたときの連絡、判断、初動を確認します。",
        "icon": "emergency",
        "tone": "gold",
        "number": "14"
      },
      {
        "order": 6,
        "title": "頑張りが報われる仕組みか",
        "text": "働き方や評価が、心身の消耗につながっていないか確認します。",
        "icon": "reward",
        "tone": "aqua",
        "number": "5"
      }
    ],
    "support": [
      {
        "order": 1,
        "title": "健康診断後のフォロー",
        "text": "受診率だけでなく、再検査や生活改善へつながる運用を整えます。",
        "icon": "checkup",
        "tone": "blue"
      },
      {
        "order": 2,
        "title": "ストレスチェック活用",
        "text": "実施だけで終わらせず、集団分析と職場改善へつなげます。",
        "icon": "stress",
        "tone": "purple"
      },
      {
        "order": 3,
        "title": "治療・介護との両立支援",
        "text": "相談、休暇、情報共有、復帰までの支援方法を整理します。",
        "icon": "balance",
        "tone": "green"
      },
      {
        "order": 4,
        "title": "管理職・相談体制",
        "text": "管理者だけに負担を集中させず、適切につなぐ体制を整えます。",
        "icon": "manager",
        "tone": "coral"
      },
      {
        "order": 5,
        "title": "食生活・健康食",
        "text": "働きながら健康を整えやすい食環境と情報提供を検討します。",
        "icon": "food",
        "tone": "gold"
      },
      {
        "order": 6,
        "title": "職場環境・業務改善",
        "text": "長時間労働、属人化、業務の詰まりなど健康へ影響する構造を確認します。",
        "icon": "workflow",
        "tone": "aqua"
      }
    ],
    "recognition": [
      {
        "order": 1,
        "title": "現在地を整理する",
        "text": "すでに実施している施策と不足している体制を確認します。",
        "icon": "map",
        "tone": "blue"
      },
      {
        "order": 2,
        "title": "必要な取り組みを選ぶ",
        "text": "形式だけを整えず、会社の課題に合った取り組みを優先します。",
        "icon": "select",
        "tone": "aqua"
      },
      {
        "order": 3,
        "title": "継続できる運用へ",
        "text": "申請や認定後も、実施状況と変化を確認できる仕組みを残します。",
        "icon": "cycle",
        "tone": "gold"
      }
    ],
    "flow": [
      {
        "order": 1,
        "title": "ご相談",
        "text": "経営課題、現在の施策、対象者を確認します。",
        "icon": "conversation",
        "tone": "blue"
      },
      {
        "order": 2,
        "title": "現状と声の確認",
        "text": "制度、データ、従業員や管理者の声を整理します。",
        "icon": "diagnosis",
        "tone": "aqua"
      },
      {
        "order": 3,
        "title": "優先順位の視える化",
        "text": "すぐに整えることと、中長期で進めることを分けます。",
        "icon": "priority",
        "tone": "purple"
      },
      {
        "order": 4,
        "title": "施策の実行",
        "text": "担当、期限、方法を決め、現場で動く形へ落とし込みます。",
        "icon": "action",
        "tone": "green"
      },
      {
        "order": 5,
        "title": "再確認・改善",
        "text": "実施状況と変化を確認し、次の取り組みを決めます。",
        "icon": "improve",
        "tone": "gold"
      }
    ],
    "deliverables": [
      {
        "order": 1,
        "title": "健康経営の現在地",
        "text": "方針、体制、施策、運用状況を整理します。",
        "icon": "map",
        "tone": "blue"
      },
      {
        "order": 2,
        "title": "優先課題",
        "text": "健康課題と組織課題を分け、優先して整えるテーマを示します。",
        "icon": "priority",
        "tone": "purple"
      },
      {
        "order": 3,
        "title": "改善行動計画",
        "text": "担当、期限、確認方法を含む実行可能な計画へ落とし込みます。",
        "icon": "plan",
        "tone": "green"
      },
      {
        "order": 4,
        "title": "振り返り材料",
        "text": "施策の利用状況や変化を確認し、継続改善に使える形で残します。",
        "icon": "report",
        "tone": "gold"
      }
    ]
  },
  "faq": [
    {
      "q": "健康経営は、大企業だけが取り組むものですか？",
      "a": "いいえ。規模にかかわらず、働く人の健康と職場環境を経営課題として整理することは可能です。会社の規模や体制に合わせて、無理のない範囲から進めます。"
    },
    {
      "q": "健康診断を実施していれば十分ですか？",
      "a": "健康診断は重要ですが、実施後のフォロー、相談体制、職場環境、ストレス、両立支援なども含めて考える必要があります。"
    },
    {
      "q": "ストレスチェックとの違いは何ですか？",
      "a": "ストレスチェックは健康経営を構成する取り組みの一つです。健康経営では、心身の健康、働き方、両立支援、食生活、管理職支援などを広く扱います。"
    },
    {
      "q": "認定取得だけを支援してもらえますか？",
      "a": "認定に必要な現在地の整理や体制づくりも支援できます。ただし、形式だけでなく、認定後も現場で続けられる運用を重視します。"
    },
    {
      "q": "従業員の個人情報はどのように扱いますか？",
      "a": "個人が特定される情報を必要以上に共有せず、目的と閲覧範囲を明確にして扱います。具体的な運用は実施内容に合わせて設計します。"
    },
    {
      "q": "何から始めればよいか分かりません。",
      "a": "現在の施策、困っていること、従業員や管理者の声を確認し、最初に取り組むテーマから整理します。"
    }
  ]
};

  const $ = (selector) => document.querySelector(selector);

  function setText(selector, value) {
    const el = $(selector);
    if (el) el.textContent = value || "";
  }

  function setTitle(selector, value) {
    const el = $(selector);
    if (!el) return;
    el.innerHTML = "";
    String(value || "").split("\n").filter(Boolean).forEach((line) => {
      const span = document.createElement("span");
      span.className = "hm-title-line";
      span.textContent = line;
      el.appendChild(span);
    });
  }

  async function fetchData() {
    try {
      const url = new URL(API_URL);
      url.searchParams.set("action", "healthManagementPage");
      const response = await fetch(url.toString(), {
        method: "GET",
        cache: "no-store",
        redirect: "follow"
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (!result?.success || !result?.data) throw new Error(result?.message || "API error");
      return {
        hero: Object.assign({}, DEFAULT_DATA.hero, result.data.hero || {}),
        sections: Object.assign({}, DEFAULT_DATA.sections, result.data.sections || {}),
        cards: Object.assign({}, DEFAULT_DATA.cards, result.data.cards || {}),
        faq: Array.isArray(result.data.faq) && result.data.faq.length ? result.data.faq : DEFAULT_DATA.faq
      };
    } catch (error) {
      console.warn("health-management fallback", error);
      return DEFAULT_DATA;
    }
  }

  function renderHero(data) {
    setText("#hero-eyebrow", data.hero.eyebrow);
    setTitle("#hero-title", data.hero.title);
    setText("#hero-lead", data.hero.lead);
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
    ["definition","signals","framework","voices","support","recognition","flow","deliverables","faq","cta"]
      .forEach((key) => {
        setTitle(`#${key}-title`, sections[key]?.title);
        setText(`#${key}-lead`, sections[key]?.lead);
      });
    setText("#cta-button-1", sections.cta?.button1);
    setText("#cta-button-2", sections.cta?.button2);
  }

  function renderCards(items, selector, className, renderer) {
    const wrap = $(selector);
    if (!wrap) return;
    wrap.innerHTML = "";
    (items || []).slice().sort((a,b) => Number(a.order || 999) - Number(b.order || 999))
      .forEach((item,index) => {
        const article = document.createElement("article");
        article.className = `${className} tone-${item.tone || "blue"}`;
        article.innerHTML = renderer(item,index);
        wrap.appendChild(article);
      });
  }

  function renderAllCards(cards) {
    renderCards(cards.signals, "#signals-list", "hm-card", (item) => `
      <div class="hm-card-icon" aria-hidden="true">${iconSvg(item.icon)}</div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>`);

    renderCards(cards.framework, "#framework-list", "hm-framework-card", (item,index) => `
      <div class="hm-framework-number">0${index+1}</div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>`);

    renderCards(cards.voices, "#voices-list", "hm-voice-card", (item) => `
      <div class="hm-voice-number">${escapeHtml(item.number || "")}</div>
      <div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></div>`);

    renderCards(cards.support, "#support-list", "hm-card", (item) => `
      <div class="hm-card-icon" aria-hidden="true">${iconSvg(item.icon)}</div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>`);

    renderCards(cards.recognition, "#recognition-list", "hm-recognition-card", (item) => `
      <div class="hm-card-icon" aria-hidden="true">${iconSvg(item.icon)}</div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>`);

    renderCards(cards.flow, "#flow-list", "hm-flow-card", (item,index) => `
      <div class="hm-flow-number">0${index+1}</div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>`);

    renderCards(cards.deliverables, "#deliverables-list", "hm-deliverable-card", (item) => `
      <div class="hm-card-icon" aria-hidden="true">${iconSvg(item.icon)}</div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>`);
  }

  function renderFaq(items) {
    const wrap = $("#faq-list");
    if (!wrap) return;
    wrap.innerHTML = "";
    (items || []).forEach((item,index) => {
      const article = document.createElement("article");
      article.className = "hm-faq-item";
      article.innerHTML = `
        <button type="button" aria-expanded="false" aria-controls="hm-faq-${index}">
          Q. ${escapeHtml(item.q || "")}
        </button>
        <div class="hm-faq-answer" id="hm-faq-${index}">
          <p>A. ${escapeHtml(item.a || "")}</p>
        </div>`;
      const button = article.querySelector("button");
      button.addEventListener("click", () => {
        const open = article.classList.toggle("is-open");
        button.setAttribute("aria-expanded", open ? "true" : "false");
      });
      wrap.appendChild(article);
    });
  }

  function iconSvg(type) {
    const icons = {
      sleep:`<svg viewBox="0 0 64 64"><path d="M17 43c11 3 24-2 28-15 3 16-8 27-22 27-8 0-14-4-17-10 4 0 8-1 11-2z"/><path d="M43 13h10l-8 10h10"/></svg>`,
      mind:`<svg viewBox="0 0 64 64"><path d="M22 51c-8-3-12-10-11-19 0-12 9-21 21-21 11 0 20 8 21 18 1 8-3 14-9 18"/><path d="M25 27c2-3 5-5 8-5 5 0 9 4 9 9s-4 9-9 9c-4 0-7-2-9-5"/><path d="M22 51h22"/></svg>`,
      manager:`<svg viewBox="0 0 64 64"><circle cx="32" cy="19" r="9"/><path d="M16 52c1-14 7-22 16-22s15 8 16 22"/><path d="M10 40h8M46 40h8M13 35v10M51 35v10"/></svg>`,
      treatment:`<svg viewBox="0 0 64 64"><rect x="12" y="16" width="40" height="36" rx="7"/><path d="M25 16v-6h14v6M32 25v18M23 34h18"/></svg>`,
      care:`<svg viewBox="0 0 64 64"><path d="M32 53C21 44 11 37 11 26c0-7 5-12 12-12 4 0 8 2 9 6 2-4 5-6 10-6 7 0 12 5 12 12 0 11-10 18-22 27z"/><path d="M23 34h18"/></svg>`,
      food:`<svg viewBox="0 0 64 64"><path d="M10 34h44c0 13-9 21-22 21S10 47 10 34z"/><path d="M17 29c0-6 4-8 4-14M31 29c0-6 4-8 4-14M45 29c0-6 4-8 4-14"/><path d="M8 57h48"/></svg>`,
      policy:`<svg viewBox="0 0 64 64"><path d="M14 10h36v44H14z"/><path d="M22 22h20M22 31h20M22 40h13"/><path d="m37 46 5 5 9-11"/></svg>`,
      team:`<svg viewBox="0 0 64 64"><circle cx="22" cy="21" r="8"/><circle cx="43" cy="21" r="8"/><path d="M9 52c1-13 6-20 13-20s12 7 13 20M30 52c1-13 6-20 13-20s12 7 13 20"/></svg>`,
      diagnosis:`<svg viewBox="0 0 64 64"><circle cx="28" cy="28" r="17"/><path d="m41 41 13 13"/><path d="M19 29h18M28 20v18"/></svg>`,
      support:`<svg viewBox="0 0 64 64"><path d="M11 49V27h42v22"/><path d="M19 27V16h26v11M8 49h48"/><path d="M32 31v12M26 37h12"/></svg>`,
      improve:`<svg viewBox="0 0 64 64"><path d="M13 35c0-13 9-22 22-22 7 0 13 3 17 8"/><path d="m43 12 9 9-12 3"/><path d="M51 31c0 13-9 22-22 22-7 0-13-3-17-8"/><path d="m21 52-9-9 12-3"/></svg>`,
      checkup:`<svg viewBox="0 0 64 64"><rect x="12" y="13" width="40" height="42" rx="7"/><path d="M24 13v-3h16v3M21 28h22M21 37h12"/><path d="m37 44 5 5 9-12"/></svg>`,
      stress:`<svg viewBox="0 0 64 64"><path d="M17 46c-5-4-8-10-7-17 1-11 10-19 21-19 12 0 21 9 22 21 0 7-3 13-8 17"/><path d="M24 28h16M23 37c3 3 6 5 9 5s6-2 9-5"/></svg>`,
      balance:`<svg viewBox="0 0 64 64"><path d="M32 10v44M16 18h32"/><path d="m16 18-9 18h18zM48 18l-9 18h18z"/><path d="M21 54h22"/></svg>`,
      workflow:`<svg viewBox="0 0 64 64"><rect x="8" y="12" width="18" height="14" rx="3"/><rect x="38" y="12" width="18" height="14" rx="3"/><rect x="23" y="40" width="18" height="14" rx="3"/><path d="M26 19h12M17 26v7h15v7M47 26v7H32"/></svg>`,
      map:`<svg viewBox="0 0 64 64"><path d="m8 15 16-6 16 6 16-6v40l-16 6-16-6-16 6z"/><path d="M24 9v40M40 15v40"/><circle cx="32" cy="30" r="5"/></svg>`,
      select:`<svg viewBox="0 0 64 64"><rect x="10" y="10" width="44" height="44" rx="8"/><path d="m20 32 8 8 17-19"/></svg>`,
      cycle:`<svg viewBox="0 0 64 64"><path d="M14 29c2-11 11-18 22-18 7 0 13 3 17 8"/><path d="m44 10 9 9-12 3"/><path d="M50 35c-2 11-11 18-22 18-7 0-13-3-17-8"/><path d="m20 54-9-9 12-3"/></svg>`,
      priority:`<svg viewBox="0 0 64 64"><path d="M12 52h40"/><rect x="16" y="36" width="8" height="16" rx="2"/><rect x="28" y="26" width="8" height="26" rx="2"/><rect x="40" y="14" width="8" height="38" rx="2"/></svg>`,
      action:`<svg viewBox="0 0 64 64"><path d="M13 12h38v40H13z"/><path d="M22 23h20M22 32h14"/><path d="m32 47 18-18 5 5-18 18-8 2z"/></svg>`,
      plan:`<svg viewBox="0 0 64 64"><path d="M15 10h34v44H15z"/><path d="M23 22h18M23 31h18M23 40h12"/><circle cx="46" cy="46" r="8"/><path d="M46 42v5l4 2"/></svg>`,
      report:`<svg viewBox="0 0 64 64"><path d="M14 10h28l8 8v36H14z"/><path d="M42 10v10h10M22 31h20M22 40h20"/></svg>`
    };
    return icons[type] || icons.support;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }

  async function setup() {
    const data = await fetchData();
    renderHero(data);
    renderSectionTitles(data.sections || {});
    renderAllCards(data.cards || {});
    renderFaq(data.faq || []);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup, { once:true });
  } else {
    setup();
  }
})();
