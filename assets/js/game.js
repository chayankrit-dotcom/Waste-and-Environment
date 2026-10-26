/**
 * ==========================================================================
 * EcoWise - Waste Sorting Mini-Game
 * กติกา: นับถอยหลัง 60 วินาที ลากขยะสุ่มลงถัง 4 สี ถูกได้แต้ม ผิดไม่ได้แต้ม
 * มีป็อปอัปแจ้งผลทันที และสรุปผลละเอียดพร้อมเฉลยทุกข้อเมื่อจบเกม
 * ==========================================================================
 */

(function () {
  'use strict';

  // คลังข้อมูลขยะในชีวิตประจำวัน
  const WASTE_DATABASE = [
    // 1. ขยะอินทรีย์ (organic)
    {
      id: 'w1',
      name: 'เปลือกกล้วยหอม',
      enName: 'Banana Peel',
      category: 'organic',
      icon: 'fa-solid fa-apple-whole',
      color: '#2e7d32',
      explanation: 'เป็นขยะอินทรีย์ที่ย่อยสลายได้ง่ายตามธรรมชาติ นำไปทำปุ๋ยหมักบำรุงดินได้'
    },
    {
      id: 'w2',
      name: 'เศษอาหารและข้าวสวย',
      enName: 'Leftover Food',
      category: 'organic',
      icon: 'fa-solid fa-bowl-rice',
      color: '#2e7d32',
      explanation: 'เศษอาหารสดหรือข้าวเหลือ เป็นขยะเปียกอินทรีย์ สามารถแปรรูปเป็นก๊าซชีวภาพหรือปุ๋ยได้'
    },
    {
      id: 'w3',
      name: 'ก้างปลาและกระดูกไก่',
      enName: 'Fish & Chicken Bones',
      category: 'organic',
      icon: 'fa-solid fa-bone',
      color: '#2e7d32',
      explanation: 'ซากกระดูกสัตว์จัดเป็นขยะอินทรีย์ ย่อยสลายได้ตามธรรมชาติ'
    },
    {
      id: 'w4',
      name: 'เปลือกไข่ไก่',
      enName: 'Egg Shells',
      category: 'organic',
      icon: 'fa-solid fa-egg',
      color: '#2e7d32',
      explanation: 'เปลือกไข่มีแคลเซียมสูง ย่อยสลายได้ดี เหมาะกับการบดผสมดินปลูกต้นไม้'
    },
    {
      id: 'w5',
      name: 'ใบไม้แห้งและเศษหญ้า',
      enName: 'Dry Leaves',
      category: 'organic',
      icon: 'fa-solid fa-leaf',
      color: '#2e7d32',
      explanation: 'เศษพืชและใบไม้จากสวน เป็นสารอินทรีย์สีน้ำตาล เหมาะสำหรับทำปุ๋ยหมักอินทรีย์'
    },

    // 2. ขยะรีไซเคิล (recycle)
    {
      id: 'w6',
      name: 'ขวดน้ำพลาสติกใส (PET)',
      enName: 'Plastic Water Bottle',
      category: 'recycle',
      icon: 'fa-solid fa-bottle-water',
      color: '#f9a825',
      explanation: 'พลาสติก PET หมายเลข 1 นำไปหลอมเป็นเส้นใยผ้า เสื้อผ้า หรือขวดใบใหม่ได้'
    },
    {
      id: 'w7',
      name: 'กระป๋องอลูมิเนียมน้ำอัดลม',
      enName: 'Aluminum Soda Can',
      category: 'recycle',
      icon: 'fa-solid fa-wine-bottle',
      color: '#f9a825',
      explanation: 'อลูมิเนียมสามารถรีไซเคิลได้ไม่จำกัดจำนวนครั้ง และประหยัดพลังงานได้ถึง 95%'
    },
    {
      id: 'w8',
      name: 'กล่องกระดาษลังลูกฟูก',
      enName: 'Cardboard Box',
      category: 'recycle',
      icon: 'fa-solid fa-box-open',
      color: '#f9a825',
      explanation: 'กระดาษลังสามารถนำไปปั่นเป็นเยื่อกระดาษเพื่อผลิตกล่องพัสดุและบรรจุภัณฑ์ใหม่ได้'
    },
    {
      id: 'w9',
      name: 'ขวดแก้วเครื่องดื่ม',
      enName: 'Glass Beverage Bottle',
      category: 'recycle',
      icon: 'fa-solid fa-champagne-glasses',
      color: '#f9a825',
      explanation: 'แก้วรีไซเคิลได้ 100% โดยไม่สูญเสียคุณภาพ เพียงล้างสะอาดก่อนทิ้ง'
    },
    {
      id: 'w10',
      name: 'กล่องนม UHT',
      enName: 'Milk Carton UHT',
      category: 'recycle',
      icon: 'fa-solid fa-blender',
      color: '#f9a825',
      explanation: 'กล่องเครื่องดื่มสามารถแยกเยื่อกระดาษ อลูมิเนียมฟอยล์ และพลาสติกมาทำหลังคาเขียวได้'
    },
    {
      id: 'w11',
      name: 'หนังสือพิมพ์หรือเอกสารเก่า',
      enName: 'Old Newspapers',
      category: 'recycle',
      icon: 'fa-solid fa-newspaper',
      color: '#f9a825',
      explanation: 'กระดาษขาวดำหรือนิตยสารเก่า นำไปรีไซเคิลเป็นเยื่อกระดาษใหม่ได้'
    },

    // 3. ขยะทั่วไป (general)
    {
      id: 'w12',
      name: 'ซองขนมขบเคี้ยว (ฟอยล์)',
      enName: 'Snack Foil Pouch',
      category: 'general',
      icon: 'fa-solid fa-cookie-bite',
      color: '#1565c0',
      explanation: 'เป็นพลาสติกเคลือบอลูมิเนียมหลายชั้น (Multilayer) แยกชั้นรีไซเคิลได้ยาก จึงจัดเป็นขยะทั่วไป'
    },
    {
      id: 'w13',
      name: 'หลอดดูดน้ำพลาสติก',
      enName: 'Plastic Straw',
      category: 'general',
      icon: 'fa-solid fa-grip-lines-vertical',
      color: '#1565c0',
      explanation: 'มีขนาดเล็กมาก มักปนเปื้อนและหลุดรอดจากระบบคัดแยกรีไซเคิล จึงต้องทิ้งขยะทั่วไป'
    },
    {
      id: 'w14',
      name: 'กล่องโฟมใส่อาหาร',
      enName: 'Styrofoam Box',
      category: 'general',
      icon: 'fa-solid fa-box',
      color: '#1565c0',
      explanation: 'โฟม PS แตกหักง่าย ปนเปื้อนคราบน้ำมัน ย่อยสลายยากมากในธรรมชาติ จึงจัดเป็นขยะทั่วไป'
    },
    {
      id: 'w15',
      name: 'กระดาษทิชชู่ใช้แล้ว',
      enName: 'Used Tissue Paper',
      category: 'general',
      icon: 'fa-solid fa-scroll',
      color: '#1565c0',
      explanation: 'มีเส้นใยสั้นมากและปนเปื้อนสิ่งสกปรก ไม่สามารถนำไปรีไซเคิลได้'
    },
    {
      id: 'w16',
      name: 'ถุงพลาสติกเปื้อนแกง',
      enName: 'Greasy Plastic Bag',
      category: 'general',
      icon: 'fa-solid fa-bag-shopping',
      color: '#1565c0',
      explanation: 'ถุงที่ปนเปื้อนคราบไขมันอาหารจนล้างไม่ออก ไม่สามารถส่งเข้าระบบรีไซเคิลได้'
    },
    {
      id: 'w17',
      name: 'แก้วกาแฟกระดาษเคลือบพลาสติก',
      enName: 'Paper Coffee Cup',
      category: 'general',
      icon: 'fa-solid fa-mug-hot',
      color: '#1565c0',
      explanation: 'ภายในเคลือบฟิล์มพลาสติกกันซึม แยกชั้นยากในโรงงานทั่วไป จึงถือเป็นขยะทั่วไป'
    },

    // 4. ขยะอันตราย (hazard)
    {
      id: 'w18',
      name: 'ถ่านไฟฉายและถ่านนาฬิกา',
      enName: 'Dry Cell Batteries',
      category: 'hazard',
      icon: 'fa-solid fa-battery-half',
      color: '#c62828',
      explanation: 'มีสารปรอท แคดเมียม ตะกั่ว รั่วซึมลงดินและน้ำได้ ต้องทิ้งถังสีแดง/ส้มอันตรายเท่านั้น'
    },
    {
      id: 'w19',
      name: 'หลอดไฟฟลูออเรสเซนต์',
      enName: 'Fluorescent Light Bulb',
      category: 'hazard',
      icon: 'fa-solid fa-lightbulb',
      color: '#c62828',
      explanation: 'มีไอปรอทบรรจุอยู่ภายใน หากแตกจะกระจายสู่บรรยากาศ ต้องจัดการอย่างระมัดระวัง'
    },
    {
      id: 'w20',
      name: 'กระป๋องสเปรย์ฉีดยุง',
      enName: 'Aerosol Spray Can',
      category: 'hazard',
      icon: 'fa-solid fa-spray-can-sparkles',
      color: '#c62828',
      explanation: 'เป็นกระป๋องอัดก๊าซไวไฟและมีสารเคมีกำจัดแมลง เสี่ยงต่อการระเบิดและเป็นพิษ'
    },
    {
      id: 'w21',
      name: 'แบตเตอรี่โทรศัพท์เสื่อมสภาพ',
      enName: 'Old Phone Battery',
      category: 'hazard',
      icon: 'fa-solid fa-mobile-screen',
      color: '#c62828',
      explanation: 'แบตเตอรี่ลิเธียมไอออน อาจลุกไหม้ได้เมื่อถูกกดทับ และมีสารพิษสะสม'
    },
    {
      id: 'w22',
      name: 'ขวดยาและเม็ดยาหมดอายุ',
      enName: 'Expired Medicine',
      category: 'hazard',
      icon: 'fa-solid fa-pills',
      color: '#c62828',
      explanation: 'สารเคมีในยาอาจทำลายระบบนิเวศแหล่งน้ำหากทิ้งปะปน ต้องกำจัดด้วยวิธีเฉพาะ'
    },
    {
      id: 'w23',
      name: 'ตลับหมึกพิมพ์เลเซอร์ / อิงค์เจ็ท',
      enName: 'Printer Ink Cartridge',
      category: 'hazard',
      icon: 'fa-solid fa-print',
      color: '#c62828',
      explanation: 'ผงหมึกมีสารเคมีละเอียดและโลหะหนัก เป็นอันตรายต่อระบบทางเดินหายใจ'
    }
  ];

  // ชื่อถังภาษาไทย
  const BIN_NAMES = {
    organic: 'ถังขยะอินทรีย์ (สีเขียว)',
    recycle: 'ถังขยะรีไซเคิล (สีเหลือง)',
    general: 'ถังขยะทั่วไป (สีน้ำเงิน)',
    hazard: 'ถังขยะอันตราย (สีส้ม/แดง)'
  };

  // Web Audio API Synthesizer (สำหรับเสียงเอฟเฟกต์ ไม่ต้องโหลดไฟล์ mp3 จากภายนอก)
  const soundFX = {
    ctx: null,
    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
    },
    playCorrect() {
      try {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12); // G5
        osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.25); // C6

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

        osc.start(now);
        osc.stop(now + 0.35);
      } catch (e) {
        // Fallback silently if audio blocked
      }
    },
    playWrong() {
      try {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now); // A3
        osc.frequency.linearRampToValueAtTime(140, now + 0.25);

        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

        osc.start(now);
        osc.stop(now + 0.35);
      } catch (e) {
        // Fallback silently
      }
    }
  };

  // Game State
  const state = {
    isPlaying: false,
    timer: 60,
    timerInterval: null,
    score: 0,
    sortedCount: 0,
    history: [], // { item, chosenCategory, isCorrect }
    availableItems: [],
    currentItem: null
  };

  // DOM Elements
  let timerDisplay, scoreDisplay, sortedCountDisplay;
  let arenaContainer, startScreen, activeGameArea;
  let startBtn, restartBtn, feedbackToast, resultsModal;
  let resultsTotalScore, resultsStatsText, resultsList, playAgainModalBtn;

  // เริ่มต้นตั้งค่าองค์ประกอบ DOM
  function initGameElements() {
    timerDisplay = document.getElementById('gameTimer');
    scoreDisplay = document.getElementById('gameScore');
    sortedCountDisplay = document.getElementById('gameSortedCount');
    arenaContainer = document.getElementById('wasteSpawnArena');
    startScreen = document.getElementById('gameStartScreen');
    activeGameArea = document.getElementById('activeGameArea');
    startBtn = document.getElementById('startGameBtn');
    restartBtn = document.getElementById('restartGameBtn');
    feedbackToast = document.getElementById('gameFeedbackToast');
    resultsModal = document.getElementById('resultsModalOverlay');
    resultsTotalScore = document.getElementById('resultsTotalScore');
    resultsStatsText = document.getElementById('resultsStatsText');
    resultsList = document.getElementById('resultsList');
    playAgainModalBtn = document.getElementById('playAgainModalBtn');

    if (startBtn) {
      startBtn.addEventListener('click', startGame);
    }
    if (restartBtn) {
      restartBtn.addEventListener('click', startGame);
    }
    if (playAgainModalBtn) {
      playAgainModalBtn.addEventListener('click', () => {
        closeResultsModal();
        startGame();
      });
    }

    // ตั้งค่า Drag & Drop และ Touch บนถังขยะ
    setupBinDropZones();
  }

  // สลับหน้าจอเกม
  function startGame() {
    // รีเซ็ตสถานะ
    clearInterval(state.timerInterval);
    state.isPlaying = true;
    state.timer = 60;
    state.score = 0;
    state.sortedCount = 0;
    state.history = [];
    state.availableItems = [...WASTE_DATABASE].sort(() => Math.random() - 0.5);

    // อัปเดต UI หน้าจอ
    if (startScreen) startScreen.classList.add('d-none');
    if (activeGameArea) activeGameArea.classList.remove('d-none');
    if (restartBtn) restartBtn.classList.remove('d-none');

    updateHUD();
    spawnNextWasteItem();

    // เริ่มนับถอยหลัง 1 นาที (60 วินาที)
    state.timerInterval = setInterval(() => {
      state.timer--;
      updateHUD();

      // เตือนเมื่อเหลือน้อยกว่า 10 วินาที
      if (state.timer <= 10 && timerDisplay) {
        timerDisplay.classList.add('timer-warning');
      }

      if (state.timer <= 0) {
        endGame();
      }
    }, 1000);
  }

  // อัปเดตแดชบอร์ด HUD (เวลา, คะแนน, จำนวนที่แยก)
  function updateHUD() {
    if (timerDisplay) {
      timerDisplay.textContent = `${state.timer}s`;
      if (state.timer > 10) {
        timerDisplay.classList.remove('timer-warning');
      }
    }
    if (scoreDisplay) {
      scoreDisplay.textContent = state.score;
    }
    if (sortedCountDisplay) {
      sortedCountDisplay.textContent = state.sortedCount;
    }
  }

  // สุ่มขยะชิ้นถัดไป
  function spawnNextWasteItem() {
    if (!state.isPlaying) return;

    // หากขยะหมดคลัง ให้สับไพ่รอบใหม่
    if (state.availableItems.length === 0) {
      state.availableItems = [...WASTE_DATABASE].sort(() => Math.random() - 0.5);
    }

    state.currentItem = state.availableItems.pop();
    renderCurrentWasteItem();
  }

  // วาดขยะปัจจุบันลงบนสนามประลอง
  function renderCurrentWasteItem() {
    if (!arenaContainer || !state.currentItem) return;

    const item = state.currentItem;
    arenaContainer.innerHTML = `
      <div 
        class="draggable-waste-item" 
        id="activeWasteCard" 
        draggable="true" 
        data-item-id="${item.id}"
        title="ลากขยะชิ้นนี้ หรือคลิกที่ถังขยะด้านล่างเพื่อทิ้ง"
      >
        <div class="waste-item-icon">
          <i class="${item.icon}"></i>
        </div>
        <div class="waste-item-info">
          <div class="waste-item-name">${item.name}</div>
          <div class="waste-item-hint">
            <i class="fa-solid fa-hand-pointer me-1 text-primary"></i> ลากหรือกดเลือกถังขยะที่ถูกต้อง
          </div>
        </div>
      </div>
    `;

    const wasteEl = document.getElementById('activeWasteCard');
    if (wasteEl) {
      // HTML5 Drag Events
      wasteEl.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', item.id);
        wasteEl.classList.add('dragging');
      });

      wasteEl.addEventListener('dragend', () => {
        wasteEl.classList.remove('dragging');
      });
    }
  }

  // ตั้งค่าถังขยะ 4 ชนิดสำหรับการ Drop และคลิก
  function setupBinDropZones() {
    const bins = document.querySelectorAll('.bin-drop-target');
    bins.forEach((bin) => {
      const targetCategory = bin.getAttribute('data-bin-category');

      // Drag Over
      bin.addEventListener('dragover', (e) => {
        e.preventDefault();
        bin.classList.add('drag-over');
      });

      // Drag Leave
      bin.addEventListener('dragleave', () => {
        bin.classList.remove('drag-over');
      });

      // Drop
      bin.addEventListener('drop', (e) => {
        e.preventDefault();
        bin.classList.remove('drag-over');
        if (!state.isPlaying || !state.currentItem) return;
        handleWasteSort(targetCategory);
      });

      // รองรับการคลิกเลือกถังโดยตรง (Touch & Click Support)
      bin.addEventListener('click', () => {
        if (!state.isPlaying || !state.currentItem) return;
        handleWasteSort(targetCategory);
      });
    });
  }

  // ตรวจสอบการทิ้งขยะ (ถูก/ผิด)
  function handleWasteSort(chosenCategory) {
    const currentItem = state.currentItem;
    const isCorrect = currentItem.category === chosenCategory;

    state.sortedCount++;

    if (isCorrect) {
      // ถูกต้อง: บวก 10 คะแนน
      state.score += 10;
      soundFX.playCorrect();
      showFloatingToast(true, `ถูกต้อง! 🎉 +10 คะแนน (${currentItem.name})`);
    } else {
      // ผิด: ไม่บวกคะแนน
      soundFX.playWrong();
      showFloatingToast(false, `ยังไม่ถูกต้อง! ❌ (${currentItem.name})`);
    }

    // บันทึกประวัติเพื่อแสดงเฉลยตอนจบ
    state.history.push({
      item: currentItem,
      chosenCategory: chosenCategory,
      isCorrect: isCorrect
    });

    updateHUD();

    // สุ่มชิ้นถัดไป
    spawnNextWasteItem();
  }

  // แสดง Popup Toast Feedback บนหน้าจอ
  let toastTimeout = null;
  function showFloatingToast(isCorrect, message) {
    if (!feedbackToast) return;

    clearTimeout(toastTimeout);
    feedbackToast.className = `game-feedback-toast ${isCorrect ? 'correct' : 'wrong'} show`;
    feedbackToast.innerHTML = `
      <i class="fa-solid ${isCorrect ? 'fa-circle-check' : 'fa-circle-xmark'} fs-2"></i>
      <div>
        <div style="font-size: 1.15rem;">${message}</div>
      </div>
    `;

    toastTimeout = setTimeout(() => {
      feedbackToast.classList.remove('show');
    }, 1100);
  }

  // จบเกม (หมดเวลา 1 นาที)
  function endGame() {
    clearInterval(state.timerInterval);
    state.isPlaying = false;

    if (arenaContainer) {
      arenaContainer.innerHTML = `
        <div class="text-center py-4">
          <div class="display-5 text-warning mb-2"><i class="fa-solid fa-flag-checkered"></i></div>
          <h4 class="fw-bold mb-1">หมดเวลา 1 นาทีแล้ว!</h4>
          <p class="text-muted small">ระบบกำลังประมวลผลคะแนนและเตรียมสรุปผลเฉลย...</p>
        </div>
      `;
    }

    setTimeout(() => {
      showResultsModal();
    }, 600);
  }

  // แสดงผลลัพธ์คะแนนรวมและเฉลยคำตอบละเอียด
  function showResultsModal() {
    if (!resultsModal) return;

    const totalQuestions = state.history.length;
    const correctCount = state.history.filter((h) => h.isCorrect).length;
    const wrongCount = totalQuestions - correctCount;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    if (resultsTotalScore) {
      resultsTotalScore.textContent = `${state.score} คะแนน`;
    }

    if (resultsStatsText) {
      resultsStatsText.innerHTML = `
        <div class="row g-2 text-center my-3">
          <div class="col-4">
            <div class="p-2 rounded bg-light border">
              <div class="small text-muted">แยกทั้งหมด</div>
              <div class="fw-bold fs-5">${totalQuestions} ชิ้น</div>
            </div>
          </div>
          <div class="col-4">
            <div class="p-2 rounded bg-success-subtle border border-success">
              <div class="small text-success">ถูกต้อง</div>
              <div class="fw-bold fs-5 text-success">${correctCount} ชิ้น</div>
            </div>
          </div>
          <div class="col-4">
            <div class="p-2 rounded bg-danger-subtle border border-danger">
              <div class="small text-danger">ตอบผิด</div>
              <div class="fw-bold fs-5 text-danger">${wrongCount} ชิ้น</div>
            </div>
          </div>
        </div>
        <div class="badge bg-success-subtle text-success px-3 py-2 rounded-pill fs-6">
          ความแม่นยำ: ${accuracy}%
        </div>
      `;
    }

    // วาดรายการเฉลยคำตอบทั้งหมด (แยกให้เห็นชัดว่าข้อไหนถูก ข้อไหนผิด พร้อมคำอธิบาย)
    if (resultsList) {
      if (totalQuestions === 0) {
        resultsList.innerHTML = `
          <div class="text-center text-muted py-4">
            <i class="fa-solid fa-clock-rotate-left fs-1 mb-2 text-secondary"></i>
            <div>ยังไม่ได้แยกขยะในรอบนี้ ลองใหม่อีกครั้งนะ!</div>
          </div>
        `;
      } else {
        resultsList.innerHTML = state.history
          .map((h, index) => {
            const correctBinName = BIN_NAMES[h.item.category] || h.item.category;
            const chosenBinName = BIN_NAMES[h.chosenCategory] || h.chosenCategory;

            return `
              <div class="mistake-list-item ${h.isCorrect ? 'is-correct' : 'is-wrong'}">
                <div class="d-flex align-items-start gap-3 w-100">
                  <div class="fs-4 mt-1">
                    ${
                      h.isCorrect
                        ? '<i class="fa-solid fa-circle-check text-success"></i>'
                        : '<i class="fa-solid fa-circle-xmark text-danger"></i>'
                    }
                  </div>
                  <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                      <span class="fw-bold fs-6">${index + 1}. ${h.item.name} (${h.item.enName})</span>
                      <span class="badge ${h.isCorrect ? 'bg-success' : 'bg-danger'}">${h.isCorrect ? '+10 คะแนน' : '0 คะแนน'}</span>
                    </div>

                    <div class="small mb-1">
                      <span class="text-muted">ถังที่คุณเลือก:</span> 
                      <span class="${h.isCorrect ? 'text-success fw-bold' : 'text-danger fw-bold'}">${chosenBinName}</span>
                    </div>

                    ${
                      !h.isCorrect
                        ? `<div class="small text-success fw-bold mb-1">
                            <i class="fa-solid fa-arrow-right me-1"></i> ถังที่ถูกต้อง: ${correctBinName}
                          </div>`
                        : ''
                    }

                    <div class="small text-muted bg-white p-2 rounded border mt-1" style="font-size: 0.8rem;">
                      <i class="fa-solid fa-lightbulb text-warning me-1"></i> <strong>เกร็ดความรู้:</strong> ${h.item.explanation}
                    </div>
                  </div>
                </div>
              </div>
            `;
          })
          .join('');
      }
    }

    resultsModal.classList.add('active');
  }

  function closeResultsModal() {
    if (resultsModal) {
      resultsModal.classList.remove('active');
    }
  }

  // เรียกทำงานเมื่อโหลด DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGameElements);
  } else {
    initGameElements();
  }
})();
