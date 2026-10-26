/**
 * ==========================================================================
 * EcoWise - Main JavaScript
 * Handles Theme Toggling (Dark/Light), Preloader, Scroll Animations, Scroll-to-top
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Preloader Handling ---
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => preloader.remove(), 500);
      }, 300);
    });
    // Fallback if load event already passed
    setTimeout(() => {
      if (preloader && !preloader.classList.contains('fade-out')) {
        preloader.classList.add('fade-out');
        setTimeout(() => preloader.remove(), 500);
      }
    }, 1200);
  }

  // --- 2. Dark / Light Theme Switching ---
  const savedTheme = localStorage.getItem('ecowise_theme') || 'light';
  applyTheme(savedTheme);

  // ตั้ง Event Listener ให้ปุ่มสลับธีม (อาจถูกเรนเดอร์จาก navbar-footer.js)
  function setupThemeToggle() {
    const themeBtn = document.getElementById('themeToggleBtn');
    if (!themeBtn) {
      setTimeout(setupThemeToggle, 50);
      return;
    }
    
    // อัปเดตไอคอนตามธีมปัจจุบัน
    updateThemeIcon(document.documentElement.getAttribute('data-theme') || 'light');

    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('ecowise_theme', newTheme);
    });
  }
  setupThemeToggle();

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    const icon = document.getElementById('themeIcon');
    if (!icon) return;
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun text-warning';
    } else {
      icon.className = 'fa-solid fa-moon text-secondary';
    }
  }

  // --- 3. Scroll to Top Button ---
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 4. Navbar Sticky Shrink on Scroll ---
  const navbar = document.getElementById('mainNavbar');
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNavbar');
    if (nav) {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  });

  // --- 5. Scroll Reveal Animation (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal-fade-up');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('active'));
  }

  // --- 6. Real-time Live Waste Counter (หน้าแรก index.html) ---
  const liveDateBadge = document.getElementById('liveDateBadge');
  const realtimeYearWaste = document.getElementById('realtimeYearWaste');
  const realtimeTodayWaste = document.getElementById('realtimeTodayWaste');
  const liveTodayClock = document.getElementById('liveTodayClock');

  if (realtimeYearWaste && realtimeTodayWaste) {
    const thaiMonths = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];

    function updateRealtimeWasteStats() {
      const now = new Date();
      const currentYear = now.getFullYear();

      // อัปเดตป้ายวันที่
      if (liveDateBadge) {
        const thaiDateStr = `${now.getDate()} ${thaiMonths[now.getMonth()]} ${currentYear}`;
        liveDateBadge.innerHTML = `<i class="fa-solid fa-circle text-danger me-1 small blink"></i> ${thaiDateStr}`;
      }

      // อัปเดตนาฬิกาวันนี้
      if (liveTodayClock) {
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');
        liveTodayClock.textContent = `${hh}:${mm}:${ss}`;
      }

      // คำนวณเวลาที่ผ่านไปในปีนี้ (วินาที)
      const startOfYear = new Date(currentYear, 0, 1, 0, 0, 0);
      const isLeapYear = (currentYear % 4 === 0 && currentYear % 100 !== 0) || (currentYear % 400 === 0);
      const secondsInYear = (isLeapYear ? 366 : 365) * 86400;
      const secondsPassedThisYear = (now - startOfYear) / 1000;

      // อัตราการสร้างขยะ: ~27.5 ล้านตันต่อปี
      const yearlyTotalEst = 27500000;
      const ratePerSecond = yearlyTotalEst / secondsInYear; // ~0.872 ตันต่อวินาที
      const currentYearWaste = secondsPassedThisYear * ratePerSecond;

      // คำนวณขยะที่สร้างขึ้นเฉพาะวันนี้ (ตั้งแต่เที่ยงคืน 00:00:00)
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      const secondsPassedToday = (now - startOfToday) / 1000;
      const currentTodayWaste = secondsPassedToday * ratePerSecond;

      // จัดรูปแบบตัวเลขพร้อมจุลภาคและทศนิยม 1 ตำแหน่ง
      realtimeYearWaste.textContent = currentYearWaste.toLocaleString('th-TH', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      });

      realtimeTodayWaste.textContent = currentTodayWaste.toLocaleString('th-TH', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      });
    }

    // รันครั้งแรกทันที และตั้งเวลาอัปเดตทุก 1 วินาที
    updateRealtimeWasteStats();
    setInterval(updateRealtimeWasteStats, 1000);
  }
});
