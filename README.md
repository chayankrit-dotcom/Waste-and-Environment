# 🌿 EcoWise - เว็บให้ความรู้เกี่ยวกับขยะและสิ่งแวดล้อม

> เว็บไซต์ส่งเสริมการเรียนรู้การคัดแยกขยะในชีวิตประจำวัน การอนุรักษ์สิ่งแวดล้อม และมินิเกมแยกขยะลงถัง 60 วินาที ออกแบบด้วยคอนเซ็ปต์ **Modern Glassmorphism & Minimal Premium** ตามสัดส่วนสี 60-30-10

![EcoWise Preview](https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80)

---

## ✨ ฟีเจอร์เด่น (Key Features)

- 🎨 **Modern Glassmorphism UI:** ออกแบบสไตล์กระจกฝ้าโปร่งแสง สัดส่วนสี 60-30-10 (เขียวธรรมชาติ, น้ำตาลเบจ, ส้มอิฐ)
- 🎮 **มินิเกมแยกขยะ (PlayGame):** 
  - นับถอยหลัง 1 นาที (60 วินาที)
  - ระบบลากวาง (Drag & Drop) หรือแตะเลือกถังขยะ 4 สี (เขียว-เหลือง-น้ำเงิน-แดง)
  - ป๊อบอัพ Toast แจ้งผลทันทีเมื่อตอบถูก/ผิด
  - สรุปคะแนนรวม และวิเคราะห์ข้อที่ตอบผิดพร้อมเฉลยละเอียด
- 🕒 **สถิติขยะเรียลไทม์ (Live Ticking Counter):** คำนวณปริมาณขยะสะสมของปีและของวันนี้ตามวัน-เวลาจริงแบบวินาทีต่อวินาที
- 🎵 **ระบบเสียง Ambient BGM & SFX:**
  - เพลงบรรเลงป่าไม้ธรรมชาติ (`soundreality-fluorescent-forest-ambient`) คลอเบาๆ
  - เสียงคลิกปุ่มสมจริง (`soundreality-mouse-click`)
  - ปุ่มเปิด/ปิดเสียงบน Navbar ทุกหน้า พร้อมจดจำสถานะผ่าน `localStorage`
- 🌓 **Dark / Light Mode:** สลับโหมดกลางวันและกลางคืนได้ทุกหน้า
- 📱 **Responsive Design:** รองรับทั้งคอมพิวเตอร์ แท็บเล็ต และสมาร์ทโฟน 100%
- 🧭 **Unified Navbar & Footer:** จัดการแถบเมนูและท้ายกระดาษผ่าน Component กลาง แก้ไขจุดเดียวเปลี่ยนทุกหน้า

---

## 📂 โครงสร้างโฟลเดอร์ (Directory Structure)

```text
├── index.html               # หน้าแรก (Home) + Real-time Live Stats
├── game.html                # หน้ามินิเกมแยกขยะ (PlayGame)
├── daily-waste.html         # หน้าขยะในชีวิตประจำวัน (ตารางย่อยสลาย, หลัก 7R)
├── environment.html         # หน้ารักษาสิ่งแวดล้อม (มลพิษ, Circular Economy, Checklist)
├── assets/
│   ├── css/
│   │   └── style.css        # CSS หลัก Glassmorphism, Theme, Animation
│   ├── js/
│   │   ├── navbar-footer.js # Navigation Bar และ Footer ส่วนกลาง
│   │   ├── main.js          # Dark mode, Real-time Counter, Scroll Reveal
│   │   ├── game.js          # ระบบเกมแยกขยะ, ตัวจับเวลา, Drag & Drop, เฉลย
│   │   └── audio-manager.js # จัดการ BGM และ SFX ทุกหน้า
│   ├── Sounds/              # ไฟล์เสียงประกอบ BGM และ SFX
│   └── images/              # รูปภาพประกอบ
```

---

## 🚀 การติดตั้งและเปิดใช้งาน (Getting Started)

1. **เปิดผ่านเบราว์เซอร์โดยตรง:** ดับเบิลคลิกเปิดไฟล์ `index.html` บน Browser (Chrome, Edge, Safari, Firefox)
2. **เปิดผ่าน Local Server (XAMPP):**
   - วางโฟลเดอร์โปรเจกต์ไว้ที่ `C:\xampp\htdocs\Word\`
   - เปิด Apache ในโปรแกรม XAMPP Control Panel
   - เข้าเว็บผ่าน: `http://localhost/Word/index.html`

---

## 👨‍💻 ผู้พัฒนา
- **Designed by:** Chayan Boochapan
- **Copyright:** © 2026 เว็บให้ความรู้เกี่ยวกับขยะและสิ่งแวดล้อม
