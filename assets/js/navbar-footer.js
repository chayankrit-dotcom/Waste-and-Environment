/**
 * ==========================================================================
 * EcoWise - Unified Navbar & Footer Component
 * จัดการ Navigation Bar และ Footer ให้เหมือนกันทุกหน้า แก้ไขจุดนี้จุดเดียว!
 * ==========================================================================
 */

(function () {
  'use strict';

  // ตรวจจับชื่อไฟล์ปัจจุบันเพื่อตั้งค่า Active Menu
  function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().toLowerCase();
    if (!page || page === '' || page === 'index.html') return 'index.html';
    return page;
  }

  // เทมเพลตสำหรับ Navigation Bar
  function renderNavbar() {
    const currentPage = getCurrentPage();
    const navPlaceholder = document.getElementById('navbar-placeholder');
    if (!navPlaceholder) return;

    const navHTML = `
      <nav class="navbar navbar-expand-lg sticky-top eco-navbar" id="mainNavbar">
        <div class="container">
          <!-- Logo & Brand -->
          <a class="navbar-brand navbar-brand-logo" href="index.html">
            <div class="brand-icon-wrap">
              <i class="fa-solid fa-tree"></i>
            </div>
            <span>Waste and <span style="color: var(--accent-cta);">Environment</span></span>
          </a>

          <!-- Mobile Toggle & Actions -->
          <div class="d-flex align-items-center gap-2 order-lg-3">
            <!-- Background Music (BGM) Toggle Button -->
            <button class="theme-toggle-btn" id="bgmToggleBtn" aria-label="เปิด/ปิดเพลงพื้นหลัง" title="เปิด/ปิดเพลงพื้นหลัง">
              <i class="fa-solid fa-volume-xmark" id="bgmIcon"></i>
            </button>

            <!-- Dark / Light Theme Toggle -->
            <button class="theme-toggle-btn" id="themeToggleBtn" aria-label="สลับธีม สว่าง/มืด" title="สลับโหมด มืด/สว่าง">
              <i class="fa-solid fa-moon" id="themeIcon"></i>
            </button>

            <!-- Mobile Hamburger Button -->
            <button class="navbar-toggler border-0 shadow-none px-2" type="button" data-bs-toggle="collapse" data-bs-target="#ecoNavbarNav" aria-controls="ecoNavbarNav" aria-expanded="false" aria-label="สลับแถบเมนู">
              <i class="fa-solid fa-bars text-success fs-4"></i>
            </button>
          </div>

          <!-- Nav Menu Items -->
          <div class="collapse navbar-collapse order-lg-2" id="ecoNavbarNav">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-1">
              <li class="nav-item">
                <a class="nav-link eco-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">
                  <i class="fa-solid fa-house"></i> Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link eco-link ${currentPage === 'game.html' ? 'active' : ''}" href="game.html">
                  <i class="fa-solid fa-gamepad"></i> PlayGame
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link eco-link ${currentPage === 'daily-waste.html' ? 'active' : ''}" href="daily-waste.html">
                  <i class="fa-solid fa-recycle"></i> ขยะในชีวิตประจำวัน
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link eco-link ${currentPage === 'environment.html' ? 'active' : ''}" href="environment.html">
                  <i class="fa-solid fa-seedling"></i> รักษาสิ่งแวดล้อม
                </a>
              </li>
              <li class="nav-item ms-lg-2 mt-2 mt-lg-0">
                <a class="btn btn-eco-primary btn-sm px-3" href="game.html">
                  <i class="fa-solid fa-play"></i> เล่นเกมแยกขยะ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;
    navPlaceholder.innerHTML = navHTML;
  }

  // เทมเพลตสำหรับ Footer (Unified & Single Source of Truth)
  function renderFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;

    const footerHTML = `
      <footer class="eco-footer">
        <div class="container">
          <div class="row align-items-center text-center text-md-start">
            <!-- Brand & Info -->
            <div class="col-md-5 mb-4 mb-md-0">
              <div class="d-inline-flex align-items-center gap-2 mb-2">
                <div class="brand-icon-wrap" style="width: 34px; height: 34px; font-size: 1rem;">
                  <i class="fa-solid fa-tree"></i>
                </div>
                <span class="fs-4 fw-bold" style="color: var(--color-brand-deep);">Waste and Environment</span>
              </div>
              <p class="text-muted small mb-0" style="max-width: 360px;">
                ร่วมสร้างโลกสีเขียว เรียนรู้การคัดแยกขยะที่ถูกต้อง และปลูกจิตสำนึกรักษาสิ่งแวดล้อมเพื่ออนาคตที่ยั่งยืน
              </p>
            </div>

            <!-- Quick Navigation Links -->
            <div class="col-md-4 mb-4 mb-md-0">
              <h6 class="fw-bold mb-3" style="color: var(--color-brand-deep);">เมนูลัด</h6>
              <div class="d-flex flex-column gap-2 small">
                <div><a href="index.html" class="text-muted text-decoration-none hover-accent"><i class="fa-solid fa-angle-right me-1 text-success"></i> หน้าแรก (Home)</a></div>
                <div><a href="game.html" class="text-muted text-decoration-none hover-accent"><i class="fa-solid fa-angle-right me-1 text-success"></i> มินิเกมแยกขยะ (PlayGame)</a></div>
                <div><a href="daily-waste.html" class="text-muted text-decoration-none hover-accent"><i class="fa-solid fa-angle-right me-1 text-success"></i> ขยะในชีวิตประจำวัน</a></div>
                <div><a href="environment.html" class="text-muted text-decoration-none hover-accent"><i class="fa-solid fa-angle-right me-1 text-success"></i> การรักษาสิ่งแวดล้อม</a></div>
              </div>
            </div>

            <!-- Social / Eco Tips -->
            <div class="col-md-3 text-md-end text-center">
              <div class="d-inline-flex gap-2">
                <a href="game.html" class="btn btn-sm btn-eco-primary"><i class="fa-solid fa-trophy me-1"></i> ท้าทายเกม</a>
              </div>
            </div>
          </div>

          <!-- Requirement Footer Text -->
          <div class="footer-copyright mt-4">
            <div class="fw-semibold mb-1">
              &copy; 2026 เว็บให้ความรู้เกี่ยวกับขยะและสิ่งแวดล้อม
            </div>
            <div class="small text-muted">
              Designed by Chayan Boochapan
            </div>
          </div>
        </div>
      </footer>
    `;
    footerPlaceholder.innerHTML = footerHTML;
  }

  // เรียกทำงานทันทีที่ DOM พร้อม
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      renderNavbar();
      renderFooter();
    });
  } else {
    renderNavbar();
    renderFooter();
  }
})();
