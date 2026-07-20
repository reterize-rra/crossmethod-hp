(() => {
  "use strict";

  const VOICE_ROUTES = Object.freeze({
    "1": "/customer-voice/",
    "2": "/employee-voice/",
    "3": "/employee-retention/",
    "4": "/employee-voice/",
    "5": "/employee-retention/",
    "6": "/employee-voice/",
    "7": "/employee-retention/",
    "8": "/employee-retention/",
    "9": "/employee-retention/",
    "10": "/employee-retention/",
    "11": "/employee-retention/",
    "12": "/employee-retention/",
    "13": "/employee-retention/",
    "14": "/risk-safety/",
    "15": "/health-management/",
    "16": "/risk-safety/",
    "17": "/risk-safety/",
    "18": "/risk-safety/"
  });

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
    linkNumberedVoiceCards(document);
    observeNumberedVoiceCards();
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

  function linkNumberedVoiceCards(root) {
    const selector = ".ev-voice-card, .hm-voice-card, .rs-voice-card";
    const cards = [];

    if (root instanceof Element && root.matches(selector)) cards.push(root);
    if (root && typeof root.querySelectorAll === "function") {
      cards.push(...root.querySelectorAll(selector));
    }

    cards.forEach((card) => {
      const numberElement = card.querySelector(
        ".ev-voice-number, .hm-voice-number, .rs-voice-number"
      );
      const number = String(numberElement?.textContent || "").match(/\d+/)?.[0] || "";
      const route = VOICE_ROUTES[number];
      if (!route) return;

      if (card.tagName === "A") {
        card.setAttribute("href", route);
        card.dataset.voiceRouteLinked = "true";
        return;
      }

      const link = document.createElement("a");
      Array.from(card.attributes).forEach((attribute) => {
        link.setAttribute(attribute.name, attribute.value);
      });
      link.innerHTML = card.innerHTML;
      link.setAttribute("href", route);
      link.dataset.voiceRouteLinked = "true";

      const title = String(card.querySelector("h3")?.textContent || "").trim();
      const accessibleLabel = title
        ? `${number}. ${title}に関する支援ページを見る`
        : `声${number}に関する支援ページを見る`;
      link.setAttribute("aria-label", accessibleLabel);
      link.setAttribute("title", accessibleLabel);

      card.replaceWith(link);
    });
  }

  function observeNumberedVoiceCards() {
    if (!document.body || typeof MutationObserver !== "function") return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            linkNumberedVoiceCards(node);
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
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
