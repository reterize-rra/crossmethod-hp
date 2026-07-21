(() => {
  "use strict";

  const ACCESS_HASH = "f9194bcf0a2f1cb4ce53833758bd03d2770bbd14dc6ff2f6060f8bd3ee77aa29";
  const SESSION_KEY = "crossmethod_brochure_access_2026";
  const TURN_DURATION = 700;

  const gate = document.getElementById("access-gate");
  const app = document.getElementById("brochure-app");
  const accessForm = document.getElementById("access-form");
  const accessInput = document.getElementById("access-code");
  const accessError = document.getElementById("access-error");
  const toggleCode = document.getElementById("toggle-code");
  const pages = Array.from(document.querySelectorAll(".brochure-page"));
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  const currentPageDisplay = document.getElementById("current-page");
  const totalPagesDisplay = document.getElementById("total-pages");
  const progressBar = document.getElementById("progress-bar");
  const currentTitle = document.getElementById("current-title");
  const fullscreenButton = document.getElementById("fullscreen-button");
  const contentsButton = document.getElementById("contents-button");
  const contentsPanel = document.getElementById("contents-panel");
  const contentsGrid = document.getElementById("contents-grid");
  const bookViewport = document.getElementById("book-viewport");
  const workspace = document.querySelector(".workspace");
  const toolbar = document.querySelector(".toolbar");
  const controller = document.querySelector(".controller");

  let currentIndex = 0;
  let isTurning = false;
  let touchStartX = 0;
  let touchStartY = 0;
  let fitRequest = 0;

  initialize();

  function initialize() {
    totalPagesDisplay.textContent = String(pages.length);
    buildContents();
    bindEvents();
    initializePricing();
    updateControls();
    scheduleBookFit();

    const printMode = new URLSearchParams(window.location.search).has("print");
    if (printMode) {
      app.hidden = false;
      gate.hidden = true;
      document.body.classList.add("print-preview");
      pages.forEach((page) => page.classList.add("is-current"));
      return;
    }

    if (sessionStorage.getItem(SESSION_KEY) === "granted") showBrochure(false);
    else accessInput?.focus();
  }

  function bindEvents() {
    accessForm?.addEventListener("submit", handleAccessSubmit);
    toggleCode?.addEventListener("click", togglePasswordVisibility);
    prevButton?.addEventListener("click", () => turnTo(currentIndex - 1));
    nextButton?.addEventListener("click", () => turnTo(currentIndex + 1));
    fullscreenButton?.addEventListener("click", toggleFullscreen);
    contentsButton?.addEventListener("click", openContents);
    contentsPanel?.querySelectorAll("[data-close-contents]").forEach((node) => node.addEventListener("click", closeContents));

    document.addEventListener("keydown", (event) => {
      if (!contentsPanel.hidden && event.key === "Escape") {
        closeContents();
        return;
      }
      if (app.hidden || isTyping(event.target) || !contentsPanel.hidden) return;
      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        turnTo(currentIndex + 1);
      } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        turnTo(currentIndex - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        turnTo(0, true);
      } else if (event.key === "End") {
        event.preventDefault();
        turnTo(pages.length - 1, true);
      }
    });

    bookViewport?.addEventListener("touchstart", (event) => {
      const touch = event.changedTouches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    }, { passive: true });

    bookViewport?.addEventListener("touchend", (event) => {
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      if (Math.abs(deltaX) < 54 || Math.abs(deltaX) < Math.abs(deltaY)) return;
      turnTo(deltaX < 0 ? currentIndex + 1 : currentIndex - 1);
    }, { passive: true });

    document.addEventListener("fullscreenchange", () => {
      updateFullscreenLabel();
      scheduleBookFit();
    });
    window.addEventListener("resize", scheduleBookFit, { passive: true });
    window.visualViewport?.addEventListener("resize", scheduleBookFit, { passive: true });
    window.matchMedia("(max-width: 720px)").addEventListener?.("change", () => {
      resetPageClasses();
      scheduleBookFit();
    });
  }

  async function handleAccessSubmit(event) {
    event.preventDefault();
    const value = String(accessInput.value || "").trim().toUpperCase();
    if (!value) {
      showAccessError("アクセスコードを入力してください。");
      return;
    }
    const submit = accessForm.querySelector("button[type='submit']");
    submit.disabled = true;
    submit.textContent = "確認しています…";
    try {
      const hash = await sha256(value);
      if (hash !== ACCESS_HASH) {
        showAccessError("アクセスコードが正しくありません。もう一度ご確認ください。");
        accessInput.select();
        return;
      }
      sessionStorage.setItem(SESSION_KEY, "granted");
      showBrochure(true);
    } catch (error) {
      console.error(error);
      showAccessError("認証処理を完了できませんでした。ページを更新して再度お試しください。");
    } finally {
      submit.disabled = false;
      submit.textContent = "パンフレットを開く";
    }
  }

  async function sha256(text) {
    const bytes = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  function showAccessError(message) {
    accessError.textContent = message;
    accessInput.setAttribute("aria-invalid", "true");
  }

  function togglePasswordVisibility() {
    const visible = accessInput.type === "text";
    accessInput.type = visible ? "password" : "text";
    toggleCode.textContent = visible ? "表示" : "非表示";
    accessInput.focus();
  }

  function showBrochure(animate) {
    app.hidden = false;
    if (animate) {
      gate.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 420, easing: "ease", fill: "forwards" });
      window.setTimeout(() => { gate.hidden = true; }, 420);
    } else gate.hidden = true;
    updateControls();
    scheduleBookFit();
  }

  function scheduleBookFit() {
    window.cancelAnimationFrame(fitRequest);
    fitRequest = window.requestAnimationFrame(fitBookToViewport);
  }

  function fitBookToViewport() {
    if (!bookViewport || !workspace) return;

    if (isMobile() || document.body.classList.contains("print-preview")) {
      bookViewport.style.removeProperty("width");
      bookViewport.style.removeProperty("height");
      const stage = document.getElementById("book-stage");
      stage?.style.removeProperty("transform");
      return;
    }

    const stage = document.getElementById("book-stage");
    if (!stage) return;

    const style = window.getComputedStyle(workspace);
    const horizontalPadding = parseFloat(style.paddingLeft || 0) + parseFloat(style.paddingRight || 0);
    const verticalPadding = parseFloat(style.paddingTop || 0) + parseFloat(style.paddingBottom || 0);
    const gap = parseFloat(style.columnGap || style.gap || 0);
    const reservedNavigation = 64 * 2 + gap * 2;

    const maxWidth = Math.max(320, workspace.clientWidth - horizontalPadding - reservedNavigation);
    const maxHeight = Math.max(240, workspace.clientHeight - verticalPadding);
    const designWidth = 1123;
    const designHeight = 794;
    const scale = Math.min(maxWidth / designWidth, maxHeight / designHeight, 1);

    const fittedWidth = Math.floor(designWidth * scale);
    const fittedHeight = Math.floor(designHeight * scale);

    bookViewport.style.width = `${fittedWidth}px`;
    bookViewport.style.height = `${fittedHeight}px`;
    stage.style.transform = `scale(${scale})`;
  }

  function isMobile() {
    return window.matchMedia("(max-width: 720px)").matches;
  }

  function turnTo(targetIndex, immediate = false) {
    if (targetIndex < 0 || targetIndex >= pages.length || targetIndex === currentIndex || isTurning) return;
    const currentPage = pages[currentIndex];
    const targetPage = pages[targetIndex];

    if (isMobile() || immediate || Math.abs(targetIndex - currentIndex) > 1) {
      currentPage.classList.remove("is-current", "is-under", "turn-forward", "turn-backward");
      targetPage.classList.add("is-current");
      currentIndex = targetIndex;
      updateControls();
      window.scrollTo({ top: 0, behavior: isMobile() ? "smooth" : "auto" });
      return;
    }

    isTurning = true;
    const forward = targetIndex > currentIndex;
    if (forward) {
      targetPage.classList.add("is-under");
      currentPage.classList.add("turn-forward");
      window.setTimeout(() => {
        currentPage.classList.remove("is-current", "turn-forward");
        targetPage.classList.remove("is-under");
        targetPage.classList.add("is-current");
        finishTurn(targetIndex);
      }, TURN_DURATION);
    } else {
      currentPage.classList.add("is-under");
      targetPage.classList.add("turn-backward");
      window.setTimeout(() => {
        currentPage.classList.remove("is-current", "is-under");
        targetPage.classList.remove("turn-backward");
        targetPage.classList.add("is-current");
        finishTurn(targetIndex);
      }, TURN_DURATION);
    }
  }

  function finishTurn(index) {
    currentIndex = index;
    isTurning = false;
    updateControls();
  }

  function resetPageClasses() {
    pages.forEach((page, index) => {
      page.classList.remove("is-current", "is-under", "turn-forward", "turn-backward");
      if (index === currentIndex) page.classList.add("is-current");
    });
    isTurning = false;
    updateControls();
  }

  function updateControls() {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === pages.length - 1;
    currentPageDisplay.textContent = String(currentIndex + 1);
    progressBar.style.width = `${((currentIndex + 1) / pages.length) * 100}%`;
    currentTitle.textContent = pages[currentIndex]?.dataset.title || "";
    pages.forEach((page, index) => page.setAttribute("aria-hidden", index === currentIndex ? "false" : "true"));
    contentsGrid.querySelectorAll("button").forEach((button, index) => {
      if (index === currentIndex) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
  }

  function buildContents() {
    pages.forEach((page, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.innerHTML = `<b>${String(index + 1).padStart(2, "0")}</b><span>${escapeHtml(page.dataset.title || `ページ ${index + 1}`)}</span>`;
      button.addEventListener("click", () => {
        closeContents();
        turnTo(index, true);
      });
      contentsGrid.appendChild(button);
    });
  }

  function openContents() {
    contentsPanel.hidden = false;
    document.body.style.overflow = "hidden";
    (contentsGrid.querySelector("[aria-current='page']") || contentsGrid.querySelector("button"))?.focus();
  }

  function closeContents() {
    contentsPanel.hidden = true;
    document.body.style.overflow = "";
    contentsButton?.focus();
  }

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) await app.requestFullscreen();
      else await document.exitFullscreen();
    } catch (error) {
      console.warn("Fullscreen is unavailable.", error);
    }
  }

  function updateFullscreenLabel() {
    fullscreenButton.textContent = document.fullscreenElement ? "全画面を終了" : "全画面";
  }

  function initializePricing() {
    const employeeCount = document.getElementById("employee-count");
    const diagnosticPlan = document.getElementById("diagnostic-plan");
    const evaluationPlan = document.getElementById("evaluation-plan");
    const contractFee = document.getElementById("contract-fee");
    const diagnosticFee = document.getElementById("diagnostic-fee");
    const evaluationFee = document.getElementById("evaluation-fee");
    const monthlyFee = document.getElementById("monthly-fee");

    const update = () => {
      const employees = clamp(parseInt(employeeCount.value, 10) || 1, 1, 10000);
      employeeCount.value = String(employees);

      const contract = employees * 11000;
      const diagnostic = diagnosticPlan.checked ? getDiagnosticSupportFee(employees) : 0;
      const evaluation = evaluationPlan.checked ? Math.max(employees * 1100, 33000) : 0;

      contractFee.textContent = formatYen(contract);
      evaluationFee.textContent = formatYen(evaluation);

      if (diagnostic === null) {
        diagnosticFee.textContent = "要相談";
        monthlyFee.textContent = "要相談";
        monthlyFee.closest("div")?.classList.add("is-consultation");
      } else {
        diagnosticFee.textContent = formatYen(diagnostic);
        const monthly = diagnostic + evaluation;
        monthlyFee.textContent = formatYen(monthly);
        monthlyFee.closest("div")?.classList.remove("is-consultation");
      }
    };

    [employeeCount, diagnosticPlan, evaluationPlan].forEach((element) => {
      element?.addEventListener("input", update);
      element?.addEventListener("change", update);
    });
    update();
  }

  function getDiagnosticSupportFee(employees) {
    if (employees <= 30) return 33000;
    if (employees <= 50) return 55000;
    if (employees <= 100) return 110000;
    if (employees <= 150) return 150000;
    if (employees < 200) return 200000;
    return null;
  }

  function formatYen(value) { return `${new Intl.NumberFormat("ja-JP").format(value)}円`; }
  function clamp(value, min, max) { return Math.min(Math.max(value, min), max); }
  function isTyping(target) { return target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement || target?.isContentEditable; }
  function escapeHtml(value) { return String(value).replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char])); }
})();
