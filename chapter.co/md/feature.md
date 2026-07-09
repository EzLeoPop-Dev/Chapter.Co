# สเปกสำหรับสร้าง Front-end ระบบร้านหนังสือออนไลน์ (Thai Online Bookstore)

> ไฟล์นี้ใช้เป็น Prompt/สเปกให้ AI (เช่น Claude, ChatGPT, Cursor ฯลฯ) สร้างหน้า Front-end ทั้งระบบ
> ระบบมี 3 Role: **Customer**, **Staff**, **Administrator** (RBAC)

---

## 1. ภาพรวมโปรเจกต์

- **ประเภทระบบ**: เว็บไซต์ร้านหนังสือออนไลน์ (E-commerce) รองรับทั้งหนังสือเล่มและ E-book
- **ภาษา UI**: ภาษาไทยทั้งหมด
- **Responsive**: ต้องรองรับ Desktop, Tablet, Mobile
- **Design System ที่ต้องการ**:
  - โทนสีหลัก: น้ำเงินเข้ม (Dark Blue) เป็น Header/Navbar
  - ใช้ Gradient สีฟ้า-น้ำเงินในส่วนไฮไลต์ (Banner, Button หลัก, Section เด่น)
  - Layout แบบ Card-based สำหรับแสดงรายการหนังสือ, สรุปข้อมูล, Dashboard
  - Font อ่านง่าย รองรับภาษาไทย (แนะนำ Noto Sans Thai / Kanit / Sarabun)
  - มี Dark/Light mode ได้ (ไม่บังคับ)
- **Tech Stack แนะนำ** (ปรับได้ตามความถนัด):
  - Frontend: React หรือ Next.js + Tailwind CSS
  - State Management: React Context / Zustand (ถ้าจำเป็น)
  - Component Library: shadcn/ui หรือสร้างเอง
  - Chart: Recharts หรือ Chart.js (ใช้ในหน้า Dashboard/Report)

---

## 2. โครงสร้าง Role และ Layout หลัก

| Role | Layout หลัก | สีธีม |
|---|---|---|
| Customer | Navbar บน + Footer, เน้นการช้อปปิ้ง | ฟ้า-น้ำเงิน Gradient |
| Staff | Sidebar ซ้าย + Topbar, เน้นการทำงาน | น้ำเงินเข้ม Solid |
| Administrator | Sidebar ซ้าย + Topbar + Dashboard | น้ำเงินเข้ม + เทาเข้ม |

แต่ละ Role ควรมี Layout Component แยกกัน (`CustomerLayout`, `StaffLayout`, `AdminLayout`) และมีระบบตรวจสอบสิทธิ์ (Route Guard) ก่อนเข้าถึงหน้าต่างๆ

---

## 3. ฝั่ง Customer (ลูกค้า)

### 3.1 ระบบสมาชิก
- [ ] หน้าสมัครสมาชิก (Register)
- [ ] หน้าเข้าสู่ระบบ (Login)
- [ ] ออกจากระบบ (ปุ่ม/action ใน Navbar)
- [ ] หน้าลืมรหัสผ่าน (Forgot Password)
- [ ] หน้าแก้ไขข้อมูลส่วนตัว (Edit Profile)
- [ ] หน้าเปลี่ยนรหัสผ่าน (Change Password)
- [ ] หน้าจัดการที่อยู่จัดส่ง (Address Management) — เพิ่ม/แก้ไข/ลบ/ตั้งค่าเริ่มต้น

### 3.2 หน้าหลัก (Homepage)
- [ ] Section หนังสือแนะนำ (Recommended)
- [ ] Section หนังสือขายดี (Best Seller)
- [ ] Section หนังสือใหม่ (New Arrival)
- [ ] Section โปรโมชั่น
- [ ] Section หมวดหมู่หนังสือ (Category grid)
- [ ] Banner ประชาสัมพันธ์ (Carousel/Slider)

