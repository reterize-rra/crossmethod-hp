(() => {
  "use strict";

  const html = document.documentElement;
  const body = document.body;
  const dialog = document.getElementById("er-login-dialog");
  const form = document.getElementById("er-login-form");
  const title = document.getElementById("er-login-title");
  const description = document.getElementById("er-login-description");
  const modeInput = document.getElementById("er-login-mode");
  const companyCodeInput = document.getElementById("er-company-code");
  const help = document.getElementById("er-login-help");
  const error = document.getElementById("er-login-error");
  const unconfigured = document.getElementById("er-login-unconfigured");

  const portal = document.getElementById("er-app-portal");
  const portalFrame = document.getElementById("er-app-frame");
  const portalLoading = document.getElementById("er-portal-loading");
  const portalRole = document.getElementById("er-portal-role");
  const portalCompany = document.getElementById("er-portal-company");
  const portalExternal = document.getElementById("er-portal-external");
  const portalRefresh = document.getElementById("er-portal-refresh");
  const portalClose = document.getElementById("er-portal-close");

  const PAGE_CONFIG = {
    hrAppUrl: String(html.dataset.hrAppUrl || "https://script.google.com/macros/s/AKfycbzjrFHuzgp7bpJrr8ek-rxqgp4lDVrJ7MjfZq925y78V3V1iEVYT67dk9DGK-XIDy244Q/exec").trim(),
    adminMode: "admin",
    personMode: "test"
  };

  let currentPortalUrl = "";

  document.addEventListener("DOMContentLoaded", () => {
    setupImageFallbacks();
    setupReveal();
    setupMobileMenu();
    setupLoginDialog();
    setupPortal();
    setupFaq();
  });

  function setupImageFallbacks() {
    document.querySelectorAll(".er-company-logo, .er-footer-brand img, .er-portal-brand img").forEach((img) => {
      img.addEventListener("error", () => {
        img.style.display = "none";
        const fallback = img.parentElement?.querySelector(".er-company-fallback");
        if (fallback) fallback.style.display = "inline-block";
      });
    });

    document.querySelectorAll(".er-method-mark").forEach((img) => {
      img.addEventListener("error", () => {
        img.style.display = "none";
      });
    });
  }

  function setupReveal() {
    const items = [...document.querySelectorAll(".reveal")];
    if (!items.length) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -4% 0px"
    });

    items.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 6, 5) * 45}ms`;
      observer.observe(item);
    });
  }

  function setupMobileMenu() {
    const toggle = document.querySelector(".er-menu-toggle");
    const drawer = document.querySelector(".er-mobile-menu");
    const backdrop = document.querySelector(".er-mobile-backdrop");
    const close = document.querySelector(".er-mobile-close");

    if (!toggle || !drawer || !backdrop) return;

    const setOpen = (open) => {
      drawer.classList.toggle("is-open", open);
      backdrop.classList.toggle("is-open", open);
      drawer.setAttribute("aria-hidden", String(!open));
      backdrop.setAttribute("aria-hidden", String(!open));
      toggle.setAttribute("aria-expanded", String(open));
      body.classList.toggle("is-menu-open", open);
    };

    toggle.addEventListener("click", () => setOpen(true));
    close?.addEventListener("click", () => setOpen(false));
    backdrop.addEventListener("click", () => setOpen(false));
    drawer.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("click", () => setOpen(false));
    });
  }

  function setupLoginDialog() {
    if (!dialog || !form || !companyCodeInput) return;

    document.querySelectorAll("[data-login-open]").forEach((button) => {
      button.addEventListener("click", () => {
        openLogin(button.dataset.loginOpen === "person" ? "person" : "admin");
      });
    });

    dialog.querySelector(".er-dialog-close")?.addEventListener("click", closeDialog);
    dialog.querySelector("[data-dialog-cancel]")?.addEventListener("click", closeDialog);

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeDialog();
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      error.textContent = "";
      unconfigured.hidden = true;

      const companyCode = normalizeCompanyCode(companyCodeInput.value);
      if (!companyCode) {
        error.textContent = "会社コードを入力してください。";
        companyCodeInput.focus();
        return;
      }

      if (!/^[A-Z0-9_-]{4,20}$/.test(companyCode)) {
        error.textContent = "会社コードの形式を確認してください。";
        companyCodeInput.focus();
        return;
      }

      const base = normalizeAppUrl(PAGE_CONFIG.hrAppUrl);
      if (!base) {
        unconfigured.hidden = false;
        return;
      }

      const isPerson = modeInput.value === "person";
      const mode = isPerson ? PAGE_CONFIG.personMode : PAGE_CONFIG.adminMode;
      const url = new URL(base);
      url.searchParams.set("mode", mode);
      url.searchParams.set("company", companyCode);

      closeDialog();
      openPortal(url.toString(), isPerson ? "person" : "admin", companyCode);
    });
  }

  function openLogin(mode) {
    const isPerson = mode === "person";
    modeInput.value = isPerson ? "person" : "admin";
    title.textContent = isPerson ? "個人ログインへ" : "企業管理ページへ";
    description.textContent = "会社コードを入力してください。";
    help.textContent = isPerson
      ? "ポータル内で、個人評価IDと6桁PINを入力します。"
      : "ポータル内で、管理パスコードを入力します。";
    error.textContent = "";
    unconfigured.hidden = true;
    companyCodeInput.value = "";

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
      requestAnimationFrame(() => companyCodeInput.focus());
    } else {
      dialog.setAttribute("open", "");
      companyCodeInput.focus();
    }
  }

  function closeDialog() {
    if (!dialog) return;
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  }

  function setupPortal() {
    if (!portal || !portalFrame) return;

    portalFrame.addEventListener("load", () => {
      window.setTimeout(() => {
        portalLoading?.classList.add("is-hidden");
      }, 250);
    });

    portalClose?.addEventListener("click", closePortal);

    portalRefresh?.addEventListener("click", () => {
      if (!currentPortalUrl) return;
      portalLoading?.classList.remove("is-hidden");
      portalFrame.src = "about:blank";
      window.setTimeout(() => {
        portalFrame.src = currentPortalUrl;
      }, 60);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !portal.hidden) {
        closePortal();
      }
    });
  }

  function openPortal(url, mode, companyCode) {
    currentPortalUrl = url;
    portalRole.textContent = mode === "person" ? "従業員・役職者" : "企業管理者";
    portalCompany.textContent = companyCode;
    portalExternal.href = url;
    portalLoading?.classList.remove("is-hidden");
    portal.hidden = false;
    portal.setAttribute("aria-hidden", "false");
    body.classList.add("er-portal-open");
    portalFrame.title = mode === "person"
      ? "クロス式™ 人事評価制度 個人ログイン"
      : "クロス式™ 人事評価制度 企業管理ページ";
    requestAnimationFrame(() => {
      portalFrame.src = url;
      portalClose?.focus();
    });
  }

  function closePortal() {
    if (!portal || portal.hidden) return;
    portal.hidden = true;
    portal.setAttribute("aria-hidden", "true");
    body.classList.remove("er-portal-open");
    portalLoading?.classList.remove("is-hidden");
    window.setTimeout(() => {
      portalFrame.src = "about:blank";
      currentPortalUrl = "";
    }, 120);
  }

  function normalizeCompanyCode(value) {
    return String(value || "")
      .normalize("NFKC")
      .toUpperCase()
      .replace(/\s+/g, "")
      .trim();
  }

  function normalizeAppUrl(value) {
    const raw = String(value || "").trim();
    if (!raw || raw === "HR_WEB_APP_URL_HERE") return "";

    try {
      const url = new URL(raw);
      if (url.protocol !== "https:" || !url.pathname.endsWith("/exec")) return "";
      return url.toString();
    } catch (e) {
      return "";
    }
  }

  function setupFaq() {
    document.querySelectorAll(".er-faq details").forEach((detail) => {
      detail.addEventListener("toggle", () => {
        if (!detail.open) return;
        document.querySelectorAll(".er-faq details[open]").forEach((other) => {
          if (other !== detail) other.open = false;
        });
      });
    });
  }
})();
