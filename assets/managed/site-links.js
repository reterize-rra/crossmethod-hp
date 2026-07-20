(() => {
  "use strict";

  const ROUTES = Object.freeze({
    "トップへ戻る": "/",
    "ホーム": "/",
    "お客様の声・顧客体験": "/customer-voice/",
    "お客様の声": "/customer-voice/",
    "従業員の声・組織診断": "/employee-voice/",
    "従業員の声": "/employee-voice/",
    "健康経営支援": "/health-management/",
    "健康経営": "/health-management/",
    "ストレスチェック": "/stress-check/",
    "人材定着・人事評価": "/employee-retention/",
    "人事評価制度": "/employee-retention/",
    "健康食・社食": "/healthy-food/",
    "健康食": "/healthy-food/",
    "リスク予防": "/risk-safety/",
    "カウンセリング・セミナー": "/seminar-counseling/"
  });

  document.addEventListener("DOMContentLoaded", () => {
    normalizeKnownInternalLinks();
    highlightCurrentService();
  });

  function normalizeKnownInternalLinks() {
    document.querySelectorAll("a").forEach((anchor) => {
      const label = String(anchor.textContent || "").replace(/\s+/g, " ").trim();
      const target = ROUTES[label];
      if (!target) return;

      const href = String(anchor.getAttribute("href") || "").trim();
      if (!href || href === "#" || href.startsWith("/#")) {
        anchor.setAttribute("href", target);
      }
    });
  }

  function highlightCurrentService() {
    const current = normalizePath(location.pathname);
    document.querySelectorAll(".cm-service-link[data-route]").forEach((link) => {
      const route = normalizePath(link.dataset.route);
      const active = current === route;
      link.classList.toggle("is-current", active);
      if (active) link.setAttribute("aria-current", "page");
    });
  }

  function normalizePath(value) {
    const path = String(value || "/").replace(/\/index\.html$/i, "/");
    return path.endsWith("/") ? path : `${path}/`;
  }
})();
