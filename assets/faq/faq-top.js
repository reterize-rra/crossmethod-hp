(() => {
  "use strict";

  const hpApiUrl = "https://script.google.com/macros/s/AKfycbxuGAYkdygkpMsxFQvxmSdu2TnRs7svrudmgwDVOQg9YKIAa1T-Q-v5YmXOf4b5fQCSJw/exec";
  const fallbackItems = [{"category": "クロスメソッド™・診断", "question": "クロスメソッド™とは何ですか？", "answer": "クロスメソッド™は、お客様・従業員・現場の声を、経営判断や改善行動に使える形へ変える支援の仕組みです。声を集めるだけで終わらず、強み、見えにくい課題、確認すべき優先順位を整理し、診断レポートや具体的な改善へつなげます。顧客体験、人材定着、管理職負担、健康経営、ストレスチェック、健康食、リスク予防などを、「声を資産に変える」という一つの考え方で扱います。", "sourceName": "", "sourceUrl": "", "checkedDate": ""}, {"category": "クロスメソッド™・診断", "question": "一般的なアンケートや従業員満足度調査と何が違いますか？", "answer": "一般的なアンケートは、回答を集計して傾向を確認するところで終わることがあります。クロスメソッド™では、回答の点数だけでなく、どの声を優先して確認するか、強みと課題がどこで交差しているか、次にどの行動へ進むかまで整理します。従業員やお客様を評価するためではなく、会社や店舗の仕組み、関わり方、教育、業務の流れを整える材料として声を活用する点が特徴です。", "sourceName": "", "sourceUrl": "", "checkedDate": ""}, {"category": "ストレスチェック", "question": "ストレスチェックが義務化されるのはいつですか？", "answer": "労働者数50人未満の事業場では、2028年4月1日からストレスチェックの実施が義務化されます。労働者数50人以上の事業場では2015年から義務化されており、50人未満は努力義務とされていましたが、2025年5月公布の改正労働安全衛生法により対象が拡大されました。実施体制、従業員への案内、結果の管理、外部委託先、実施後の職場改善を早めに整理しておくことが重要です。", "sourceName": "厚生労働省", "sourceUrl": "https://www.mhlw.go.jp/bunya/roudoukijun/anzeneisei12/index.html", "checkedDate": "2026-07-14"}, {"category": "ストレスチェック", "question": "従業員50人未満の事業場も対象になりますか？", "answer": "はい。2028年4月1日から、労働者数50人未満の事業場にもストレスチェックの実施義務が広がります。人数は法人全体ではなく、原則として事業場単位で確認します。複数店舗や複数事業所がある場合は、それぞれの勤務実態や体制を整理したうえで準備する必要があります。対象者や実施方法の詳細は、公開時点の厚生労働省の最新情報を確認して運用します。", "sourceName": "厚生労働省", "sourceUrl": "https://www.mhlw.go.jp/bunya/roudoukijun/anzeneisei12/index.html", "checkedDate": "2026-07-14"}, {"category": "健康経営・認定支援", "question": "健康経営とは何ですか？", "answer": "健康経営とは、従業員の健康を個人だけの問題にせず、会社の持続的な運営に関わる経営課題として捉え、健康づくりを計画的に進める考え方です。健康診断だけでなく、メンタルヘルス、職場環境、働き方、食事、治療・介護・子育てとの両立、人材定着などを一つの流れとして整えます。認定取得だけを目的にせず、従業員が安心して働き続けられる状態をつくることが中心です。", "sourceName": "経済産業省", "sourceUrl": "https://www.meti.go.jp/policy/mono_info_service/healthcare/kenkoukeiei_yuryouhouzin.html", "checkedDate": "2026-07-14"}, {"category": "健康経営・認定支援", "question": "健康経営は何から始めればよいですか？", "answer": "最初に、経営者が健康経営へ取り組む目的を言葉にし、従業員の健康課題と会社の経営課題を整理します。健康診断、欠勤、残業、ストレスチェック、離職、食事、両立支援などの現状を確認し、従業員の声も聞きます。そのうえで、優先順位の高い施策を一つから始め、担当者、期限、確認指標を決めます。最初から多くの施策を並べるより、実行と振り返りを続けることが大切です。", "sourceName": "経済産業省", "sourceUrl": "https://www.meti.go.jp/policy/mono_info_service/healthcare/kenkoukeiei_yuryouhouzin.html", "checkedDate": "2026-07-14"}, {"category": "健康食・社食", "question": "健康食は法人だけでなく個人でも注文できますか？", "answer": "法人・事業者だけでなく、一般のお客様も注文できます。職場の社食や福利厚生としての導入、事業所単位の注文、個人での注文に対応します。商品、数量、配送地域などを注文依頼フォームで確認し、担当者から金額、送料、配送予定、支払方法をご案内します。フォーム送信時点では注文確定ではなく、内容確認と承諾後に契約が成立します。", "sourceName": "クロスメソッド™公式サイト", "sourceUrl": "https://www.tsunagari-jp.com/#healthyfood", "checkedDate": "2026-07-14"}, {"category": "健康食・社食", "question": "健康食の価格と送料はいくらですか？", "answer": "健康食は1食660円（税込）です。送料は891円で、商品代金の合計が5,000円以上の場合は送料無料です。商品や販売条件が変更された場合は、公式サイトの健康食欄および注文画面に表示される最新情報を優先します。注文依頼後に、商品、数量、送料、合計金額、配送予定を担当者が確認してご案内します。", "sourceName": "クロスメソッド™公式サイト", "sourceUrl": "https://www.tsunagari-jp.com/#healthyfood", "checkedDate": "2026-07-14"}];

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function buildItem(item) {
    const source = item.sourceUrl && item.sourceName
      ? `<div class="top-faq-source"><a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noopener">出典：${escapeHtml(item.sourceName)}</a></div>`
      : "";

    return `<details class="top-faq-item">
      <summary><span>Q</span><strong>${escapeHtml(item.question)}</strong><i aria-hidden="true"></i></summary>
      <div class="top-faq-answer"><span>A</span><div><p>${escapeHtml(item.answer)}</p>${source}</div></div>
    </details>`;
  }

  function createSection(items) {
    if (document.getElementById("faq")) return;

    const section = document.createElement("section");
    section.className = "section-pad top-faq-section";
    section.id = "faq";
    section.dataset.sectionId = "faq";
    section.innerHTML = `
      <div class="container">
        <div class="section-head centered">
          <p class="section-label">Frequently Asked Questions</p>
          <h2>よくある質問</h2>
          <p>診断、ストレスチェック、健康経営、健康食について、よく寄せられる質問へ詳しく回答します。</p>
        </div>
        <div class="top-faq-list">${items.map(buildItem).join("")}</div>
        <div class="top-faq-more"><a href="/faq/">よくある質問をすべて見る</a></div>
      </div>
    `;

    const contact = document.getElementById("contact");
    const main = document.querySelector("main");
    if (contact && main) main.insertBefore(section, contact);
    else main?.appendChild(section);

    section.querySelectorAll(".top-faq-item").forEach((item) => {
      item.addEventListener("toggle", () => {
        if (!item.open || typeof window.gtag !== "function") return;
        const question = String(item.querySelector("strong")?.textContent || "").trim();
        window.gtag("event", "faq_open", {
          faq_location: "top",
          faq_question: question.slice(0, 100)
        });
      });
    });
  }

  function addStyles() {
    if (document.getElementById("crossmethod-top-faq-style")) return;

    const style = document.createElement("style");
    style.id = "crossmethod-top-faq-style";
    style.textContent = `
      .top-faq-section{background:linear-gradient(180deg,#f7fbfb,#fff)}
      .top-faq-list{width:min(920px,100%);margin:28px auto 0;display:grid;gap:12px}
      .top-faq-item{border:1px solid rgba(12,55,76,.10);border-radius:20px;background:#fff;box-shadow:0 12px 36px rgba(12,55,76,.055);overflow:hidden}
      .top-faq-item summary{min-height:72px;padding:16px 58px 16px 18px;display:flex;align-items:center;gap:13px;position:relative;list-style:none;cursor:pointer;color:#12384f}
      .top-faq-item summary::-webkit-details-marker{display:none}
      .top-faq-item summary>span,.top-faq-answer>span{flex:none;width:32px;height:32px;display:grid;place-items:center;border-radius:10px;color:#fff;font-weight:900}
      .top-faq-item summary>span{background:linear-gradient(135deg,#11aeb6,#078b94)}
      .top-faq-answer>span{background:linear-gradient(135deg,#d4a53d,#bd8126)}
      .top-faq-item summary strong{font-size:clamp(15px,2vw,18px)}
      .top-faq-item summary i,.top-faq-item summary i::after{content:"";position:absolute;right:22px;top:50%;width:16px;height:2px;border-radius:3px;background:#11aeb6;transition:transform .2s ease}
      .top-faq-item summary i::after{right:0;top:0;transform:rotate(90deg)}
      .top-faq-item[open] summary i::after{transform:rotate(0)}
      .top-faq-answer{padding:0 20px 21px;display:grid;grid-template-columns:32px minmax(0,1fr);gap:13px;line-height:1.85}
      .top-faq-answer p{margin:0;white-space:pre-line}
      .top-faq-source{margin-top:10px;font-size:12px}
      .top-faq-source a{color:#087f89;font-weight:700}
      .top-faq-more{margin-top:24px;text-align:center}
      .top-faq-more a{min-height:48px;padding:0 22px;display:inline-flex;align-items:center;justify-content:center;border-radius:999px;color:#fff;background:linear-gradient(135deg,#11aeb6,#078b94);text-decoration:none;font-weight:800}
      @media(max-width:720px){
        .top-faq-item summary{padding:14px 48px 14px 13px;align-items:flex-start}
        .top-faq-answer{padding:0 14px 19px;grid-template-columns:30px minmax(0,1fr)}
        .top-faq-item summary>span,.top-faq-answer>span{width:30px;height:30px}
      }
    `;
    document.head.appendChild(style);
  }

  async function load() {
    addStyles();
    createSection(fallbackItems);

    try {
      const url = new URL(hpApiUrl);
      url.searchParams.set("action", "faq");
      url.searchParams.set("top", "1");

      const response = await fetch(url.toString(), {
        cache: "no-store",
        redirect: "follow"
      });

      const result = await response.json();
      const items = Array.isArray(result?.data?.items) ? result.data.items.slice(0, 8) : [];
      if (!result?.success || !items.length) return;

      document.getElementById("faq")?.remove();
      createSection(items);
    } catch (error) {
      console.warn("トップFAQの最新情報を取得できませんでした。", error);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", load, { once: true });
  } else {
    load();
  }
})();