### 3.3 ระบบค้นหาหนังสือ (Search & Filter Page)
- [ ] ค้นหาด้วยชื่อหนังสือ / ผู้แต่ง / สำนักพิมพ์ / ISBN / Keyword
- [ ] ค้นหาตามหมวดหมู่
- [ ] Filter (ราคา, หมวดหมู่, ผู้แต่ง, สำนักพิมพ์, คะแนนรีวิว ฯลฯ)
- [ ] เรียงลำดับผลการค้นหา (ราคา, ความนิยม, ใหม่สุด)
- [ ] แสดงผลแบบ Grid/List พร้อม Pagination หรือ Infinite scroll

### 3.4 หน้ารายละเอียดหนังสือ (Book Detail Page)
- [ ] รูปปก, ชื่อหนังสือ, ผู้แต่ง, ราคา, จำนวนคงเหลือ
- [ ] รายละเอียดหนังสือ (Tab หรือ Section)
- [ ] รายละเอียดผู้แต่ง
- [ ] คะแนนเฉลี่ย + รีวิวจากผู้ใช้
- [ ] หนังสือที่เกี่ยวข้อง (Related books carousel)
- [ ] ปุ่ม: เพิ่มลงตะกร้า / เพิ่มลง Wishlist / ทดลองอ่าน

### 3.5 หน้าทดลองอ่าน (Preview Reader)
- [ ] แสดงหน้าตัวอย่างที่กำหนดไว้เท่านั้น
- [ ] แสดงจำนวนหน้าทั้งหมด / หน้าที่กำลังอ่าน
- [ ] ปุ่มเปลี่ยนหน้า, Zoom (ถ้าเป็นไปได้)

### 3.6 Wishlist
- [ ] หน้ารายการโปรด (แสดงเป็น Grid การ์ดหนังสือ)
- [ ] ปุ่มลบออกจาก Wishlist / เพิ่มลงตะกร้าจากหน้านี้

### 3.7 ตะกร้าสินค้า (Cart)
- [ ] รายการสินค้าในตะกร้า พร้อมรูป, ชื่อ, ราคา, จำนวน
- [ ] ปรับจำนวน / ลบสินค้า
- [ ] ช่องกรอกคูปองส่วนลด
- [ ] สรุปราคา (ราคาสินค้า + ค่าจัดส่ง + ส่วนลด = ยอดรวม)
- [ ] ปุ่มไปสู่ Checkout

### 3.8 สั่งซื้อสินค้า (Checkout)
- [ ] เลือก/เพิ่มที่อยู่จัดส่ง
- [ ] เลือกวิธีจัดส่ง
- [ ] ตรวจสอบรายการสินค้าอีกครั้ง (Order Summary)
- [ ] ปุ่มยืนยันคำสั่งซื้อ

### 3.9 ระบบชำระเงิน (Payment)
- [ ] หน้าชำระเงิน (Mockup: เลือกช่องทาง, แสดง QR/บัญชี)
- [ ] หน้าแนบหลักฐานการโอน (Upload slip)
- [ ] หน้าตรวจสอบสถานะการชำระเงิน / Payment Success

### 3.10 ติดตามคำสั่งซื้อ
- [ ] หน้าประวัติคำสั่งซื้อ (Order History) — list พร้อมสถานะ
- [ ] หน้ารายละเอียดคำสั่งซื้อ (Order Detail)
- [ ] หน้าติดตามสถานะ/เลข Tracking (Order Tracking) — แบบ Timeline/Stepper
- [ ] ปุ่มยกเลิกคำสั่งซื้อ (แสดงเฉพาะก่อนจัดส่ง)

### 3.11 ระบบ E-book
- [ ] หน้าคลังหนังสือของฉัน (My Library)
- [ ] หน้าอ่าน E-book ออนไลน์ (E-book Reader) — พร้อม "อ่านต่อจากหน้าล่าสุด"
- [ ] ปุ่มดาวน์โหลด / ดาวน์โหลดซ้ำ

