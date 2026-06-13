/* ============================================================
   Vibe Guarantee Events — site interactions
   - Sticky header state on scroll
   - Mobile menu toggle
   - Reveal-on-scroll animations
   - Footer year stamp
   ============================================================ */
(function () {
  "use strict";

  /* ---- Header: add .scrolled past the top of the hero ---- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobileMenu");
  function closeMenu() {
    if (!menu || !burger) return;
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
  }
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      burger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });
    // Close after choosing a link
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    // Close if resized up to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024) closeMenu();
    });
  }

  /* ---- Reveal on scroll ---- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  // Honour the per-element stagger via the --d custom property.
  revealEls.forEach(function (el) {
    var d = el.getAttribute("data-delay");
    if (d) el.style.setProperty("--d", d);
  });

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) {
      // Items already marked .in (e.g. the hero) stay visible.
      if (!el.classList.contains("in")) io.observe(el);
    });
  }

  /* ---- Quote form: validate + open email app via mailto ---- */
  var form = document.getElementById("quoteForm");
  if (form) {
    var note = document.getElementById("formNote");
    var TO = "vibeguaranteeevents@gmail.com";

    function field(id) { return form.querySelector("#" + id); }
    function emailOk(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
    function setNote(msg, ok) {
      if (!note) return;
      note.textContent = msg;
      note.style.color = ok ? "var(--gold-dark)" : "#e0526b";
    }

    // Clear the invalid state as soon as the user fixes a field.
    form.querySelectorAll(".field").forEach(function (el) {
      el.addEventListener("input", function () { el.classList.remove("invalid"); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = field("name"), email = field("email"), message = field("message");
      var phone = field("phone"), eventType = field("eventType");

      var bad = [];
      [name, email, message].forEach(function (el) {
        if (!el.value.trim()) { el.classList.add("invalid"); bad.push(el); }
      });
      if (email.value.trim() && !emailOk(email.value.trim())) {
        email.classList.add("invalid");
        if (bad.indexOf(email) === -1) bad.push(email);
      }

      if (bad.length) {
        setNote("Please complete the highlighted fields.", false);
        bad[0].focus();
        return;
      }

      var subject = "Event enquiry" +
        (eventType && eventType.value ? " — " + eventType.value : "") +
        " from " + name.value.trim();
      var bodyLines = [
        "Name: " + name.value.trim(),
        "Email: " + email.value.trim(),
        "Phone: " + (phone.value.trim() || "—"),
        "Event type: " + ((eventType && eventType.value) || "—"),
        "",
        "Details:",
        message.value.trim()
      ];
      var href = "mailto:" + TO +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      setNote("Opening your email app with the details ready to send…", true);
      window.location.href = href;
    });
  }

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
