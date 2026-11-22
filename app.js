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
  let mySkills = storage.get("mySkills", []);
  let completedSessions = storage.get("completedSessions", []);

  if (!Array.isArray(bookedIds)) {
    bookedIds = [];
  }
  bookedIds = bookedIds.filter(function (id) {
    return typeof id === "number" && Number.isFinite(id);
  });
  if (!Array.isArray(mySkills)) {
    mySkills = [];
  }
  mySkills = mySkills.filter(function (item) {
    return item && typeof item.id === "number" && Number.isFinite(item.id) &&
      typeof item.name === "string" && typeof item.category === "string" &&
      typeof item.description === "string" && typeof item.studentName === "string";
  });
  if (!Array.isArray(completedSessions)) {
    completedSessions = [];
  }
  completedSessions = completedSessions.filter(function (id, index, ids) {
    return typeof id === "number" && Number.isFinite(id) && ids.indexOf(id) === index;
  });

  if (skillCredits === null) {
    skillCredits = 1;
    storage.set("skillCredits", skillCredits);
  }

  const creditBalance = document.getElementById("credit-balance");

  function updateCreditBalance() {
    creditBalance.textContent = skillCredits + (skillCredits === 1 ? " credit" : " credits");
  }

  function changeSkillCredits(amount) {
    skillCredits += amount;
    storage.set("skillCredits", skillCredits);
    updateCreditBalance();
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
  const skillForm = document.getElementById("skill-form");
  const skillFormMessage = document.getElementById("skill-form-message");
  const myTeachingGrid = document.getElementById("my-teaching-grid");
  const myTeachingEmpty = document.getElementById("my-teaching-empty");
  const teachingMessage = document.getElementById("teaching-message");
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

    if (item.studentName) {
      const teacher = document.createElement("p");
      teacher.className = "listing-teacher";
      teacher.textContent = "Taught by " + item.studentName;
      card.append(tag, title, text, teacher);
    } else {
      card.append(tag, title, text);
    }

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

    card.append(actions);
    return card;
  }

  function nextListingId() {
    const allListings = LISTINGS.concat(mySkills);
    const highestId = allListings.reduce(function (highest, item) {
      return typeof item.id === "number" && Number.isFinite(item.id)
        ? Math.max(highest, Math.floor(item.id))
        : highest;
    }, 0);
    return highestId + 1;
  }

  function makeTeachingCard(item) {
    const card = document.createElement("article");
    card.className = "card";

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = item.category;

    const title = document.createElement("h2");
    title.textContent = item.name;

    const description = document.createElement("p");
    description.textContent = item.description;

    const teacher = document.createElement("p");
    teacher.className = "listing-teacher";
    teacher.textContent = "Taught by " + item.studentName;

    const completed = completedSessions.indexOf(item.id) !== -1;
    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.className = "button secondary completion-button";
    completeButton.textContent = completed ? "Completed" : "Mark Session Complete";
    completeButton.disabled = completed;
    if (completed) {
      completeButton.classList.add("completed");
    } else {
      completeButton.addEventListener("click", function () {
        completeTeachingSession(item.id);
      });
    }

    const actions = document.createElement("div");
    actions.className = "card-actions";
    actions.append(completeButton);
    card.append(tag, title, description, teacher, actions);
    return card;
  }

  function completeTeachingSession(id) {
    if (completedSessions.indexOf(id) !== -1) {
      return;
    }

    completedSessions.push(id);
    storage.set("completedSessions", completedSessions);
    changeSkillCredits(1);
    teachingMessage.textContent = "Session completed. 1 Skill Credit earned.";
    renderMyTeaching();
  }

  function renderMyTeaching() {
    myTeachingGrid.replaceChildren.apply(myTeachingGrid, mySkills.map(makeTeachingCard));
    myTeachingEmpty.hidden = mySkills.length > 0;
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
    storage.set("bookedSessions", bookedIds);
    changeSkillCredits(-1);
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
    const matches = LISTINGS.concat(mySkills).filter(function (item) {
      const text = (item.name + " " + item.category + " " + item.description + " " +
        (item.studentName || "")).toLowerCase();
      return text.indexOf(query) !== -1;
    });

    grid.replaceChildren.apply(grid, matches.map(makeCard));
    emptyMessage.hidden = matches.length > 0;
    savedCount.textContent = savedIds.length === 0
      ? "Tap Save on anything you like."
      : "You've saved " + savedIds.length + " item(s) on this device.";
  }

  searchBox.addEventListener("input", renderListings);
  skillForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("skill-name").value.trim();
    const category = document.getElementById("skill-category").value.trim();
    const description = document.getElementById("skill-description").value.trim();
    const studentName = document.getElementById("student-name").value.trim();

    if (!name || !category || !description || !studentName) {
      skillFormMessage.textContent = "Please complete all fields before posting.";
      return;
    }

    mySkills.push({
      id: nextListingId(),
      name: name,
      category: category,
      description: description,
      studentName: studentName
    });
    storage.set("mySkills", mySkills);
    skillForm.reset();
    skillFormMessage.textContent = "Skill posted. Posting a skill earns 0 credits.";
    renderListings();
    renderMyTeaching();
  });

  // ----------------------------------------------------------
  // 5. Start up.
  // ----------------------------------------------------------
  renderListings();
  renderMyTeaching();
  showView();
})();
