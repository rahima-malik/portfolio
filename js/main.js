/*
  Personal portfolio config:
  Update these values once for your own links and repos.
*/
const GITHUB_USER = "YOUR-GITHUB-USERNAME";
const LINKEDIN_URL = "https://www.linkedin.com/in/rahimamalik-75034a404";
const EMAIL = "rahimamalikmalik2@gmail.com";

const projectLinks = document.querySelectorAll("[data-repo]");
projectLinks.forEach((link) => {
  const repo = link.dataset.repo;
  link.href = `https://github.com/${GITHUB_USER}/${repo}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const githubProfileLink = document.getElementById("github-profile");
if (githubProfileLink) {
  githubProfileLink.href = `https://github.com/${GITHUB_USER}`;
  githubProfileLink.target = "_blank";
  githubProfileLink.rel = "noopener noreferrer";
}

const scrollProgress = document.getElementById("scroll-progress");
const updateProgress = () => {
  const total = document.body.scrollHeight - window.innerHeight;
  const value = total > 0 ? (window.scrollY / total) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = `${value}%`;
};
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("load", updateProgress);

const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("site-nav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const navLinks = [...document.querySelectorAll(".main-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          const match = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", match);
        });
      }
    });
  },
  { threshold: 0.5 }
);
sections.forEach((section) => sectionObserver.observe(section));

const typingEl = document.getElementById("typing-text");
const roles = ["Data Science Student", "Data Scientist", "Problem Solver"];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typingEl) return;
  const text = roles[roleIndex];

  if (!deleting) {
    charIndex += 1;
    typingEl.textContent = text.slice(0, charIndex);

    if (charIndex === text.length) {
      deleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }
  } else {
    charIndex -= 1;
    typingEl.textContent = text.slice(0, charIndex);

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, deleting ? 60 : 100);
}
if (typingEl) typeLoop();

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealItems.forEach((item) => revealObserver.observe(item));

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.toggle("active", btn === button));

    projectCards.forEach((card) => {
      const isMatch = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !isMatch);
    });
  });
});

const tiltCards = document.querySelectorAll(".project-card");
tiltCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    const rotateY = (px - 0.5) * 14;
    const rotateX = (0.5 - py) * 14;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    card.style.setProperty("--glare-x", `${(px - 0.5) * 160}px`);
    card.style.setProperty("--glare-y", `${(py - 0.5) * 160}px`);
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)";
    card.style.setProperty("--glare-x", "0px");
    card.style.setProperty("--glare-y", "0px");
  });
});

const cursorGlow = document.querySelector(".cursor-glow");
if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow.classList.add("visible");
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
  window.addEventListener("pointerleave", () => cursorGlow.classList.remove("visible"));
}

const profileStage = document.querySelector(".profile-stage");
if (profileStage) {
  window.addEventListener("pointermove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 18;
    const y = (event.clientY / window.innerHeight - 0.5) * 18;

    profileStage.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;

    profileStage.querySelectorAll("[data-depth]").forEach((item) => {
      const depth = Number(item.dataset.depth || 1);
      item.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });
}

const codeOutput = document.getElementById("code-output");
const codeLines = [
  "class Rahima:",
  "    studying = \"Data Science\"",
  "    tools = [\"Python\", \"C++\"]",
  "    def ask(self, question):",
  "        return data.answer(question)"
];

let codeIndex = 0;
let lineCursor = 0;
let activeLine = "";

function typeCode() {
  if (!codeOutput) return;
  if (codeIndex >= codeLines.length) return;

  const line = codeLines[codeIndex];
  activeLine += line[lineCursor] || "";
  lineCursor += 1;
  codeOutput.textContent = codeLines.slice(0, codeIndex).join("\n") + (codeIndex > 0 ? "\n" : "") + activeLine;

  if (lineCursor < line.length) {
    setTimeout(typeCode, 35);
    return;
  }

  codeIndex += 1;
  lineCursor = 0;
  activeLine = "";

  if (codeIndex < codeLines.length) {
    setTimeout(() => {
      codeOutput.textContent += "\n";
      typeCode();
    }, 220);
  }
}
if (codeOutput) setTimeout(typeCode, 500);

const qrBox = document.getElementById("qr");
if (qrBox) {
  try {
    new QRCode(qrBox, {
      text: LINKEDIN_URL,
      width: 150,
      height: 150,
      colorDark: "#0b1020",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  } catch (error) {
    const fallback = document.createElement("img");
    fallback.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(LINKEDIN_URL)}`;
    fallback.alt = "LinkedIn QR code";
    qrBox.innerHTML = "";
    qrBox.appendChild(fallback);
  }
}

const form = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");
if (form && formNote) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fields = [
      form.querySelector("input[name='name']"),
      form.querySelector("input[name='email']"),
      form.querySelector("textarea[name='message']")
    ];

    let valid = true;
    fields.forEach((field) => {
      const value = field.value.trim();
      let isValid = true;

      if (field.name === "email") {
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      } else {
        isValid = value.length > 0;
      }

      field.classList.toggle("invalid", !isValid);
      if (!isValid) valid = false;
    });

    if (!valid) {
      formNote.textContent = "Please add your name, a valid email, and a message.";
      return;
    }

    const formData = new FormData(form);
    const subject = (formData.get("subject") || "Portfolio message").toString();
    const body = `${formData.get("message")}\n\nFrom: ${formData.get("name")} (${formData.get("email")})`;

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    formNote.textContent = "Opening your email app…";
    form.reset();
  });
}
