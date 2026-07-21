# 📚 Chapter.Co - ร้านจำหน่ายหนังสือออนไลน์ (Online Bookstore Platform)

![Project Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Frontend-Next.js-black?logo=next.js)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Figma](https://img.shields.io/badge/Design-Figma-F24E1E?logo=figma)

แพลตฟอร์มร้านหนังสือออนไลน์ยุคใหม่ที่รวบรวมทั้ง **หนังสือรูปเล่ม (Physical Book)** และ **อีบุ๊ก (E-book)** เข้าไว้ด้วยกัน มุ่งเน้นการยกระดับประสบการณ์ผู้ใช้งานด้วยการออกแบบที่เรียบง่าย สบายตา และฟีเจอร์ทดลองอ่านที่ตอบโจทย์

---
# รายชื่อสมาชิก

| ลำดับ | ชื่อ-นามสกุล | รหัสนักศึกษา |
|:---:|---|---|
| 1 | นายศุภณัฐ ชวนิช  | 67155077 |
| 2 | นายอภิรักษ์ ภูมิเพ็ง  | 67164038 |
| 3 | นายณัฐพล โพธิรัตน์  | 67158185 |
| 4 | นายธีรเดช เเน่นอุดร  | 67171993   |
| 5 | นายนีรวิทธิ์ ตะกระจ่าง  | 67165280  |

---
## 📑 สารบัญ (Table of Contents)

1. [หลักการและเหตุผล](#-หลักการและเหตุผล-rationale)
2. [วัตถุประสงค์ของโครงงาน](#-วัตถุประสงค์ของโครงงาน-objectives)
3. [เครื่องมือและเทคโนโลยีที่ใช้](#️-เครื่องมือและเทคโนโลยีที่ใช้-tools--technologies)
4. [ขอบเขตของระบบ](#-ขอบเขตของระบบ-system-scope)
5. [ผู้ใช้งานและความสามารถของระบบ](#ผู้ใช้งานและความสามารถของระบบ-actors--main-functions)
6. [User Personas](#-user-personas)
7. [แผนการดำเนินงาน (Work Plan)](#-แผนการดำเนินงาน-work-plan)
8. [แนวทางการพัฒนาระบบตาม SDLC](#แนวทางการพัฒนาระบบตาม-sdlc-system-development-life-cycle)
9. [ผลลัพธ์ที่คาดว่าจะได้รับ](#-ผลลัพธ์ที่คาดว่าจะได้รับ-expected-outcomes)

---

## 📝 หลักการและเหตุผล (Rationale)

ในปัจจุบัน ร้านหนังสือแบบดั้งเดิมได้รับความนิยมน้อยลงและเข้าถึงได้ยากขึ้น ในขณะที่แพลตฟอร์มออนไลน์เติบโตอย่างรวดเร็วและเข้าถึงผู้คนได้ง่ายกว่า อย่างไรก็ตาม แพลตฟอร์มออนไลน์หลายแห่งในปัจจุบันยังประสบปัญหาที่ทำให้ผู้ใช้งานไม่ได้รับประสบการณ์ที่ดี เช่น:

* ระบบค้นหาหนังสือที่ซับซ้อนและไม่ตรงความต้องการ
* หน้าจอผู้ใช้งาน (UX/UI) ที่ใช้งานยาก ไม่สบายตา
* **ข้อจำกัดสำคัญคือ ไม่มีระบบให้ทดลองอ่านตัวอย่าง (Reading Sample)** ก่อนตัดสินใจซื้อ

คณะผู้จัดทำจึงได้พัฒนา **Chapter.Co** ขึ้นเพื่อแก้ปัญหาดังกล่าว โดยมุ่งเน้นการออกแบบ UX/UI สไตล์ **Minimalist** ที่สะอาดตา มีระบบค้นหาอัจฉริยะ และฟีเจอร์อ่านตัวอย่าง E-book ก่อนซื้อ เพื่อเพิ่มความมั่นใจและสร้างประสบการณ์ที่ดีที่สุดในการเลือกซื้อหนังสือ

---

## 🎯 วัตถุประสงค์ของโครงงาน (Objectives)

1. เพื่อพัฒนาระบบร้านหนังสือออนไลน์ที่รองรับการขายทั้งหนังสือแบบจัดส่ง (Physical Book) และหนังสืออิเล็กทรอนิกส์ (E-book)
2. เพื่อออกแบบและพัฒนาส่วนติดต่อผู้ใช้งาน (UX/UI) ให้มีความทันสมัย ใช้งานง่าย ค้นหาหนังสือได้สะดวกรวดเร็ว และสบายตา
3. เพื่อสร้างฟีเจอร์ **"ทดลองอ่านตัวอย่าง" (Preview/Sample)** ช่วยประกอบการตัดสินใจซื้อของผู้ใช้งาน
4. เพื่อขยายโอกาสให้ผู้ใช้งานสามารถเข้าถึงหนังสือที่ต้องการได้มากขึ้นและสะดวกยิ่งขึ้น

---

## 🛠️ เครื่องมือและเทคโนโลยีที่ใช้ (Tools & Technologies)

* **Frontend:** `Next.js` (React Framework สำหรับการพัฒนาเว็บแอปพลิเคชันที่รวดเร็วและรองรับ SEO)
* **Backend:** `Node.js` (สภาพแวดล้อมสำหรับจัดการระบบหลังบ้านและการประมวลผลข้อมูล)
* **Database:** `Local Storage` (ใช้สำหรับจำลองและจัดเก็บข้อมูลฝั่ง Client)
* **Design Tool:** `Figma` (ใช้สำหรับออกแบบ Wireframe และ High-Fidelity UX/UI Mockup)
* **Version Control:** `Git` & `GitHub` (ระบบควบคุมเวอร์ชันและจัดเก็บซอร์สโค้ด)

---

## 📐 ขอบเขตของระบบ (System Scope)

ระบบจะประกอบด้วยฟังก์ชันหลัก ดังนี้

1. ระบบจัดการสมาชิก (Register / Login)
2. ระบบจัดการข้อมูลหนังสือและหมวดหมู่
3. ระบบค้นหาและแสดงรายละเอียดหนังสือ
4. ระบบตะกร้าสินค้า (Shopping Cart)
5. ระบบสั่งซื้อสินค้า (Order Management)
6. ระบบชำระเงิน (Mockup Payment)
7. ระบบจัดส่งและติดตามสถานะคำสั่งซื้อ
8. ระบบ E-book และคลังหนังสือส่วนตัว
9. ระบบรีวิวและให้คะแนนหนังสือ
10. ระบบบริการลูกค้าและการแจ้งปัญหา
11. ระบบจัดการสินค้าและคลังสินค้า
12. ระบบโปรโมชั่นและคูปองส่วนลด
13. Dashboard และรายงานสรุป

---

## ผู้ใช้งานและความสามารถของระบบ (Actors & Main Functions)

### 1. Customer (ลูกค้า)

- สมัครสมาชิก / เข้าสู่ระบบ / ออกจากระบบ
- จัดการข้อมูลส่วนตัวและที่อยู่จัดส่ง
- ค้นหาและดูรายละเอียดหนังสือ
- ทดลองอ่านตัวอย่างหนังสือ
- เพิ่ม แก้ไข และลบสินค้าในตะกร้า
- เพิ่มหนังสือลง Wishlist
- สั่งซื้อสินค้า
- ชำระเงิน
- ติดตามสถานะและประวัติคำสั่งซื้อ
- อ่านและดาวน์โหลด E-book
- รีวิวและให้คะแนนหนังสือ
- แจ้งปัญหาและติดต่อฝ่ายบริการลูกค้า

### 2. Staff (พนักงาน)

- เข้าสู่ระบบ / ออกจากระบบ
- ตรวจสอบรายการคำสั่งซื้อ
- ตรวจสอบและยืนยันการชำระเงิน (กรณีระบบไม่สามารถยืนยันอัตโนมัติได้)
- อัปเดตสถานะคำสั่งซื้อ
- เพิ่มเลข Tracking และพิมพ์ใบจัดส่ง
- ตรวจสอบข้อมูลสินค้าและจำนวนคงเหลือในคลัง
- อัปโหลด E-book
- ตอบแชทและจัดการคำร้องของลูกค้า

### 3. Administrator (ผู้ดูแลระบบ)

- เข้าสู่ระบบ / ออกจากระบบ
- จัดการข้อมูลสินค้าและหมวดหมู่
- จัดการคำสั่งซื้อทั้งหมด
- จัดการบัญชี Staff และกำหนดสิทธิ์
- จัดการโปรโมชั่น คูปอง และแบนเนอร์
- ดู Dashboard และรายงานสรุป

---

## 👤 User Personas

เพื่อให้การออกแบบระบบตอบโจทย์ผู้ใช้งานแต่ละกลุ่มอย่างแท้จริง คณะผู้จัดทำได้กำหนด Persona ตัวแทนของผู้ใช้งานแต่ละบทบาท (Actor) บทบาทละ 1 คน ดังนี้

### 🧑‍💻 Persona 1: Customer (ลูกค้า)

**Profile**
| หัวข้อ | รายละเอียด |
|---|---|
| ชื่อ | ปาณิสรา ใจดี (แนน) |
| อายุ | 26 ปี |
| อาชีพ | พนักงานบริษัทเอกชน (ฝ่ายการตลาด) |
| อุปกรณ์ที่ใช้ | สมาร์ตโฟน และโน้ตบุ๊กส่วนตัว |

**Bio**
แนนเป็นคนที่ชอบอ่านหนังสือเป็นชีวิตจิตใจ โดยเฉพาะนิยายและหนังสือพัฒนาตนเอง เธอมักซื้อหนังสือช่วงเวลาว่างระหว่างเดินทางไปทำงานด้วยรถไฟฟ้า และชอบลองอ่านตัวอย่างก่อนตัดสินใจซื้อเสมอ เพราะเคยผิดหวังกับหนังสือที่ซื้อโดยไม่ได้อ่านตัวอย่างมาก่อน

**Goals**
- ค้นหาหนังสือที่ตรงกับความสนใจได้อย่างรวดเร็ว
- ทดลองอ่านตัวอย่างก่อนตัดสินใจซื้อ เพื่อลดความเสี่ยงในการซื้อหนังสือที่ไม่ถูกใจ
- สั่งซื้อและชำระเงินได้สะดวกทั้งบนมือถือและคอมพิวเตอร์
- ติดตามสถานะการจัดส่งได้แบบเรียลไทม์

**Pain Points**
- แพลตฟอร์มร้านหนังสือออนไลน์หลายแห่งไม่มีระบบทดลองอ่านตัวอย่าง
- ระบบค้นหาหนังสือของหลายเว็บไซต์ไม่แม่นยำ ต้องเสียเวลาค้นหานาน
- หน้าจอใช้งานซับซ้อน ไม่เป็นมิตรกับผู้ใช้งานมือใหม่

**Scenario**
วันหนึ่งระหว่างเดินทางกลับบ้าน แนนเปิดแอป Chapter.Co เพื่อค้นหานิยายเล่มใหม่ที่เพื่อนแนะนำ เธอพิมพ์ชื่อเรื่องในช่องค้นหาและพบหนังสือทันที จากนั้นกดปุ่ม "ทดลองอ่าน" เพื่ออ่านตัวอย่างบทแรกก่อนตัดสินใจ เมื่อถูกใจ เธอจึงเลือกซื้อในรูปแบบ E-book เพื่อให้สามารถอ่านต่อได้ทันทีโดยไม่ต้องรอการจัดส่ง

---

### 📦 Persona 2: Staff (พนักงาน)

**Profile**
| หัวข้อ | รายละเอียด |
|---|---|
| ชื่อ | กันตพงศ์ รุ่งเรือง (บอส) |
| อายุ | 24 ปี |
| อาชีพ | พนักงานฝ่ายคลังสินค้าและจัดส่ง |
| อุปกรณ์ที่ใช้ | คอมพิวเตอร์ตั้งโต๊ะที่หน้างานคลังสินค้า |

**Bio**
บอสทำงานในฝ่ายคลังสินค้ามานานกว่า 2 ปี รับผิดชอบตั้งแต่การตรวจสอบรายการคำสั่งซื้อ การแพ็กสินค้า ไปจนถึงการบันทึกสถานะการจัดส่งลงระบบ ด้วยปริมาณคำสั่งซื้อที่มีจำนวนมากในแต่ละวัน เขาจึงต้องการระบบหลังบ้านที่ใช้งานง่าย ไม่ซับซ้อน แสดงข้อมูลชัดเจน และช่วยให้การบันทึกข้อมูลทำงานได้อย่างถูกต้องแม่นยำ

**Goals**
- ตรวจสอบและอัปเดตสถานะคำสั่งซื้อได้อย่างรวดเร็วและถูกต้อง
- เช็กสต็อกสินค้าได้อย่างแม่นยำเพื่อป้องกันสินค้าขาดหรือเกิน
- พิมพ์ใบจัดส่งและเพิ่มเลข Tracking ได้ในขั้นตอนเดียว

**Pain Points**
- ระบบเดิมมีขั้นตอนการกรอกข้อมูลซ้ำซ้อน ทำให้ใช้เวลาจัดการต่อออเดอร์นานและเสี่ยงต่อการคีย์ข้อมูลผิด
- ข้อมูลสต็อกสินค้าในคลังไม่ตรงกับข้อมูลในระบบ ทำให้เกิดปัญหาแพ็กสินค้าผิดหรือไม่มีสินค้าจัดส่ง
- ค้นหารายการคำสั่งซื้อที่ค้างส่งได้ยาก ทำให้เสี่ยงต่อการส่งสินค้าล่าช้าหรือตกหล่น

**Scenario**
ทุกเช้าบอสจะเข้าสู่ระบบหลังบ้านของ Chapter.Co เพื่อเช็กรายการคำสั่งซื้อใหม่ที่เข้ามา เมื่อตรวจสอบรายการสินค้าและจัดแพ็กเรียบร้อยแล้ว บอสจะทำการพิมพ์ใบจัดส่ง กรอกเลข Tracking บันทึกลงในระบบ และกดเปลี่ยนสถานะคำสั่งซื้อเป็น "จัดส่งแล้ว" เพื่อให้กระบวนการทำงานในแต่ละวันเสร็จสิ้นอย่างเรียบร้อย

---

### 🛠️ Persona 3: Administrator (ผู้ดูแลระบบ)

**Profile**
| หัวข้อ | รายละเอียด |
|---|---|
| ชื่อ | ชลธิชา ศรีสุข (มิ้นต์) |
| อายุ | 32 ปี |
| อาชีพ | ผู้จัดการร้านและผู้ดูแลระบบ Chapter.Co |
| อุปกรณ์ที่ใช้ | คอมพิวเตอร์ตั้งโต๊ะและโน้ตบุ๊ก |

**Bio**
มิ้นต์รับผิดชอบการบริหารจัดการภาพรวมของร้านค้าออนไลน์ ทั้งด้านสินค้า โปรโมชั่น บัญชีพนักงาน และการวิเคราะห์ยอดขาย เธอต้องการเครื่องมือที่ช่วยให้มองเห็นภาพรวมธุรกิจได้ง่าย เพื่อใช้ประกอบการตัดสินใจเชิงกลยุทธ์ได้อย่างรวดเร็ว

**Goals**
- ดูภาพรวมยอดขายและผลประกอบการผ่าน Dashboard ได้แบบเรียลไทม์
- จัดการข้อมูลสินค้า หมวดหมู่ และโปรโมชั่นได้อย่างมีประสิทธิภาพ
- กำหนดสิทธิ์การใช้งานของพนักงานแต่ละคนได้อย่างเหมาะสม

**Pain Points**
- ระบบเดิมไม่มี Dashboard สำหรับวิเคราะห์ยอดขาย ต้องรวบรวมข้อมูลด้วยมือ
- การจัดการโปรโมชั่นและคูปองในระบบเดิมทำได้ยากและใช้เวลานาน
- ไม่สามารถตรวจสอบสิทธิ์การเข้าถึงของพนักงานแต่ละคนได้อย่างละเอียด

**Scenario**
ทุกสิ้นสัปดาห์ มิ้นต์เข้าสู่ระบบ Admin Panel ของ Chapter.Co เพื่อดู Dashboard สรุปยอดขาย จำนวนคำสั่งซื้อ และหนังสือขายดีประจำสัปดาห์ เธอพบว่าสต็อกหนังสือบางเล่มใกล้หมด จึงเข้าไปอัปเดตข้อมูลสินค้าและเปิดโปรโมชั่นส่วนลดพิเศษเพื่อกระตุ้นยอดขายเล่มอื่น พร้อมทั้งตรวจสอบรายงานผลการทำงานของระบบ เพื่อยืนยันว่าการยืนยันการชำระเงินและการแจ้งเตือนลูกค้าทำงานได้ปกติตลอดสัปดาห์ที่ผ่านมา

---

## 🗓️ แผนการดำเนินงาน (Work Plan)

แผนการดำเนินงานของโครงการ Chapter.Co จัดทำขึ้นตามหลักการ **SDLC (System Development Life Cycle)** โดยแบ่งการดำเนินงานออกเป็น 4 ระยะหลัก ดังนี้

| ระยะ (Phase) | กิจกรรมหลัก | ระยะเวลา (โดยประมาณ) | ผลลัพธ์ที่ได้ (Deliverables) |
|---|---|---|---|
| **1. Planning & Analysis**<br>(การวางแผนและวิเคราะห์) | ศึกษาปัญหา, วิเคราะห์คู่แข่ง, เก็บข้อมูลผู้ใช้งาน, กำหนดขอบเขตโครงการ, วิเคราะห์ Functional/Non-functional Requirements, จัดทำแบบจำลองระบบ | สัปดาห์ที่ 1 - 3 | เอกสาร Project Scope, System Requirement Specification (SRS), Use Case/Activity/ER Diagram |
| **2. System Design**<br>(การออกแบบระบบ) | ออกแบบสถาปัตยกรรมระบบ, ออกแบบฐานข้อมูล, ออกแบบ UX/UI ด้วย Figma, จัดทำ Prototype | สัปดาห์ที่ 4 - 6 | Wireframe, High-Fidelity Mockup, Database Schema, Interactive Prototype |
| **3. Development**<br>(การพัฒนาระบบ) | พัฒนา Frontend, Backend, Database, และ API ตามที่ออกแบบไว้ พร้อมบริหารจัดการเวอร์ชันด้วย Git/GitHub | สัปดาห์ที่ 7 - 12 | ระบบเวอร์ชันพัฒนา (Development Build) ที่พร้อมทดสอบ |
| **4. Testing & Deployment**<br>(การทดสอบและติดตั้งระบบ) | ทดสอบระบบด้วย User Acceptance Testing (UAT) แบบ Manual Testing, แก้ไขข้อผิดพลาด, ติดตั้งระบบบนสภาพแวดล้อมจำลอง, ทดสอบหลังติดตั้ง | สัปดาห์ที่ 13 - 15 | ระบบที่ผ่านการทดสอบ UAT และพร้อมใช้งานจริง |

> **หมายเหตุ:** ระยะเวลาข้างต้นเป็นการประมาณการเบื้องต้น อาจมีการปรับเปลี่ยนตามความเหมาะสมของทรัพยากรและความซับซ้อนของงานจริง

---

# แนวทางการพัฒนาระบบตาม SDLC (System Development Life Cycle)

การพัฒนาเว็บไซต์ร้านหนังสือออนไลน์ที่รองรับทั้งหนังสือแบบจัดส่งและ E-Book พร้อมระบบที่ช่วยแก้ไขปัญหาของร้านหนังสือทั้ง Online และ On-site ดำเนินการตามกระบวนการ **System Development Life Cycle (SDLC)** ซึ่งเป็นแนวทางมาตรฐานในการพัฒนาระบบสารสนเทศ เพื่อให้ระบบมีความถูกต้อง มีคุณภาพ และสามารถตอบสนองต่อความต้องการของผู้ใช้งานได้อย่างมีประสิทธิภาพ

---

## 1. Planning (การวางแผน)

### วัตถุประสงค์

ขั้นตอนการวางแผนเป็นจุดเริ่มต้นของการพัฒนาระบบ โดยมีเป้าหมายเพื่อศึกษาปัญหาของระบบเดิม วิเคราะห์ความเป็นไปได้ของโครงการ และกำหนดขอบเขตการดำเนินงานให้ชัดเจน เพื่อให้การพัฒนาเป็นไปในทิศทางเดียวกันและสามารถบริหารทรัพยากรได้อย่างมีประสิทธิภาพ

### กิจกรรมที่ดำเนินการ

**1.1 ศึกษาปัญหา (Problem Identification)**

ศึกษาปัญหาที่เกิดขึ้นกับเว็บไซต์ร้านหนังสือออนไลน์ในปัจจุบัน ทั้งในประเทศไทยและต่างประเทศ เช่น

- ระบบค้นหาหนังสือทำงานได้ไม่แม่นยำ
- เว็บไซต์ใช้งานยาก มีขั้นตอนการสั่งซื้อซับซ้อน
- ไม่มีระบบทดลองอ่านหนังสือ
- การจัดการสต็อกระหว่างหน้าร้านและออนไลน์ไม่เชื่อมต่อกัน
- ระบบแนะนำหนังสือยังไม่ตอบโจทย์ผู้ใช้งาน
- ไม่มี Dashboard สำหรับวิเคราะห์ยอดขาย

**1.2 ศึกษาข้อมูลที่เกี่ยวข้อง**

ศึกษาข้อมูลจาก

- งานวิจัย
- บทความวิชาการ
- เว็บไซต์ร้านหนังสือชั้นนำ
- ระบบ E-Commerce ที่ประสบความสำเร็จ

เพื่อใช้เป็นแนวทางในการออกแบบระบบ

**1.3 วิเคราะห์คู่แข่ง (Competitor Analysis)**

ศึกษาฟังก์ชันของเว็บไซต์ร้านหนังสือต่าง ๆ เช่น

- ระบบค้นหา
- ระบบสมาชิก
- ระบบรีวิว
- ระบบโปรโมชั่น
- ระบบแนะนำสินค้า

เพื่อหาจุดเด่นและข้อจำกัดของแต่ละระบบ

**1.4 เก็บรวบรวมข้อมูลจากผู้ใช้งาน**

ดำเนินการเก็บข้อมูลจากกลุ่มเป้าหมายผ่าน

- แบบสอบถามออนไลน์ (Questionnaire)
- การสัมภาษณ์ (Interview)
- การสังเกตการใช้งาน (Observation)

โดยข้อมูลที่รวบรวม เช่น

- ปัญหาที่พบระหว่างใช้งาน
- ความต้องการของผู้ใช้
- ฟีเจอร์ที่ต้องการเพิ่มเติม
- ความพึงพอใจต่อระบบเดิม

**1.5 กำหนดขอบเขตโครงการ (Project Scope)**

กำหนดขอบเขตของระบบ เช่น

- ระบบซื้อหนังสือแบบจัดส่ง
- ระบบซื้อ E-Book
- ระบบทดลองอ่าน
- ระบบสมาชิก
- ระบบชำระเงิน
- ระบบจัดการคลังสินค้า
- ระบบบริหารร้านค้า
- Dashboard รายงานยอดขาย

**1.6 วางแผนโครงการ**

กำหนด

- ระยะเวลาการดำเนินงาน
- บุคลากร
- เครื่องมือที่ใช้
- งบประมาณ
- ความเสี่ยงของโครงการ

---

## 2. Analysis (การวิเคราะห์)

### วัตถุประสงค์

นำข้อมูลทั้งหมดที่รวบรวมได้มาวิเคราะห์ เพื่อกำหนดความต้องการของระบบ (System Requirements) และหาแนวทางแก้ไขปัญหาที่เหมาะสม

### วิเคราะห์ปัญหาระบบเดิม

วิเคราะห์ข้อจำกัดของระบบ เช่น

- UX/UI ไม่เป็นมิตรกับผู้ใช้
- ระบบค้นหาช้า
- ไม่มีระบบทดลองอ่าน
- ระบบจัดการสต็อกไม่มีประสิทธิภาพ
- ไม่มีระบบสะสมแต้ม
- ไม่มีระบบแจ้งเตือน
- ไม่มีระบบวิเคราะห์ยอดขาย

### วิเคราะห์ความต้องการของผู้ใช้งาน

**Functional Requirements**

- สมัครสมาชิก
- เข้าสู่ระบบ
- ค้นหาหนังสือ
- ซื้อหนังสือ
- ดาวน์โหลด E-Book
- ทดลองอ่าน
- รีวิวหนังสือ
- ระบบโปรโมชั่น
- ระบบแจ้งเตือน
- ระบบจัดการคำสั่งซื้อ
- ระบบจัดการสต็อก
- Dashboard

**Non-functional Requirements**

- รองรับผู้ใช้งานจำนวนมาก
- โหลดหน้าเว็บรวดเร็ว
- รองรับมือถือ
- มีความปลอดภัย
- รองรับ SEO
- สำรองข้อมูล
- มีความพร้อมใช้งานสูง

### จัดทำแบบจำลองระบบ

สร้างเอกสารประกอบการวิเคราะห์ เช่น

- Use Case Diagram
- Sequence Diagram
- Class Diagram

ผลลัพธ์ของขั้นตอนนี้คือเอกสาร **System Requirement Specification (SRS)**

---

## 3. Design (การออกแบบ)

### วัตถุประสงค์

ออกแบบระบบให้ตรงกับความต้องการที่ได้จากการวิเคราะห์ ทั้งด้านโครงสร้างระบบ ฐานข้อมูล และส่วนติดต่อผู้ใช้งาน

### ออกแบบสถาปัตยกรรมระบบ

แบ่งระบบออกเป็น

- Frontend
- Backend
- Database
- API Layer

เพื่อให้แต่ละส่วนสามารถทำงานร่วมกันได้

### ออกแบบฐานข้อมูล

ออกแบบฐานข้อมูลด้วยหลัก Database Normalization

ตัวอย่างตาราง

- Users
- Books
- Categories
- Orders
- Order Details
- Payments
- Reviews
- Inventory
- Promotions
- Coupons
- EBooks

กำหนด

- Primary Key
- Foreign Key
- Relationship

### ออกแบบ User Interface (UI)

ใช้ **Figma** ในการออกแบบหน้าจอ เช่น

- Home
- Search
- Book Detail
- Cart
- Checkout
- Profile
- Dashboard
- Admin Panel

โดยเน้น

- Modern Design
- Minimal Design
- Responsive Design
- User Friendly

### ออกแบบ User Experience (UX)

ออกแบบขั้นตอนการใช้งานให้สะดวกที่สุด เช่น

- ค้นหาหนังสือ
- ทดลองอ่าน
- เพิ่มลงตะกร้า
- ชำระเงิน
- ดาวน์โหลด E-Book

### สร้าง Prototype

สร้าง Interactive Prototype เพื่อให้ผู้ใช้งานทดลองก่อนเริ่มพัฒนาจริง

---

## 4. Development (การพัฒนา)

### วัตถุประสงค์

พัฒนาระบบจริงตามแบบที่ออกแบบไว้

### Frontend Development

พัฒนา

- หน้าเว็บไซต์
- ระบบ Responsive
- ระบบค้นหา
- ระบบตะกร้าสินค้า
- ระบบทดลองอ่าน
- Dashboard

### Backend Development

พัฒนา

- ระบบ Login
- Authentication
- Authorization
- CRUD
- ระบบคำสั่งซื้อ
- ระบบชำระเงิน
- ระบบสต็อก
- ระบบรายงาน

### Database Development

ดำเนินการ

- สร้างฐานข้อมูล
- สร้าง Table
- Constraint
- Trigger
- Stored Procedure (ถ้ามี)

### API Development

สร้าง REST API สำหรับเชื่อมต่อ

- Frontend
- Mobile Application (ในอนาคต)
- Payment Gateway
- Email Service
- Notification

### Version Control

ใช้ Git และ GitHub

- Branch
- Merge
- Pull Request
- Version Management

---

## 5. Testing (การทดสอบ)

### วัตถุประสงค์

ตรวจสอบว่าระบบสามารถทำงานได้ถูกต้องและตรงตามความต้องการของผู้ใช้งานจริง โดยโครงการนี้เลือกใช้แนวทางการทดสอบเพียงรูปแบบเดียว คือ **User Acceptance Testing (UAT)** ในลักษณะ **Manual Testing** เพื่อให้มั่นใจว่าระบบตอบโจทย์การใช้งานจริงของผู้ใช้แต่ละกลุ่ม (Customer, Staff, Administrator)

### แนวทางการทดสอบ (Testing Approach)

- **ประเภทการทดสอบ:** User Acceptance Testing (UAT) เพียงอย่างเดียว
- **รูปแบบการทดสอบ:** Manual Testing โดยผู้ทดสอบดำเนินการทดสอบด้วยตนเองตาม Test Case ที่กำหนดไว้ล่วงหน้า ไม่ใช้เครื่องมือทดสอบอัตโนมัติ (Automated Testing Tools)
- **ผู้ทดสอบ:** กลุ่มผู้ใช้งานจริงตามบทบาท ได้แก่ Customer, Staff และ Administrator

### ขั้นตอนการทดสอบ (UAT Process)

1. จัดทำ Test Case / Test Scenario ตามฟังก์ชันหลักของระบบ
2. ให้ผู้ใช้งานจริงทดลองใช้งานระบบตาม Scenario ที่กำหนด
3. เก็บรวบรวม Feedback และปัญหาที่พบระหว่างการทดสอบ
4. วิเคราะห์และจัดลำดับความสำคัญของปัญหาที่พบ (Bug/Issue Priority)
5. แก้ไขข้อผิดพลาดและปรับปรุงระบบ
6. ทดสอบซ้ำ (Retest) จนกว่าระบบจะผ่านเกณฑ์ที่กำหนด

### ขอบเขตการทดสอบ (Scope of Testing)

- ระบบสมัครสมาชิก / เข้าสู่ระบบ
- ระบบค้นหาและแสดงรายละเอียดหนังสือ
- ระบบตะกร้าสินค้าและการสั่งซื้อ
- ระบบชำระเงิน (Mockup Payment)
- ระบบทดลองอ่านตัวอย่าง E-book
- ระบบจัดการคำสั่งซื้อ (ฝั่ง Staff/Administrator)
- ระบบ Dashboard และรายงานสรุป

---

## 6. Deployment (การติดตั้งระบบ)

### วัตถุประสงค์

นำระบบที่ผ่านการทดสอบ UAT ไปติดตั้งบนสภาพแวดล้อมจำลองก่อนใช้งานจริง

### ขั้นตอนการติดตั้ง

- Deploy ระบบ
- ตั้งค่า Server
- ตั้งค่า Domain
- ตั้งค่า Database
- ตั้งค่า SSL
- Backup ข้อมูล
- ตรวจสอบ Environment

### ทดสอบหลังติดตั้ง

ตรวจสอบ

- Login
- ชำระเงิน
- ดาวน์โหลด E-Book
- การแสดงผลทุกหน้า
- Responsive Design

เมื่อระบบทำงานถูกต้อง จึงพร้อมสำหรับการนำไปใช้งานจริง

---

## 7. Maintenance (การบำรุงรักษา)

### วัตถุประสงค์

ดูแลและปรับปรุงระบบอย่างต่อเนื่องหลังจากนำระบบไปใช้งาน

### Corrective Maintenance

- แก้ไข Bug
- แก้ไขข้อผิดพลาด
- แก้ไขปัญหาที่ผู้ใช้งานแจ้ง

### Adaptive Maintenance

- รองรับ Browser ใหม่
- รองรับอุปกรณ์ใหม่
- รองรับเทคโนโลยีใหม่

### Perfective Maintenance

ปรับปรุง

- UX/UI
- ระบบค้นหา
- Dashboard
- ระบบแนะนำหนังสือ
- ฟีเจอร์ใหม่

### Preventive Maintenance

ดำเนินการ

- Backup ข้อมูล
- ตรวจสอบ Server
- อัปเดตระบบ
- ตรวจสอบความปลอดภัย
- ป้องกันปัญหาที่อาจเกิดขึ้นในอนาคต

### การรับข้อเสนอแนะ

หลังการนำเสนอและทดลองใช้งาน จะรวบรวมความคิดเห็นจากผู้ใช้งาน เพื่อนำมาปรับปรุงและพัฒนาระบบในเวอร์ชันถัดไป เพื่อเพิ่มประสิทธิภาพ รองรับจำนวนผู้ใช้งานที่เพิ่มขึ้น และตอบสนองต่อความต้องการของธุรกิจร้านหนังสือในอนาคต

---

## 🚀 ผลลัพธ์ที่คาดว่าจะได้รับ (Expected Outcomes)

1. ได้แพลตฟอร์มร้านหนังสือออนไลน์ **Chapter.Co** ที่สามารถจัดจำหน่ายได้ทั้งหนังสือเล่มและ E-book ซึ่งสามารถใช้งานได้จริง
2. ผู้ใช้งานได้รับประสบการณ์การใช้งาน (User Experience) ที่ดียิ่งขึ้น ผ่านหน้าจอที่ออกแบบมาให้ค้นหาง่ายและสบายตา
3. ฟีเจอร์ทดลองอ่านช่วยสร้างความมั่นใจให้ผู้ซื้อก่อนการตัดสินใจ ซึ่งช่วยเพิ่มโอกาสและยอดขายให้กับแพลตฟอร์ม
4. มีระบบบริหารจัดการข้อมูลสินค้าและสต็อกหลังบ้านที่มีประสิทธิภาพสำหรับผู้ดูแลระบบ


# Diagram

## Use Case Diagram

```mermaid
flowchart LR
    %% จัดกลุ่ม Actors ให้อยู่ด้านซ้ายในระนาบเดียวกัน
    Cust["👤 ลูกค้า (Customer)"]
    Staff["👤 พนักงาน (Staff)"]
    Admin["👤 ผู้ดูแลระบบ (Admin)"]
    
    %% ความสัมพันธ์สืบทอดสิทธิ์ (Admin ทำหน้าที่แทน Staff ได้)
    Admin -. "<<inherits>>" .-> Staff
    
    subgraph "Chapter.Co System"
        
        %% แยก Use Case เพื่อจัดการสิทธิ์ตามที่คุณต้องการ
        UC_Register(["สมัครสมาชิก"])
        UC_Login(["เข้าสู่ระบบ"])
        
        %% Customer Use Cases
        UC_Profile(["จัดการข้อมูลส่วนตัวและที่อยู่"])
        UC_Search(["ค้นหาและดูรายละเอียดหนังสือ"])
        UC_Preview(["ทดลองอ่านตัวอย่าง E-book"])
        UC_Cart(["จัดการตะกร้าสินค้าและ Wishlist"])
        UC_Order(["สั่งซื้อสินค้า"])
        UC_Pay(["ชำระเงิน"])
        UC_Track(["ติดตามสถานะคำสั่งซื้อ"])
        UC_Read(["อ่าน / ดาวน์โหลด E-book"])
        UC_Review(["รีวิวและให้คะแนนหนังสือ"])
        UC_Support(["ติดต่อฝ่ายบริการลูกค้า"])
        
        %% Staff Use Cases
        UC_Staff_Order(["จัดการคำสั่งซื้อและการจัดส่ง"])
        UC_Staff_Pay(["ตรวจสอบการชำระเงิน (Manual)"])
        UC_Staff_Inv(["จัดการคลังสินค้าและอัปโหลด E-book"])
        UC_Staff_Support(["ให้บริการลูกค้า (ตอบแชท/ปัญหา)"])
        
        %% Admin Use Cases
        UC_Admin_Prod(["จัดการข้อมูลสินค้าและหมวดหมู่"])
        UC_Admin_Users(["จัดการพนักงานและสิทธิ์ใช้งาน"])
        UC_Admin_Promo(["จัดการโปรโมชั่นและแบนเนอร์"])
        UC_Admin_Report(["ดูแดชบอร์ดและรายงานยอดขาย"])
    end

    %% เส้นความสัมพันธ์ของ Customer (ทำได้ทั้งคู่)
    Cust --- UC_Register
    Cust --- UC_Login
    
    Cust --- UC_Profile
    Cust --- UC_Search
    UC_Preview -. "<<'extend'>>" .-> UC_Search
    Cust --- UC_Cart
    Cust --- UC_Order
    UC_Order -. "<<'include'>>" .-> UC_Pay
    Cust --- UC_Track
    Cust --- UC_Read
    Cust --- UC_Review
    Cust --- UC_Support

    %% เส้นความสัมพันธ์ของ Staff (ล็อกอินได้อย่างเดียว ไม่ต้องสมัคร)
    Staff --- UC_Login
    
    Staff --- UC_Staff_Order
    Staff --- UC_Staff_Pay
    Staff --- UC_Staff_Inv
    Staff --- UC_Staff_Support

    %% เส้นความสัมพันธ์ของ Admin
    Admin --- UC_Admin_Prod
    Admin --- UC_Admin_Users
    Admin --- UC_Admin_Promo
    Admin --- UC_Admin_Report
```

## Sequence Diagram

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "actorTextColor": "#1a1a2e",
    "actorBkg": "#e0e7ff",
    "actorBorder": "#4338ca",
    "signalTextColor": "#1a1a2e",
    "signalColor": "#374151",
    "noteTextColor": "#1a1a2e",
    "noteBkgColor": "#fef3c7",
    "noteBorderColor": "#d97706",
    "labelTextColor": "#1a1a2e",
    "loopTextColor": "#1a1a2e",
    "activationBorderColor": "#4338ca",
    "sequenceNumberColor": "#1a1a2e"
  }
}}%%
sequenceDiagram
    actor Customer
    participant UI as Web Application
    participant Auth as Authentication Service
    participant Book as Book Service
    participant Cart as Cart Service
    participant Order as Order Service
    participant Payment as Payment Service
    participant Inventory as Inventory Service
    participant Shipping as Shipping Service
    participant Notify as Notification Service
    participant EBook as EBook Service
    participant Database as Database

    rect rgb(199, 210, 254)
    note over Customer,Database: Login
    Customer->>UI: Open Login Page
    UI->>Auth: login(email,password)
    Auth->>Database: Check user credentials
    Database-->>Auth: User Found
    Auth-->>UI: Login Success
    UI-->>Customer: Show Home Page
    end

    rect rgb(187, 247, 208)
    note over Customer,Database: Search Book
    Customer->>UI: Search for a book
    UI->>Book: search(keyword)
    Book->>Database: Query Books
    Database-->>Book: Book List
    Book-->>UI: Show book list
    end

    rect rgb(216, 180, 254)
    note over Customer,Database: View Detail
    Customer->>UI: Select a book
    UI->>Book: getBookDetail(bookId)
    Book->>Database: Query Detail
    Database-->>Book: Book Detail
    Book-->>UI: Show details
    end

    rect rgb(254, 202, 154)
    note over Customer,Database: Preview Sample
    Customer->>UI: Preview book
    UI->>Book: getPreview()
    Book->>Database: Read Sample
    Database-->>Book: Sample File
    Book-->>UI: Display Sample
    end

    rect rgb(165, 243, 252)
    note over Customer,Database: Add Cart
    Customer->>UI: Add to cart
    UI->>Cart: addItem(book)
    Cart->>Database: Save Cart
    Database-->>Cart: Success
    Cart-->>UI: Cart Updated
    end

    rect rgb(216, 180, 254)
    note over Customer,Database: Checkout
    Customer->>UI: Checkout
    UI->>Order: createOrder()
    Order->>Database: Save Order
    Database-->>Order: Order ID
    end

    rect rgb(249, 168, 212)
    note over Customer,Database: Payment
    Order->>Payment: Request Payment
    Payment-->>Customer: Show payment options
    Customer->>Payment: Confirm payment
    Payment-->>Order: Payment Success
    end

    rect rgb(187, 247, 208)
    note over Customer,Database: Automation
    Order->>Database: Update Status = Paid
    Order->>Inventory: Reduce Stock
    Inventory->>Database: Update Inventory
    Database-->>Inventory: Success

    alt Physical Book
        Order->>Shipping: Generate Tracking
        Shipping->>Database: Save Tracking
        Database-->>Shipping: Success
        Shipping-->>Order: Tracking Number
        Order->>Notify: Send Email / LINE
        Notify-->>Customer: Notify tracking number
    else E-Book
        Order->>EBook: Grant Access
        EBook->>Database: Update Library
        Database-->>EBook: Success
        EBook-->>Customer: Download / Read E-Book
    end
    end

    rect rgb(254, 205, 211)
    note over Customer,Database: Complete
    Order->>Database: Save Completed Order
    Database-->>Order: Success
    Order-->>UI: Order Complete
    UI-->>Customer: Show order success
    end
```

## Class Diagram

```mermaid
classDiagram
    %% ============ Users ============
    class User {
        +int userId
        +String username
        +String password
        +String email
        +register()
        +login()
        +logout()
    }

    class Customer {
        +String address
        +String phone
        +manageProfile()
        +searchBooks()
        +readSample()
        +addToWishlist()
        +downloadEBook()
        +contactSupport()
    }

    class Staff {
        +String department
        +verifyPayment()
        +updateOrderStatus()
        +updateInventory()
        +printShippingLabel()
        +uploadEBook()
        +manageCustomerRequests()
        +monitorAutomation()
    }

    class Administrator {
        +manageBooks()
        +manageCategories()
        +manageAllOrders()
        +managePromotions()
        +manageCoupons()
        +manageBanners()
        +manageStaff()
        +configureAutomation()
        +monitorAutomation()
        +viewDashboard()
    }

    User <|-- Customer
    User <|-- Staff
    User <|-- Administrator

    %% ============ Books ============
    class Book {
        +int bookId
        +String title
        +String author
        +String isbn
        +float price
        +String description
        +String previewContent
        +getDetails()
        +getSample()
    }

    class PhysicalBook {
        +float weight
    }

    class EBook {
        +String fileUrl
        +String format
        +float fileSize
        +downloadFile()
    }

    Book <|-- PhysicalBook
    Book <|-- EBook

    class Category {
        +int categoryId
        +String name
        +String description
        +getBooks()
    }

    %% ============ Search ============
    class SearchService {
        +searchByKeyword(keyword)
        +searchByCategory(categoryId)
        +filterByPrice(min, max)
        +getRecommendations()
    }

    Customer ..> SearchService : uses
    SearchService ..> Book : queries

    %% ============ Inventory ============
    class Inventory {
        +int inventoryId
        +int quantityOnHand
        +int reorderLevel
        +String warehouseLocation
        +checkStock()
        +adjustStock()
    }

    PhysicalBook "1" --> "1" Inventory : trackedBy
    Staff "1" --> "0..*" Inventory : checksAndUpdates

    %% ============ Cart / Wishlist / EBook Library ============
    class Wishlist {
        +int wishlistId
        +addBook()
        +removeBook()
    }

    class Cart {
        +int cartId
        +float totalAmount
        +clearCart()
    }

    class CartItem {
        +int cartItemId
        +int quantity
        +updateQuantity()
    }

    class EBookLibrary {
        +int libraryId
        +addToLibrary()
        +getOwnedBooks()
    }

    Customer "1" --> "1" Cart : owns
    Cart "1" *-- "0..*" CartItem : contains
    CartItem "0..*" --> "1" Book : refersTo

    Customer "1" --> "1" Wishlist : owns
    Wishlist "1" o-- "0..*" Book : includes

    Customer "1" --> "1" EBookLibrary : owns
    EBookLibrary "1" o-- "0..*" EBook : contains

    %% ============ Order / Payment / Shipping ============
    class Order {
        +int orderId
        +Date orderDate
        +float totalAmount
        +String status
        +calculateTotal()
        +updateStatus()
    }

    class OrderDetail {
        +int orderDetailId
        +int quantity
        +float unitPrice
        +getSubtotal()
    }

    class Payment {
        +int paymentId
        +Date paymentDate
        +float amount
        +String method
        +String status
        +processPayment()
    }

    class Shipping {
        +int shippingId
        +String trackingNumber
        +String carrier
        +Date shippedDate
        +String status
        +generateTracking()
        +updateShippingStatus()
    }

    Customer "1" --> "0..*" Order : places
    Order "1" *-- "1..*" OrderDetail : contains
    OrderDetail "0..*" --> "1" Book : refersTo
    Order "1" --> "1" Payment : has
    Order "1" --> "0..1" Shipping : generates
    Staff "1" --> "0..*" Order : processes
    Staff "1" --> "0..*" Shipping : manages
    Administrator "1" --> "0..*" Order : manages

    %% ============ Review ============
    class Review {
        +int reviewId
        +int rating
        +String comment
        +Date reviewDate
        +submitReview()
    }

    Customer "1" --> "0..*" Review : writes
    Book "1" --> "0..*" Review : receives
    Category "0..*" --> "0..*" Book : categorizes

    %% ============ Promotion / Coupon ============
    class Promotion {
        +int promotionId
        +String name
        +String description
        +float discountValue
        +Date startDate
        +Date endDate
        +boolean isActive
        +applyPromotion()
    }

    class Coupon {
        +int couponId
        +String code
        +float discountValue
        +Date validUntil
        +int usageLimit
        +boolean isActive
        +applyDiscount()
    }

    Order "0..*" --> "0..1" Coupon : uses
    Promotion "0..*" --> "0..*" Book : promotes

    %% ============ Support ============
    class SupportTicket {
        +int ticketId
        +String issueType
        +String message
        +String status
        +createTicket()
        +resolveTicket()
    }

    Customer "1" --> "0..*" SupportTicket : creates
    Staff "1" --> "0..*" SupportTicket : handles

    %% ============ Automation / Notification ============
    class AutomationLog {
        +int logId
        +String taskType
        +Date executedAt
        +String status
        +String details
        +executeTask()
        +logResult()
    }

    class Notification {
        +int notificationId
        +String channel
        +String message
        +Date sentDate
        +String status
        +sendNotification()
    }

    Order "1" --> "0..*" AutomationLog : triggers
    Staff "1" --> "0..*" AutomationLog : monitors
    Administrator "1" --> "0..*" AutomationLog : configures
    AutomationLog "1" --> "0..*" Notification : generates
    Customer "1" --> "0..*" Notification : receives
```
