(() => {
  "use strict";

  const API_URL = "https://script.google.com/macros/s/AKfycbxuGAYkdygkpMsxFQvxmSdu2TnRs7svrudmgwDVOQg9YKIAa1T-Q-v5YmXOf4b5fQCSJw/exec";
  const DEFAULT_DATA = {
  "hero": {
    "eyebrow": "Risk & Safety Management",
    "title": "安全を、個人の注意だけに任せない。\n小さな違和感から、事故を防ぐ仕組みへ。",
    "lead": "事故やクレームの多くは、突然起きるとは限りません。手順の曖昧さ、報告しにくい空気、引き継ぎ不足、管理者への判断集中など、小さな違和感が重なって表れることがあります。クロスメソッド™は、現場の声から安全上のサインを整理し、初動・記録・共有・再発防止へつなげます。",
    "badge1": "ヒヤリ・違和感",
    "badge2": "緊急時の初動",
    "badge3": "記録・情報共有",
    "badge4": "再発防止"
  },
  "sections": {
    "definition": {
      "title": "安全管理は、\n事故が起きた後に責任を探すことではなく、\n事故が起きにくい仕組みをつくることです。",
      "lead": "誰か一人の注意力に任せず、手順、環境、情報共有、教育、役割分担を確認し、同じことを繰り返さない仕組みへ変えます。"
    },
    "signals": {
      "title": "事故の前には、\n小さなサインが表れます。",
      "lead": "ヒヤリ、迷い、確認の省略、設備の違和感など、日常の中にある小さなサインを見逃さないことが重要です。"
    },
    "protect": {
      "title": "安全管理で守るものは、\n事故の有無だけではありません。",
      "lead": "顧客・利用者、従業員、情報、事業継続まで含めて、安全の範囲を整理します。"
    },
    "themes": {
      "title": "確認する主な安全テーマ",
      "lead": "職場や業種に合わせて、必要な安全テーマを組み合わせて確認します。"
    },
    "voices": {
      "title": "クロスメソッド™で確認する、\n安全管理につながる声",
      "lead": "トップページの18項目のうち、初動、記録、尊厳、相談、再発防止に特に関係する声を整理します。"
    },
    "difference": {
      "title": "誰かを責めるためではなく、\n同じことを繰り返さないために確認します。",
      "lead": "個人の責任だけで終わらせず、起きた場面、手順、環境、連携、情報共有まで確認します。"
    },
    "industries": {
      "title": "業種が違っても、\n安全管理の基本は共通しています。",
      "lead": "危険の内容は異なっても、気づく、動く、記録する、共有する、改善するという基本は共通しています。"
    },
    "flow": {
      "title": "気づきから再確認まで、\n7つの流れで整理します。",
      "lead": "報告して終わらず、改善内容を現場へ共有し、変化を再確認するところまでを見据えます。"
    },
    "deliverables": {
      "title": "支援後に整理される内容",
      "lead": "現場で共有し、判断と改善に使える形で、安全管理の現在地と次の行動を整理します。"
    },
    "related": {
      "title": "安全課題の背景に合わせて、\n関連する支援も確認できます。",
      "lead": "安全上のサインには、組織風土、心身の不調、顧客体験などが関係する場合があります。"
    },
    "faq": {
      "title": "よくある質問",
      "lead": "事故前の確認、匿名性、複数拠点、法定監査との違いについてまとめています。"
    },
    "cta": {
      "title": "事故が起きる前に、\n確認しておくべきことがあります。",
      "lead": "現場の小さな違和感、初動体制、記録、情報共有を確認し、優先して整えるテーマから整理します。",
      "button1": "リスク・安全管理を相談する",
      "button2": "無料体験診断を見る"
    }
  },
  "cards": {
    "signals": [
      {
        "order": 1,
        "title": "手順が曖昧",
        "text": "人によって対応方法が違い、緊急時に判断が遅れる。",
        "icon": "manual",
        "tone": "coral"
      },
      {
        "order": 2,
        "title": "引き継ぎが不足",
        "text": "大切な情報が口頭だけで伝えられ、抜けや誤解が生じる。",
        "icon": "handover",
        "tone": "blue"
      },
      {
        "order": 3,
        "title": "報告しにくい",
        "text": "小さなミスやヒヤリを言い出しにくい空気がある。",
        "icon": "report",
        "tone": "purple"
      },
      {
        "order": 4,
        "title": "管理者が抱えている",
        "text": "判断、連絡、調整が特定の管理者へ集中している。",
        "icon": "manager",
        "tone": "gold"
      },
      {
        "order": 5,
        "title": "設備・環境に違和感",
        "text": "動線、照明、保管、表示、設備に小さな危険が残っている。",
        "icon": "facility",
        "tone": "green"
      },
      {
        "order": 6,
        "title": "忙しさで確認を省略",
        "text": "繁忙時に手順やダブルチェックが飛ばされている。",
        "icon": "busy",
        "tone": "aqua"
      }
    ],
    "protect": [
      {
        "order": 1,
        "title": "顧客・利用者の安全",
        "text": "事故、誤提供、転倒、急変などから守ります。",
        "icon": "customer",
        "tone": "coral"
      },
      {
        "order": 2,
        "title": "従業員の安全",
        "text": "けが、過重負担、危険作業、ハラスメントなどを確認します。",
        "icon": "worker",
        "tone": "green"
      },
      {
        "order": 3,
        "title": "情報・記録の安全",
        "text": "個人情報、記録、引き継ぎ、閲覧権限を確認します。",
        "icon": "data",
        "tone": "blue"
      },
      {
        "order": 4,
        "title": "事業の継続",
        "text": "事故や災害時にも業務を継続・復旧できる体制を確認します。",
        "icon": "continuity",
        "tone": "gold"
      }
    ],
    "themes": [
      {
        "order": 1,
        "title": "ヒヤリ・事故の兆候",
        "text": "小さな違和感や未遂事例を拾います。",
        "icon": "warning",
        "tone": "coral"
      },
      {
        "order": 2,
        "title": "緊急時の初動",
        "text": "連絡、判断、役割分担を確認します。",
        "icon": "emergency",
        "tone": "blue"
      },
      {
        "order": 3,
        "title": "連絡・報告体制",
        "text": "誰へ、何を、いつ伝えるかを整理します。",
        "icon": "communication",
        "tone": "aqua"
      },
      {
        "order": 4,
        "title": "記録と情報共有",
        "text": "記録方法、共有範囲、引き継ぎを確認します。",
        "icon": "record",
        "tone": "purple"
      },
      {
        "order": 5,
        "title": "設備・環境",
        "text": "動線、表示、照明、保管、設備の安全を確認します。",
        "icon": "facility",
        "tone": "green"
      },
      {
        "order": 6,
        "title": "衛生・品質管理",
        "text": "清潔、保管、誤提供、異物、アレルギー等を確認します。",
        "icon": "hygiene",
        "tone": "gold"
      },
      {
        "order": 7,
        "title": "尊厳・権利を守る対応",
        "text": "本人の意思、プライバシー、適切な関わりを確認します。",
        "icon": "dignity",
        "tone": "coral"
      },
      {
        "order": 8,
        "title": "再発防止と振り返り",
        "text": "原因を構造で捉え、改善後に再確認します。",
        "icon": "improve",
        "tone": "aqua"
      }
    ],
    "voices": [
      {
        "order": 1,
        "number": "6",
        "title": "現場はどこで詰まっているか",
        "text": "業務の停滞や判断の集中を確認します。",
        "tone": "purple"
      },
      {
        "order": 2,
        "number": "7",
        "title": "管理者は抱え込んでいないか",
        "text": "管理者負担と代替体制を確認します。",
        "tone": "gold"
      },
      {
        "order": 3,
        "number": "14",
        "title": "緊急時に本当に動ける準備があるか",
        "text": "初動、連絡、役割分担を確認します。",
        "tone": "blue"
      },
      {
        "order": 4,
        "number": "15",
        "title": "相談できる空気と初動体制があるか",
        "text": "早期報告と相談のしやすさを確認します。",
        "tone": "aqua"
      },
      {
        "order": 5,
        "number": "16",
        "title": "尊厳を守るケアが続いているか",
        "text": "安全と尊厳を両立できているか確認します。",
        "tone": "green"
      },
      {
        "order": 6,
        "number": "17",
        "title": "記録と情報共有の安全が守られているか",
        "text": "記録、閲覧、共有、引き継ぎを確認します。",
        "tone": "coral"
      },
      {
        "order": 7,
        "number": "18",
        "title": "ヒヤリが再発防止に変わっているか",
        "text": "報告後の改善と再確認を確認します。",
        "tone": "gold"
      }
    ],
    "industries": [
      {
        "order": 1,
        "title": "飲食・店舗",
        "text": "異物混入、アレルギー、火傷、転倒、誤提供、衛生管理。",
        "icon": "restaurant",
        "tone": "gold"
      },
      {
        "order": 2,
        "title": "ホテル・サービス",
        "text": "夜間対応、鍵、個人情報、転倒、クレーム、引き継ぎ。",
        "icon": "hotel",
        "tone": "blue"
      },
      {
        "order": 3,
        "title": "医療・介護・福祉",
        "text": "急変、転倒、誤薬、記録、尊厳、情報共有。",
        "icon": "care",
        "tone": "green"
      },
      {
        "order": 4,
        "title": "教育・一般企業",
        "text": "事故、災害、ハラスメント、情報漏えい、緊急連絡。",
        "icon": "education",
        "tone": "purple"
      }
    ],
    "flow": [
      {
        "order": 1,
        "title": "気づく",
        "text": "ヒヤリ、違和感、小さな変化を拾います。",
        "tone": "coral"
      },
      {
        "order": 2,
        "title": "報告する",
        "text": "必要な相手へ、早く正確に伝えます。",
        "tone": "blue"
      },
      {
        "order": 3,
        "title": "初動対応",
        "text": "安全確保、連絡、判断、役割分担を行います。",
        "tone": "aqua"
      },
      {
        "order": 4,
        "title": "記録する",
        "text": "事実、時刻、対応、経過を残します。",
        "tone": "purple"
      },
      {
        "order": 5,
        "title": "共有する",
        "text": "必要な範囲へ学びと注意点を伝えます。",
        "tone": "green"
      },
      {
        "order": 6,
        "title": "振り返る",
        "text": "個人責任だけでなく、手順や環境を確認します。",
        "tone": "gold"
      },
      {
        "order": 7,
        "title": "改善・再確認",
        "text": "改善を実行し、変化と定着を確かめます。",
        "tone": "coral"
      }
    ],
    "deliverables": [
      {
        "order": 1,
        "title": "安全管理の現在地",
        "text": "体制、手順、記録、共有の状態を整理します。",
        "tone": "blue"
      },
      {
        "order": 2,
        "title": "優先リスク",
        "text": "先に確認・改善する危険や詰まりを示します。",
        "tone": "coral"
      },
      {
        "order": 3,
        "title": "緊急時対応フロー",
        "text": "初動、連絡、判断の流れを整理します。",
        "tone": "aqua"
      },
      {
        "order": 4,
        "title": "連絡体制",
        "text": "誰が誰へ連絡するかを明確にします。",
        "tone": "purple"
      },
      {
        "order": 5,
        "title": "確認チェックリスト",
        "text": "日常・緊急時の確認項目を整理します。",
        "tone": "green"
      },
      {
        "order": 6,
        "title": "改善行動計画",
        "text": "担当、期限、確認方法を含めて整理します。",
        "tone": "gold"
      },
      {
        "order": 7,
        "title": "振り返り記録",
        "text": "起きた事実と改善内容を残します。",
        "tone": "coral"
      },
      {
        "order": 8,
        "title": "再確認ポイント",
        "text": "改善後に確かめる変化を示します。",
        "tone": "blue"
      }
    ]
  },
  "faq": [
    {
      "q": "事故が起きていなくても必要ですか？",
      "a": "必要です。事故になる前のヒヤリ、迷い、手順の曖昧さを確認することで、事故を未然に防ぐ材料になります。"
    },
    {
      "q": "ヒヤリハットだけでも確認できますか？",
      "a": "確認できます。実際の事故だけでなく、未遂事例や小さな違和感を再発防止へつなげます。"
    },
    {
      "q": "個人の責任追及に使いますか？",
      "a": "個人を責めるためではなく、手順、環境、連携、教育など組織の仕組みを改善する材料として扱います。"
    },
    {
      "q": "匿名で報告できますか？",
      "a": "目的や人数に応じて、匿名性に配慮した確認方法を設計できます。"
    },
    {
      "q": "小規模な事業所でも使えますか？",
      "a": "使えます。少人数でも、初動、連絡、記録、引き継ぎなどを整理できます。"
    },
    {
      "q": "複数店舗・事業所を比較できますか？",
      "a": "可能です。拠点ごとの違いと共通課題を確認し、全体と個別の改善へつなげます。"
    },
    {
      "q": "事故後の振り返りにも使えますか？",
      "a": "使えます。起きた場面、対応、記録、共有、改善内容を整理し、再発防止へつなげます。"
    },
    {
      "q": "法定の安全監査や認証の代わりになりますか？",
      "a": "代わりにはなりません。法定監査、安全認証、専門家による法令確認とは別の、現場改善のための確認・支援です。"
    }
  ]
};
  const ICONS = {"manual": "<svg viewBox=\"0 0 64 64\"><path d=\"M14 10h36v44H14z\"/><path d=\"M22 22h20M22 31h20M22 40h13\"/><path d=\"M42 40h8M46 36v8\"/></svg>", "handover": "<svg viewBox=\"0 0 64 64\"><path d=\"M10 18h19v28H10zM35 18h19v28H35z\"/><path d=\"M29 25h6M29 39h6\"/><path d=\"m24 31 5-5 5 5M40 33l-5 5-5-5\"/></svg>", "report": "<svg viewBox=\"0 0 64 64\"><path d=\"M10 14h44v30H31L19 54V44h-9z\"/><path d=\"M21 27h22M21 35h15\"/></svg>", "manager": "<svg viewBox=\"0 0 64 64\"><circle cx=\"32\" cy=\"19\" r=\"9\"/><path d=\"M16 52c1-14 7-22 16-22s15 8 16 22\"/><path d=\"M9 39h10M45 39h10M13 34v10M51 34v10\"/></svg>", "facility": "<svg viewBox=\"0 0 64 64\"><path d=\"M9 52V18h46v34\"/><path d=\"M17 27h8v8h-8zM39 27h8v8h-8z\"/><path d=\"M24 52V41h16v11M6 52h52\"/></svg>", "busy": "<svg viewBox=\"0 0 64 64\"><circle cx=\"32\" cy=\"32\" r=\"22\"/><path d=\"M32 18v15l10 6\"/><path d=\"M12 12l8 8M52 12l-8 8\"/></svg>", "customer": "<svg viewBox=\"0 0 64 64\"><circle cx=\"25\" cy=\"20\" r=\"8\"/><path d=\"M10 52c1-14 7-22 15-22s14 8 15 22\"/><path d=\"M43 25h12v20H43z\"/></svg>", "worker": "<svg viewBox=\"0 0 64 64\"><circle cx=\"32\" cy=\"19\" r=\"9\"/><path d=\"M16 52c1-14 7-22 16-22s15 8 16 22\"/><path d=\"M22 12h20\"/></svg>", "data": "<svg viewBox=\"0 0 64 64\"><rect x=\"12\" y=\"27\" width=\"40\" height=\"28\" rx=\"6\"/><path d=\"M21 27v-8c0-7 5-12 11-12s11 5 11 12v8\"/><circle cx=\"32\" cy=\"40\" r=\"4\"/></svg>", "continuity": "<svg viewBox=\"0 0 64 64\"><path d=\"M14 29c2-11 11-18 22-18 7 0 13 3 17 8\"/><path d=\"m44 10 9 9-12 3\"/><path d=\"M50 35c-2 11-11 18-22 18-7 0-13-3-17-8\"/><path d=\"m20 54-9-9 12-3\"/></svg>", "warning": "<svg viewBox=\"0 0 64 64\"><path d=\"M32 8 57 54H7z\"/><path d=\"M32 23v14M32 45h.1\"/></svg>", "emergency": "<svg viewBox=\"0 0 64 64\"><path d=\"M12 52h40\"/><path d=\"M19 42c0-13 5-25 13-25s13 12 13 25\"/><path d=\"M32 9v8M12 23l7 4M52 23l-7 4\"/></svg>", "communication": "<svg viewBox=\"0 0 64 64\"><path d=\"M9 13h46v31H32L20 54V44H9z\"/><path d=\"M20 26h24M20 34h16\"/></svg>", "record": "<svg viewBox=\"0 0 64 64\"><path d=\"M14 10h28l8 8v36H14z\"/><path d=\"M42 10v10h10M22 31h20M22 40h20\"/></svg>", "hygiene": "<svg viewBox=\"0 0 64 64\"><path d=\"M17 43c11 3 24-2 28-15 3 16-8 27-22 27-8 0-14-4-17-10 4 0 8-1 11-2z\"/><path d=\"M43 13h10l-8 10h10\"/></svg>", "dignity": "<svg viewBox=\"0 0 64 64\"><path d=\"M32 53C21 44 11 37 11 26c0-7 5-12 12-12 4 0 8 2 9 6 2-4 5-6 10-6 7 0 12 5 12 12 0 11-10 18-22 27z\"/><path d=\"M23 34h18\"/></svg>", "improve": "<svg viewBox=\"0 0 64 64\"><path d=\"M14 29c2-11 11-18 22-18 7 0 13 3 17 8\"/><path d=\"m44 10 9 9-12 3\"/><path d=\"M50 35c-2 11-11 18-22 18-7 0-13-3-17-8\"/><path d=\"m20 54-9-9 12-3\"/></svg>", "restaurant": "<svg viewBox=\"0 0 64 64\"><path d=\"M10 38h44c0 11-8 18-22 18S10 49 10 38z\"/><path d=\"M18 32c0-6 4-8 4-14M32 32c0-6 4-8 4-14M46 32c0-6 4-8 4-14\"/></svg>", "hotel": "<svg viewBox=\"0 0 64 64\"><path d=\"M8 50V22h48v28M14 36h36M16 22v-8h16v8M32 22v-8h16v8\"/><path d=\"M6 50h52\"/></svg>", "care": "<svg viewBox=\"0 0 64 64\"><path d=\"M11 49V27h42v22\"/><path d=\"M19 27V16h26v11M8 49h48\"/><path d=\"M32 31v12M26 37h12\"/></svg>", "education": "<svg viewBox=\"0 0 64 64\"><path d=\"M8 20 32 8l24 12-24 12z\"/><path d=\"M16 26v17c8 7 24 7 32 0V26\"/></svg>"};
  const BRAND_PATTERN = /クロスメソッド™︎?/g;
  const BRAND_NAME = "クロスメソッド™";
  const $ = (selector) => document.querySelector(selector);

  const MOBILE_TITLES = {
    "#hero-title": [
      "安全を、",
      "個人の注意だけに任せない。",
      "小さな違和感から、",
      "事故を防ぐ仕組みへ。"
    ],
    "#definition-title": [
      "安全管理は、",
      "事故が起きた後に",
      "責任を探すことではなく、",
      "事故が起きにくい",
      "仕組みをつくることです。"
    ],
    "#signals-title": [
      "事故の前には、",
      "小さなサインが表れます。"
    ],
    "#protect-title": [
      "安全管理で守るものは、",
      "事故の有無だけでは",
      "ありません。"
    ],
    "#themes-title": ["確認する主な安全テーマ"],
    "#voices-title": [
      "クロスメソッド™で確認する、",
      "安全管理につながる声"
    ],
    "#difference-title": [
      "誰かを責めるためではなく、",
      "同じことを繰り返さない",
      "ために確認します。"
    ],
    "#industries-title": [
      "業種が違っても、",
      "安全管理の基本は",
      "共通しています。"
    ],
    "#flow-title": [
      "気づきから再確認まで、",
      "7つの流れで整理します。"
    ],
    "#deliverables-title": ["支援後に整理される内容"],
    "#related-title": [
      "安全課題の背景に合わせて、",
      "関連する支援も",
      "確認できます。"
    ],
    "#faq-title": ["よくある質問"],
    "#cta-title": [
      "事故が起きる前に、",
      "確認しておくべきことが",
      "あります。"
    ]
  };

  let currentPageData = null;
  let resizeTimer = 0;

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
      '<span class="rs-inline-brand">クロスメソッド™</span>'
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
      brand.className = "rs-inline-brand";
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

  function getTitleLines(selector, value) {
    if (
      window.matchMedia("(max-width: 760px)").matches &&
      MOBILE_TITLES[selector]
    ) {
      return MOBILE_TITLES[selector];
    }

    return String(value || "").split("\n").filter(Boolean);
  }

  function setTitle(selector, value) {
    const el = $(selector);
    if (!el) return;

    el.innerHTML = "";

    getTitleLines(selector, value).forEach((line) => {
      const span = document.createElement("span");
      span.className = "rs-title-line";
      appendBrandAwareText(span, line);
      el.appendChild(span);
    });
  }

  async function fetchData() {
    try {
      const url = new URL(API_URL);
      url.searchParams.set("action", "riskSafetyPage");

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

      return {
        hero: Object.assign({}, DEFAULT_DATA.hero, result.data.hero || {}),
        sections: Object.assign({}, DEFAULT_DATA.sections, result.data.sections || {}),
        cards: Object.assign({}, DEFAULT_DATA.cards, result.data.cards || {}),
        faq: Array.isArray(result.data.faq) && result.data.faq.length
          ? result.data.faq
          : DEFAULT_DATA.faq
      };
    } catch (error) {
      console.warn("risk-safety fallback", error);
      return structuredClone(DEFAULT_DATA);
    }
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
      "definition", "signals", "protect", "themes", "voices",
      "difference", "industries", "flow", "deliverables",
      "related", "faq", "cta"
    ].forEach((key) => {
      setTitle(`#${key}-title`, sections[key]?.title);
      setRichText(`#${key}-lead`, sections[key]?.lead);
    });

    setText("#cta-button-1", sections.cta?.button1);
    setText("#cta-button-2", sections.cta?.button2);
  }

  function iconSvg(type) {
    return ICONS[type] || ICONS.warning;
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

  function renderAllCards(cards) {
    renderCards(cards.signals, "#signals-list", "rs-card", (item) => `
      <div class="rs-card-icon" aria-hidden="true">${iconSvg(item.icon)}</div>
      <h3>${brandHtml(item.title)}</h3>
      <p>${brandHtml(item.text)}</p>
    `);

    renderCards(cards.protect, "#protect-list", "rs-protect-card", (item) => `
      <div class="rs-card-icon" aria-hidden="true">${iconSvg(item.icon)}</div>
      <h3>${brandHtml(item.title)}</h3>
      <p>${brandHtml(item.text)}</p>
    `);

    renderCards(cards.themes, "#themes-list", "rs-card", (item) => `
      <div class="rs-card-icon" aria-hidden="true">${iconSvg(item.icon)}</div>
      <h3>${brandHtml(item.title)}</h3>
      <p>${brandHtml(item.text)}</p>
    `);

    renderCards(cards.voices, "#voices-list", "rs-voice-card", (item) => `
      <div class="rs-voice-number">${escapeHtml(item.number || "")}</div>
      <div>
        <h3>${brandHtml(item.title)}</h3>
        <p>${brandHtml(item.text)}</p>
      </div>
    `);

    renderCards(cards.industries, "#industries-list", "rs-industry-card", (item) => `
      <div class="rs-card-icon" aria-hidden="true">${iconSvg(item.icon)}</div>
      <h3>${brandHtml(item.title)}</h3>
      <p>${brandHtml(item.text)}</p>
    `);

    renderCards(cards.flow, "#flow-list", "rs-flow-card", (item, index) => `
      <div class="rs-flow-number">${String(index + 1).padStart(2, "0")}</div>
      <h3>${brandHtml(item.title)}</h3>
      <p>${brandHtml(item.text)}</p>
    `);

    renderCards(cards.deliverables, "#deliverables-list", "rs-deliverable-card", (item) => `
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
      article.className = "rs-faq-item";
      article.innerHTML = `
        <button type="button" aria-expanded="false" aria-controls="rs-faq-${index}">
          Q. ${brandHtml(item.q || "")}
        </button>
        <div class="rs-faq-answer" id="rs-faq-${index}">
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