### 3.12 ระบบรีวิว
- [ ] ฟอร์มให้คะแนน + แสดงความคิดเห็น (ในหน้า Book Detail)
- [ ] แก้ไข/ลบรีวิวของตัวเอง

### 3.13 บริการลูกค้า
- [ ] หน้า Contact Us / Support — ฟอร์มส่งข้อความหาแอดมิน, แจ้งปัญหา
- [ ] หน้ารายละเอียด Ticket (Ticket Detail) + ติดตามสถานะ
- [ ] หน้า Chat (Live chat widget หรือหน้าเต็ม)

---

## 4. ฝั่ง Staff

### 4.1 Dashboard
- [ ] Staff Dashboard — สรุปงานที่ต้องทำวันนี้ (คำสั่งซื้อใหม่, การชำระเงินรอตรวจสอบ, สต็อกใกล้หมด)

### 4.2 จัดการคำสั่งซื้อ
- [ ] Order List — ตาราง/การ์ดคำสั่งซื้อใหม่ พร้อม filter สถานะ
- [ ] Order Detail — ตรวจสอบรายการสินค้า, อัปเดตสถานะ, ยืนยันคำสั่งซื้อ

### 4.3 ตรวจสอบการชำระเงิน
- [ ] Payment Verification — แสดงสลิป, ปุ่มยืนยัน/ปฏิเสธการชำระเงิน

### 4.4 จัดส่งสินค้า
- [ ] Shipping — เพิ่มเลข Tracking, พิมพ์ใบจัดส่ง, เปลี่ยนสถานะเป็นจัดส่งแล้ว

### 4.5 จัดการสต็อก
- [ ] Stock Management — ตรวจสอบ/ปรับจำนวนสินค้า, แจ้งเตือนสินค้าใกล้หมด (badge/alert)

### 4.6 จัดการ E-book
- [ ] E-book Management — อัปโหลดไฟล์ E-book, อัปโหลดตัวอย่างอ่านฟรี, แก้ไขไฟล์

### 4.7 บริการลูกค้า
- [ ] Chat — ตอบแชทลูกค้า
- [ ] Ticket Management — ตอบคำร้องเรียน, ปิดเคส

---

## 5. ฝั่ง Administrator

### 5.1 Dashboard
- [ ] Admin Dashboard — ยอดขาย, จำนวนคำสั่งซื้อ, จำนวนสมาชิก, หนังสือขายดี, รายได้รายเดือน/รายปี, กราฟสรุปยอดขาย (ใช้ Chart)

### 5.2 จัดการผู้ใช้
- [ ] User Management — ตาราง user, เพิ่ม/แก้ไข/ลบผู้ใช้, กำหนดสิทธิ์ (Role)

### 5.3 จัดการหนังสือ
- [ ] Book List — ตารางหนังสือทั้งหมด พร้อมค้นหา/filter
- [ ] Add Book — ฟอร์มเพิ่มหนังสือ (รูปภาพ, รายละเอียด, ไฟล์ E-book, ไฟล์ Preview)
- [ ] Edit Book — ฟอร์มแก้ไข/ลบหนังสือ

### 5.4 จัดการหมวดหมู่
- [ ] Category Management — เพิ่ม/แก้ไข/ลบหมวดหมู่ (table + modal form)

### 5.5 ระบบโปรโมชั่น
- [ ] Promotion Management — สร้างโปรโมชั่น, ตั้งวันเริ่ม-สิ้นสุด
- [ ] Coupon Management — สร้างคูปอง, กำหนดเงื่อนไข

### 5.6 รายงาน
- [ ] Sales Report — กราฟ/ตารางยอดขาย
- [ ] Customer Report
- [ ] Stock Report
- [ ] Order Report

