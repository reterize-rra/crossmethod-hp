(() => {
  "use strict";

  function addStyles() {
    if (document.getElementById("crossmethod-aio-content-style")) return;

    const style = document.createElement("style");
    style.id = "crossmethod-aio-content-style";
    style.textContent = `
      .aio-about-section {
        position: relative;
        isolation: isolate;
        overflow: hidden;
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

      .aio-about-title {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        column-gap: .16em;
        row-gap: .05em;
        margin: 0;
        color: #102f47;
        font-size: clamp(30px, 3.6vw, 44px);
        line-height: 1.35;
        text-wrap: balance;
      }

      .aio-brand-gradient {
        display: inline-block;
        white-space: nowrap;
        background: linear-gradient(90deg, #0875c1, #10b6bd, #54bd47, #d3a63f);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .aio-title-suffix {
        display: inline-block;
        white-space: nowrap;
        color: #102f47;
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

      @media (max-width: 900px) {
        .aio-about-grid {
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
        .aio-about-shell {
          width: min(100% - 24px, 1180px);
        }

        .aio-answer-card {
          padding: 25px 18px;
          border-radius: 24px;
        }

        .aio-about-title {
          font-size: clamp(28px, 8vw, 34px);
          line-height: 1.42;
        }

        .aio-answer-lead {
          font-size: 16px;
          line-height: 1.9;
        }

        .aio-process {
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
    const existingSections = Array.from(
      document.querySelectorAll("#crossmethod-about")
    );

    existingSections.slice(1).forEach((section) => section.remove());

    if (existingSections[0]) {
      existingSections[0].dataset.sectionId = "crossmethod-about";
      existingSections[0].dataset.managedBackground = "voice";
      positionAboutSection(existingSections[0]);
      return;
    }

    const section = document.createElement("section");
    section.className = "aio-about-section";
    section.id = "crossmethod-about";
    section.dataset.sectionId = "crossmethod-about";
    section.dataset.managedBackground = "voice";
    section.setAttribute("aria-labelledby", "crossmethod-about-title");

    section.innerHTML = `
      <div class="aio-about-shell">
        <div class="aio-answer-card">
          <p class="aio-label">What is Cross Method</p>
          <h2 id="crossmethod-about-title" class="aio-about-title">
            <span class="aio-brand-gradient">クロスメソッド™</span>
            <span class="aio-title-suffix">とは</span>
          </h2>

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

    positionAboutSection(section);
  }

  function positionAboutSection(section) {
    const hero = document.querySelector("main > .hero");
    if (!hero || !section) return;

    if (hero.nextElementSibling !== section) {
      hero.insertAdjacentElement("afterend", section);
    }
  }

  function removeExpertiseSection() {
    document
      .querySelectorAll("#crossmethod-expertise, .aio-expertise-section")
      .forEach((section) => section.remove());
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

  function syncSections() {
    insertAboutSection();
    removeExpertiseSection();
  }

  function setupObserver() {
    if (window.__crossMethodAioContentObserver) return;
    window.__crossMethodAioContentObserver = true;

    const main = document.querySelector("main");
    if (!main) return;

    let timer = 0;

    const observer = new MutationObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(syncSections, 80);
    });

    observer.observe(main, {
      childList: true
    });
  }

  function setup() {
    addStyles();
    replacePublicCopy();
    replaceKnownAlerts();
    syncSections();
    setupObserver();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup, { once: true });
  } else {
    setup();
  }

  window.addEventListener("hpmanageddataready", () => {
    replacePublicCopy();
    window.setTimeout(syncSections, 80);
    window.setTimeout(syncSections, 420);
  });
})();