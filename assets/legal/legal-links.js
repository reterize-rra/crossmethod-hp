(() => {
  "use strict";

  const privacyUrl = "/privacy-policy/";
  const commerceUrl = "/commercial-transaction/";

  function addFooterLinks() {
    const footerCompany = document.querySelector(".site-footer .footer-company");
    if (!footerCompany || footerCompany.querySelector(".footer-legal-links")) return;

    const nav = document.createElement("nav");
    nav.className = "footer-legal-links";
    nav.setAttribute("aria-label", "法務・運営情報");
    nav.innerHTML = `
      <a href="${privacyUrl}">プライバシーポリシー</a>
      <a href="${commerceUrl}">特定商取引法に基づく表記</a>
      <a href="#contact">お問い合わせ</a>
    `;
    footerCompany.appendChild(nav);
  }

  function addFormNotices() {
    const orderForm = document.getElementById("order-form");
    if (orderForm && !orderForm.querySelector(".legal-form-notice")) {
      const notice = document.createElement("p");
      notice.className = "legal-form-notice";
      notice.innerHTML = `注文依頼の前に、<a href="${commerceUrl}" target="_blank" rel="noopener">特定商取引法に基づく表記</a>と<a href="${privacyUrl}" target="_blank" rel="noopener">プライバシーポリシー</a>をご確認ください。`;
      const submit = orderForm.querySelector('button[type="submit"]');
      if (submit) orderForm.insertBefore(notice, submit);
      else orderForm.appendChild(notice);
    }

    const contactForm = document.getElementById("contact-form");
    if (contactForm && !contactForm.querySelector(".legal-form-notice")) {
      const notice = document.createElement("p");
      notice.className = "legal-form-notice";
      notice.innerHTML = `送信により、<a href="${privacyUrl}" target="_blank" rel="noopener">プライバシーポリシー</a>に沿った情報の取り扱いに同意したものとします。`;
      const submit = contactForm.querySelector('button[type="submit"]');
      if (submit) contactForm.insertBefore(notice, submit);
      else contactForm.appendChild(notice);
    }
  }

  function addStyles() {
    if (document.getElementById("crossmethod-legal-links-style")) return;
    const style = document.createElement("style");
    style.id = "crossmethod-legal-links-style";
    style.textContent = `
      .footer-legal-links{display:flex;gap:12px 18px;flex-wrap:wrap;margin-top:12px}
      .footer-legal-links a{font-size:12px;color:inherit;text-decoration:underline;text-underline-offset:3px}
      .legal-form-notice{margin:12px 0 16px;font-size:12px;line-height:1.7;color:#607782}
      .legal-form-notice a{color:#087f89;font-weight:700}
    `;
    document.head.appendChild(style);
  }

  function setup() {
    addStyles();
    addFooterLinks();
    addFormNotices();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup, { once: true });
  } else {
    setup();
  }
  window.addEventListener("hpmanageddataready", setup);
})();
