/* ==========================================================================
   The Temi Blueprint — site settings + small behaviours
   --------------------------------------------------------------------------
   TEMI: this is the one file you edit to change links across the whole site.
   Change a value between the quote marks below and every page updates.
   Everything under "BEHAVIOUR" you can leave alone.
   ========================================================================== */

const SETTINGS = {

  /* --- Your booking links (from Cal.com) --------------------------------- */
  // Your "30 Min Discovery Connect" event. Tested and taking bookings.
  // It's marked "Hidden" in Cal.com, which only keeps it off your public
  // cal.com profile page — this direct link still works, which is what the
  // site uses. Nothing to change unless you want it listed publicly too.
  bookingDiscovery: "https://cal.com/temi-blueprint/discovery",

  // Your "60 min 1 on 1 Training" event. (Its link still says /15min from when
  // it was first created — worth renaming in Cal.com so it reads properly.)
  bookingSession: "https://cal.com/temi-blueprint/15min",

  /* --- Your email list (from Kit) ----------------------------------------
     TWO lists, on purpose. Someone who arrives from a Google search for
     overnight oats wants food, not squats — so the recipe pages offer the
     meal plan and the rest of the site offers the workout guide. Keeping
     them apart means you'll know who came for what when you start emailing
     people, which is worth a lot more than one bigger list. */

  // "Meal Plan - recipes" — used on recipes.html and every recipe page.
  recipesFormAction: "https://app.kit.com/forms/9931591/subscriptions",

  // "Starter Pack - free workouts" — used on every other page.
  // If you ever rebuild either form, get the address again from:
  // Kit > Audience growth > Landing pages & forms > your form > Embed > HTML,
  // and copy the web address inside action="...".
  kitFormAction: "https://app.kit.com/forms/9857095/subscriptions",

  /* --- Where people buy (Podia — phase 2) -------------------------------- */
  storeUrl: "#",
  loginUrl: "#",

  /* --- Your socials ------------------------------------------------------- */
  // Leave any of these empty ("") and the icon disappears from the footer.
  instagram: "https://instagram.com/temis_blueprint",
  tiktok: "https://tiktok.com/@temis_blueprint",
  youtube: "",

  /* --- Contact ------------------------------------------------------------ */
  // Your Gmail, on purpose. hello@temisblueprint.com looks better but doesn't
  // exist — buying a domain doesn't create an inbox, and mail sent there goes
  // nowhere. A working address beats a smart-looking dead one.
  // When you set up a real mailbox on the domain, change this one line.
  email: "topeakindele1@gmail.com",

  /* --- Business details --------------------------------------------------- */
  businessName: "The Temi Blueprint",
  domain: "temisblueprint.com",
  city: "Vancouver, BC",
};


/* ==========================================================================
   BEHAVIOUR — you can leave everything below this line alone.
   ========================================================================== */

(function () {
  "use strict";

  /* Fill in any link marked data-link="bookingDiscovery" etc. with the value
     from SETTINGS above, so links live in one place instead of on every page. */
  document.querySelectorAll("[data-link]").forEach(function (el) {
    const value = SETTINGS[el.dataset.link];
    if (!value) return;
    // An email address needs "mailto:" in front of it to open a mail app.
    el.setAttribute("href", el.dataset.link === "email" ? "mailto:" + value : value);
  });

  /* Same idea for plain text, e.g. the email address in the footer. */
  document.querySelectorAll("[data-text]").forEach(function (el) {
    const value = SETTINGS[el.dataset.text];
    if (value) el.textContent = value;
  });

  /* Point every email form at your Kit account. If Kit isn't connected yet,
     stop the form from pretending to work — a form that silently loses
     someone's email address is worse than no form at all. */
  document.querySelectorAll("form[data-kit-form]").forEach(function (form) {
    // Recipe pages collect onto the food list instead.
    var onRecipePage = location.pathname.indexOf("recipe") !== -1;
    if (onRecipePage && SETTINGS.recipesFormAction) {
      form.setAttribute("action", SETTINGS.recipesFormAction);
      return;
    }
    if (SETTINGS.kitFormAction) {
      form.setAttribute("action", SETTINGS.kitFormAction);
      return;
    }
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    form.querySelectorAll("input, button").forEach(function (el) { el.disabled = true; });
    const note = form.querySelector(".capture-note");
    if (note) note.textContent = "Sign-ups open shortly — the email list is still being set up.";
  });

  /* Hide social icons you haven't filled in yet. */
  document.querySelectorAll("[data-social]").forEach(function (el) {
    if (!SETTINGS[el.dataset.social]) el.remove();
    else el.setAttribute("href", SETTINGS[el.dataset.social]);
  });

  /* Underline the nav link for the page you're currently on. */
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page");
  });

  /* Mobile menu open/close. */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  /* A hairline under the nav once you start scrolling. */
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = function () {
      nav.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
