/* ------------------------------------------------------------------ */
/*  MOBILE NAV                                                         */
/* ------------------------------------------------------------------ */
(function () {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".mobile-menu");
  if (!toggle || !menu) return;

  const menuIcon = toggle.querySelector(".icon-menu");
  const closeIcon = toggle.querySelector(".icon-close");

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    menuIcon.style.display = isOpen ? "none" : "block";
    closeIcon.style.display = isOpen ? "block" : "none";
  });

  menu.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      menuIcon.style.display = "block";
      closeIcon.style.display = "none";
    });
  });
})();

/* ------------------------------------------------------------------ */
/*  PROJECT DATA (used by modal on Home + My Work pages)               */
/* ------------------------------------------------------------------ */
const PROJECTS = {
  "kaths-booking": {
    tag: "01",
    title: "Kath's Booking System",
    category: "Booking Application",
    description:
      "Kath's is a booking application designed to make service reservations easier and more convenient. Users can schedule appointments for makeup, barbershop, and photo booth services from a single, streamlined interface.",
    features: [
      "Real-time appointment scheduling",
      "Service category browsing",
      "Booking confirmation & status tracking",
      "Admin-side booking management",
    ],
    tech: ["Flutter", "Dart", "Firebase"],
  },
  "food-delivery": {
    tag: "02",
    title: "Food Delivery Booking App",
    category: "Food Delivery Application",
    description:
      "A food delivery booking application designed to provide users with a convenient way to browse food, place orders, and manage food delivery bookings from local vendors.",
    features: [
      "Vendor & menu listings",
      "Cart and order management",
      "Delivery status updates",
      "Order history",
    ],
    tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
  },
};

/* ------------------------------------------------------------------ */
/*  PROJECT MODAL                                                      */
/* ------------------------------------------------------------------ */
(function () {
  const overlay = document.getElementById("project-modal");
  if (!overlay) return;

  const closeBtn = overlay.querySelector(".modal-close");
  const box = overlay.querySelector(".modal-box");

  const fields = {
    tag: overlay.querySelector("[data-field='tag']"),
    category: overlay.querySelector("[data-field='category']"),
    title: overlay.querySelector("[data-field='title']"),
    description: overlay.querySelector("[data-field='description']"),
    features: overlay.querySelector("[data-field='features']"),
    tech: overlay.querySelector("[data-field='tech']"),
    screenshotLabel: overlay.querySelector("[data-field='screenshot-label']"),
  };

  function openModal(id) {
    const project = PROJECTS[id];
    if (!project) return;

    fields.tag.textContent = "Project " + project.tag;
    fields.category.textContent = project.category;
    fields.title.textContent = project.title;
    fields.description.textContent = project.description;
    fields.screenshotLabel.textContent = project.title + " Screenshot";

    fields.features.innerHTML = "";
    project.features.forEach((f) => {
      const li = document.createElement("li");
      li.innerHTML = '<span class="feature-dot"></span>' + f;
      fields.features.appendChild(li);
    });

    fields.tech.innerHTML = "";
    project.tech.forEach((t) => {
      const span = document.createElement("span");
      span.className = "badge";
      span.textContent = t;
      fields.tech.appendChild(span);
    });

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-open-project]").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.getAttribute("data-open-project")));
  });

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
  });
})();

/* ------------------------------------------------------------------ */
/*  CONTACT FORM VALIDATION                                            */
/* ------------------------------------------------------------------ */
(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const fieldsCfg = ["name", "email", "subject", "message"];

  function showError(name, message) {
    const errorEl = form.querySelector(`[data-error-for="${name}"]`);
    if (errorEl) errorEl.textContent = message || "";
  }

  function validate() {
    let valid = true;
    const values = {};
    fieldsCfg.forEach((name) => {
      const el = form.elements[name];
      values[name] = el.value.trim();
    });

    if (!values.name) { showError("name", "Please enter your name."); valid = false; }
    else showError("name", "");

    if (!values.email) { showError("email", "Please enter your email."); valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) { showError("email", "Please enter a valid email address."); valid = false; }
    else showError("email", "");

    if (!values.subject) { showError("subject", "Please enter a subject."); valid = false; }
    else showError("subject", "");

    if (!values.message) { showError("message", "Please enter a message."); valid = false; }
    else showError("message", "");

    return valid;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validate()) {
      status.classList.add("show");
      status.textContent = "Form validated — connect a submission service or API here to send this message.";
    } else {
      status.classList.remove("show");
    }
  });
})();
