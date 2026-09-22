# Seminar EdTech Event System 2569

ระบบต้นแบบสำหรับโครงการ **ออกแบบสื่อและนวัตกรรมเทคโนโลยีเพื่อการสอนสุขศึกษาและพลศึกษา**

## User flow
Registration → Pre-test → Activity → Post-test → Satisfaction survey → Human approval → E-Certificate → Verification

## Current status
**Prototype / non-production.** รุ่นปัจจุบันเก็บข้อมูลใน LocalStorage ของเบราว์เซอร์ เพื่อทดสอบ UX โดยไม่เก็บข้อมูลผู้เข้าร่วมจริง

## ก่อนใช้งานจริง
1. อาจารย์ตรวจรับคลังข้อสอบจริง — 5 ข้อในต้นแบบเป็นเพียง draft เพราะเอกสารโครงการไม่ได้กำหนดข้อสอบไว้
2. ยืนยันเกณฑ์รับ E-Certificate เช่น attendance threshold และกิจกรรมบังคับ
3. ยืนยันผู้มีอำนาจลงนาม
4. เชื่อม backend เช่น Supabase พร้อม RLS และ admin authentication
5. สร้าง certificate PDF และเลขที่ใบประกาศฝั่ง server
6. ทำ verification endpoint/QR ที่เปิดเผยเฉพาะข้อมูลขั้นต่ำ
7. เพิ่ม privacy notice, retention period, export/backup และ deletion process
8. ทดสอบ iPhone/Android และเครือข่ายช้า
9. pilot ด้วย synthetic data ก่อนข้อมูลจริง
10. production release ต้องผ่าน human gate

## โมดูลที่แนะนำ
Participant portal • Check-in/attendance • Pre/Post • Satisfaction • Admin dashboard • Eligibility engine • Certificate queue • PDF generator • Public verification • Export • Audit log

## Governance
Evidence-first • Minimum data • Human approval • Reversible release • No secrets in repository
