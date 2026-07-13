(() => {
  "use strict";

  const config = window.CROSSMETHOD_FAQ_CONFIG || {};
  const hpApiUrl = String(config.hpApiUrl || "").trim();
  const list = document.getElementById("faq-list");
  const count = document.getElementById("faq-count");
  const empty = document.getElementById("faq-empty");
  const search = document.getElementById("faq-search-input");
  const categories = document.getElementById("faq-categories");

  let activeCategory = "all";
  let items = Array.from(document.querySelectorAll(".faq-item"));

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function buildUrl(action) {
    const url = new URL(hpApiUrl);
    url.searchParams.set("action", action);
    return url.toString();
  }

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Tokyo"
    }).format(date);
  }

  function buildItem(item) {
    const source = item.sourceUrl && item.sourceName
      ? `<div class="faq-source"><a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noopener">出典：${escapeHtml(item.sourceName)}</a>${item.checkedDate ? `<span>情報確認日：${escapeHtml(formatDate(item.checkedDate))}</span>` : ""}</div>`
      : "";

    return `<details class="faq-item" data-category="${escapeHtml(item.category)}">
      <summary><span class="faq-q">Q</span><span>${escapeHtml(item.question)}</span><i aria-hidden="true"></i></summary>
      <div class="faq-answer"><div class="faq-a">A</div><div><p>${escapeHtml(item.answer)}</p>${source}</div></div>
    </details>`;
  }

  function bindOpenEvents() {
    document.querySelectorAll(".faq-item").forEach((item) => {
      item.addEventListener("toggle", () => {
        if (!item.open || typeof window.gtag !== "function") return;
        const question = String(item.querySelector("summary")?.textContent || "")
          .replace(/^Q/, "")
          .trim();
        window.gtag("event", "faq_open", {
          faq_category: item.dataset.category || "",
          faq_question: question.slice(0, 100)
        });
      });
    });
  }

  function applyFilter() {
    const keyword = String(search?.value || "").trim().toLowerCase();
    let visibleCount = 0;

    items.forEach((item) => {
      const categoryMatch = activeCategory === "all" || item.dataset.category === activeCategory;
      const textMatch = !keyword || item.textContent.toLowerCase().includes(keyword);
      const visible = categoryMatch && textMatch;
      item.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (count) count.textContent = `${visibleCount}件の質問`;
    if (empty) empty.hidden = visibleCount !== 0;
  }

  function applySettings(settings) {
    document.querySelectorAll('[data-managed-setting="company_name"]').forEach((element) => {
      element.textContent = settings.company_name || "合同会社 TSUNAGARI";
    });
    document.querySelectorAll('[data-managed-setting="company_address"]').forEach((element) => {
      element.textContent = settings.company_address
        ? `所在地：${settings.company_address}`
        : "所在地は公式サイトの運営会社情報をご確認ください。";
    });
  }

  async function loadManagedFaq() {
    if (!hpApiUrl || !list) return;

    try {
      const [faqResponse, bootstrapResponse] = await Promise.all([
        fetch(buildUrl("faq"), { cache: "no-store", redirect: "follow" }),
        fetch(buildUrl("bootstrap"), { cache: "no-store", redirect: "follow" })
      ]);

      const faqResult = await faqResponse.json();
      const bootstrapResult = await bootstrapResponse.json();
      const managedItems = Array.isArray(faqResult?.data?.items) ? faqResult.data.items : [];

      if (faqResult?.success && managedItems.length) {
        list.innerHTML = managedItems.map(buildItem).join("");
        items = Array.from(list.querySelectorAll(".faq-item"));
        bindOpenEvents();
        applyFilter();
      }

      applySettings(bootstrapResult?.data?.settings || {});
    } catch (error) {
      console.warn("FAQの最新情報を取得できませんでした。", error);
    }
  }

  categories?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-faq-category]");
    if (!button) return;
    activeCategory = button.dataset.faqCategory || "all";
    categories.querySelectorAll("button").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });
    applyFilter();
  });

  search?.addEventListener("input", applyFilter);

  bindOpenEvents();
  applyFilter();
  loadManagedFaq();
})();
