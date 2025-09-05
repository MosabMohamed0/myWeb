// Mobile menu toggle
const mobileMenu = document.getElementById("mobileMenu");
const navLinks = document.getElementById("navLinks");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("active");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Contact form validation and submission
const contactForm = document.getElementById("contactForm");
const messageContainer = document.getElementById("messageContainer");
const submitBtn = document.getElementById("submitBtn");

function showMessage(message, type) {
  messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
  setTimeout(() => {
    messageContainer.innerHTML = "";
  }, 5000);
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateName(name) {
  return name.trim().length >= 2;
}

function validateMessage(message) {
  return message.trim().length >= 10;
}

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Clear previous messages
  messageContainer.innerHTML = "";

  // Validation
  if (!validateName(name)) {
    showMessage("Please enter a valid name (at least 2 characters).", "error");
    document.getElementById("name").focus();
    return;
  }

  if (!validateEmail(email)) {
    showMessage("Please enter a valid email address.", "error");
    document.getElementById("email").focus();
    return;
  }

  if (!validateMessage(message)) {
    showMessage("Please enter a message (at least 10 characters).", "error");
    document.getElementById("message").focus();
    return;
  }

  // Simulate form submission
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  // Simulate API call with setTimeout
  setTimeout(() => {
    showMessage(
      "Thank you for your message! I'll get back to you soon.",
      "success"
    );
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";

    // You can replace this with actual form submission logic
    // Example: fetch('/submit-form', { method: 'POST', body: formData })
  }, 2000);
});

// Real-time form validation
document.getElementById("name").addEventListener("blur", function () {
  const name = this.value.trim();
  if (name && !validateName(name)) {
    this.style.borderColor = "#e53e3e";
  } else {
    this.style.borderColor = "#e0e0e0";
  }
});

document.getElementById("email").addEventListener("blur", function () {
  const email = this.value.trim();
  if (email && !validateEmail(email)) {
    this.style.borderColor = "#e53e3e";
  } else {
    this.style.borderColor = "#e0e0e0";
  }
});

document.getElementById("message").addEventListener("blur", function () {
  const message = this.value.trim();
  if (message && !validateMessage(message)) {
    this.style.borderColor = "#e53e3e";
  } else {
    this.style.borderColor = "#e0e0e0";
  }
});

// Update skill bars on scroll
const skillBars = document.querySelectorAll(".skill-progress");
const skillsSection = document.getElementById("skills");

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      skillBars.forEach((bar) => {
        const width = bar.style.width;
        bar.style.width = "0%";
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      });
      skillsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

skillsObserver.observe(skillsSection);

// Add active state to navigation based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href") === `#${current}`) {
      item.classList.add("active");
    }
  });
});

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect when page loads
document.addEventListener("DOMContentLoaded", function () {
  const heroTitle = document.querySelector(".hero h1");
  const heroSubtitle = document.querySelector(".hero p");

  if (heroTitle && heroSubtitle) {
    // Start typing effect after a delay
    setTimeout(() => {
      typeWriter(heroTitle, "Hi, I'm John Doe", 100);
    }, 500);

    setTimeout(() => {
      typeWriter(heroSubtitle, "Full-Stack Web Developer & UI/UX Designer", 80);
    }, 2500);
  }
});

// Project card hover effects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Scroll to top button
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = "↑";
scrollToTopBtn.className = "scroll-to-top";
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Show/hide scroll to top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.opacity = "1";
    scrollToTopBtn.style.visibility = "visible";
  } else {
    scrollToTopBtn.style.opacity = "0";
    scrollToTopBtn.style.visibility = "hidden";
  }
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease-in-out";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Initialize all animations and effects when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Add stagger animation to skill items
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-20px)";
    item.style.transition = "all 0.5s ease";

    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateX(0)";
    }, index * 100);
  });

  // Add entrance animation to project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease";

    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 200);
  });
});
