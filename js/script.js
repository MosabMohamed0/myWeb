var modal = document.getElementById("myModal");
var modalImg = document.getElementById("imgInModal");
var closeBtn = document.getElementsByClassName("close")[0];

// نجيب كل الصور اللي ليها class="popup-img"
var images = document.querySelectorAll(".popup-img");

images.forEach(function (img) {
  img.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
  };
});

// زر الإغلاق
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// قفل عند الضغط برا الصورة
modal.onclick = function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};
// تغيير شكل الـ navbar عند النزول تحت
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  header.classList.toggle("scrolled", window.scrollY > 50);
});

// تمييز اللينك النشط في الـ Navbar
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// إنشاء الزر ديناميكياً
const backToTop = document.createElement("button");
backToTop.innerText = "⬆";
backToTop.className = "back-to-top";
document.body.appendChild(backToTop);

// إظهار/إخفاء الزر
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

// عند الضغط عليه
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealElements = document.querySelectorAll(
  ".section-title, .skill-card, .project-card"
);

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.8;
  revealElements.forEach((el) => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add("show");
    } else {
      el.classList.remove("show");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

const form = document.querySelector(".contact-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !subject || !message) {
    alert("⚠️ Please fill in all fields!");
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    alert("⚠️ Please enter a valid email!");
    return;
  }

  alert("✅ Message sent successfully!");
  form.reset();
});

// // تهيئة EmailJS بمفتاحك
// (function () {
//   emailjs.init("YOUR_PUBLIC_KEY"); // استبدل بـ المفتاح بتاعك
// })();

// // التعامل مع الفورم
// document.querySelector(".contact-form").addEventListener("submit", function (e) {
//   e.preventDefault();

//   emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
//     .then(() => {
//       alert("✅ Message sent successfully!");
//       this.reset();
//     }, (err) => {
//       alert("❌ Failed to send: " + JSON.stringify(err));
//     });
// });
