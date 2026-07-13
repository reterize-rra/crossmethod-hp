(() => {
  "use strict";

  const DEBUG_MODE = new URLSearchParams(window.location.search).get("ga_debug") === "1";
  const TRIAL_MESSAGE_TYPE = "CROSS_METHOD_TRIAL_ANALYTICS_V1";
  const TRIAL_EVENTS = new Set([
    "trial_start",
    "trial_company_complete",
    "trial_complete"
  ]);

  function sendEvent(eventName, parameters = {}) {
    if (typeof window.gtag !== "function") return;

    const payload = {
      ...parameters,
      page_location: window.location.href,
      page_title: document.title
    };

    if (DEBUG_MODE) {
      payload.debug_mode = true;
    }

    window.gtag("event", eventName, payload);
  }

  function setupClickTracking() {
    document.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const trialLink = target.closest('a[href$="#experience"], [data-mobile-target="experience"]');
      if (trialLink) {
        sendEvent("click_trial", {
          link_text: String(trialLink.textContent || "").trim().slice(0, 80),
          link_position: getElementPosition(trialLink)
        });
      }

      const contactButton = target.closest("[data-open-contact]");
      if (contactButton) {
        const contactType = String(contactButton.dataset.openContact || "総合相談").trim();

        sendEvent("click_contact", {
          contact_type: contactType,
          link_position: getElementPosition(contactButton)
        });

        if (contactType.includes("ストレスチェック")) {
          sendEvent("click_stress_check", {
            contact_type: contactType
          });
        }

        if (contactType.includes("健康経営")) {
          sendEvent("click_health_management", {
            contact_type: contactType
          });
        }
      }

      const foodItem = target.closest("[data-food]");
      if (foodItem) {
        const itemCode = String(foodItem.dataset.food || "").trim();
        const itemName = String(
          foodItem.querySelector(".food-name")?.textContent ||
          foodItem.getAttribute("aria-label") ||
          ""
        ).trim();

        sendEvent("view_food_item", {
          item_id: itemCode,
          item_name: itemName,
          item_category: "健康食"
        });
      }

      const orderButton = target.closest("#open-order-modal");
      if (orderButton) {
        sendEvent("begin_food_order", {
          order_type: "food_order_request"
        });
      }
    }, true);
  }

  function setupServiceViewTracking() {
    if (!("IntersectionObserver" in window)) return;

    const viewed = new Set();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.28) return;

        const section = entry.target;
        const sectionId = String(
          section.dataset.sectionId ||
          section.id ||
          ""
        ).trim();

        if (!sectionId || viewed.has(sectionId)) return;

        viewed.add(sectionId);

        sendEvent("view_service", {
          section_id: sectionId,
          section_title: String(
            section.querySelector("h2, h1")?.textContent || ""
          ).trim().replace(/\s+/g, " ").slice(0, 100)
        });

        observer.unobserve(section);
      });
    }, {
      threshold: [0.28]
    });

    document.querySelectorAll("section[data-section-id]").forEach((section) => {
      observer.observe(section);
    });
  }

  function setupSuccessfulSubmitTracking() {
    if (typeof window.postToGas !== "function") return;
    if (window.__crossMethodGa4PostToGasWrapped) return;

    window.__crossMethodGa4PostToGasWrapped = true;

    const originalPostToGas = window.postToGas;

    window.postToGas = async function(url, payload, successMessage) {
      const result = await originalPostToGas.apply(this, arguments);
      const action = String(payload?.action || "").trim();

      if (action === "submitInquiry") {
        const leadType = String(
          payload?.data?.type ||
          payload?.data?.inquiry_type ||
          "総合相談"
        ).trim();

        sendEvent("generate_lead", {
          lead_type: leadType
        });
      }

      if (action === "submitFoodOrder") {
        const items = Array.isArray(payload?.items) ? payload.items : [];
        const itemCount = items.reduce(
          (sum, item) => sum + Number(item?.quantity || 0),
          0
        );

        sendEvent("submit_food_order_request", {
          currency: "JPY",
          value: Number(payload?.total || 0),
          item_count: itemCount,
          shipping_amount: Number(payload?.shipping || 0)
        });
      }

      return result;
    };
  }

  function setupRoomTracking() {
    if (typeof window.openMeeting !== "function") return;
    if (window.__crossMethodGa4OpenMeetingWrapped) return;

    window.__crossMethodGa4OpenMeetingWrapped = true;

    const originalOpenMeeting = window.openMeeting;

    window.openMeeting = function(type) {
      const roomType = String(type || "").trim();
      const authorizedUrl = window.AUTHORIZED_ROOM_URLS?.[roomType] || "";

      let fallbackUrl = "";
      if (typeof SITE_CONFIG !== "undefined") {
        fallbackUrl = roomType === "counseling"
          ? SITE_CONFIG.counselingMeetingUrl
          : SITE_CONFIG.seminarMeetingUrl;
      }

      if (authorizedUrl || fallbackUrl) {
        if (roomType === "counseling") {
          sendEvent("enter_counseling_room", {
            room_type: roomType
          });
        }

        if (roomType === "seminar") {
          sendEvent("enter_seminar_room", {
            room_type: roomType
          });
        }
      }

      return originalOpenMeeting.apply(this, arguments);
    };
  }

  function setupTrialMessageTracking() {
    const frame = document.getElementById("crossmethod-experience-frame");
    if (!frame) return;

    window.addEventListener("message", (event) => {
      if (event.source !== frame.contentWindow) return;

      const data = event.data;
      if (!data || data.type !== TRIAL_MESSAGE_TYPE) return;

      const eventName = String(data.eventName || "").trim();
      if (!TRIAL_EVENTS.has(eventName)) return;

      sendEvent(eventName, {
        trial_type: "free_experience"
      });
    });
  }

  function getElementPosition(element) {
    if (element.closest(".site-header")) return "header";
    if (element.closest(".mobile-menu-drawer")) return "mobile_menu";
    if (element.closest(".mobile-bottom-nav")) return "mobile_bottom";
    if (element.closest(".site-footer")) return "footer";
    if (element.closest(".hero")) return "hero";
    return "content";
  }

  function setup() {
    setupClickTracking();
    setupServiceViewTracking();
    setupSuccessfulSubmitTracking();
    setupRoomTracking();
    setupTrialMessageTracking();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup, { once: true });
  } else {
    setup();
  }
})();