// Strands of Life: shared behavior

// The awareness focus for each month. Edit here and both the homepage
// spotlight and the calendar page stay in sync, the calendar cards read
// their copy from this list at load time.
const AWARENESS_MONTHS = [
  {
    month: "January",
    focus: "Cervical Cancer Awareness",
    blurb:
      "Nearly all cervical cancers are linked to HPV, and both vaccination and routine screening can prevent them. We spend January on why early detection is so powerful.",
    also: "Also this month: Thyroid Awareness, Birth Defects Prevention",
    tone: "plum",
  },
  {
    month: "February",
    focus: "American Heart Month",
    blurb:
      "Heart disease is the leading cause of death in the United States. Our February stories look at family history, prevention, and life after a cardiac diagnosis.",
    also: "Also this month: Congenital Heart Defect Awareness Week",
    tone: "rose",
  },
  {
    month: "March",
    focus: "National Kidney Month",
    blurb:
      "Kidney disease often develops quietly for years. March is about the tests that catch it early and the reality of dialysis and transplant waitlists.",
    also: "Also this month: Multiple Sclerosis Awareness, Colorectal Cancer Awareness",
    tone: "sky",
  },
  {
    month: "April",
    focus: "Autism Acceptance Month",
    blurb:
      "Acceptance goes further than awareness. In April we hand the microphone to autistic young people and their families to talk about school, diagnosis, and belonging.",
    also: "Also this month: Stress Awareness, Alcohol Awareness",
    tone: "sage",
  },
  {
    month: "May",
    focus: "Mental Health Awareness Month",
    blurb:
      "Half of all lifetime mental illness begins by age 14. May is our largest campaign: stories from teens about therapy, diagnosis, and asking for help.",
    also: "Also this month: Lupus Awareness, ALS Awareness",
    tone: "sky",
  },
  {
    month: "June",
    focus: "Alzheimer's & Brain Awareness",
    blurb:
      "Dementia reshapes an entire family, not just one person. June centers the grandchildren and young caregivers who rarely get asked how they are doing.",
    also: "Also this month: Men's Health Month, Migraine Awareness",
    tone: "plum",
  },
  {
    month: "July",
    focus: "Juvenile Arthritis Awareness",
    blurb:
      "Arthritis is not only an older person's illness. July belongs to the kids managing chronic pain, infusions, and teachers who do not always believe them.",
    also: "Also this month: Sarcoma Awareness, Cord Blood Awareness",
    tone: "sage",
  },
  {
    month: "August",
    focus: "National Immunization Awareness",
    blurb:
      "Vaccines are one of the most effective tools in public health. August covers how they work, what the schedule protects against, and how to talk about them well.",
    also: "Also this month: Children's Eye Health & Safety, Spinal Muscular Atrophy Awareness",
    tone: "accent",
  },
  {
    month: "September",
    focus: "Childhood Cancer Awareness",
    blurb:
      "Gold ribbon month. September makes room for survivors, siblings, and the families still in treatment, in their own words rather than a statistic.",
    also: "Also this month: Sickle Cell Awareness, Suicide Prevention Month",
    tone: "accent",
  },
  {
    month: "October",
    focus: "Breast Cancer Awareness",
    blurb:
      "Beyond the pink: October looks at screening access, hereditary risk, and what it is like to be a teenager whose parent is in treatment.",
    also: "Also this month: Down Syndrome Awareness, ADHD Awareness",
    tone: "rose",
  },
  {
    month: "November",
    focus: "Diabetes Awareness Month",
    blurb:
      "Type 1 and type 2 are different conditions with a shared stigma. November is for the daily management most people never see.",
    also: "Also this month: Lung Cancer Awareness, Epilepsy Awareness",
    tone: "sky",
  },
  {
    month: "December",
    focus: "HIV/AIDS Awareness",
    blurb:
      "World AIDS Day opens the month. December focuses on how far treatment has come, why stigma outlasted the science, and what prevention looks like now.",
    also: "Also this month: Seasonal Affective Disorder, Safe Toys & Gifts",
    tone: "plum",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  if (header && toggle) {
    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    header.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => header.classList.remove("nav-open"));
    });
  }

  // Mark the nav link matching the current page.
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === page) link.classList.add("is-active");
  });

  const currentMonth = new Date().getMonth();

  // Homepage spotlight: fill in whichever month we are actually in.
  const spotlight = document.querySelector("[data-spotlight]");
  if (spotlight) {
    const data = AWARENESS_MONTHS[currentMonth];
    const set = (sel, text) => {
      const el = spotlight.querySelector(sel);
      if (el) el.textContent = text;
    };
    set("[data-spotlight-month]", data.month + " focus");
    set("[data-spotlight-focus]", data.focus);
    set("[data-spotlight-blurb]", data.blurb);
  }

  // Homepage strip: the twelve focuses in one scrolling row, from the same
  // list. The set is cloned twice so the CSS can shift the track by exactly
  // one set and the seam never shows; the clones are aria-hidden so a screen
  // reader hears the year once. Until this runs the names wrap as a plain row.
  const monthMarquee = document.querySelector("[data-month-marquee]");
  if (monthMarquee) {
    const track = monthMarquee.querySelector("[data-marquee-track]");
    const item = (data) => {
      const li = document.createElement("li");
      const b = document.createElement("b");
      b.textContent = data.month.slice(0, 3);
      li.appendChild(b);
      li.appendChild(document.createTextNode(data.focus));
      return li;
    };
    AWARENESS_MONTHS.forEach((data) => track.appendChild(item(data)));
    const originals = Array.from(track.children);
    const COPIES = 3;
    for (let copy = 1; copy < COPIES; copy++) {
      originals.forEach((li) => {
        const clone = li.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      });
    }
    // Pace by width, so a longer list scrolls for longer rather than faster.
    const PX_PER_SECOND = 44;
    const setSpeed = () => {
      const setWidth = track.scrollWidth / COPIES;
      if (setWidth > 0) track.style.animationDuration = setWidth / PX_PER_SECOND + "s";
    };
    setSpeed();
    window.addEventListener("resize", setSpeed);
    monthMarquee.classList.add("is-live");

    // Autoplay with no way to stop it fails WCAG 2.2.2, and hover-to-pause
    // does nothing for a keyboard, so the button is the real control.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let userPaused = reduceMotion.matches;
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "marquee-pause";
    const syncToggle = () => {
      toggle.textContent = userPaused ? "\u25B6" : "\u275A\u275A";
      toggle.setAttribute("aria-label", (userPaused ? "Play" : "Pause") + " the awareness months strip");
      monthMarquee.classList.toggle("is-paused", userPaused);
    };
    toggle.addEventListener("click", () => { userPaused = !userPaused; syncToggle(); });
    syncToggle();
    monthMarquee.appendChild(toggle);
    reduceMotion.addEventListener("change", (e) => { userPaused = e.matches; syncToggle(); });
  }

  // Calendar page: render the twelve month cards from the same list.
  const calendar = document.querySelector("[data-calendar]");
  if (calendar) {
    calendar.innerHTML = AWARENESS_MONTHS.map((data, i) => {
      const current = i === currentMonth ? " is-current" : "";
      return `
      <article class="month-card reveal${current}">
        <span class="month-flag">This month</span>
        <p class="month-name">${data.month}</p>
        <h3>${data.focus}</h3>
        <p>${data.blurb}</p>
        <p class="month-also">${data.also}</p>
      </article>`;
    }).join("");
  }

  // Stories page: category filter buttons.
  const filterBar = document.querySelector("[data-filters]");
  const storyGrid = document.querySelector("[data-story-grid]");
  if (filterBar && storyGrid) {
    const empty = document.querySelector("[data-empty]");
    filterBar.addEventListener("click", (event) => {
      const button = event.target.closest(".filter-btn");
      if (!button) return;
      filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
      button.classList.add("is-active");

      const wanted = button.dataset.filter;
      let shown = 0;
      storyGrid.querySelectorAll("[data-tag]").forEach((card) => {
        const match = wanted === "all" || card.dataset.tag === wanted;
        card.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    });
  }

  // Fallback initials for missing logo/photo images.
  // On a fast connection a 404 can resolve (and fire "error") before this
  // deferred script runs, so an addEventListener-only approach misses it,
  // check the already-settled state first, then listen for future failures.
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    const showFallback = () => {
      img.style.display = "none";
      const fallback = img.parentElement.querySelector("[data-fallback-el]");
      if (fallback) fallback.style.display = "flex";
    };
    if (img.complete && img.naturalWidth === 0) {
      showFallback();
    } else {
      img.addEventListener("error", showFallback, { once: true });
    }
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -5% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));

    // Safety net: a fast scroll can move an element from below the viewport to
    // above it between two observer callbacks, so it is never reported as
    // intersecting and stays permanently invisible. Sweep on scroll/resize.
    let sweepQueued = false;
    const sweep = () => {
      sweepQueued = false;
      document.querySelectorAll(".reveal:not(.in-view)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("in-view");
        }
      });
    };
    const queueSweep = () => {
      if (sweepQueued) return;
      sweepQueued = true;
      requestAnimationFrame(sweep);
    };
    window.addEventListener("scroll", queueSweep, { passive: true });
    window.addEventListener("resize", queueSweep);
    queueSweep();
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  // Current year in the footer
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});
