/* =============================================================
   GELA — PORTFOLIO SCRIPT
   Shared by every page. Handles:
   1. Mobile hamburger menu
   2. Scroll reveal animations (Intersection Observer)
   3. Back-to-top button
   4. Contact form status message (Formspree)
   ============================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* -----------------------------------------------------------
     1. MOBILE HAMBURGER MENU
     ----------------------------------------------------------- */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("open");
      navLinks.classList.toggle("open");

      // Update aria-expanded for accessibility
      const isOpen = navLinks.classList.contains("open");
      hamburger.setAttribute("aria-expanded", isOpen);
    });

    // Close the menu automatically when a link is tapped (mobile UX)
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -----------------------------------------------------------
     2. SCROLL REVEAL ANIMATIONS
     Any element with the class "reveal" fades and slides up
     once it enters the viewport.
     ----------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // Fallback: if IntersectionObserver isn't supported, just show everything
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* -----------------------------------------------------------
     3. BACK-TO-TOP BUTTON
     ----------------------------------------------------------- */
  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 480) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    });

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* -----------------------------------------------------------
     4. CONTACT FORM (Formspree)
     The form submits normally to Formspree, but if JavaScript
     is enabled we intercept it to show a friendly inline status
     message instead of a full page reload.
     ----------------------------------------------------------- */
  const contactForm = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      formStatus.textContent = "Sending your message...";
      formStatus.style.color = "var(--navy-soft)";

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          formStatus.textContent = "Thanks! Your message has been sent — Gela will get back to you soon.";
          formStatus.style.color = "var(--sky-deep)";
          contactForm.reset();
        } else {
          formStatus.textContent =
            "Hmm, something went wrong. Please replace YOUR_FORMSPREE_ID in contact.html with a real Formspree form ID, then try again.";
          formStatus.style.color = "#c0392b";
        }
      } catch (error) {
        formStatus.textContent =
          "Could not send the message. Please check your Formspree ID and internet connection.";
        formStatus.style.color = "#c0392b";
      }
    });
  }

});
