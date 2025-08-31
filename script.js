document.addEventListener("DOMContentLoaded", () => {
  // Hamburger Menu
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  });

  // Dark Mode Toggle
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const body = document.body;
  const currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "light";
  const toggleIcon = darkModeToggle.querySelector("i");

  if (currentTheme === "dark") {
    body.setAttribute("data-theme", "dark");
    toggleIcon.classList.remove("fa-moon");
    toggleIcon.classList.add("fa-sun");
  }

  darkModeToggle.addEventListener("click", () => {
    let theme = body.getAttribute("data-theme");
    if (theme === "dark") {
      body.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      toggleIcon.classList.remove("fa-sun");
      toggleIcon.classList.add("fa-moon");
    } else {
      body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      toggleIcon.classList.remove("fa-moon");
      toggleIcon.classList.add("fa-sun");
    }
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Animate Sections on Scroll (Intersection Observer)
  const sections = document.querySelectorAll(".section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Form Validation & EmailJS Integration
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
      // Kirim email via EmailJS
      emailjs.init("YOUR_USER_ID"); // Ganti dengan user ID dari EmailJS
      emailjs
        .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
          from_name: name,
          from_email: email,
          message: message,
          to_email: "nurdaffaraihan46@gmail.com",
        })
        .then(
          function () {
            alert("Pesan berhasil dikirim!");
            contactForm.reset();
          },
          function (error) {
            alert("Gagal mengirim pesan. Silakan coba lagi.");
          }
        );
    } else {
      alert("Mohon lengkapi semua field.");
    }
  });

  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Typing Animation for Home Title
  const typingElement = document.getElementById("typing");
  if (typingElement) {
    const texts = ['Halo, saya <span class="highlight">RAIHAN NUR DAFFA</span>'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 100;

    function type() {
      const currentText = texts[textIndex];
      let displayed = currentText.substring(0, charIndex);

      typingElement.innerHTML = displayed;

      if (!isDeleting && charIndex < currentText.length) {
        charIndex++;
        delay = 100;
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        delay = 50;
      } else {
        isDeleting = !isDeleting;
        delay = isDeleting ? 1200 : 500;
      }
      setTimeout(type, delay);
    }
    type();
  }
});
