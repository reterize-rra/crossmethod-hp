(() => {
  "use strict";

  const ACCESS_HASH = "f9194bcf0a2f1cb4ce53833758bd03d2770bbd14dc6ff2f6060f8bd3ee77aa29";
  const SESSION_KEY = "crossmethod_brochure_access_2026";
  const TURN_DURATION = 720;

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
  const printButton = document.getElementById("print-button");
  const fullscreenButton = document.getElementById("fullscreen-button");
  const contentsButton = document.getElementById("contents-button");
  const contentsPanel = document.getElementById("contents-panel");
  const contentsGrid = document.getElementById("contents-grid");
  const bookViewport = document.getElementById("book-viewport");

  let currentIndex = 0;
  let isTurning = false;
  let touchStartX = 0;
  let touchStartY = 0;

  initialize();

  function initialize() {
    totalPagesDisplay.textContent = String(pages.length);
    buildContents();
    bindEvents();
    initializePricing();
    updateControls();

    if (sessionStorage.getItem(SESSION_KEY) === "granted") {
      showBrochure(false);
    } else {
      accessInput?.focus();
    }
  }

  function bindEvents() {
    accessForm?.addEventListener("submit", handleAccessSubmit);
    toggleCode?.addEventListener("click", togglePasswordVisibility);
    prevButton?.addEventListener("click", () => turnTo(currentIndex - 1));
    nextButton?.addEventListener("click", () => turnTo(currentIndex + 1));
    printButton?.addEventListener("click", handlePdfExport);
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
        turnTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        turnTo(pages.length - 1);
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
      if (Math.abs(deltaX) < 52 || Math.abs(deltaX) < Math.abs(deltaY)) return;
      turnTo(deltaX < 0 ? currentIndex + 1 : currentIndex - 1);
    }, { passive: true });

    document.addEventListener("fullscreenchange", updateFullscreenLabel);
  }

  async function handleAccessSubmit(event) {
    event.preventDefault();
    const value = String(accessInput.value || "").trim().toUpperCase();
    if (!value) {
      showAccessError("アクセスコードを入力してください。");
      return;
    }

    const submitButton = accessForm.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "確認しています…";

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
      showAccessError("認証処理を完了できませんでした。ブラウザを更新して再度お試しください。");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "パンフレットを開く";
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
    const showing = accessInput.type === "text";
    accessInput.type = showing ? "password" : "text";
    toggleCode.textContent = showing ? "表示" : "非表示";
    toggleCode.setAttribute("aria-label", showing ? "アクセスコードを表示する" : "アクセスコードを隠す");
    accessInput.focus();
  }

  function showBrochure(animate) {
    app.hidden = false;
    if (animate) {
      gate.classList.add("is-leaving");
      window.setTimeout(() => {
        gate.hidden = true;
        pages[currentIndex]?.focus?.();
      }, 540);
    } else {
      gate.hidden = true;
    }
    document.body.style.overflow = "";
    updateControls();
  }

  function turnTo(targetIndex) {
    if (isTurning || targetIndex === currentIndex || targetIndex < 0 || targetIndex >= pages.length) return;
    isTurning = true;

    const currentPage = pages[currentIndex];
    const targetPage = pages[targetIndex];
    const isForward = targetIndex > currentIndex;

    if (Math.abs(targetIndex - currentIndex) > 1) {
      currentPage.classList.remove("is-current");
      targetPage.classList.add("is-current");
      currentIndex = targetIndex;
      isTurning = false;
      updateControls();
      return;
    }

    if (isForward) {
      targetPage.classList.add("is-under");
      currentPage.classList.add("turn-forward");
      window.setTimeout(() => {
        currentPage.classList.remove("is-current", "turn-forward");
        targetPage.classList.remove("is-under");
        targetPage.classList.add("is-current");
        currentIndex = targetIndex;
        isTurning = false;
        updateControls();
      }, TURN_DURATION);
    } else {
      currentPage.classList.add("is-under");
      targetPage.classList.add("turn-backward");
      window.setTimeout(() => {
        currentPage.classList.remove("is-current", "is-under");
        targetPage.classList.remove("turn-backward");
        targetPage.classList.add("is-current");
        currentIndex = targetIndex;
        isTurning = false;
        updateControls();
      }, TURN_DURATION);
    }
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
        turnTo(index);
      });
      contentsGrid.appendChild(button);
    });
  }

  function openContents() {
    contentsPanel.hidden = false;
    document.body.style.overflow = "hidden";
    const active = contentsGrid.querySelector("[aria-current='page']") || contentsGrid.querySelector("button");
    active?.focus();
  }

  function closeContents() {
    contentsPanel.hidden = true;
    document.body.style.overflow = "";
    contentsButton.focus();
  }

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) await app.requestFullscreen();
      else await document.exitFullscreen();
    } catch (error) {
      console.warn("Fullscreen is not available.", error);
    }
  }

  function updateFullscreenLabel() {
    fullscreenButton.textContent = document.fullscreenElement ? "全画面を終了" : "全画面";
  }



  async function handlePdfExport() {
    const originalLabel = printButton?.textContent || "PDF・印刷";
    if (printButton) {
      printButton.disabled = true;
      printButton.textContent = "PDFを作成しています…";
    }
    try {
      const libs = await ensurePdfLibraries();
      if (!libs?.html2canvas || !libs?.jsPDF) throw new Error("pdf libraries unavailable");
      await exportCurrentBrochureToPdf(libs.html2canvas, libs.jsPDF);
    } catch (error) {
      console.warn("PDF export failed. Falling back to print.", error);
      window.print();
    } finally {
      if (printButton) {
        printButton.disabled = false;
        printButton.textContent = originalLabel;
      }
    }
  }

  async function ensurePdfLibraries() {
    if (window.html2canvas && window.jspdf?.jsPDF) {
      return { html2canvas: window.html2canvas, jsPDF: window.jspdf.jsPDF };
    }
    await loadScriptOnce("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js");
    await loadScriptOnce("https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js");
    return { html2canvas: window.html2canvas, jsPDF: window.jspdf?.jsPDF };
  }

  function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-external-src="${src}"]`);
      if (existing) {
        if (existing.dataset.loaded === "true") return resolve();
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.dataset.externalSrc = src;
      script.addEventListener("load", () => { script.dataset.loaded = "true"; resolve(); }, { once: true });
      script.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true });
      document.head.appendChild(script);
    });
  }

  async function exportCurrentBrochureToPdf(html2canvas, JsPdf) {
    document.body.classList.add("pdf-capture-mode");
    const previousIndex = currentIndex;
    try {
      pages.forEach((page) => page.classList.add("is-current"));
      await nextFrame();
      const canvases = [];
      for (const page of pages) {
        await nextFrame();
        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
          windowWidth: 1123,
          windowHeight: 794
        });
        canvases.push(canvas);
      }
      const first = canvases[0];
      const pdf = new JsPdf({
        orientation: "landscape",
        unit: "px",
        format: [first.width, first.height],
        compress: true
      });
      canvases.forEach((canvas, index) => {
        if (index > 0) pdf.addPage([canvas.width, canvas.height], "landscape");
        const img = canvas.toDataURL("image/jpeg", 0.98);
        pdf.addImage(img, "JPEG", 0, 0, canvas.width, canvas.height, undefined, "FAST");
      });
      pdf.save("crossmethod-brochure.pdf");
    } finally {
      document.body.classList.remove("pdf-capture-mode");
      pages.forEach((page, index) => {
        page.classList.remove("is-current", "is-under", "turn-forward", "turn-backward");
        if (index === previousIndex) page.classList.add("is-current");
      });
      currentIndex = previousIndex;
      isTurning = false;
      updateControls();
      await nextFrame();
    }
  }

  function nextFrame() {
    return new Promise((resolve) => window.requestAnimationFrame(() => window.requestAnimationFrame(resolve)));
  }

  function initializePricing() {
    const employeeCount = document.getElementById("employee-count");
    const voicePlan = document.getElementById("voice-plan");
    const evaluationPlan = document.getElementById("evaluation-plan");
    const contractFee = document.getElementById("contract-fee");
    const monthlyFee = document.getElementById("monthly-fee");
    const annualFee = document.getElementById("annual-fee");

    const update = () => {
      const employees = clamp(parseInt(employeeCount.value, 10) || 1, 1, 10000);
      if (String(employees) !== employeeCount.value) employeeCount.value = String(employees);
      const contract = employees * 11000;
      const voice = voicePlan.checked ? 33000 : 0;
      const evaluation = evaluationPlan.checked ? Math.max(employees * 1100, 33000) : 0;
      const monthly = voice + evaluation;
      const annual = contract + monthly * 12;

      contractFee.textContent = formatYen(contract);
      monthlyFee.textContent = formatYen(monthly);
      annualFee.textContent = formatYen(annual);
    };

    [employeeCount, voicePlan, evaluationPlan].forEach((element) => {
      element?.addEventListener("input", update);
      element?.addEventListener("change", update);
    });
    update();
  }

  function formatYen(value) {
    return `${new Intl.NumberFormat("ja-JP").format(value)}円`;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function isTyping(target) {
    return target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement || target?.isContentEditable;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
  }
})();
