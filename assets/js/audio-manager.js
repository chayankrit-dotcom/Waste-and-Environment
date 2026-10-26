/**
 * ==========================================================================
 * EcoWise - Audio Manager
 * จัดการเสียงดนตรีพื้นหลัง (BGM) และเสียงเอฟเฟกต์คลิก (SFX) ทุกหน้า
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
    bgmAudio.volume = 0.35; // เสียงคลอสบายๆ ไม่ดังเกินไป

    // 2. ตั้งค่า SFX Click
    sfxAudio = new Audio(SFX_CLICK_SRC);
    sfxAudio.volume = 0.5;

    // ตรวจสอบสถานะเดิมจาก localStorage (ค่าเริ่มต้น: ปิดไว้ก่อนตามมาตรฐาน Browser Autoplay หรือเปิดหากผู้ใช้เคยเปิดไว้)
    const savedBgmPref = localStorage.getItem('ecowise_bgm_enabled');
    if (savedBgmPref === 'true') {
      // พยายามเล่นเมื่อผู้ใช้คลิกหรือโต้ตอบกับหน้าจอครั้งแรก
      const startBgmOnFirstInteraction = () => {
        playBGM();
        window.removeEventListener('click', startBgmOnFirstInteraction);
        window.removeEventListener('keydown', startBgmOnFirstInteraction);
      };
      window.addEventListener('click', startBgmOnFirstInteraction, { once: true });
      window.addEventListener('keydown', startBgmOnFirstInteraction, { once: true });
    }

    // 3. ผูกปุ่มสลับ BGM บน Navbar
    setupBgmButton();

    // 4. ผูกเสียง SFX เมื่อคลิกปุ่มหรือลิงก์
    setupClickSFX();
  }

  // เล่น BGM
  function playBGM() {
    if (!bgmAudio) return;
    bgmAudio.play().then(() => {
      isBgmPlaying = true;
      localStorage.setItem('ecowise_bgm_enabled', 'true');
      updateBgmIcon(true);
    }).catch(() => {
      // Browser Autoplay Policy อาจบล็อกหากยังไม่มีการคลิก
      isBgmPlaying = false;
      updateBgmIcon(false);
    });
  }

  // หยุด BGM
  function pauseBGM() {
    if (!bgmAudio) return;
    bgmAudio.pause();
    isBgmPlaying = false;
    localStorage.setItem('ecowise_bgm_enabled', 'false');
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
        btn.setAttribute('title', 'ปิดเพลงพื้นหลัง (BGM)');
        btn.classList.add('bgm-active');
      }
    } else {
      icon.className = 'fa-solid fa-volume-xmark text-secondary';
      if (btn) {
        btn.setAttribute('title', 'เปิดเพลงพื้นหลัง (BGM)');
        btn.classList.remove('bgm-active');
      }
    }
  }

  // ผูกปุ่ม BGM บน Navbar
  function setupBgmButton() {
    const btn = document.getElementById('bgmToggleBtn');
    if (!btn) {
      // รอจนกว่า navbar-footer.js จะเรนเดอร์เสร็จ
      setTimeout(setupBgmButton, 80);
      return;
    }

    const savedBgmPref = localStorage.getItem('ecowise_bgm_enabled');
    updateBgmIcon(savedBgmPref === 'true' && isBgmPlaying);

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
      // โคลนเสียงเพื่อให้สามารถคลิกรัวๆ ได้อย่างต่อเนื่อง
      const soundClone = sfxAudio.cloneNode();
      soundClone.volume = 0.45;
      soundClone.play().catch(() => {});
    } catch (e) {
      // ละเว้นหากเบราว์เซอร์บล็อก
    }
  }

  // ตั้งค่าเสียงคลิกสำหรับปุ่มและลิงก์ทั้งหมดในเว็บ
  function setupClickSFX() {
    document.addEventListener('click', (e) => {
      // ตรวจสอบว่าเป้าหมายที่คลิกเป็นปุ่ม ลิงก์ หรือส่วนควบคุมหรือไม่
      const target = e.target.closest('button, a, .btn, .nav-link, .bin-drop-target, .habit-check, .draggable-waste-item');
      if (target) {
        playClickSound();
      }
    }, true);
  }

  // Expose to global if needed
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
