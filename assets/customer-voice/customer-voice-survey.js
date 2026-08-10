(() => {
  "use strict";

  const CONFIG = Object.freeze({
    restRoot: "https://pimmsycmnoxzchrsgykj.supabase.co/rest/v1",
    publishableKey: "sb_publishable_D9tFNCCaj6LY9rrW1fPV0Q_G8wRhC3N",
    runtimeRpc: "cv_public_runtime",
    submitRpc: "cv_public_submit",
    requestTimeoutMs: 20000
  });

  const state = {
    publicCode: "",
    runtime: null,
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
      "formError", "submitButton", "receiptCode", "newResponseButton", "websiteField"
    ].forEach((id) => { elements[id] = document.getElementById(id); });

    elements.retryButton.addEventListener("click", () => window.location.reload());
    elements.newResponseButton.addEventListener("click", startAnotherResponse);
    elements.surveyForm.addEventListener("submit", submitSurvey);

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
      updateProgress();
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

    const questions = runtime.questions.slice().sort((a, b) => {
      return Number(a.question_order || 0) - Number(b.question_order || 0);
    });

    elements.questionList.replaceChildren(...questions.map(renderQuestion));
    elements.requiredCount.textContent = String(questions.filter((q) => q.is_required).length);
  }

  function renderQuestion(question) {
    const article = document.createElement("article");
    article.className = "question-card";
    article.dataset.questionId = question.question_id;
    article.dataset.required = question.is_required ? "true" : "false";

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
    article.append(head);

    if (question.answer_type === "textarea") {
      article.append(renderTextarea(question));
    } else {
      article.append(renderScale(question));
    }

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

  async function submitSurvey(event) {
    event.preventDefault();
    if (state.submitting || !state.runtime) return;

    const missing = findMissingRequiredQuestions();
    if (missing.length) {
      missing.forEach((card) => card.classList.add("is-invalid"));
      showFormError(`未回答の必須設問が${missing.length}問あります。赤枠の設問へ回答してください。`);
      missing[0].scrollIntoView({ behavior: "smooth", block: "center" });
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
    return state.runtime.questions
      .slice()
      .sort((a, b) => Number(a.question_order) - Number(b.question_order))
      .map((question) => {
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
      })
      .filter(Boolean);
  }

  function findMissingRequiredQuestions() {
    return state.runtime.questions
      .filter((question) => question.is_required)
      .map((question) => elements.questionList.querySelector(
        `.question-card[data-question-id="${cssEscape(question.question_id)}"]`
      ))
      .filter((card) => {
        if (!card) return true;
        return !card.querySelector("input:checked, textarea:not(:placeholder-shown)");
      });
  }

  function updateProgress() {
    if (!state.runtime) return;
    const required = state.runtime.questions.filter((question) => question.is_required);
    const answered = required.filter((question) => {
      const card = elements.questionList.querySelector(
        `.question-card[data-question-id="${cssEscape(question.question_id)}"]`
      );
      return Boolean(card?.querySelector("input:checked"));
    }).length;

    elements.answeredCount.textContent = String(answered);
    elements.requiredCount.textContent = String(required.length);
    elements.progressBar.style.width = `${required.length ? (answered / required.length) * 100 : 0}%`;
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
})();
