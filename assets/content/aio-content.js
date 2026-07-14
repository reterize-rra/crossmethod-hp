(() => {
  "use strict";

  function addStyles() {
    if (document.getElementById("crossmethod-aio-content-style")) return;

    const style = document.createElement("style");
    style.id = "crossmethod-aio-content-style";
    style.textContent = `
      .aio-about-section,
      .aio-expertise-section {
        position: relative;
        isolation: isolate;
        overflow: hidden;
      }

      .aio-about-section {
        padding: clamp(48px, 7vw, 88px) 0;
        background:
          radial-gradient(circle at 88% 12%, rgba(16,182,189,.11), transparent 27%),
          radial-gradient(circle at 10% 88%, rgba(212,165,61,.09), transparent 24%),
          linear-gradient(180deg, #ffffff, #f7fcfc);
      }

      .aio-about-shell {
        width: min(1180px, calc(100% - 40px));
        margin: 0 auto;
      }

      .aio-answer-card {
        padding: clamp(28px, 5vw, 54px);
        border: 1px solid rgba(13,61,82,.10);
        border-radius: 32px;
        background: rgba(255,255,255,.95);
        box-shadow: 0 24px 72px rgba(13,61,82,.10);
      }

      .aio-label {
        margin: 0 0 7px;
        color: #0d9fa7;
        font-size: 12px;
        font-weight: 900;
        letter-spacing: .14em;
        text-transform: uppercase;
      }

      .aio-answer-card h2,
      .aio-expertise-copy h2 {
        margin: 0;
        color: #102f47;
        font-size: clamp(29px, 5vw, 48px);
        line-height: 1.35;
      }

      .aio-answer-lead {
        max-width: 920px;
        margin: 20px 0 0;
        color: #304d5e;
        font-size: clamp(16px, 2vw, 20px);
        font-weight: 500;
        line-height: 1.95;
      }

      .aio-about-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.3fr) minmax(280px, .7fr);
        gap: 20px;
        margin-top: 26px;
      }

      .aio-difference-card {
        padding: 24px 26px;
        border-radius: 24px;
        border: 1px solid rgba(16,182,189,.16);
        background: linear-gradient(145deg, #edfafa, #ffffff);
      }

      .aio-difference-card h3 {
        margin: 0 0 10px;
        color: #123d56;
        font-size: 21px;
      }

      .aio-difference-card p {
        margin: 0;
        line-height: 1.85;
      }

      .aio-scope-card {
        padding: 24px 26px;
        border-radius: 24px;
        border: 1px solid rgba(212,165,61,.18);
        background: linear-gradient(145deg, #fffaf0, #ffffff);
      }

      .aio-scope-card h3 {
        margin: 0 0 12px;
        color: #123d56;
        font-size: 21px;
      }

      .aio-scope-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .aio-scope-list span {
        padding: 7px 11px;
        border-radius: 999px;
        color: #5b4a1f;
        background: rgba(212,165,61,.13);
        font-size: 13px;
        font-weight: 700;
      }

      .aio-process {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 14px;
        margin-top: 22px;
      }

      .aio-process article {
        position: relative;
        min-height: 190px;
        padding: 24px 20px;
        border: 1px solid rgba(13,61,82,.09);
        border-radius: 22px;
        background: #ffffff;
        box-shadow: 0 13px 34px rgba(13,61,82,.06);
      }

      .aio-process article::after {
        content: "→";
        position: absolute;
        top: 50%;
        right: -15px;
        z-index: 3;
        width: 30px;
        height: 30px;
        display: grid;
        place-items: center;
        border-radius: 50%;
        color: #ffffff;
        background: #12aeb6;
        font-weight: 900;
        transform: translateY(-50%);
      }

      .aio-process article:last-child::after {
        display: none;
      }

      .aio-process-index {
        display: inline-grid;
        place-items: center;
        width: 38px;
        height: 38px;
        border-radius: 12px;
        color: #ffffff;
        background: linear-gradient(135deg, #12aeb6, #087f89);
        font-size: 13px;
        font-weight: 900;
      }

      .aio-process h3 {
        margin: 15px 0 8px;
        color: #123d56;
        font-size: 19px;
      }

      .aio-process p {
        margin: 0;
        color: #5f7480;
        line-height: 1.75;
      }

      .aio-guardrail {
        margin: 18px 0 0;
        padding: 15px 18px;
        border-left: 4px solid #d4a53d;
        border-radius: 0 15px 15px 0;
        color: #5c5339;
        background: rgba(255,249,232,.82);
        line-height: 1.8;
      }

      .aio-expertise-section {
        padding: clamp(52px, 8vw, 96px) 0;
        background:
          radial-gradient(circle at 18% 18%, rgba(16,182,189,.10), transparent 25%),
          radial-gradient(circle at 84% 82%, rgba(212,165,61,.09), transparent 27%),
          #f8fcfc;
      }

      .aio-expertise-shell {
        width: min(1180px, calc(100% - 40px));
        margin: 0 auto;
        display: grid;
        grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr);
        gap: clamp(24px, 5vw, 58px);
        align-items: center;
      }

      .aio-expertise-copy > p:not(.aio-label) {
        margin: 18px 0 0;
        color: #506b79;
        font-size: 16px;
        line-height: 1.9;
      }

      .aio-expertise-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
      }

      .aio-expertise-grid article {
        min-height: 160px;
        padding: 22px;
        border: 1px solid rgba(13,61,82,.09);
        border-radius: 22px;
        background: rgba(255,255,255,.96);
        box-shadow: 0 13px 36px rgba(13,61,82,.06);
      }

      .aio-expertise-grid span {
        color: #0d9fa7;
        font-size: 12px;
        font-weight: 900;
        letter-spacing: .08em;
      }

      .aio-expertise-grid h3 {
        margin: 8px 0 7px;
        color: #123d56;
        font-size: 19px;
      }

      .aio-expertise-grid p {
        margin: 0;
        color: #607581;
        line-height: 1.75;
      }

      .aio-expertise-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 23px;
      }

      .aio-expertise-actions a,
      .aio-expertise-actions button {
        min-height: 46px;
        padding: 0 19px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        border: 0;
        font: inherit;
        font-weight: 800;
        text-decoration: none;
        cursor: pointer;
      }

      .aio-expertise-actions a {
        color: #123d56;
        background: #e9f7f7;
        border: 1px solid #cce8ea;
      }

      .aio-expertise-actions button {
        color: #ffffff;
        background: linear-gradient(135deg, #12aeb6, #087f89);
      }

      @media (max-width: 900px) {
        .aio-about-grid,
        .aio-expertise-shell {
          grid-template-columns: 1fr;
        }

        .aio-process {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .aio-process article:nth-child(2)::after {
          display: none;
        }
      }

      @media (max-width: 620px) {
        .aio-about-shell,
        .aio-expertise-shell {
          width: min(100% - 24px, 1180px);
        }

        .aio-answer-card {
          padding: 25px 18px;
          border-radius: 24px;
        }

        .aio-process,
        .aio-expertise-grid {
          grid-template-columns: 1fr;
        }

        .aio-process article {
          min-height: 0;
        }

        .aio-process article::after {
          top: auto;
          right: 50%;
          bottom: -16px;
          transform: translateX(50%) rotate(90deg);
        }

        .aio-process article:nth-child(2)::after {
          display: grid;
        }

        .aio-process article:last-child::after {
          display: none;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function replacePublicCopy() {
    const graphLabel = document.querySelector(".graph-card-head span");
    if (graphLabel) graphLabel.textContent = "改善イメージ";

    const newsText = document.querySelector(".news-loading div p");
    if (newsText) {
      newsText.textContent = "最新情報を確認しています。しばらくお待ちください。";
    }

    const memoGold = document.querySelector(".memo-note.gold");
    if (memoGold) {
      memoGold.textContent = "回答後、確認すべきポイントを整理";
    }

    const embedNote = document.getElementById("embed-note");
    if (embedNote) {
      const strong = embedNote.querySelector("strong");
      const span = embedNote.querySelector("span");

      if (strong) strong.textContent = "無料体験診断は現在準備中です。";
      if (span) span.textContent = "公開までしばらくお待ちください。";
    }

    const orderNote = document.querySelector("#order-modal .mini-note");
    if (orderNote) {
      orderNote.textContent = "注文内容を確認後、担当者より金額・配送予定・お支払い方法をご案内します。";
    }

    const contactLead = document.querySelector("#contact-modal .modal-lead");
    if (contactLead) {
      contactLead.textContent = "ご相談内容を確認後、担当者よりご連絡します。";
    }
  }

  function insertAboutSection() {
    if (document.getElementById("crossmethod-about")) return;

    const hero = document.querySelector("main > .hero");
    if (!hero) return;

    const section = document.createElement("section");
    section.className = "aio-about-section";
    section.id = "crossmethod-about";
    section.setAttribute("aria-labelledby", "crossmethod-about-title");
    section.innerHTML = `
      <div class="aio-about-shell">
        <div class="aio-answer-card">
          <p class="aio-label">What is Cross Method</p>
          <h2 id="crossmethod-about-title">クロスメソッド™とは</h2>
          <p class="aio-answer-lead">
            クロスメソッド™は、お客様・従業員・現場の声を、経営判断に使える形へ変える仕組みです。
            声を集めて終わらず、強み・課題・優先順位を視える化し、組織改善、健康経営、人材定着、
            ストレスチェック、健康食、認定支援まで、次の行動へつなげます。
          </p>

          <div class="aio-about-grid">
            <article class="aio-difference-card">
              <h3>一般的なアンケートとの違い</h3>
              <p>
                回答数や平均点だけを確認するのではなく、「どの声を優先して確かめるか」
                「何から改善するか」まで整理します。人を評価する材料ではなく、
                組織の仕組み、教育、関わり方、業務の流れを整える材料として声を活用します。
              </p>
            </article>

            <article class="aio-scope-card">
              <h3>確認・支援できる領域</h3>
              <div class="aio-scope-list">
                <span>組織診断</span>
                <span>飲食店の顧客体験</span>
                <span>人材定着</span>
                <span>健康経営</span>
                <span>ストレスチェック</span>
                <span>健康食・社食</span>
                <span>認定支援</span>
                <span>リスク予防</span>
              </div>
            </article>
          </div>

          <div class="aio-process" aria-label="クロスメソッド™の流れ">
            <article>
              <span class="aio-process-index">01</span>
              <h3>声を集める</h3>
              <p>お客様、従業員、管理職、現場など、目的に合った対象から声を集めます。</p>
            </article>
            <article>
              <span class="aio-process-index">02</span>
              <h3>視える化する</h3>
              <p>強み、見えない損失のサイン、確認すべき優先順位を整理します。</p>
            </article>
            <article>
              <span class="aio-process-index">03</span>
              <h3>判断できる形へ</h3>
              <p>回答を集計し、経営者や担当者が確認できるレポートへ変換します。</p>
            </article>
            <article>
              <span class="aio-process-index">04</span>
              <h3>改善行動へ</h3>
              <p>診断結果をもとに、実行できる改善テーマと次の確認方法を決めます。</p>
            </article>
          </div>

          <p class="aio-guardrail">
            診断結果は、会社や個人を一方的に断定するものではありません。
            現在の状態を整理し、次に確認すべき声と改善仮説を見つけるための材料として扱います。
          </p>
        </div>
      </div>
    `;

    hero.insertAdjacentElement("afterend", section);
  }

  function openContact() {
    const trigger = document.querySelector("[data-open-contact]");
    if (trigger) {
      trigger.click();
      return;
    }

    window.location.href = "/#contact";
  }

  function insertExpertiseSection() {
    if (document.getElementById("crossmethod-expertise")) return;

    const contact = document.getElementById("contact");
    const main = document.querySelector("main");
    if (!contact || !main) return;

    const section = document.createElement("section");
    section.className = "aio-expertise-section";
    section.id = "crossmethod-expertise";
    section.setAttribute("aria-labelledby", "crossmethod-expertise-title");
    section.innerHTML = `
      <div class="aio-expertise-shell">
        <div class="aio-expertise-copy">
          <p class="aio-label">Who We Are</p>
          <h2 id="crossmethod-expertise-title">声を扱うからこそ、現場を知る人が支援します。</h2>
          <p>
            合同会社 TSUNAGARIは、医療・介護・福祉、健康支援、職場改善の実務経験をもとに、
            組織の声を集め、判断できる形へ整理し、実行可能な改善へつなげる支援を提供しています。
          </p>
          <div class="aio-expertise-actions">
            <a href="/faq/">よくある質問を見る</a>
            <button type="button" id="aio-contact-button">相談する</button>
          </div>
        </div>

        <div class="aio-expertise-grid">
          <article>
            <span>EXPERIENCE</span>
            <h3>約20年の実務経験</h3>
            <p>医療・介護分野の現場と事業運営に関わってきた経験を、職場改善へ生かします。</p>
          </article>
          <article>
            <span>PROFESSIONAL</span>
            <h3>国家資格に基づく専門性</h3>
            <p>健康、生活、働き方、人との関わりを、現場の実態に合わせて整理します。</p>
          </article>
          <article>
            <span>MANAGEMENT</span>
            <h3>開設・運営支援</h3>
            <p>訪問看護、訪問リハ、通所、居宅などの開設・運営支援経験があります。</p>
          </article>
          <article>
            <span>HEALTH SUPPORT</span>
            <h3>健康食・健康経営支援</h3>
            <p>制度だけでなく、食事、ストレス、両立支援、職場環境を実行へつなげます。</p>
          </article>
        </div>
      </div>
    `;

    main.insertBefore(section, contact);

    const contactButton = section.querySelector("#aio-contact-button");
    if (contactButton) {
      contactButton.addEventListener("click", openContact);
    }
  }

  function replaceKnownAlerts() {
    if (window.__crossMethodPublicAlertPatched) return;
    window.__crossMethodPublicAlertPatched = true;

    const originalAlert = window.alert.bind(window);

    window.alert = (message) => {
      const text = String(message || "");

      if (text.includes("ローカル確認中です。GAS URL設定後")) {
        originalAlert("現在、送信受付の準備中です。お問い合わせフォームからご連絡ください。");
        return;
      }

      if (text.includes("Zoom / Google Meet のURLは未設定です")) {
        originalAlert("現在、オンラインルームの受付準備中です。");
        return;
      }

      originalAlert(message);
    };
  }

  function setup() {
    addStyles();
    replacePublicCopy();
    replaceKnownAlerts();
    insertAboutSection();
    insertExpertiseSection();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup, { once: true });
  } else {
    setup();
  }

  window.addEventListener("hpmanageddataready", replacePublicCopy);
})();