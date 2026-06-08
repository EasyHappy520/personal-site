/* ========================================
   个人网站 — 交互脚本
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
  // --- 移动端汉堡菜单 ---
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navLinks.classList.toggle("open");
    });

    // 点击导航链接后关闭菜单
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navLinks.classList.remove("open");
      });
    });
  }

  // --- 滚动渐入动画 ---
  const fadeElements = document.querySelectorAll(
    ".section, .project-card, .contact-item"
  );

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
      rootMargin: "0px 0px -40px 0px",
    }
  );

  fadeElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

  // --- 导航栏当前区块高亮 ---
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  const highlightNav = () => {
    let currentId = "";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100) {
        currentId = section.getAttribute("id");
      }
    });

    navItems.forEach((link) => {
      link.style.color = "";
      link.style.fontWeight = "";
      if (link.getAttribute("href") === "#" + currentId) {
        link.style.color = "var(--text, #1a1a1a)";
        link.style.fontWeight = "600";
      }
    });
  };

  window.addEventListener("scroll", highlightNav, { passive: true });
  highlightNav();
});
