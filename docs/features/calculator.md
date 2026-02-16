# Pre-Impact Calculator

## Overview
เครื่องมือคำนวณ Pre-Impact และ Pre-Investment ของผลงานวิจัย

## Files
- `calculator.html` - Calculator page
- `js/calculator.js` - Calculator logic
- `css/calculator.css` - Calculator styles

---

## 3.1 Project Information

### Fields
| Field ID | Label | Required |
|----------|-------|----------|
| projectId | รหัสโครงการ | No |
| projectName | ชื่อโครงการ | No |
| researcherName | ชื่อนักวิจัย | No |

---

## 3.2 Section Overview

### Impact Sections (รวมใน Total Pre-Impact)
| Section | Title | Result Field |
|---------|-------|--------------|
| B | ลดการนำเข้าจากต่างประเทศ | b8 |
| C | กำไร/รายได้เพิ่มขึ้น | c8 |
| D | ประหยัดค่าใช้จ่าย/ลดต้นทุน | d6 |
| E | ประสิทธิภาพในการทำงานเพิ่ม | e12 |
| F | ลดความเสี่ยง/ป้องกันความเสียหาย | f6 |
| G | ทักษะเพิ่มจากการฝึกอบรม | g5 |
| K | อื่นๆ | k4 |

### Investment Sections (รวมใน Total Pre-Investment)
| Section | Title | Result Field |
|---------|-------|--------------|
| H | ลงทุนวิจัยต่อยอด | h4 |
| I | ลงทุนในกระบวนการผลิต/บริการ | i4 |
| J | จ้างงานเพิ่ม | j5 |

---

## 3.3 Exclusive Logic

### Rule
เมื่อเลือก Section B จะ **disable** Section C, D, E, F, G

### Reason
Section B (ลดการนำเข้า) เป็นการประเมินแบบ standalone ไม่ควรรวมกับ sections อื่น

### Code Reference
```javascript
// js/calculator.js
function toggleExclusive(section) {
    if (section === 'B' && sectionB.checked) {
        // Disable C, D, E, F, G
        sectionsToDisable.forEach(s => {
            checkbox.checked = false;
            checkbox.disabled = true;
        });
    }
}
```

---

## 3.4 Calculation Formulas

### Section B - ลดการนำเข้า
```
B3 = B1 - B2                    (มูลค่าที่ประหยัด)
B8 = B3 × B4% × B5 × B6 × B7%   (Pre-Impact)
```

| Field | Description | Unit |
|-------|-------------|------|
| B1 | มูลค่าสินค้า/บริการจากต่างประเทศ | บาท |
| B2 | มูลค่าสินค้า/บริการของเนคเทค | บาท |
| B3 | มูลค่าที่ประหยัดได้ (auto) | บาท |
| B4 | สัดส่วนเปรียบเทียบคุณสมบัติ | % |
| B5 | จำนวนสินค้าที่ทดแทน | ชิ้น |
| B6 | กิจกรรมส่งมอบหลัก | multiplier |
| B7 | Contribution | % |
| B8 | มูลค่า Pre-Impact (auto) | บาท |

### Section C - กำไร/รายได้เพิ่ม
```
C5 = (C3 - C4) - (C1 - C2)      (กำไรเพิ่ม)
C8 = C5 × C6 × C7%              (Pre-Impact)
```

### Section D - ประหยัดค่าใช้จ่าย
```
D3 = D1 - D2                    (ต้นทุนที่ลดลง)
D6 = D3 × D4 × D5%              (Pre-Impact)
```

### Section E - ประสิทธิภาพเพิ่ม
```
E3 = E2 × 60                    (นาทีต่อวัน)
E4 = E3 × 20                    (นาทีต่อเดือน)
E5 = E1 / E4                    (มูลค่าต่อนาที)
E8 = E6 - E7                    (เวลาที่ลดลง)
E12 = E5 × E8 × E9 × E10 × E11% (Pre-Impact)
```

### Section F - ลดความเสี่ยง
```
F6 = F1 × F2% × F3% × F4 × F5%  (Pre-Impact)
```

### Section G - ทักษะเพิ่ม
```
G5 = G1 × G2 × G3 × G4%         (Pre-Impact)
```

### Section H - ลงทุนวิจัยต่อยอด
```
H4 = H1 × H2 × H3%              (Pre-Investment)
```

