(() => {
  "use strict";

  const CONFIG = Object.freeze({
    restRoot: "https://pimmsycmnoxzchrsgykj.supabase.co/rest/v1",
    publishableKey: "sb_publishable_D9tFNCCaj6LY9rrW1fPV0Q_G8wRhC3N",
    runtimeRpc: "cv_public_runtime",
    submitRpc: "cv_public_submit",
    requestTimeoutMs: 20000
  });

  const SCENES = Object.freeze([
    { caption: "はじまりの安心", accent: "#12aeb5", accentDark: "#087f88", soft: "#e6f8f7" },
    { caption: "迷わない利用導線", accent: "#4b9fca", accentDark: "#347c9f", soft: "#eaf5fb" },
    { caption: "清潔さと安全への配慮", accent: "#70ba91", accentDark: "#3e8b65", soft: "#edf8f1" },
    { caption: "心がほどける接遇", accent: "#d5a34a", accentDark: "#967129", soft: "#fff7e8" },
    { caption: "声を受けとめる姿勢", accent: "#7aa7c7", accentDark: "#527b99", soft: "#edf5f9" },
    { caption: "わかりやすい説明", accent: "#16a5a5", accentDark: "#087a7a", soft: "#e8f8f6" },
    { caption: "選んでよかった体験", accent: "#d09e43", accentDark: "#906b28", soft: "#fff8e7" },
    { caption: "また利用したい気持ち", accent: "#63b887", accentDark: "#3f895e", soft: "#ebf8f0" },
    { caption: "誰かへ伝えたい体験", accent: "#4c99c2", accentDark: "#357596", soft: "#ebf5fa" },
    { caption: "あなたの言葉で", accent: "#a08abf", accentDark: "#756193", soft: "#f4f0fa" }
  ]);

  const state = {
    publicCode: "",
    runtime: null,
    questions: [],
    currentIndex: 0,
    startedAt: Date.now(),
    submitting: false
  };

  const elements = {};

  document.addEventListener("DOMContentLoaded", initialize);

  function initialize() {
    [
      "loadingState", "errorState", "surveyState", "successState", "errorMessage",
      "retryButton", "surveyTitle", "organizationName", "locationName",
      "surveyDescription", "locationMessage", "organizationLogoWrap", "organizationLogo",
      "surveyForm", "questionList", "answeredCount", "requiredCount", "progressBar",
      "currentQuestionNumber", "totalQuestionCount", "progressTrack", "questionNavigation",
      "previousButton", "nextButton", "navigationHint", "submitCard", "formError",
      "submitButton", "receiptCode", "newResponseButton", "websiteField"
    ].forEach((id) => { elements[id] = document.getElementById(id); });

    elements.retryButton.addEventListener("click", () => window.location.reload());
    elements.newResponseButton.addEventListener("click", startAnotherResponse);
    elements.surveyForm.addEventListener("submit", submitSurvey);
    elements.previousButton.addEventListener("click", showPreviousQuestion);
    elements.nextButton.addEventListener("click", showNextQuestion);

    state.publicCode = String(new URLSearchParams(window.location.search).get("cv") || "")
      .trim()
      .toLowerCase();

    if (!/^cv_[a-f0-9]{32}$/.test(state.publicCode)) {
      showFatalError("このアンケートのURLを確認できませんでした。QRコードからもう一度開いてください。");
      return;
    }

    loadSurvey();
  }

  async function loadSurvey() {
    showOnly("loadingState");

    try {
      const runtime = await callRpc(CONFIG.runtimeRpc, { p_public_code: state.publicCode });
      if (!runtime || runtime.ok !== true || !Array.isArray(runtime.questions)) {
        throw new Error("アンケート情報を確認できませんでした。");
      }
      if (runtime.questions.length !== 10) {
        throw new Error("設問を正しく読み込めませんでした。");
      }

      state.runtime = runtime;
      renderSurvey(runtime);

      const completed = readSessionJson(sessionKey("completed"));
      if (completed && completed.receiptCode) {
        showSuccess(completed.receiptCode);
        return;
      }

      showOnly("surveyState");
      showQuestion(0, false);
    } catch (error) {
      showFatalError(normalizePublicError(error));
    }
  }

  function renderSurvey(runtime) {
    const organization = runtime.organization || {};
    const location = runtime.location || {};
    const survey = runtime.survey || {};

    elements.surveyTitle.textContent = survey.title || "お客様の声をお聞かせください";
    elements.organizationName.textContent = organization.name || "";
    elements.locationName.textContent = location.name || "";
    elements.surveyDescription.textContent = survey.description || "";

    if (location.message) {
      elements.locationMessage.textContent = location.message;
      elements.locationMessage.hidden = false;
    } else {
      elements.locationMessage.hidden = true;
    }

    if (isSafeImageUrl(organization.logo_url)) {
      elements.organizationLogo.src = organization.logo_url;
      elements.organizationLogo.alt = `${organization.name || "企業"} ロゴ`;
      elements.organizationLogo.referrerPolicy = "no-referrer";
      elements.organizationLogo.addEventListener("error", () => {
        elements.organizationLogoWrap.hidden = true;
      }, { once: true });
      elements.organizationLogoWrap.hidden = false;
    } else {
      elements.organizationLogoWrap.hidden = true;
    }

    state.questions = runtime.questions.slice().sort((a, b) => {
      return Number(a.question_order || 0) - Number(b.question_order || 0);
    });

    elements.questionList.replaceChildren(...state.questions.map(renderQuestion));
    elements.requiredCount.textContent = String(state.questions.filter((question) => question.is_required).length);
    elements.totalQuestionCount.textContent = String(state.questions.length);
    elements.progressTrack.setAttribute("aria-valuemax", String(state.questions.length));
  }

  function renderQuestion(question) {
    const article = document.createElement("article");
    const scene = sceneForQuestion(question);
    article.className = "question-card";
    article.dataset.questionId = question.question_id;
    article.dataset.required = question.is_required ? "true" : "false";
    article.dataset.questionOrder = String(question.question_order || "");
    article.tabIndex = -1;
    article.style.setProperty("--scene-accent", scene.accent);
    article.style.setProperty("--scene-accent-dark", scene.accentDark);
    article.style.setProperty("--scene-soft", scene.soft);

    const visual = document.createElement("div");
    visual.className = "question-visual";
    visual.setAttribute("aria-hidden", "true");
    visual.innerHTML = sceneIllustration(Number(question.question_order || 1));

    const caption = document.createElement("p");
    caption.className = "question-visual__caption";
    caption.textContent = scene.caption;
    visual.append(caption);

    const content = document.createElement("div");
    content.className = "question-card__content";

    const head = document.createElement("div");
    head.className = "question-card__head";

    const number = document.createElement("span");
    number.className = "question-card__number";
    number.textContent = String(question.question_order).padStart(2, "0");

    const titleWrap = document.createElement("div");
    titleWrap.className = "question-card__title-wrap";

    const group = document.createElement("p");
    group.className = "question-card__label";
    group.textContent = question.analysis_axis || question.question_group || "お客様の声";

    const title = document.createElement("h2");
    title.id = `question-${question.question_id}`;
    title.append(document.createTextNode(question.question_text || ""));

    const mark = document.createElement("span");
    mark.className = question.is_required ? "required-mark" : "optional-mark";
    mark.textContent = question.is_required ? "必須" : "任意";
    title.append(mark);

    titleWrap.append(group, title);
    head.append(number, titleWrap);
    content.append(head);

    if (question.answer_type === "textarea") {
      content.append(renderTextarea(question));
    } else {
      content.append(renderScale(question));
    }

    article.append(visual, content);
    return article;
  }

  function renderScale(question) {
    const wrap = document.createElement("div");
    const options = document.createElement("div");
    const isNps = question.answer_type === "scale_10";
    options.className = `scale-options${isNps ? " scale-options--nps" : ""}`;
    options.setAttribute("role", "radiogroup");
    options.setAttribute("aria-labelledby", `question-${question.question_id}`);

    const selected = document.createElement("p");
    selected.className = "selected-answer";
    selected.setAttribute("aria-live", "polite");

    const choices = Array.isArray(question.choices) ? question.choices : [];
    choices.forEach((choice) => {
      const label = document.createElement("label");
      label.className = "scale-choice";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = question.question_id;
      input.value = String(choice.value);
      input.required = Boolean(question.is_required);
      input.setAttribute("aria-label", String(choice.label || choice.value));
      input.addEventListener("change", () => {
        selected.textContent = isNps ? `${choice.value}点を選択` : String(choice.label || "選択済み");
        input.closest(".question-card")?.classList.remove("is-invalid");
        hideFormError();
        updateProgress();
      });

      const visual = document.createElement("span");
      visual.textContent = String(choice.value);
      label.append(input, visual);
      options.append(label);
    });

    const legend = document.createElement("div");
    legend.className = "scale-legend";
    const first = choices[0];
    const last = choices[choices.length - 1];
    legend.append(
      textSpan(isNps ? "おすすめしない" : String(first?.label || "低い")),
      textSpan(isNps ? "ぜひおすすめしたい" : String(last?.label || "高い"))
    );

    wrap.append(options, legend, selected);
    return wrap;
  }

  function renderTextarea(question) {
    const wrap = document.createElement("div");
    const textarea = document.createElement("textarea");
    textarea.className = "free-answer";
    textarea.name = question.question_id;
    textarea.maxLength = Number(question.max_text_length || 1200);
    textarea.placeholder = "よかったこと、気になったことなど、ご自由にお書きください。";
    textarea.setAttribute("aria-labelledby", `question-${question.question_id}`);

    const count = document.createElement("p");
    count.className = "character-count";
    count.textContent = `0／${textarea.maxLength}文字`;
    textarea.addEventListener("input", () => {
      count.textContent = `${textarea.value.length}／${textarea.maxLength}文字`;
    });

    wrap.append(textarea, count);
    return wrap;
  }

  function showPreviousQuestion() {
    if (state.currentIndex <= 0) return;
    showQuestion(state.currentIndex - 1, true);
  }

  function showNextQuestion() {
    const currentQuestion = state.questions[state.currentIndex];
    const currentCard = questionCard(currentQuestion);
    if (currentQuestion?.is_required && !isQuestionAnswered(currentQuestion)) {
      currentCard?.classList.add("is-invalid");
      showFormError("この設問への回答を選んでから、次へ進んでください。");
      currentCard?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    hideFormError();
    if (state.currentIndex < state.questions.length - 1) {
      showQuestion(state.currentIndex + 1, true);
    }
  }

  function showQuestion(index, shouldScroll) {
    if (!state.questions.length) return;
    const safeIndex = Math.max(0, Math.min(state.questions.length - 1, Number(index) || 0));
    state.currentIndex = safeIndex;

    const cards = Array.from(elements.questionList.querySelectorAll(".question-card"));
    cards.forEach((card, cardIndex) => {
      card.hidden = cardIndex !== safeIndex;
    });

    const isFirst = safeIndex === 0;
    const isLast = safeIndex === state.questions.length - 1;
    elements.previousButton.disabled = isFirst;
    elements.previousButton.setAttribute("aria-disabled", isFirst ? "true" : "false");
    elements.nextButton.hidden = isLast;
    elements.submitCard.hidden = !isLast;
    elements.navigationHint.textContent = isLast
      ? "任意項目です。空欄のまま送信しても大丈夫です"
      : "直感に近いものをお選びください";

    elements.currentQuestionNumber.textContent = String(safeIndex + 1);
    elements.progressTrack.setAttribute("aria-valuenow", String(safeIndex + 1));
    updateProgress();

    if (shouldScroll) {
      document.querySelector(".progress-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => cards[safeIndex]?.focus({ preventScroll: true }), 380);
    }
  }

  async function submitSurvey(event) {
    event.preventDefault();
    if (state.submitting || !state.runtime) return;

    const missing = findMissingRequiredQuestions();
    if (missing.length) {
      missing.forEach((card) => card.classList.add("is-invalid"));
      const firstMissingIndex = state.questions.findIndex((question) => {
        return question.is_required && !isQuestionAnswered(question);
      });
      showFormError(`未回答の必須設問が${missing.length}問あります。該当する設問へ回答してください。`);
      showQuestion(firstMissingIndex < 0 ? 0 : firstMissingIndex, true);
      return;
    }

    const answers = collectAnswers();
    const surveyVersion = Number(state.runtime.survey?.version || 0);
    if (!surveyVersion || answers.length < 9) {
      showFormError("回答内容を確認できませんでした。画面を再読み込みして、もう一度お試しください。");
      return;
    }

    setSubmitting(true);
    hideFormError();

    try {
      const submissionId = getOrCreateSubmissionId();
      const elapsedSeconds = Math.max(0, Math.min(86400, Math.round((Date.now() - state.startedAt) / 1000)));
      const result = await callRpc(CONFIG.submitRpc, {
        p_public_code: state.publicCode,
        p_submission_id: submissionId,
        p_survey_version: surveyVersion,
        p_answers: answers,
        p_attributes: {},
        p_elapsed_seconds: elapsedSeconds,
        p_honeypot: elements.websiteField.value || ""
      });

      if (!result || result.ok !== true || !result.receipt_code) {
        throw new Error("回答を保存できませんでした。");
      }

      const completed = { receiptCode: result.receipt_code, completedAt: Date.now() };
      writeSessionJson(sessionKey("completed"), completed);
      sessionStorage.removeItem(sessionKey("submission"));
      showSuccess(result.receipt_code);
    } catch (error) {
      showFormError(normalizePublicError(error));
      elements.formError.scrollIntoView({ behavior: "smooth", block: "center" });
    } finally {
      setSubmitting(false);
    }
  }

  function collectAnswers() {
    return state.questions.map((question) => {
      if (question.answer_type === "textarea") {
        const textarea = elements.surveyForm.elements.namedItem(question.question_id);
        const value = String(textarea?.value || "").trim();
        return value ? { question_id: question.question_id, value } : null;
      }

      const checked = elements.surveyForm.querySelector(
        `input[name="${cssEscape(question.question_id)}"]:checked`
      );
      return checked
        ? { question_id: question.question_id, value: Number(checked.value) }
        : null;
    }).filter(Boolean);
  }

  function findMissingRequiredQuestions() {
    return state.questions
      .filter((question) => question.is_required && !isQuestionAnswered(question))
      .map(questionCard)
      .filter(Boolean);
  }

  function isQuestionAnswered(question) {
    const card = questionCard(question);
    if (!card) return false;
    if (question.answer_type === "textarea") {
      return Boolean(String(card.querySelector("textarea")?.value || "").trim());
    }
    return Boolean(card.querySelector("input:checked"));
  }

  function questionCard(question) {
    if (!question) return null;
    return elements.questionList.querySelector(
      `.question-card[data-question-id="${cssEscape(question.question_id)}"]`
    );
  }

  function updateProgress() {
    if (!state.runtime || !state.questions.length) return;
    const required = state.questions.filter((question) => question.is_required);
    const answered = required.filter(isQuestionAnswered).length;
    const position = Math.max(1, state.currentIndex + 1);

    elements.answeredCount.textContent = String(answered);
    elements.requiredCount.textContent = String(required.length);
    elements.progressBar.style.width = `${(position / state.questions.length) * 100}%`;
  }

  async function callRpc(functionName, payload) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), CONFIG.requestTimeoutMs);

    try {
      const response = await fetch(`${CONFIG.restRoot}/rpc/${functionName}`, {
        method: "POST",
        mode: "cors",
        cache: "no-store",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "apikey": CONFIG.publishableKey,
          "Authorization": `Bearer ${CONFIG.publishableKey}`
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      let data = null;
      try {
        data = await response.json();
      } catch (_) {
        data = null;
      }

      if (!response.ok) {
        throw new Error(data?.message || `通信エラー（${response.status}）`);
      }
      return data;
    } catch (error) {
      if (error?.name === "AbortError") {
        throw new Error("通信に時間がかかっています。電波状況を確認して、もう一度お試しください。");
      }
      throw error;
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function showSuccess(receiptCode) {
    elements.receiptCode.textContent = receiptCode;
    showOnly("successState");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startAnotherResponse() {
    sessionStorage.removeItem(sessionKey("completed"));
    sessionStorage.removeItem(sessionKey("submission"));
    window.location.reload();
  }

  function showFatalError(message) {
    elements.errorMessage.textContent = message;
    showOnly("errorState");
  }

  function showOnly(id) {
    ["loadingState", "errorState", "surveyState", "successState"].forEach((stateId) => {
      elements[stateId].hidden = stateId !== id;
    });
  }

  function showFormError(message) {
    elements.formError.textContent = message;
    elements.formError.hidden = false;
  }

  function hideFormError() {
    elements.formError.hidden = true;
    elements.formError.textContent = "";
  }

  function setSubmitting(value) {
    state.submitting = value;
    elements.submitButton.disabled = value;
    elements.submitButton.querySelector(".button__label").hidden = value;
    elements.submitButton.querySelector(".button__loading").hidden = !value;
  }

  function getOrCreateSubmissionId() {
    const key = sessionKey("submission");
    const existing = sessionStorage.getItem(key);
    if (existing && /^[0-9a-f-]{36}$/i.test(existing)) return existing;

    const id = typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : uuidV4Fallback();
    sessionStorage.setItem(key, id);
    return id;
  }

  function uuidV4Fallback() {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (value) => value.toString(16).padStart(2, "0"));
    return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10).join("")}`;
  }

  function sessionKey(type) {
    return `cmcv:${state.publicCode}:${type}`;
  }

  function readSessionJson(key) {
    try {
      return JSON.parse(sessionStorage.getItem(key) || "null");
    } catch (_) {
      return null;
    }
  }

  function writeSessionJson(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (_) {}
  }

  function normalizePublicError(error) {
    const message = String(error?.message || "").trim();
    if (!message || /Failed to fetch|NetworkError|Load failed/i.test(message)) {
      return "通信できませんでした。電波状況を確認して、もう一度お試しください。";
    }
    return message;
  }

  function isSafeImageUrl(value) {
    try {
      const url = new URL(String(value || ""));
      return url.protocol === "https:";
    } catch (_) {
      return false;
    }
  }

  function cssEscape(value) {
    if (window.CSS && typeof window.CSS.escape === "function") return window.CSS.escape(value);
    return String(value).replace(/[^a-zA-Z0-9_-]/g, "\\$&");
  }

  function textSpan(value) {
    const span = document.createElement("span");
    span.textContent = value;
    return span;
  }

  function sceneForQuestion(question) {
    const index = Math.max(0, Math.min(SCENES.length - 1, Number(question.question_order || 1) - 1));
    return SCENES[index];
  }

  function sceneIllustration(order) {
    const safeOrder = Math.max(1, Math.min(10, Number(order) || 1));
    const gradientId = `scene-gradient-${safeOrder}`;
    return `
      <svg viewBox="0 0 520 330" role="presentation" focusable="false">
        <defs>
          <linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#ffffff" stop-opacity=".98"/>
            <stop offset="1" stop-color="var(--scene-soft)" stop-opacity=".92"/>
          </linearGradient>
        </defs>
        <ellipse cx="258" cy="282" rx="185" ry="24" fill="#123c52" opacity=".055"/>
        <circle cx="419" cy="73" r="48" fill="#fff" opacity=".72"/>
        <path d="M72 254C134 126 235 73 430 105" fill="none" stroke="var(--scene-accent)" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 13" opacity=".34"/>
        ${sceneBody(safeOrder, gradientId)}
      </svg>`;
  }

  function sceneBody(order, gradientId) {
    const commonStroke = `fill="none" stroke="#174b60" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"`;
    const accentStroke = `fill="none" stroke="var(--scene-accent)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"`;

    const scenes = {
      1: `
        <g transform="translate(92 50)">
          <path d="M42 105h262v148H42z" fill="url(#${gradientId})" stroke="#174b60" stroke-width="7"/>
          <path d="M25 105 54 51h237l30 54" fill="#fff" stroke="#174b60" stroke-width="7" stroke-linejoin="round"/>
          <path d="M25 105h296" ${accentStroke}/>
          <path d="M81 52v53M131 52v53M181 52v53M231 52v53M281 52v53" stroke="var(--scene-accent)" stroke-width="5" opacity=".55"/>
          <path d="M73 139h82v64H73zM196 139h72v114h-72z" fill="#fff" stroke="#174b60" stroke-width="6"/>
          <circle cx="252" cy="194" r="5" fill="var(--scene-accent)"/>
          <circle cx="312" cy="35" r="26" fill="#fff4d8" stroke="#d5a34a" stroke-width="5"/>
          <path d="M312 1v12M312 57v12M278 35h-12M358 35h-12M288 11l9 9M336 59l-9-9M336 11l-9 9" stroke="#d5a34a" stroke-width="5" stroke-linecap="round"/>
        </g>`,
      2: `
        <g transform="translate(72 43)">
          <path d="M48 217c39-87 80-17 123-96 35-63 74-22 145-94" ${accentStroke}/>
          <path d="m303 19 43-8-10 42" fill="#fff" stroke="var(--scene-accent)" stroke-width="8" stroke-linejoin="round"/>
          <g transform="translate(18 154)"><path d="M50 0c28 0 50 22 50 50 0 38-50 85-50 85S0 88 0 50C0 22 22 0 50 0Z" fill="#fff" stroke="#174b60" stroke-width="7"/><circle cx="50" cy="49" r="16" fill="var(--scene-soft)" stroke="var(--scene-accent)" stroke-width="6"/></g>
          <g transform="translate(247 16)"><path d="M50 0c28 0 50 22 50 50 0 38-50 85-50 85S0 88 0 50C0 22 22 0 50 0Z" fill="#fff" stroke="#174b60" stroke-width="7"/><path d="m31 51 14 14 29-34" ${accentStroke}/></g>
          <rect x="146" y="160" width="94" height="126" rx="18" fill="url(#${gradientId})" stroke="#174b60" stroke-width="7"/>
          <path d="M173 190h40M173 215h28M173 240h46" stroke="var(--scene-accent)" stroke-width="6" stroke-linecap="round"/>
        </g>`,
      3: `
        <g transform="translate(84 33)">
          <path d="M176 17c50 33 101 38 133 42v88c0 76-50 119-133 149C93 266 43 223 43 147V59c32-4 83-9 133-42Z" fill="url(#${gradientId})" stroke="#174b60" stroke-width="8"/>
          <path d="m112 148 42 43 89-103" ${accentStroke}/>
          <g stroke="#d5a34a" stroke-width="6" stroke-linecap="round">
            <path d="M319 56V28M319 114V87M289 71h-27M376 71h-28"/>
            <path d="m296 48-19-19M361 113l-19-19M361 30l-19 19"/>
          </g>
          <circle cx="319" cy="71" r="13" fill="#fff4d8"/>
        </g>`,
      4: `
        <g transform="translate(67 47)">
          <path d="M36 232h344" ${commonStroke}/>
          <rect x="128" y="156" width="172" height="80" rx="14" fill="url(#${gradientId})" stroke="#174b60" stroke-width="7"/>
          <g transform="translate(53 54)"><circle cx="61" cy="55" r="40" fill="#fff" stroke="#174b60" stroke-width="7"/><path d="M12 175c4-61 21-92 49-92s45 31 49 92" fill="var(--scene-soft)" stroke="#174b60" stroke-width="7"/><path d="M46 57c9 8 21 8 30 0" ${accentStroke}/></g>
          <g transform="translate(252 47)"><circle cx="61" cy="55" r="40" fill="#fff7e5" stroke="#174b60" stroke-width="7"/><path d="M12 182c4-61 21-92 49-92s45 31 49 92" fill="#fff7e5" stroke="#174b60" stroke-width="7"/><path d="M46 57c9 8 21 8 30 0" ${accentStroke}/></g>
          <path d="M162 34h93c17 0 31 14 31 31v18c0 17-14 31-31 31h-34l-25 22 6-22h-40c-17 0-31-14-31-31V65c0-17 14-31 31-31Z" fill="#fff" stroke="var(--scene-accent)" stroke-width="6"/>
          <circle cx="174" cy="75" r="6" fill="var(--scene-accent)"/><circle cx="207" cy="75" r="6" fill="var(--scene-accent)"/><circle cx="240" cy="75" r="6" fill="var(--scene-accent)"/>
        </g>`,
      5: `
        <g transform="translate(66 43)">
          <g transform="translate(2 74)"><circle cx="73" cy="54" r="42" fill="#fff" stroke="#174b60" stroke-width="7"/><path d="M16 193c5-70 25-105 57-105s53 35 58 105" fill="var(--scene-soft)" stroke="#174b60" stroke-width="7"/></g>
          <g transform="translate(261 74)"><circle cx="73" cy="54" r="42" fill="#fff7e5" stroke="#174b60" stroke-width="7"/><path d="M16 193c5-70 25-105 57-105s53 35 58 105" fill="#fff7e5" stroke="#174b60" stroke-width="7"/></g>
          <path d="M133 61h121c20 0 36 16 36 36v34c0 20-16 36-36 36h-44l-31 27 7-27h-53c-20 0-36-16-36-36V97c0-20 16-36 36-36Z" fill="#fff" stroke="var(--scene-accent)" stroke-width="7"/>
          <path d="M194 138c-48-29-29-70 0-46 29-24 48 17 0 46Z" fill="var(--scene-accent)" opacity=".82"/>
          <path d="M136 221c32 30 85 30 117 0" ${accentStroke}/>
        </g>`,
      6: `
        <g transform="translate(68 39)">
          <rect x="31" y="17" width="227" height="273" rx="22" fill="url(#${gradientId})" stroke="#174b60" stroke-width="8"/>
          <rect x="91" y="0" width="108" height="40" rx="15" fill="#fff" stroke="#174b60" stroke-width="7"/>
          <circle cx="75" cy="85" r="16" fill="var(--scene-soft)" stroke="var(--scene-accent)" stroke-width="6"/><path d="M105 85h104M75 143h134M75 195h97M75 247h118" stroke="#174b60" stroke-width="7" stroke-linecap="round" opacity=".76"/>
          <g transform="translate(243 89)"><circle cx="70" cy="53" r="42" fill="#fff7e5" stroke="#174b60" stroke-width="7"/><path d="M15 194c5-69 24-103 55-103s50 34 55 103" fill="#fff7e5" stroke="#174b60" stroke-width="7"/><path d="m39 128-64 40" ${accentStroke}/><circle cx="-29" cy="171" r="8" fill="var(--scene-accent)"/></g>
        </g>`,
      7: `
        <g transform="translate(80 31)">
          <path d="m179 18 29 61 67 9-49 46 13 66-60-33-60 33 13-66-49-46 67-9Z" fill="#fff5d9" stroke="#d1a84e" stroke-width="8" stroke-linejoin="round"/>
          <path d="M30 258c44-67 87-80 149-28 62-52 105-39 149 28" fill="url(#${gradientId})" stroke="#174b60" stroke-width="8" stroke-linecap="round"/>
          <path d="M66 243c30-18 59-15 83 10M292 243c-30-18-59-15-83 10" ${accentStroke}/>
          <circle cx="51" cy="70" r="24" fill="#fff" stroke="var(--scene-accent)" stroke-width="6"/>
          <path d="m40 70 8 8 16-19" ${accentStroke}/>
          <circle cx="310" cy="69" r="18" fill="var(--scene-soft)"/>
        </g>`,
      8: `
        <g transform="translate(80 38)">
          <path d="M51 116 180 25l129 91v147H51Z" fill="url(#${gradientId})" stroke="#174b60" stroke-width="8" stroke-linejoin="round"/>
          <rect x="142" y="151" width="76" height="112" rx="7" fill="#fff" stroke="#174b60" stroke-width="7"/>
          <path d="M52 64C8 100-6 168 20 220" ${accentStroke}/>
          <path d="m5 194 18 30 27-22" fill="#fff" stroke="var(--scene-accent)" stroke-width="8" stroke-linejoin="round"/>
          <path d="M307 226c47-38 57-108 27-158" ${accentStroke}/>
          <path d="m350 92-19-29-26 23" fill="#fff" stroke="var(--scene-accent)" stroke-width="8" stroke-linejoin="round"/>
          <path d="M180 138c-45-28-28-66 0-44 28-22 45 16 0 44Z" fill="var(--scene-accent)" opacity=".85"/>
        </g>`,
      9: `
        <g transform="translate(66 35)">
          <path d="M194 120 87 68M194 120l113-56M194 120 66 228M194 120l128 113" stroke="var(--scene-accent)" stroke-width="5" stroke-linecap="round" stroke-dasharray="4 11" opacity=".72"/>
          <circle cx="194" cy="120" r="74" fill="url(#${gradientId})" stroke="#174b60" stroke-width="8"/>
          <path d="m194 69 16 32 35 5-25 25 6 35-32-17-32 17 6-35-25-25 35-5Z" fill="#fff3cc" stroke="#d1a84e" stroke-width="6" stroke-linejoin="round"/>
          <g fill="#fff" stroke="#174b60" stroke-width="6">
            <circle cx="66" cy="55" r="34"/><circle cx="321" cy="54" r="34"/><circle cx="55" cy="240" r="34"/><circle cx="332" cy="244" r="34"/>
          </g>
          <g fill="var(--scene-soft)" stroke="var(--scene-accent)" stroke-width="5">
            <path d="M38 78c4-28 14-42 28-42s25 14 29 42"/><path d="M293 77c4-28 14-42 28-42s25 14 29 42"/><path d="M27 263c4-28 14-42 28-42s25 14 29 42"/><path d="M304 267c4-28 14-42 28-42s25 14 29 42"/>
          </g>
        </g>`,
      10: `
        <g transform="translate(78 34)">
          <path d="M55 31h238c22 0 39 17 39 39v167c0 22-17 39-39 39H177l-73 47 17-47H55c-22 0-39-17-39-39V70c0-22 17-39 39-39Z" fill="url(#${gradientId})" stroke="#174b60" stroke-width="8" stroke-linejoin="round"/>
          <path d="M83 93h183M83 139h151M83 185h176M83 231h103" stroke="var(--scene-accent)" stroke-width="7" stroke-linecap="round" opacity=".72"/>
          <g transform="translate(244 154) rotate(-35)">
            <path d="M0 0h42v153H0z" fill="#fff7e5" stroke="#174b60" stroke-width="7"/>
            <path d="M0 153h42l-21 37Z" fill="#fff" stroke="#174b60" stroke-width="7" stroke-linejoin="round"/>
            <path d="M0 31h42" stroke="var(--scene-accent)" stroke-width="8"/>
          </g>
          <circle cx="316" cy="41" r="22" fill="#fff3cd"/>
        </g>`
    };

    return scenes[order] || scenes[1];
  }
})();
