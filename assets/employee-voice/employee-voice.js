(() => {
  "use strict";

  const API_URL = "https://script.google.com/macros/s/AKfycbxuGAYkdygkpMsxFQvxmSdu2TnRs7svrudmgwDVOQg9YKIAa1T-Q-v5YmXOf4b5fQCSJw/exec";
  const DEFAULT_DATA = {
  "hero": {
    "eyebrow": "Employee Voice",
    "title": "従業員の声から、\n組織の強みと改善の順番を視える化。",
    "lead": "組織診断は、従業員を評価するためのものではありません。従業員・現場・管理者・組織の声を集め、強み、業務の詰まり、管理者負担、理念や評価への納得感などを整理し、改善の優先順位へつなげます。",
    "badge1": "従業員の声",
    "badge2": "現場の詰まり",
    "badge3": "管理者負担",
    "badge4": "理念・評価"
  },
  "sections": {
    "definition": {
      "title": "組織診断は、\n従業員を評価するためではなく、\n組織を整えるための確認です。",
      "lead": "点数だけで良し悪しを決めるのではなく、声の背景にある仕組み、関わり方、情報共有、教育、業務の流れを確認します。"
    },
    "hidden": {
      "title": "数字だけでは、\n見えにくい組織の状態があります。",
      "lead": "離職率や平均点だけでは、本音の言いにくさ、管理者の抱え込み、理念と行動のずれ、属人化などが見えないことがあります。"
    },
    "layers": {
      "title": "組織を、\n4つの層から確認します。",
      "lead": "個人の状態だけに原因を求めず、現場、管理者、会社の仕組みまで分けて確認します。"
    },
    "themes": {
      "title": "組織診断で確認する、\n主なテーマ",
      "lead": "職場ごとの課題に合わせて、必要な声を組み合わせて確認します。"
    },
    "voices": {
      "title": "クロスメソッド™で確認する、\n組織改善につながる声",
      "lead": "トップページの18項目のうち、組織診断・従業員の声と特に関係するテーマをまとめています。"
    },
    "difference": {
      "title": "アンケートで終わらず、\n改善の判断材料へ変えます。",
      "lead": "回答を集計して終わらせず、強み、課題、声同士の関係、確認の優先順位を整理します。"
    },
    "industries": {
      "title": "人と組織がある職場なら、\n業種を問わず活用できます。",
      "lead": "医療・介護、飲食・ホテル、教育、一般企業、複数店舗・事業所など、職場の特徴に合わせて設計します。"
    },
    "deliverables": {
      "title": "診断後に整理される内容",
      "lead": "経営判断と現場共有に使える形で、現在地と次の行動を整理します。"
    },
    "flow": {
      "title": "目的確認から再確認まで、\n一つの流れで進めます。",
      "lead": "診断を実施して終わらず、改善テーマを決め、変化を確かめるところまでを見据えます。"
    },
    "related": {
      "title": "目的に合わせて、\n関連する支援も確認できます。",
      "lead": "健康経営、法定ストレスチェック、お客様の声・顧客体験は、それぞれ目的の異なる支援です。"
    },
    "faq": {
      "title": "よくある質問",
      "lead": "匿名性、対象人数、結果の使い方など、よくいただく質問をまとめています。"
    },
    "cta": {
      "title": "従業員の声を、\n組織改善へつなげたい方へ。",
      "lead": "何を確認すべきか決まっていない場合も、現在の課題と目的から診断テーマを整理します。",
      "button1": "無料体験診断を見る",
      "button2": "組織診断について相談する"
    }
  },
  "cards": {
    "hidden": [
      {
        "order": 1,
        "title": "本音を言いにくい",
        "text": "平均点は高くても、困りごとや違和感を伝えにくい場合があります。",
        "icon": "silence",
        "tone": "purple"
      },
      {
        "order": 2,
        "title": "管理者が抱えている",
        "text": "相談、育成、欠員対応を管理者だけが引き受けていることがあります。",
        "icon": "manager",
        "tone": "coral"
      },
      {
        "order": 3,
        "title": "理念が行動につながらない",
        "text": "会社の想いを知っていても、現場の判断や行動まで届いていないことがあります。",
        "icon": "idea",
        "tone": "blue"
      },
      {
        "order": 4,
        "title": "評価に納得できない",
        "text": "制度があっても、基準やフィードバックが行動変化につながらない場合があります。",
        "icon": "evaluation",
        "tone": "gold"
      },
      {
        "order": 5,
        "title": "新人が相談できない",
        "text": "定着しているように見えても、迷いや不安を抱えていることがあります。",
        "icon": "newcomer",
        "tone": "green"
      },
      {
        "order": 6,
        "title": "業務が属人化している",
        "text": "仕事は回っていても、特定の人に知識や判断が集中していることがあります。",
        "icon": "workflow",
        "tone": "aqua"
      }
    ],
    "layers": [
      {
        "order": 1,
        "title": "個人",
        "text": "働く実感、幸せ、継続意向、本音を確認します。",
        "icon": "person",
        "tone": "green",
        "keywords": "幸せ／継続意向／本音"
      },
      {
        "order": 2,
        "title": "チーム・現場",
        "text": "業務の詰まり、連携、新人の声、情報共有を確認します。",
        "icon": "team",
        "tone": "aqua",
        "keywords": "詰まり／連携／新人"
      },
      {
        "order": 3,
        "title": "管理者",
        "text": "抱え込み、面談、育成、相談を受け止める体制を確認します。",
        "icon": "manager",
        "tone": "coral",
        "keywords": "抱え込み／面談／育成"
      },
      {
        "order": 4,
        "title": "会社・組織",
        "text": "理念、評価、会社理解、魅力、仕組みを確認します。",
        "icon": "company",
        "tone": "blue",
        "keywords": "理念／評価／魅力"
      }
    ],
    "themes": [
      {
        "order": 1,
        "title": "従業員の幸せ",
        "text": "心の余裕や働く実感を確認します。",
        "icon": "smile",
        "tone": "green"
      },
      {
        "order": 2,
        "title": "継続意向・定着",
        "text": "ここで働き続けたい理由と不安を確認します。",
        "icon": "continue",
        "tone": "blue"
      },
      {
        "order": 3,
        "title": "理念・会社理解",
        "text": "会社の想いが現場の行動へ届いているかを確認します。",
        "icon": "idea",
        "tone": "gold"
      },
      {
        "order": 4,
        "title": "評価・納得感",
        "text": "評価の基準とフィードバックへの納得感を確認します。",
        "icon": "evaluation",
        "tone": "purple"
      },
      {
        "order": 5,
        "title": "業務の詰まり",
        "text": "仕事が止まる場面や属人化を確認します。",
        "icon": "workflow",
        "tone": "aqua"
      },
      {
        "order": 6,
        "title": "管理者の抱え込み",
        "text": "調整や相談対応が集中していないか確認します。",
        "icon": "manager",
        "tone": "coral"
      },
      {
        "order": 7,
        "title": "新人・若手の本音",
        "text": "迷い、質問、相談のしやすさを確認します。",
        "icon": "newcomer",
        "tone": "green"
      },
      {
        "order": 8,
        "title": "面談・相談できる空気",
        "text": "本音を伝え、早期に相談できる職場かを確認します。",
        "icon": "conversation",
        "tone": "purple"
      },
      {
        "order": 9,
        "title": "教育・育成",
        "text": "教え方、振り返り、成長支援を確認します。",
        "icon": "learning",
        "tone": "blue"
      },
      {
        "order": 10,
        "title": "会社の魅力",
        "text": "従業員が感じる魅力と伝わり方を確認します。",
        "icon": "attraction",
        "tone": "gold"
      }
    ],
    "voices": [
      {
        "order": 1,
        "number": "2",
        "title": "従業員は今、幸せか",
        "text": "心の余裕と働く実感を確認します。",
        "tone": "green"
      },
      {
        "order": 2,
        "number": "3",
        "title": "ここで働き続けたいか",
        "text": "定着につながる理由と不安を確認します。",
        "tone": "blue"
      },
      {
        "order": 3,
        "number": "4",
        "title": "会社の想いは行動まで届いているか",
        "text": "理念と現場行動のつながりを確認します。",
        "tone": "gold"
      },
      {
        "order": 4,
        "number": "5",
        "title": "頑張りが報われる仕組みか",
        "text": "評価と納得感を確認します。",
        "tone": "aqua"
      },
      {
        "order": 5,
        "number": "6",
        "title": "現場はどこで詰まっているか",
        "text": "業務の停滞と属人化を確認します。",
        "tone": "purple"
      },
      {
        "order": 6,
        "number": "7",
        "title": "管理者は抱え込んでいないか",
        "text": "管理者負担と支援体制を確認します。",
        "tone": "coral"
      },
      {
        "order": 7,
        "number": "8",
        "title": "新人は本音を言えているか",
        "text": "新人の不安と相談しやすさを確認します。",
        "tone": "green"
      },
      {
        "order": 8,
        "number": "10",
        "title": "面談で本音を引き出せているか",
        "text": "面談の質と日常の関係性を確認します。",
        "tone": "purple"
      },
      {
        "order": 9,
        "number": "12",
        "title": "会社の魅力は伝わっているか",
        "text": "働く人が感じる魅力を確認します。",
        "tone": "blue"
      },
      {
        "order": 10,
        "number": "13",
        "title": "評価は行動変化につながっているか",
        "text": "評価後の成長と行動を確認します。",
        "tone": "gold"
      },
      {
        "order": 11,
        "number": "15",
        "title": "相談できる空気があるか",
        "text": "早期相談と初動体制を確認します。",
        "tone": "aqua"
      }
    ],
    "industries": [
      {
        "order": 1,
        "title": "医療・介護・福祉",
        "text": "多職種連携、管理者負担、尊厳、教育、定着などを確認します。",
        "icon": "care",
        "tone": "green"
      },
      {
        "order": 2,
        "title": "飲食・ホテル・サービス",
        "text": "店舗連携、接客教育、新人育成、店長負担などを確認します。",
        "icon": "service",
        "tone": "gold"
      },
      {
        "order": 3,
        "title": "教育",
        "text": "教職員の負担、相談、理念、連携、育成を確認します。",
        "icon": "education",
        "tone": "blue"
      },
      {
        "order": 4,
        "title": "一般企業",
        "text": "部門連携、評価、管理職支援、定着、会社理解を確認します。",
        "icon": "business",
        "tone": "purple"
      },
      {
        "order": 5,
        "title": "複数店舗・事業所",
        "text": "拠点別の違いと共通課題を比較して確認します。",
        "icon": "multiple",
        "tone": "aqua"
      }
    ],
    "deliverables": [
      {
        "order": 1,
        "title": "総合結果",
        "text": "組織全体の現在地を整理します。",
        "tone": "blue"
      },
      {
        "order": 2,
        "title": "強み",
        "text": "維持・活用したい力を整理します。",
        "tone": "green"
      },
      {
        "order": 3,
        "title": "改善優先テーマ",
        "text": "先に確認・改善するテーマを示します。",
        "tone": "purple"
      },
      {
        "order": 4,
        "title": "設問別の傾向",
        "text": "項目ごとの回答傾向を整理します。",
        "tone": "aqua"
      },
      {
        "order": 5,
        "title": "部署・店舗別比較",
        "text": "必要に応じて拠点や部署の違いを確認します。",
        "tone": "gold"
      },
      {
        "order": 6,
        "title": "自由記述",
        "text": "数値に表れない言葉を確認します。",
        "tone": "coral"
      },
      {
        "order": 7,
        "title": "総評",
        "text": "強みと確認ポイントを文章で整理します。",
        "tone": "blue"
      },
      {
        "order": 8,
        "title": "改善テーマ",
        "text": "教育・業務・仕組みの改善材料へ変えます。",
        "tone": "green"
      }
    ],
    "flow": [
      {
        "order": 1,
        "title": "目的確認",
        "text": "何を判断し、何を改善したいかを確認します。",
        "tone": "blue"
      },
      {
        "order": 2,
        "title": "診断設計",
        "text": "対象、テーマ、回答方法を決めます。",
        "tone": "aqua"
      },
      {
        "order": 3,
        "title": "回答",
        "text": "従業員や対象者が診断へ回答します。",
        "tone": "green"
      },
      {
        "order": 4,
        "title": "集計・視える化",
        "text": "強み、課題、傾向、優先順位を整理します。",
        "tone": "purple"
      },
      {
        "order": 5,
        "title": "レポート",
        "text": "経営と現場で共有できる形へまとめます。",
        "tone": "gold"
      },
      {
        "order": 6,
        "title": "改善テーマ決定",
        "text": "実行するテーマ、担当、確認方法を決めます。",
        "tone": "coral"
      },
      {
        "order": 7,
        "title": "再確認",
        "text": "改善後に声を集め、変化を確かめます。",
        "tone": "green"
      }
    ]
  },
  "faq": [
    {
      "q": "従業員の個人評価に使いますか？",
      "a": "個人を評価・選別するためではなく、組織の仕組み、職場環境、教育、連携を改善する材料として扱います。"
    },
    {
      "q": "匿名で回答できますか？",
      "a": "目的や対象人数に応じて、匿名性に配慮した回答方法を設計できます。少人数部署では個人が推測されない集計方法も検討します。"
    },
    {
      "q": "少人数の会社でも実施できますか？",
      "a": "実施できます。会社規模や対象人数に合わせて、設問、集計単位、結果の返し方を調整します。"
    },
    {
      "q": "複数店舗・部署を比較できますか？",
      "a": "可能です。回答数や匿名性へ配慮しながら、店舗・部署・役割などの違いを確認できます。"
    },
    {
      "q": "自由記述も確認できますか？",
      "a": "確認できます。数値だけでは分からない背景や具体的な体験を、改善のヒントとして扱います。"
    },
    {
      "q": "結果はどのように返されますか？",
      "a": "総合結果、強み、改善優先テーマ、設問別傾向、総評などをレポートとして整理します。"
    },
    {
      "q": "悪い点だけを指摘されますか？",
      "a": "いいえ。維持したい強みと、次に確認・改善するテーマの両方を整理します。"
    },
    {
      "q": "ストレスチェックの代わりになりますか？",
      "a": "代わりにはなりません。労働安全衛生法に基づくストレスチェック制度とは別の組織診断です。"
    }
  ]
};
  const ICONS = {"silence": "<svg viewBox=\"0 0 64 64\"><path d=\"M10 14h44v30H31L19 54V44h-9z\"/><path d=\"m24 25 16 16M40 25 24 41\"/></svg>", "manager": "<svg viewBox=\"0 0 64 64\"><circle cx=\"32\" cy=\"19\" r=\"9\"/><path d=\"M16 52c1-14 7-22 16-22s15 8 16 22\"/><path d=\"M9 39h10M45 39h10M13 34v10M51 34v10\"/></svg>", "idea": "<svg viewBox=\"0 0 64 64\"><path d=\"M20 38c-5-4-8-10-7-17 1-10 9-17 19-17s18 7 19 17c1 7-2 13-7 17-3 2-4 5-4 8H24c0-3-1-6-4-8z\"/><path d=\"M25 52h14M28 58h8\"/></svg>", "evaluation": "<svg viewBox=\"0 0 64 64\"><path d=\"M14 10h36v44H14z\"/><path d=\"M22 23h20M22 32h20M22 41h12\"/><path d=\"m38 47 5 5 9-12\"/></svg>", "newcomer": "<svg viewBox=\"0 0 64 64\"><circle cx=\"25\" cy=\"20\" r=\"8\"/><path d=\"M10 52c1-14 7-22 15-22s14 8 15 22\"/><path d=\"M45 17v26M37 25h16\"/></svg>", "workflow": "<svg viewBox=\"0 0 64 64\"><rect x=\"8\" y=\"12\" width=\"18\" height=\"14\" rx=\"3\"/><rect x=\"38\" y=\"12\" width=\"18\" height=\"14\" rx=\"3\"/><rect x=\"23\" y=\"40\" width=\"18\" height=\"14\" rx=\"3\"/><path d=\"M26 19h12M17 26v7h15v7M47 26v7H32\"/></svg>", "person": "<svg viewBox=\"0 0 64 64\"><circle cx=\"32\" cy=\"19\" r=\"9\"/><path d=\"M16 52c1-14 7-22 16-22s15 8 16 22\"/></svg>", "team": "<svg viewBox=\"0 0 64 64\"><circle cx=\"22\" cy=\"21\" r=\"8\"/><circle cx=\"43\" cy=\"21\" r=\"8\"/><path d=\"M9 52c1-13 6-20 13-20s12 7 13 20M30 52c1-13 6-20 13-20s12 7 13 20\"/></svg>", "company": "<svg viewBox=\"0 0 64 64\"><path d=\"M9 52V18h46v34\"/><path d=\"M18 26h7v7h-7zM39 26h7v7h-7zM24 52V40h16v12M6 52h52\"/></svg>", "smile": "<svg viewBox=\"0 0 64 64\"><circle cx=\"32\" cy=\"32\" r=\"22\"/><path d=\"M23 27h1M40 27h1M22 38c3 6 9 9 16 6 2-1 4-3 5-6\"/></svg>", "continue": "<svg viewBox=\"0 0 64 64\"><path d=\"M12 32h36\"/><path d=\"m38 20 12 12-12 12\"/><path d=\"M17 19v26\"/></svg>", "conversation": "<svg viewBox=\"0 0 64 64\"><path d=\"M9 13h46v31H32L20 54V44H9z\"/><path d=\"M20 26h24M20 34h16\"/></svg>", "learning": "<svg viewBox=\"0 0 64 64\"><path d=\"M7 20 32 8l25 12-25 12z\"/><path d=\"M16 26v16c8 7 24 7 32 0V26M54 22v18\"/></svg>", "attraction": "<svg viewBox=\"0 0 64 64\"><path d=\"m32 8 7 14 16 2-12 11 3 16-14-8-14 8 3-16L9 24l16-2z\"/></svg>", "care": "<svg viewBox=\"0 0 64 64\"><path d=\"M32 53C21 44 11 37 11 26c0-7 5-12 12-12 4 0 8 2 9 6 2-4 5-6 10-6 7 0 12 5 12 12 0 11-10 18-22 27z\"/><path d=\"M23 34h18\"/></svg>", "service": "<svg viewBox=\"0 0 64 64\"><path d=\"M10 38h44c0 10-8 17-22 17S10 48 10 38z\"/><path d=\"M17 33c0-6 4-8 4-14M31 33c0-6 4-8 4-14M45 33c0-6 4-8 4-14\"/></svg>", "education": "<svg viewBox=\"0 0 64 64\"><path d=\"M8 20 32 8l24 12-24 12z\"/><path d=\"M16 26v17c8 7 24 7 32 0V26\"/></svg>", "business": "<svg viewBox=\"0 0 64 64\"><rect x=\"9\" y=\"18\" width=\"46\" height=\"34\" rx=\"5\"/><path d=\"M23 18v-6h18v6M9 31h46\"/><path d=\"M27 29h10v6H27z\"/></svg>", "multiple": "<svg viewBox=\"0 0 64 64\"><rect x=\"8\" y=\"12\" width=\"20\" height=\"18\" rx=\"3\"/><rect x=\"36\" y=\"12\" width=\"20\" height=\"18\" rx=\"3\"/><rect x=\"22\" y=\"38\" width=\"20\" height=\"18\" rx=\"3\"/><path d=\"M28 21h8M18 30v7h14M46 30v7H32\"/></svg>"};
  const BRAND_PATTERN = /クロスメソッド™︎?/g;
  const BRAND_NAME = "クロスメソッド™";
  const $ = (selector) => document.querySelector(selector);

  const MOBILE_TITLES = {
    "#hero-title": [
      "従業員の声から、",
      "組織の強みと、",
      "改善の順番を視える化。"
    ],
    "#definition-title": [
      "組織診断は、",
      "従業員を評価する",
      "ためではなく、",
      "組織を整えるための",
      "確認です。"
    ],
    "#hidden-title": [
      "数字だけでは、",
      "見えにくい組織の",
      "状態があります。"
    ],
    "#layers-title": [
      "組織を、",
      "4つの層から確認します。"
    ],
    "#themes-title": [
      "組織診断で確認する、",
      "主なテーマ"
    ],
    "#voices-title": [
      "クロスメソッド™で",
      "確認する、",
      "組織改善につながる声"
    ],
    "#difference-title": [
      "アンケートで終わらず、",
      "改善の判断材料へ",
      "変えます。"
    ],
    "#industries-title": [
      "人と組織がある職場なら、",
      "業種を問わず",
      "活用できます。"
    ],
    "#deliverables-title": [
      "診断後に整理される内容"
    ],
    "#flow-title": [
      "目的確認から再確認まで、",
      "一つの流れで進めます。"
    ],
    "#related-title": [
      "目的に合わせて、",
      "関連する支援も",
      "確認できます。"
    ],
    "#faq-title": ["よくある質問"],
    "#cta-title": [
      "従業員の声を、",
      "組織改善へ",
      "つなげたい方へ。"
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
      '<span class="ev-inline-brand">クロスメソッド™</span>'
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
      brand.className = "ev-inline-brand";
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
      span.className = "ev-title-line";
      appendBrandAwareText(span, line);
      el.appendChild(span);
    });
  }

  async function fetchData() {
    try {
      const url = new URL(API_URL);
      url.searchParams.set("action", "employeeVoicePage");

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
      console.warn("employee-voice fallback", error);
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
      "definition", "hidden", "layers", "themes", "voices",
      "difference", "industries", "deliverables", "flow",
      "related", "faq", "cta"
    ].forEach((key) => {
      setTitle(`#${key}-title`, sections[key]?.title);
      setRichText(`#${key}-lead`, sections[key]?.lead);
    });

    setText("#cta-button-1", sections.cta?.button1);
    setText("#cta-button-2", sections.cta?.button2);
  }

  function iconSvg(type) {
    return ICONS[type] || ICONS.workflow;
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
    renderCards(cards.hidden, "#hidden-list", "ev-card", (item) => `
      <div class="ev-card-icon" aria-hidden="true">${iconSvg(item.icon)}</div>
      <h3>${brandHtml(item.title)}</h3>
      <p>${brandHtml(item.text)}</p>
    `);

    renderCards(cards.layers, "#layers-list", "ev-layer-card", (item, index) => `
      <div class="ev-layer-number">0${index + 1}</div>
      <h3>${brandHtml(item.title)}</h3>
      <p>${brandHtml(item.text)}</p>
      <div class="ev-layer-keywords">
        ${String(item.keywords || "")
          .split("／")
          .filter(Boolean)
          .map((keyword) => `<span>${escapeHtml(keyword)}</span>`)
          .join("")}
      </div>
    `);

    renderCards(cards.themes, "#themes-list", "ev-card", (item) => `
      <div class="ev-card-icon" aria-hidden="true">${iconSvg(item.icon)}</div>
      <h3>${brandHtml(item.title)}</h3>
      <p>${brandHtml(item.text)}</p>
    `);

    renderCards(cards.voices, "#voices-list", "ev-voice-card", (item) => `
      <div class="ev-voice-number">${escapeHtml(item.number || "")}</div>
      <div>
        <h3>${brandHtml(item.title)}</h3>
        <p>${brandHtml(item.text)}</p>
      </div>
    `);

    renderCards(cards.industries, "#industries-list", "ev-industry-card", (item) => `
      <div class="ev-card-icon" aria-hidden="true">${iconSvg(item.icon)}</div>
      <h3>${brandHtml(item.title)}</h3>
      <p>${brandHtml(item.text)}</p>
    `);

    renderCards(cards.deliverables, "#deliverables-list", "ev-deliverable-card", (item) => `
      <h3>${brandHtml(item.title)}</h3>
      <p>${brandHtml(item.text)}</p>
    `);

    renderCards(cards.flow, "#flow-list", "ev-flow-card", (item, index) => `
      <div class="ev-flow-number">${String(index + 1).padStart(2, "0")}</div>
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
      article.className = "ev-faq-item";
      article.innerHTML = `
        <button type="button" aria-expanded="false" aria-controls="ev-faq-${index}">
          Q. ${brandHtml(item.q || "")}
        </button>
        <div class="ev-faq-answer" id="ev-faq-${index}">
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