### 5.7 ระบบ Automation
- [ ] Automation Setting — เปิด/ปิดฟีเจอร์อัตโนมัติ เช่น สร้างเลขคำสั่งซื้ออัตโนมัติ, ยืนยันการชำระเงินอัตโนมัติ, ตัดสต็อกอัตโนมัติ, ส่งอีเมล/ใบเสร็จ/แจ้งเตือนอัตโนมัติ

### 5.8 System Setting
- [ ] หน้าตั้งค่าระบบทั่วไป

---

## 6. รายชื่อหน้าทั้งหมด (Page List สรุปสำหรับสร้างไฟล์/Route)

### Customer
```
/                          หน้าหลัก
/register                  สมัครสมาชิก
/login                     เข้าสู่ระบบ
/forgot-password           ลืมรหัสผ่าน
/profile                   Profile
/profile/edit              Edit Profile
/profile/change-password   Change Password
/profile/address           Address Management
/search                    ค้นหาหนังสือ
/books/:id                 Book Detail
/books/:id/preview         Preview Reader
/wishlist                  Wishlist
/cart                      Cart
/checkout                  Checkout
/payment                   Payment
/payment/upload-slip       Upload Payment Slip
/payment/success           Payment Success
/orders                    Order History
/orders/:id                Order Detail
/orders/:id/tracking       Order Tracking
/library                   My Library (E-book)
/library/read/:id          E-book Reader
/support                   Contact Us / Support
/support/ticket/:id        Ticket Detail
/support/chat              Chat
```

### Staff
```
/staff/dashboard                 Staff Dashboard
/staff/orders                    Order List
/staff/orders/:id                Order Detail
/staff/payments                  Payment Verification
/staff/shipping                  Shipping
/staff/stock                     Stock Management
/staff/ebooks                    E-book Management
/staff/chat                      Chat
/staff/tickets                   Ticket Management
```

### Administrator
```
/admin/dashboard          Admin Dashboard
/admin/users              User Management
/admin/books              Book List
/admin/books/add          Add Book
/admin/books/:id/edit     Edit Book
/admin/categories         Category Management
/admin/promotions         Promotion Management
/admin/coupons            Coupon Management
/admin/orders             Order Management
/admin/payments           Payment Management
/admin/stock              Stock Management
/admin/ebooks             E-book Management
/admin/reports/sales      Sales Report
/admin/reports/customers  Customer Report
/admin/reports/stock      Stock Report
/admin/reports/orders     Order Report
/admin/automation         Automation Setting
/admin/settings           System Setting
```

---

## 7. คำสั่ง (Prompt) แนะนำสำหรับให้ AI เริ่มสร้างงาน

```
อ่านสเปกในไฟล์นี้ทั้งหมด แล้วเริ่มสร้าง Front-end ตามลำดับนี้:
1. สร้างโครงสร้างโปรเจกต์ + Design System (สี, font, component พื้นฐาน: Button, Card, Input, Modal, Badge)
2. สร้าง Layout หลัก 3 แบบ: CustomerLayout, StaffLayout, AdminLayout
3. สร้างหน้าโซน Customer ก่อน เรียงตามลำดับความสำคัญ:
   หน้าหลัก -> ค้นหา/รายละเอียดหนังสือ -> ตะกร้า/checkout -> คำสั่งซื้อ -> สมาชิก
4. ต่อด้วยโซน Staff และ Administrator
5. ใช้ mock data ก่อน ยังไม่ต้องต่อ backend จริง
6. ทุกหน้าต้องเป็นภาษาไทย และ responsive
```

---

## หมายเหตุ
- ไฟล์นี้สรุปจากเอกสาร Feature List / Scope of Work ของโปรเจกต์ร้านหนังสือออนไลน์
- สามารถแนบไฟล์นี้เป็น context ให้ AI (Claude, ChatGPT, Cursor, v0 ฯลฯ) เพื่อ generate โค้ด UI ได้ทันที
- แนะนำให้สร้างทีละ Module/หน้า ไม่ควรสั่งสร้างทั้งหมดในครั้งเดียว เพื่อคุณภาพโค้ดที่ดีกว่า
