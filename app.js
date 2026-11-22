// ============================================================
// app.js — what your site DOES.
// Plain JavaScript, no libraries, no installs.
// It uses STARTUP and LISTINGS from data.js (loaded first).
// ============================================================

(function () {
  "use strict";

  // ----------------------------------------------------------
  // 1. Saving things in the browser (localStorage).
  //    This only remembers things on THIS browser on THIS device.
  //    Your teammates and your customers will NOT see it.
  //    A real product would need a server and a database for that.
  // ----------------------------------------------------------
  const storage = {
    get: function (key, fallback) {
      try {
        const saved = localStorage.getItem(key);
        return saved === null ? fallback : JSON.parse(saved);
      } catch (error) {
        return fallback; // storage blocked or broken: just carry on
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        // storage blocked (e.g. private window): ignore
      }
    }
  };

  let savedIds = storage.get("savedIds", []);
  let skillCredits = storage.get("skillCredits", null);
  let bookedIds = storage.get("bookedSessions", []);

  if (!Array.isArray(bookedIds)) {
    bookedIds = [];
  }
  bookedIds = bookedIds.filter(function (id) {
    return typeof id === "number" && Number.isFinite(id);
  });

  if (skillCredits === null) {
    skillCredits = 1;
    storage.set("skillCredits", skillCredits);
  }

  const creditBalance = document.getElementById("credit-balance");

  function updateCreditBalance() {
    creditBalance.textContent = skillCredits + (skillCredits === 1 ? " credit" : " credits");
  }

  updateCreditBalance();

  // ----------------------------------------------------------
  // 2. Put the startup's name and pitch on the page.
  // ----------------------------------------------------------
  document.title = STARTUP.name;
  document.getElementById("brand-name").textContent = STARTUP.name;
  document.getElementById("tagline").textContent = STARTUP.tagline;
  document.getElementById("pitch").textContent = STARTUP.pitch;

  // ----------------------------------------------------------
  // 3. Views: show one section at a time, based on the #link in the address bar.
  // ----------------------------------------------------------
  function showView() {
    const requested = (window.location.hash || "#home").slice(1);
    const views = document.querySelectorAll("[data-view]");
    const exists = Array.prototype.some.call(views, function (view) {
      return view.id === requested;
    });
    const current = exists ? requested : "home";

    views.forEach(function (view) {
      view.hidden = view.id !== current;
    });

    document.querySelectorAll("nav a").forEach(function (link) {
      if (link.getAttribute("href") === "#" + current) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", showView);

  // ----------------------------------------------------------
  // 4. Explore page: build one card per listing.
  //    We use textContent (not innerHTML) so text is always shown
  //    as text — a basic security habit.
  // ----------------------------------------------------------
  const grid = document.getElementById("listing-grid");
  const searchBox = document.getElementById("search-box");
  const emptyMessage = document.getElementById("empty-message");
  const savedCount = document.getElementById("saved-count");
  const bookingMessage = document.createElement("p");
  bookingMessage.className = "booking-message";
  bookingMessage.setAttribute("role", "status");
  bookingMessage.setAttribute("aria-live", "polite");
  grid.parentNode.insertBefore(bookingMessage, grid);

  function makeCard(item) {
    const card = document.createElement("article");
    card.className = "card";

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = item.category;

    const title = document.createElement("h2");
    title.textContent = item.name;

    const text = document.createElement("p");
    text.textContent = item.description;

    const isSaved = savedIds.indexOf(item.id) !== -1;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "button secondary";
    button.textContent = isSaved ? "Saved ✓" : "Save";
    button.setAttribute("aria-pressed", isSaved ? "true" : "false");
    button.addEventListener("click", function () {
      toggleSaved(item.id);
    });

    const bookButton = document.createElement("button");
    const alreadyBooked = bookedIds.indexOf(item.id) !== -1;
    const hasCredits = skillCredits > 0;
    bookButton.type = "button";
    bookButton.className = "button secondary booking-button";
    if (alreadyBooked) {
      bookButton.textContent = "Booked ✓";
      bookButton.classList.add("booked");
      bookButton.disabled = true;
    } else if (!hasCredits) {
      bookButton.textContent = "No credits remaining";
      bookButton.disabled = true;
    } else {
      bookButton.textContent = "Book Session";
      bookButton.addEventListener("click", function () {
        bookSession(item.id);
      });
    }

    const actions = document.createElement("div");
    actions.className = "card-actions";
    actions.append(button, bookButton);

    card.append(tag, title, text, actions);
    return card;
  }

  function bookSession(id) {
    if (bookedIds.indexOf(id) !== -1) {
      return;
    }
    if (skillCredits <= 0) {
      bookingMessage.textContent = "No credits remaining.";
      renderListings();
      return;
    }

    bookedIds.push(id);
    skillCredits -= 1;
    storage.set("bookedSessions", bookedIds);
    storage.set("skillCredits", skillCredits);
    updateCreditBalance();
    bookingMessage.textContent = "Session booked! 1 credit used.";
    renderListings();
  }

  function toggleSaved(id) {
    if (savedIds.indexOf(id) === -1) {
      savedIds.push(id);
    } else {
      savedIds = savedIds.filter(function (savedId) { return savedId !== id; });
    }
    storage.set("savedIds", savedIds);
    renderListings();
  }

  function renderListings() {
    const query = searchBox.value.trim().toLowerCase();
    const matches = LISTINGS.filter(function (item) {
      const text = (item.name + " " + item.category + " " + item.description).toLowerCase();
      return text.indexOf(query) !== -1;
    });

    grid.replaceChildren.apply(grid, matches.map(makeCard));
    emptyMessage.hidden = matches.length > 0;
    savedCount.textContent = savedIds.length === 0
      ? "Tap Save on anything you like."
      : "You've saved " + savedIds.length + " item(s) on this device.";
  }

  searchBox.addEventListener("input", renderListings);

  // ----------------------------------------------------------
  // 5. Start up.
  // ----------------------------------------------------------
  renderListings();
  showView();
})();
