(() => {
  "use strict";

  const API_URL = "https://script.google.com/macros/s/AKfycbxuGAYkdygkpMsxFQvxmSdu2TnRs7svrudmgwDVOQg9YKIAa1T-Q-v5YmXOf4b5fQCSJw/exec";
  const DEFAULT_DATA = {
  "hero": {
    "eyebrow": "Customer Voice",
    "title": "お客様の声を、\n「選ばれる理由」と改善の順番へ。",
    "lead": "顧客満足は、商品やサービスの品質だけで決まりません。問い合わせ、案内、待ち時間、説明、接客、利用中の安心感、会計、アフターフォローまで、体験全体が再利用・継続・紹介・口コミに影響します。クロスメソッド™は、お客様の声を集め、顧客体験のどこに強みや課題があるかを視える化し、教育・業務・サービス改善へつなげます。",
    "badge1": "飲食店",
    "badge2": "ホテル",
    "badge3": "介護・福祉",
    "badge4": "一般企業"
  },
  "sections": {
    "difference": {
      "title": "味やサービスの評価だけでは、改善の順番までは分かりません。",
      "lead": "「おいしいのに再来店が増えない」「クレームは少ないのに紹介されにくい」「スタッフは頑張っているのに評価が安定しない」。こうした状態は、体験のどこかに小さな違和感が残っている可能性があります。クロスメソッド™は、総合満足だけでは見えない接点ごとの声を整理します。"
    },
    "scope": {
      "title": "共通して確認する顧客体験の流れ",
      "lead": "業種が違っても、顧客体験は接点の連続でできています。まずは共通構造を押さえ、そのうえで業種ごとの動線へ落とし込みます。"
    },
    "restaurant": {
      "title": "代表例：飲食店の店内体験をどう視える化するか",
      "lead": "飲食店は顧客体験の流れがイメージしやすく、改善テーマも見つけやすい代表例です。味の評価だけでなく、店内で起きている一連の体験を確認します。"
    },
    "industries": {
      "title": "考え方は、ホテル・介護・一般企業にもそのまま応用できます。",
      "lead": "代表例は飲食店ですが、顧客体験を接点ごとに見る考え方は、予約・受付・説明・利用・継続があるすべての業種に応用できます。"
    },
    "signals": {
      "title": "業種が違っても、共通して確認する声があります。",
      "lead": "以下の視点は、飲食店、ホテル、介護・福祉、一般企業のどれでも確認できます。"
    },
    "improvement": {
      "title": "お客様の声は、誰かを責めるためではなく、教育と業務改善へ変えます。",
      "lead": "一件の低評価を個人責任で終わらせず、接点を特定し、教育・連携・手順・説明資料・導線の改善テーマへ変換します。"
    },
    "deliverables": {
      "title": "診断後に整理される内容",
      "lead": "声を集めた後は、現場で使える形へ整えて返します。"
    },
    "faq": {
      "title": "よくある質問",
      "lead": "初回相談でよくいただく質問をまとめています。"
    },
    "cta": {
      "title": "お客様の声を、改善のきっかけに変えたい方へ。",
      "lead": "飲食店、ホテル、介護・福祉、一般企業まで。まずは、どの接点の声を確認したいかをご相談ください。",
      "button1": "無料体験診断を見る",
      "button2": "相談する"
    }
  },
  "flows": {
    "commonFlow": [
      {
        "label": "知る",
        "text": "検索・紹介・広告・口コミなどで存在を知る"
      },
      {
        "label": "問い合わせ・予約",
        "text": "予約しやすさ、返答の早さ、最初の印象"
      },
      {
        "label": "訪問・来店",
        "text": "入口の分かりやすさ、到着時の安心感"
      },
      {
        "label": "説明・案内",
        "text": "案内の分かりやすさ、対応の丁寧さ"
      },
      {
        "label": "利用",
        "text": "利用中の満足感、連携、安心感"
      },
      {
        "label": "会計・手続き",
        "text": "最後の印象、スムーズさ、納得感"
      },
      {
        "label": "利用後",
        "text": "フォロー、問い合わせ対応、記憶に残る体験"
      },
      {
        "label": "再利用・紹介",
        "text": "また利用したいか、誰かに勧めたいか"
      }
    ],
    "restaurantFlow": [
      {
        "step": "01",
        "scene": "検索・予約",
        "voice": "予約のしやすさ／店の魅力は伝わったか"
      },
      {
        "step": "02",
        "scene": "入店",
        "voice": "第一印象／迎えられた安心感"
      },
      {
        "step": "03",
        "scene": "案内・着席",
        "voice": "席への案内／待たされた印象はないか"
      },
      {
        "step": "04",
        "scene": "注文",
        "voice": "メニューの分かりやすさ／説明の丁寧さ"
      },
      {
        "step": "05",
        "scene": "待ち時間",
        "voice": "時間の長さ／説明や気配りはあったか"
      },
      {
        "step": "06",
        "scene": "料理提供",
        "voice": "提供時の印象／料理説明や確認の丁寧さ"
      },
      {
        "step": "07",
        "scene": "食事中対応",
        "voice": "追加注文／スタッフ間の連携／居心地"
      },
      {
        "step": "08",
        "scene": "会計",
        "voice": "最後まで気持ちよく対応されたか"
      },
      {
        "step": "09",
        "scene": "見送り",
        "voice": "また来たいと思える印象が残ったか"
      },
      {
        "step": "10",
        "scene": "口コミ・再来店",
        "voice": "紹介したい理由／再来店を妨げる不安はないか"
      }
    ],
    "industryHotel": [
      {
        "label": "ホテル・宿泊",
        "text": "検索・予約 → 事前案内 → 到着・チェックイン → 客室・館内利用 → 食事・設備・スタッフ対応 → チェックアウト → 口コミ・再予約"
      }
    ],
    "industryCare": [
      {
        "label": "介護・福祉",
        "text": "問い合わせ・相談 → 見学・説明 → 契約・利用開始 → 日々のサービス → 本人への関わり → 家族への説明 → 継続利用・紹介"
      }
    ],
    "industryBusiness": [
      {
        "label": "一般企業",
        "text": "認知 → 問い合わせ → 提案・見積 → 契約 → 導入・利用開始 → 日常利用 → サポート → 更新・継続・紹介"
      }
    ],
    "commonSignals": [
      {
        "label": "第一印象",
        "text": "来店・到着・初回接点で安心感があったか"
      },
      {
        "label": "分かりやすさ",
        "text": "説明・案内・情報が理解しやすかったか"
      },
      {
        "label": "待ち時間",
        "text": "待たされた印象や不安はなかったか"
      },
      {
        "label": "説明・納得感",
        "text": "必要な説明を十分に受けられたか"
      },
      {
        "label": "接遇・信頼",
        "text": "丁寧さ、気遣い、誠実さを感じたか"
      },
      {
        "label": "個別対応",
        "text": "自分に合った対応を受けられたか"
      },
      {
        "label": "安全・安心",
        "text": "利用中に不安や危険を感じなかったか"
      },
      {
        "label": "清潔感",
        "text": "場や設備が整っていると感じたか"
      },
      {
        "label": "連携",
        "text": "スタッフ同士がつながっている印象があったか"
      },
      {
        "label": "トラブル対応",
        "text": "不具合や要望に適切に対応してもらえたか"
      },
      {
        "label": "継続意向",
        "text": "また利用したい、続けたいと思えたか"
      },
      {
        "label": "紹介・口コミ意向",
        "text": "人へ勧めたいと思える理由があったか"
      }
    ],
    "improvementFlow": [
      {
        "label": "声を集める",
        "text": "お客様や利用者、その家族などから体験の声を集める"
      },
      {
        "label": "接点を特定する",
        "text": "どの場面で満足・不満・迷いが起きたかを分ける"
      },
      {
        "label": "個人責任と組織課題を分ける",
        "text": "誰か一人の問題で終わらせず、構造の問題を確認する"
      },
      {
        "label": "教育・業務改善へ変える",
        "text": "教え方、手順、資料、導線、役割分担の改善テーマにする"
      },
      {
        "label": "再確認する",
        "text": "改善後にもう一度声を確認し、変化を確かめる"
      }
    ],
    "deliverables": [
      {
        "label": "集計結果",
        "text": "接点ごとの評価や傾向を整理"
      },
      {
        "label": "強み・改善優先",
        "text": "選ばれている理由と確認優先ポイントを可視化"
      },
      {
        "label": "レポート",
        "text": "現場共有しやすい形で結果を出力"
      },
      {
        "label": "改善テーマ",
        "text": "教育・業務・接客改善へつなげる材料を整理"
      }
    ]
  },
  "faq": [
    {
      "q": "料理やサービスの内容そのものを評価する診断ですか？",
      "a": "内容そのものだけでなく、予約、案内、説明、待ち時間、接客、会計、継続利用意向など、体験全体を確認するための仕組みです。"
    },
    {
      "q": "クレームが少ない店舗でも必要ですか？",
      "a": "はい。クレームが少なくても、再来店や紹介につながりにくい場合は、表面化していない違和感が残っていることがあります。"
    },
    {
      "q": "スタッフ個人の評価に使うものですか？",
      "a": "いいえ。個人を責めるためではなく、教育、連携、手順、説明の改善に使う前提で整理します。"
    },
    {
      "q": "飲食店以外でも使えますか？",
      "a": "使えます。ホテル、介護・福祉、クリニック、サロン、一般企業など、顧客体験に接点がある業種で活用できます。"
    },
    {
      "q": "自由記述は扱えますか？",
      "a": "はい。数値だけでなく、お客様の言葉として残る自由記述も改善のヒントとして扱えます。"
    },
    {
      "q": "複数店舗や複数部署でも比較できますか？",
      "a": "可能です。店舗別、時間帯別、担当別など、必要に応じた切り分けを前提に設計できます。"
    }
  ]
};

  function qs(selector) {
    return document.querySelector(selector);
  }

  function setText(selector, value) {
    const el = qs(selector);
    if (el) el.textContent = value || "";
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
      if (!result?.success || !result?.data) throw new Error(result?.message || "API error");
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
      faq: Array.isArray(incoming.faq) && incoming.faq.length ? incoming.faq : base.faq
    };
  }

  function renderHero(data) {
    setText("#hero-eyebrow", data.hero.eyebrow);
    setText("#hero-title", data.hero.title);
    setText("#hero-lead", data.hero.lead);

    const badges = qs("#hero-badges");
    if (badges) {
      badges.innerHTML = "";
      [data.hero.badge1, data.hero.badge2, data.hero.badge3, data.hero.badge4]
        .filter(Boolean)
        .forEach((text) => {
          const span = document.createElement("span");
          span.textContent = text;
          badges.appendChild(span);
        });
    }
  }

  function renderSectionTitles(sections) {
    setText("#difference-title", sections.difference?.title);
    setText("#difference-lead", sections.difference?.lead);

    setText("#scope-title", sections.scope?.title);
    setText("#scope-lead", sections.scope?.lead);

    setText("#restaurant-title", sections.restaurant?.title);
    setText("#restaurant-lead", sections.restaurant?.lead);

    setText("#industries-title", sections.industries?.title);
    setText("#industries-lead", sections.industries?.lead);

    setText("#signals-title", sections.signals?.title);
    setText("#signals-lead", sections.signals?.lead);

    setText("#improvement-title", sections.improvement?.title);
    setText("#improvement-lead", sections.improvement?.lead);

    setText("#deliverables-title", sections.deliverables?.title);
    setText("#deliverables-lead", sections.deliverables?.lead);

    setText("#faq-title", sections.faq?.title);
    setText("#faq-lead", sections.faq?.lead);

    setText("#cta-title", sections.cta?.title);
    setText("#cta-lead", sections.cta?.lead);
    setText("#cta-button-1", sections.cta?.button1);
    setText("#cta-button-2", sections.cta?.button2);
  }

  function renderCommonFlow(items) {
    const wrap = qs("#common-flow-list");
    if (!wrap) return;

    wrap.innerHTML = "";
    (items || []).forEach((item) => {
      const article = document.createElement("article");
      article.className = "cv-flow-item";
      article.innerHTML = `
        <strong>${escapeHtml(item.label || "")}</strong>
        <p>${escapeHtml(item.text || "")}</p>
      `;
      wrap.appendChild(article);
    });
  }

  function renderRestaurantFlow(items) {
    const wrap = qs("#restaurant-flow-list");
    if (!wrap) return;

    wrap.innerHTML = "";
    (items || []).forEach((item) => {
      const article = document.createElement("article");
      article.className = "cv-restaurant-step";
      article.innerHTML = `
        <div class="cv-step-index">${escapeHtml(item.step || "")}</div>
        <div>
          <h3>${escapeHtml(item.scene || "")}</h3>
          <span class="cv-step-label">この場面で確認する声</span>
          <p>${escapeHtml(item.voice || "")}</p>
        </div>
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
    groups.forEach((item) => {
      const article = document.createElement("article");
      article.className = "cv-industry-card";
      article.innerHTML = `
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
      article.innerHTML = `
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
    (items || []).forEach((item) => {
      const article = document.createElement("article");
      article.className = "cv-process-card";
      article.innerHTML = `
        <span>${escapeHtml(item.label || "")}</span>
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
        <button type="button" aria-expanded="false" aria-controls="cv-faq-${index}">
          Q. ${escapeHtml(item.q || "")}
        </button>
        <div id="cv-faq-${index}">
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