### Section I - ลงทุนผลิต/บริการ
```
I4 = I1 × I2 × I3%              (Pre-Investment)
```

### Section J - จ้างงานเพิ่ม
```
J5 = J1 × J2% × J3 × J4%        (Pre-Investment)
```

### Section K - อื่นๆ
```
K4 = K1 × K2 × K3%              (Pre-Impact)
```

### Totals
```
Total Pre-Impact = B8 + C8 + D6 + E12 + F6 + G5 + K4
Total Pre-Investment = H4 + I4 + J5
```

---

## 3.5 Activity Weights (กิจกรรมส่งมอบหลัก)

| Value | Description |
|-------|-------------|
| 1.00 | ถ่ายทอดเทคโนโลยี |
| 0.80 | ร่วมวิจัยและพัฒนา |
| 0.60 | ทดสอบ/รับรองมาตรฐาน |
| 0.40 | ให้คำปรึกษา |
| 0.20 | ฝึกอบรม |
| other | อื่นๆ (ต้องระบุ) |

---

## 3.6 Report Generation

### Trigger
กดปุ่ม "สรุปผล"

### Report Contents
1. วันที่ออกรายงาน
2. ข้อมูลโครงการ
3. แนวทางการรายงาน (รายปี/5ปี)
4. รายละเอียดแต่ละ section ที่เลือก
5. สรุปผล Pre-Impact และ Pre-Investment

### Features
- Modal popup
- Print button
- Close button
- Click outside to close

---

## 3.7 Data Logging

### Trigger
เมื่อกดปุ่ม "สรุปผล" (พร้อมกับแสดง report)

### Data Sent to Google Sheets
```javascript
{
    type: 'preimpact',
    organization: 'NECTEC',
    employeeId: '12345',
    projectId: 'PRJ001',
    projectName: 'ชื่อโครงการ',
    reportType: 'รายปี',
    sectionB: '100000',
    sectionC: '',
    sectionD: '50000',
    // ... other sections
    totalImpact: '150000',
    totalInvestment: '80000'
}
```

---

## 3.8 Save/Load Draft

### Overview
ผู้ใช้สามารถบันทึกแบบร่างของฟอร์มไว้ใน localStorage และโหลดกลับมาทำต่อได้ภายหลัง

### Storage
- **Key format:** `draft-[projectId]-YYYYMMdd-HHmmss`
- **Storage:** localStorage

### Draft Data Structure
```json
{
    "projectId": "P-12-12345",
    "projectName": "ชื่อโครงการ",
    "reportType": "yearly",
    "sections": { "B": true, "C": false, ... },
    "fields": { "b1": "1000", "b6": 2, ... },
    "savedAt": "2026-02-16T10:30:00.000Z"
}
```

### Functions
| Function | Description |
|----------|-------------|
| `saveDraft()` | บันทึกข้อมูลฟอร์มปัจจุบันเป็นแบบร่าง |
| `showDraftList()` | แสดง modal รายการแบบร่างทั้งหมด |
| `loadDraft(key)` | โหลดแบบร่างเข้าฟอร์ม พร้อมคำนวณใหม่ |
| `deleteDraft(key)` | ลบแบบร่าง |
| `removeDraftsForProject(projectId)` | ลบแบบร่างทั้งหมดของโครงการเมื่อออกรายงาน |
| `closeDraftModal()` | ปิด modal แบบร่าง |

### Behavior
1. **Save:** ต้องกรอกรหัสโครงการก่อน → สร้าง key จาก projectId + timestamp → เก็บใน localStorage
2. **Load:** แสดงรายการเรียงจากใหม่สุด → กดโหลด → populate ฟอร์ม → re-run calculations
3. **Delete on Submit:** เมื่อกด "ออกรายงาน" จะลบ drafts ทั้งหมดที่มี projectId ตรงกัน

---

## 3.9 Access Control

### Requirement
ต้องทำ Checklist ให้เสร็จก่อนเข้าหน้า Calculator

### Check
```javascript
// js/auth.js
function requiresChecklist() {
    return window.location.pathname.includes('calculator');
}

if (requiresChecklist() && !isChecklistCompleted()) {
    // Show "checklist required" overlay
}
```

### Overlay
แสดงข้อความ "กรุณาทำ Checklist ก่อน" พร้อมปุ่มไปหน้า Checklist
