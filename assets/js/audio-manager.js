/**
 * ==========================================================================
 * EcoWise - Audio Manager (Autoplay Supported)
 * จัดการเสียงดนตรีพื้นหลัง (BGM) และเสียงเอฟเฟกต์คลิก (SFX) ทุกหน้า
 * รองรับการเล่นเพลงอัตโนมัติทันทีที่เข้าหน้าเว็บ (Seamless Autoplay)
 * ==========================================================================
 */

(function () {
  'use strict';

  // เส้นทางไฟล์เสียง
  const BGM_SRC = 'assets/Sounds/soundreality-fluorescent-forest-ambient-536763.mp3';
  const SFX_CLICK_SRC = 'assets/Sounds/soundreality-mouse-click-153941.mp3';

  // อ็อบเจกต์ Audio
  let bgmAudio = null;
  let sfxAudio = null;
  let isBgmPlaying = false;

  // เริ่มต้นตั้งค่าระบบเสียง
  function initAudio() {
    // 1. ตั้งค่า BGM
    bgmAudio = new Audio(BGM_SRC);
    bgmAudio.loop = true;
    bgmAudio.volume = 0.35; // เสียงคลอธรรมชาติกำลังดี

    // 2. ตั้งค่า SFX Click
    sfxAudio = new Audio(SFX_CLICK_SRC);
    sfxAudio.volume = 0.5;

    // 3. ผูกปุ่มสลับ BGM บน Navbar
    setupBgmButton();

    // 4. ผูกเสียง SFX เมื่อคลิกปุ่มหรือลิงก์
    setupClickSFX();

    // 5. ระบบเล่นเพลงอัตโนมัติ (Autoplay)
    // ตรวจสอบว่าผู้ใช้เคย "จงใจกดปิด" (false) ไว้หรือไม่ หากไม่ ให้เปิดเล่นอัตโนมัติเสมอ
    const userExplicitlyMuted = localStorage.getItem('ecowise_bgm_muted') === 'true';
    if (!userExplicitlyMuted) {
      attemptAutoplay();
    } else {
      updateBgmIcon(false);
    }
  }

  // พยายามเล่นเพลงอัตโนมัติทันที หรือเมื่อผู้ใช้เริ่มโต้ตอบกับหน้าจอ (Gesture Bypass)
  function attemptAutoplay() {
    if (!bgmAudio) return;

    // ลองสั่งเล่นทันที
    const playPromise = bgmAudio.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        // เล่นสำเร็จทันที (เบราว์เซอร์อนุญาต)
        isBgmPlaying = true;
        updateBgmIcon(true);
      }).catch(() => {
        // เบราว์เซอร์ติด Autoplay Security Policy บล็อกไว้
        // แก้ไขด้วยการรอการขยับ/คลิก/แตะ/เลื่อนหน้าจอครั้งแรกของผู้ใช้ แล้วเล่นทันทีอัตโนมัติ
        updateBgmIcon(true); // แสดงสถานะว่าเตรียมพร้อมเล่น

        const triggerAutoPlay = () => {
          if (!isBgmPlaying && localStorage.getItem('ecowise_bgm_muted') !== 'true') {
            bgmAudio.play().then(() => {
              isBgmPlaying = true;
              updateBgmIcon(true);
            }).catch(() => {});
          }
          // ถอด Listener ออกเมื่อเริ่มเล่นแล้ว
          cleanupListeners();
        };

        const events = ['click', 'touchstart', 'scroll', 'keydown', 'pointerdown'];
        function cleanupListeners() {
          events.forEach(evt => window.removeEventListener(evt, triggerAutoPlay, true));
        }

        events.forEach(evt => {
          window.addEventListener(evt, triggerAutoPlay, { once: true, passive: true, capture: true });
        });
      });
    }
  }

  // เล่น BGM
  function playBGM() {
    if (!bgmAudio) return;
    bgmAudio.play().then(() => {
      isBgmPlaying = true;
      localStorage.setItem('ecowise_bgm_muted', 'false');
      updateBgmIcon(true);
    }).catch(() => {});
  }

  // หยุด BGM
  function pauseBGM() {
    if (!bgmAudio) return;
    bgmAudio.pause();
    isBgmPlaying = false;
    localStorage.setItem('ecowise_bgm_muted', 'true'); // บันทึกว่าผู้ใช้จงใจปิด
    updateBgmIcon(false);
  }

  // สลับสถานะเปิด/ปิด BGM
  function toggleBGM() {
    if (isBgmPlaying) {
      pauseBGM();
    } else {
      playBGM();
    }
  }

  // อัปเดตไอคอนบนปุ่ม BGM
  function updateBgmIcon(playing) {
    const icon = document.getElementById('bgmIcon');
    const btn = document.getElementById('bgmToggleBtn');
    if (!icon) return;

    if (playing) {
      icon.className = 'fa-solid fa-volume-high text-success';
      if (btn) {
        btn.setAttribute('title', 'กดเพื่อปิดเพลงพื้นหลัง (BGM)');
        btn.classList.add('bgm-active');
      }
    } else {
      icon.className = 'fa-solid fa-volume-xmark text-secondary';
      if (btn) {
        btn.setAttribute('title', 'กดเพื่อเปิดเพลงพื้นหลัง (BGM)');
        btn.classList.remove('bgm-active');
      }
    }
  }

  // ผูกปุ่ม BGM บน Navbar
  function setupBgmButton() {
    const btn = document.getElementById('bgmToggleBtn');
    if (!btn) {
      setTimeout(setupBgmButton, 80);
      return;
    }

    const userMuted = localStorage.getItem('ecowise_bgm_muted') === 'true';
    updateBgmIcon(!userMuted);

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      playClickSound();
      toggleBGM();
    });
  }

  // เล่นเสียงคลิก (SFX)
  function playClickSound() {
    try {
      if (!sfxAudio) {
        sfxAudio = new Audio(SFX_CLICK_SRC);
        sfxAudio.volume = 0.5;
      }
      const soundClone = sfxAudio.cloneNode();
      soundClone.volume = 0.45;
      soundClone.play().catch(() => {});
    } catch (e) {}
  }

  // ตั้งค่าเสียงคลิกสำหรับปุ่มและลิงก์ทั้งหมดในเว็บ
  function setupClickSFX() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('button, a, .btn, .nav-link, .bin-drop-target, .habit-check, .draggable-waste-item');
      if (target) {
        playClickSound();
      }
    }, true);
  }

  // Expose ให้เรียกใช้ได้หากต้องการ
  window.ecoAudio = {
    playBGM,
    pauseBGM,
    toggleBGM,
    playClickSound
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAudio);
  } else {
    initAudio();
  }
})();
