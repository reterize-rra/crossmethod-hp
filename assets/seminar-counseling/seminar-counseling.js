(()=>{"use strict";const API_URL="https://script.google.com/macros/s/AKfycbxuGAYkdygkpMsxFQvxmSdu2TnRs7svrudmgwDVOQg9YKIAa1T-Q-v5YmXOf4b5fQCSJw/exec";const DEFAULT_DATA={
  "hero": {
    "eyebrow": "Counseling & Seminar",
    "title": "話すことで、現在地を整理する。\n学ぶことで、次の一歩を見つける。",
    "lead": "組織や職場の課題は、すぐに答えを出すことより、まず状況を整理し、必要な支援を見極めることが大切です。個別の相談、テーマ別の学び、職場へ伺う出張セミナー・勉強会。目的に合った入口からご利用いただけます。",
    "badge1": "オンライン相談",
    "badge2": "テーマ別セミナー",
    "badge3": "出張セミナー・勉強会",
    "badge4": "企業・団体向け"
  },
  "sections": {
    "counseling": {
      "title": "まだ整理できていない悩みも、\n話すところから始められます。",
      "lead": "経営・組織・職場改善に関する相談窓口です。相談内容がまとまっていなくても、現在の状況と困っていることから一緒に整理します。"
    },
    "seminars": {
      "title": "知識を増やすだけでなく、\n職場で使える考え方を持ち帰る。",
      "lead": "組織、人材、健康、安全、顧客体験など、現場の課題につながるテーマを扱います。"
    },
    "travel": {
      "title": "職場へ伺い、\nその組織に必要な学びを届けます。",
      "lead": "企業・医療機関・介護施設・店舗・教育現場などへ伺い、現在の課題や参加者に合わせたセミナー・勉強会を開催します。決まった内容を一方的に伝えるのではなく、明日から使える考え方と行動へつなげます。"
    },
    "formats": {
      "title": "目的と人数に合わせて、\n開催形式を選べます。",
      "lead": "オンライン、対面、少人数、企業・団体単位など、目的に合わせて設計します。"
    },
    "flow": {
      "title": "相談・開催までの流れ",
      "lead": "目的、対象者、テーマを確認し、無理のない形で日時と内容を決めます。"
    },
    "rooms": {
      "title": "オンライン空間から、\n相談と学びへ進めます。",
      "lead": "現在は、カウンセリング室とセミナー室からZoomまたはGoogle Meet等へ進む導線を基本としています。"
    },
    "education": {
      "title": "新しい教育プログラムも、\n準備を進めています。",
      "lead": "人と組織の育ちを扱う新しい教育プログラムは、内容確定後にセミナー室へ追加します。現在の相談・セミナー・出張勉強会は先行してご利用いただけます。"
    },
    "related": {
      "title": "相談内容に合わせて、\n関連する支援も確認できます。",
      "lead": "組織、人材、健康、安全、顧客体験など、目的に合ったページへ進めます。"
    },
    "faq": {
      "title": "よくある質問",
      "lead": "相談内容、開催形式、出張対応、セミナーのカスタマイズについてまとめています。"
    },
    "cta": {
      "title": "相談からでも、\n学びからでも始められます。",
      "lead": "現在の状況や参加者に合わせて、個別相談・オンラインセミナー・出張勉強会のどれが適しているか整理します。",
      "button1": "オンライン相談を申し込む",
      "button2": "出張セミナーを相談する"
    }
  },
  "cards": {
    "counseling": [
      {
        "order": 1,
        "title": "従業員の本音が分からない",
        "text": "どの声を確認すべきか、現在の状況から整理します。",
        "icon": "voice",
        "tone": "aqua"
      },
      {
        "order": 2,
        "title": "離職や定着が気になる",
        "text": "人が離れる前に表れるサインと確認方法を整理します。",
        "icon": "retention",
        "tone": "blue"
      },
      {
        "order": 3,
        "title": "管理者が抱え込んでいる",
        "text": "管理者負担と、相談・連携体制を確認します。",
        "icon": "manager",
        "tone": "coral"
      },
      {
        "order": 4,
        "title": "健康経営を始めたい",
        "text": "現在の施策と、最初に整えるテーマを整理します。",
        "icon": "health",
        "tone": "green"
      },
      {
        "order": 5,
        "title": "ストレスチェックを導入したい",
        "text": "制度概要、対象、体制、実施時期を確認します。",
        "icon": "stress",
        "tone": "purple"
      },
      {
        "order": 6,
        "title": "顧客満足や接客を改善したい",
        "text": "顧客体験のどの接点を確認するか整理します。",
        "icon": "customer",
        "tone": "gold"
      },
      {
        "order": 7,
        "title": "安全管理を見直したい",
        "text": "ヒヤリ、初動、記録、再発防止の現在地を確認します。",
        "icon": "safety",
        "tone": "coral"
      },
      {
        "order": 8,
        "title": "必要な支援を判断できない",
        "text": "診断・相談・セミナーのどこから始めるか整理します。",
        "icon": "navigation",
        "tone": "aqua"
      }
    ],
    "seminars": [
      {
        "order": 1,
        "title": "従業員の声を組織改善へ",
        "text": "声を集め、改善の優先順位へつなげる考え方。",
        "icon": "voice",
        "tone": "aqua"
      },
      {
        "order": 2,
        "title": "人が離れる前の職場サイン",
        "text": "定着・離職防止のために確認したい変化。",
        "icon": "retention",
        "tone": "blue"
      },
      {
        "order": 3,
        "title": "管理者の抱え込みを減らす",
        "text": "判断・相談・育成が集中しない仕組みづくり。",
        "icon": "manager",
        "tone": "coral"
      },
      {
        "order": 4,
        "title": "面談で本音を引き出す",
        "text": "質問だけに頼らず、本音が出やすい関係を整える。",
        "icon": "counseling",
        "tone": "purple"
      },
      {
        "order": 5,
        "title": "健康経営を制度で終わらせない",
        "text": "働く人の健康を、実行と改善へつなげる。",
        "icon": "health",
        "tone": "green"
      },
      {
        "order": 6,
        "title": "ストレスチェック制度の基本",
        "text": "制度概要と導入準備、実施後の活用。",
        "icon": "stress",
        "tone": "blue"
      },
      {
        "order": 7,
        "title": "ヒヤリを再発防止へ変える",
        "text": "責任追及ではなく、手順・環境・連携を見直す。",
        "icon": "safety",
        "tone": "gold"
      },
      {
        "order": 8,
        "title": "お客様の声を教育改善へ",
        "text": "顧客体験を接客・説明・連携の改善へ変える。",
        "icon": "customer",
        "tone": "coral"
      },
      {
        "order": 9,
        "title": "治療・介護と仕事の両立支援",
        "text": "相談、休暇、情報共有、復帰支援を考える。",
        "icon": "balance",
        "tone": "green"
      }
    ],
    "travel": [
      {
        "order": 1,
        "title": "企業・施設へ訪問",
        "text": "職場や会場へ伺い、その場で開催します。",
        "icon": "visit",
        "tone": "blue"
      },
      {
        "order": 2,
        "title": "少人数の勉強会にも対応",
        "text": "部署・店舗・チーム単位でも開催できます。",
        "icon": "smallgroup",
        "tone": "aqua"
      },
      {
        "order": 3,
        "title": "内容をカスタマイズ",
        "text": "現在の課題、対象者、目的に合わせて設計します。",
        "icon": "custom",
        "tone": "purple"
      },
      {
        "order": 4,
        "title": "対象者別に設計",
        "text": "管理職、従業員、専門職など役割に合わせます。",
        "icon": "roles",
        "tone": "coral"
      },
      {
        "order": 5,
        "title": "ワークを組み合わせる",
        "text": "講義だけでなく、対話や振り返りを取り入れます。",
        "icon": "workshop",
        "tone": "green"
      },
      {
        "order": 6,
        "title": "オンライン併用も可能",
        "text": "事前相談や振り返りをオンラインで行えます。",
        "icon": "online",
        "tone": "gold"
      }
    ],
    "formats": [
      {
        "order": 1,
        "title": "社内研修",
        "text": "会社全体の共通理解をつくります。",
        "icon": "company",
        "tone": "blue"
      },
      {
        "order": 2,
        "title": "管理職研修",
        "text": "管理者の役割、面談、育成、初動を扱います。",
        "icon": "manager",
        "tone": "coral"
      },
      {
        "order": 3,
        "title": "職員勉強会",
        "text": "現場で必要なテーマを短時間で学びます。",
        "icon": "learning",
        "tone": "green"
      },
      {
        "order": 4,
        "title": "少人数ワークショップ",
        "text": "対話とワークを中心に進めます。",
        "icon": "workshop",
        "tone": "aqua"
      },
      {
        "order": 5,
        "title": "店舗・事業所単位",
        "text": "現場ごとの課題に合わせて開催します。",
        "icon": "site",
        "tone": "gold"
      },
      {
        "order": 6,
        "title": "複数拠点合同開催",
        "text": "共通テーマを複数拠点で共有します。",
        "icon": "multiple",
        "tone": "purple"
      }
    ],
    "flow": [
      {
        "order": 1,
        "title": "お問い合わせ",
        "text": "相談・セミナー・出張開催の希望を伺います。",
        "icon": "contact",
        "tone": "aqua"
      },
      {
        "order": 2,
        "title": "目的と対象者を確認",
        "text": "現在の課題、参加者、人数を整理します。",
        "icon": "target",
        "tone": "blue"
      },
      {
        "order": 3,
        "title": "テーマと内容を設計",
        "text": "必要な内容と進め方を組み立てます。",
        "icon": "custom",
        "tone": "purple"
      },
      {
        "order": 4,
        "title": "日時・形式を決定",
        "text": "オンライン、対面、出張、会場を決めます。",
        "icon": "calendar",
        "tone": "gold"
      },
      {
        "order": 5,
        "title": "相談・セミナー実施",
        "text": "目的に合わせて対話・講義・ワークを行います。",
        "icon": "seminar",
        "tone": "green"
      },
      {
        "order": 6,
        "title": "必要に応じて次の支援へ",
        "text": "診断、改善支援、振り返りへつなげます。",
        "icon": "next",
        "tone": "coral"
      }
    ]
  },
  "faq": [
    {
      "q": "相談内容が整理できていなくても大丈夫ですか？",
      "a": "大丈夫です。現在困っていることや気になっていることから、確認すべきテーマと次の行動を整理します。"
    },
    {
      "q": "オンラインで相談できますか？",
      "a": "対応できます。ZoomやGoogle Meet等を利用し、個別相談や事前打ち合わせを行います。"
    },
    {
      "q": "企業単位でセミナーを依頼できますか？",
      "a": "依頼できます。企業・団体・施設・店舗など、組織単位でテーマを設計します。"
    },
    {
      "q": "少人数でも開催できますか？",
      "a": "可能です。部署やチーム単位の勉強会、少人数ワークショップにも対応します。"
    },
    {
      "q": "出張セミナーはどこでも開催できますか？",
      "a": "開催地域、日程、会場、人数を確認したうえでご案内します。遠方の場合は交通費等が必要になることがあります。"
    },
    {
      "q": "相談したら必ず診断を受ける必要がありますか？",
      "a": "必須ではありません。相談内容に応じて、診断・セミナー・改善支援の必要性を整理します。"
    },
    {
      "q": "医療や心理治療のカウンセリングですか？",
      "a": "医療行為や心理治療ではありません。経営、組織、職場改善、健康経営、制度導入等に関する相談です。"
    },
    {
      "q": "セミナー内容を企業に合わせて変更できますか？",
      "a": "可能です。課題、対象者、時間、参加人数に合わせて内容を調整します。"
    },
    {
      "q": "料金はどのように決まりますか？",
      "a": "内容、時間、人数、開催形式、訪問地域等を確認してお見積りします。"
    }
  ]
};const ICONS={"voice": "<svg viewBox=\"0 0 64 64\"><path d=\"M9 13h46v31H32L20 54V44H9z\"/><path d=\"M20 26h24M20 34h16\"/></svg>", "retention": "<svg viewBox=\"0 0 64 64\"><path d=\"M12 32h36\"/><path d=\"m38 20 12 12-12 12\"/><path d=\"M17 19v26\"/></svg>", "manager": "<svg viewBox=\"0 0 64 64\"><circle cx=\"32\" cy=\"19\" r=\"9\"/><path d=\"M16 52c1-14 7-22 16-22s15 8 16 22\"/><path d=\"M9 39h10M45 39h10\"/></svg>", "health": "<svg viewBox=\"0 0 64 64\"><path d=\"M32 53C21 44 11 37 11 26c0-7 5-12 12-12 4 0 8 2 9 6 2-4 5-6 10-6 7 0 12 5 12 12 0 11-10 18-22 27z\"/><path d=\"M20 34h8l4-8 6 16 4-8h8\"/></svg>", "stress": "<svg viewBox=\"0 0 64 64\"><path d=\"M17 46c-5-4-8-10-7-17 1-11 10-19 21-19 12 0 21 9 22 21 0 7-3 13-8 17\"/><path d=\"M24 28h16M23 37c3 3 6 5 9 5s6-2 9-5\"/></svg>", "customer": "<svg viewBox=\"0 0 64 64\"><circle cx=\"25\" cy=\"20\" r=\"8\"/><path d=\"M10 52c1-14 7-22 15-22s14 8 15 22\"/><path d=\"M43 20h12v26H43z\"/></svg>", "safety": "<svg viewBox=\"0 0 64 64\"><path d=\"M32 8 52 16v15c0 13-8 21-20 27C20 52 12 44 12 31V16z\"/><path d=\"m22 32 7 7 14-16\"/></svg>", "navigation": "<svg viewBox=\"0 0 64 64\"><circle cx=\"28\" cy=\"28\" r=\"17\"/><path d=\"m41 41 13 13\"/><path d=\"M19 29h18M28 20v18\"/></svg>", "counseling": "<svg viewBox=\"0 0 64 64\"><path d=\"M9 14h29v23H20L12 45v-8H9z\"/><path d=\"M29 26h26v22H44l-8 8v-8h-7z\"/></svg>", "balance": "<svg viewBox=\"0 0 64 64\"><path d=\"M32 10v44M16 18h32\"/><path d=\"m16 18-9 18h18zM48 18l-9 18h18z\"/><path d=\"M21 54h22\"/></svg>", "visit": "<svg viewBox=\"0 0 64 64\"><path d=\"M9 52V18h30v34M44 28h12v24H44zM6 52h52\"/><path d=\"M17 27h7v7h-7zM17 39h7v7h-7z\"/></svg>", "smallgroup": "<svg viewBox=\"0 0 64 64\"><circle cx=\"22\" cy=\"21\" r=\"8\"/><circle cx=\"43\" cy=\"21\" r=\"8\"/><path d=\"M9 52c1-13 6-20 13-20s12 7 13 20M30 52c1-13 6-20 13-20s12 7 13 20\"/></svg>", "custom": "<svg viewBox=\"0 0 64 64\"><path d=\"M13 12h38v40H13z\"/><path d=\"M22 23h20M22 32h14\"/><path d=\"m32 47 18-18 5 5-18 18-8 2z\"/></svg>", "roles": "<svg viewBox=\"0 0 64 64\"><circle cx=\"18\" cy=\"20\" r=\"7\"/><circle cx=\"32\" cy=\"18\" r=\"8\"/><circle cx=\"47\" cy=\"20\" r=\"7\"/><path d=\"M7 52c1-12 5-18 11-18M20 52c1-14 6-22 12-22s11 8 12 22M46 34c6 0 10 6 11 18\"/></svg>", "workshop": "<svg viewBox=\"0 0 64 64\"><rect x=\"8\" y=\"12\" width=\"20\" height=\"16\" rx=\"3\"/><rect x=\"36\" y=\"12\" width=\"20\" height=\"16\" rx=\"3\"/><rect x=\"22\" y=\"38\" width=\"20\" height=\"16\" rx=\"3\"/><path d=\"M28 20h8M18 28v6h14M46 28v6H32\"/></svg>", "online": "<svg viewBox=\"0 0 64 64\"><rect x=\"8\" y=\"13\" width=\"48\" height=\"34\" rx=\"5\"/><path d=\"M16 47v6M48 47v6M7 53h50\"/><circle cx=\"32\" cy=\"29\" r=\"8\"/></svg>", "company": "<svg viewBox=\"0 0 64 64\"><path d=\"M9 52V18h46v34\"/><path d=\"M18 26h7v7h-7zM39 26h7v7h-7zM24 52V40h16v12M6 52h52\"/></svg>", "learning": "<svg viewBox=\"0 0 64 64\"><path d=\"M8 20 32 8l24 12-24 12z\"/><path d=\"M16 26v17c8 7 24 7 32 0V26\"/></svg>", "site": "<svg viewBox=\"0 0 64 64\"><path d=\"M9 52V18h46v34\"/><path d=\"M17 27h8v8h-8zM39 27h8v8h-8zM24 52V41h16v11M6 52h52\"/></svg>", "multiple": "<svg viewBox=\"0 0 64 64\"><rect x=\"8\" y=\"12\" width=\"20\" height=\"18\" rx=\"3\"/><rect x=\"36\" y=\"12\" width=\"20\" height=\"18\" rx=\"3\"/><rect x=\"22\" y=\"38\" width=\"20\" height=\"18\" rx=\"3\"/><path d=\"M28 21h8M18 30v7h14M46 30v7H32\"/></svg>", "contact": "<svg viewBox=\"0 0 64 64\"><path d=\"M10 14h44v30H31L19 54V44h-9z\"/><path d=\"M21 27h22M21 35h15\"/></svg>", "target": "<svg viewBox=\"0 0 64 64\"><circle cx=\"32\" cy=\"32\" r=\"23\"/><circle cx=\"32\" cy=\"32\" r=\"14\"/><circle cx=\"32\" cy=\"32\" r=\"5\"/></svg>", "calendar": "<svg viewBox=\"0 0 64 64\"><rect x=\"10\" y=\"15\" width=\"44\" height=\"39\" rx=\"6\"/><path d=\"M10 26h44M20 9v12M44 9v12\"/></svg>", "seminar": "<svg viewBox=\"0 0 64 64\"><path d=\"M10 11h44v30H10z\"/><path d=\"M18 21h28M18 29h19M32 41v12M22 53h20\"/></svg>", "next": "<svg viewBox=\"0 0 64 64\"><path d=\"M12 32h36\"/><path d=\"m38 20 12 12-12 12\"/><circle cx=\"16\" cy=\"32\" r=\"7\"/></svg>"};const MOBILE_TITLES={"#hero-title": ["話すことで、", "現在地を整理する。", "学ぶことで、", "次の一歩を見つける。"], "#counseling-title": ["まだ整理できていない悩みも、", "話すところから", "始められます。"], "#seminars-title": ["知識を増やすだけでなく、", "職場で使える考え方を", "持ち帰る。"], "#travel-title": ["職場へ伺い、", "その組織に必要な学びを", "届けます。"], "#formats-title": ["目的と人数に合わせて、", "開催形式を選べます。"], "#flow-title": ["相談・開催までの流れ"], "#rooms-title": ["オンライン空間から、", "相談と学びへ進めます。"], "#education-title": ["新しい教育プログラムも、", "準備を進めています。"], "#related-title": ["相談内容に合わせて、", "関連する支援も", "確認できます。"], "#faq-title": ["よくある質問"], "#cta-title": ["相談からでも、", "学びからでも", "始められます。"]};const BRAND=/クロスメソッド™︎?/g,$=s=>document.querySelector(s);let current=null,timer=0;function esc(v){return String(v||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function rich(v){return esc(v).replace(BRAND,'<span class="scn-inline-brand">クロスメソッド™</span>')}function setText(s,v){const e=$(s);if(e)e.textContent=v||""}function lines(s,v){return matchMedia("(max-width:760px)").matches&&MOBILE_TITLES[s]?MOBILE_TITLES[s]:String(v||"").split("\n").filter(Boolean)}function setTitle(s,v){const e=$(s);if(!e)return;e.innerHTML=lines(s,v).map(x=>`<span class="scn-title-line">${rich(x)}</span>`).join("")}function setRich(s,v){const e=$(s);if(e)e.innerHTML=rich(v)}async function fetchData(){try{const u=new URL(API_URL);u.searchParams.set("action","seminarCounselingPage");const r=await fetch(u.toString(),{cache:"no-store",redirect:"follow"});if(!r.ok)throw Error(`HTTP ${r.status}`);const x=await r.json();if(!x?.success||!x?.data)throw Error(x?.message||"API error");return{hero:Object.assign({},DEFAULT_DATA.hero,x.data.hero||{}),sections:Object.assign({},DEFAULT_DATA.sections,x.data.sections||{}),cards:Object.assign({},DEFAULT_DATA.cards,x.data.cards||{}),faq:Array.isArray(x.data.faq)&&x.data.faq.length?x.data.faq:DEFAULT_DATA.faq}}catch(e){console.warn("seminar-counseling fallback",e);return structuredClone(DEFAULT_DATA)}}function icon(t){return ICONS[t]||ICONS.voice}function renderCards(items,sel,cls,fn){const w=$(sel);if(!w)return;w.innerHTML=(items||[]).slice().sort((a,b)=>Number(a.order||999)-Number(b.order||999)).map((x,i)=>`<article class="${cls} tone-${x.tone||"blue"}">${fn(x,i)}</article>`).join("")}function render(data){setText("#hero-eyebrow",data.hero.eyebrow);setTitle("#hero-title",data.hero.title);setRich("#hero-lead",data.hero.lead);const b=$("#hero-badges");if(b)b.innerHTML=[data.hero.badge1,data.hero.badge2,data.hero.badge3,data.hero.badge4].filter(Boolean).map(x=>`<span>${esc(x)}</span>`).join("");["counseling","seminars","travel","formats","flow","rooms","education","related","faq","cta"].forEach(k=>{setTitle(`#${k}-title`,data.sections[k]?.title);setRich(`#${k}-lead`,data.sections[k]?.lead)});setText("#cta-button-1",data.sections.cta?.button1);setText("#cta-button-2",data.sections.cta?.button2);["counseling","seminars","travel","formats"].forEach(g=>renderCards(data.cards[g],`#${g}-list`,"scn-card",x=>`<div class="scn-card-icon" aria-hidden="true">${icon(x.icon)}</div><h3>${rich(x.title)}</h3><p>${rich(x.text)}</p>`));renderCards(data.cards.flow,"#flow-list","scn-flow-card",(x,i)=>`<div class="scn-flow-number">${String(i+1).padStart(2,"0")}</div><div class="scn-card-icon" aria-hidden="true">${icon(x.icon)}</div><h3>${rich(x.title)}</h3><p>${rich(x.text)}</p>`);const f=$("#faq-list");if(f){f.innerHTML=(data.faq||[]).map((x,i)=>`<article class="scn-faq-item"><button type="button" aria-expanded="false" aria-controls="faq-${i}">Q. ${rich(x.q)}</button><div class="scn-faq-answer" id="faq-${i}"><p>A. ${rich(x.a)}</p></div></article>`).join("");f.querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>{const a=btn.closest(".scn-faq-item"),o=a.classList.toggle("is-open");btn.setAttribute("aria-expanded",o)}))}document.querySelectorAll("[data-track]").forEach(e=>e.addEventListener("click",()=>{if(typeof gtag==="function")gtag("event",e.dataset.track,{page_location:location.href})}))}async function setup(){current=await fetchData();render(current);addEventListener("resize",()=>{clearTimeout(timer);timer=setTimeout(()=>current&&render(current),120)})}document.readyState==="loading"?addEventListener("DOMContentLoaded",setup,{once:true}):setup()})();