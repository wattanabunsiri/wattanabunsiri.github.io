# Checklist System

## Overview
Checklist ที่ต้องทำก่อนเข้าใช้งาน Pre-Impact Calculator

## Files
- `checklist.html` - Checklist page
- `js/checklist.js` - Checklist logic
- `css/checklist.css` - Checklist styles

---

## 2.1 Section A - หลักเกณฑ์เบื้องต้น

### Items
| ID | Label | Action |
|----|-------|--------|
| A1 | รายงานเป็นรายปี | - |
| A2 | รวมรายงาน 5 ปี หรือ 60 เดือน | แสดงลิงก์ไปหน้า definitions |

### Validation
- ต้องเลือก **อย่างน้อย 1 ข้อ** (A1 หรือ A2)

### Code Reference
```javascript
// js/checklist.js
const sectionAComplete = (a1 && a1.checked) || (a2 && a2.checked);
```

---

## 2.2 Section B - ลักษณะของผลงาน/บริการ

### Items
| ID | Label | When Checked |
|----|-------|--------------|
| B1 | ผลงานวิจัย/นวัตกรรม/สิ่งประดิษฐ์ใหม่ | แสดง info box |
| B2 | การให้บริการที่ปรึกษา | แสดง info box |
| B3 | การถ่ายทอดเทคโนโลยี/อบรม | แสดง info box |
| B4 | ซอฟต์แวร์/แพลตฟอร์ม/ระบบ | แสดง info box |
| B5 | อื่นๆ | แสดง text input |

### Validation
- ต้องเลือก **อย่างน้อย 1 ข้อ**

### Code Reference
```javascript
// js/checklist.js
const sectionBComplete = (b1 && b1.checked) || (b2 && b2.checked) ||
                         (b3 && b3.checked) || (b4 && b4.checked) ||
                         (b5 && b5.checked);
```

---

## 2.3 Progress Indicator

### Display
- Progress bar แสดง % ความสำเร็จ
- Text แสดง "x/2 หมวด"

### Logic
```javascript
// js/checklist.js
function updateProgress(sectionAComplete, sectionBComplete) {
    let completed = 0;
    if (sectionAComplete) completed++;
    if (sectionBComplete) completed++;
    const percentage = (completed / 2) * 100;
    // Update UI
}
```

---

## 2.4 Button States

### Incomplete State
- Class: `disabled`
- Click: แสดง alert บอกว่าต้องทำอะไรเพิ่ม

### Complete State
- Class: ไม่มี `disabled`
- Click: บันทึกข้อมูล → ไปหน้า calculator

---

## 2.5 Data Logging

### Trigger
เมื่อกดปุ่ม "ไปยังแบบประเมิน Pre-Impact"

### Data Sent to Google Sheets
```javascript
{
    type: 'checklist',
    organization: 'NECTEC',
    employeeId: '12345',
    a1: true,
    a2: false,
    b1: true,
    b2: false,
    b3: false,
    b4: false,
    b5: false
}
```

### Google Sheet Columns
| Column | Description |
|--------|-------------|
| Timestamp | Auto-generated |
| Organization | หน่วยงาน |
| EmployeeId | รหัสพนักงาน |
| A1 | TRUE/FALSE |
| A2 | TRUE/FALSE |
| B1-B5 | TRUE/FALSE |

---

## 2.6 Flow Diagram

```
┌─────────────────────────────────────┐
│         checklist.html              │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │
│  │ Section A (at least 1)      │   │
│  │ ☐ A1  ☐ A2                  │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Section B (at least 1)      │   │
│  │ ☐ B1  ☐ B2  ☐ B3           │   │
│  │ ☐ B4  ☐ B5                  │   │
│  └─────────────────────────────┘   │
│                                     │
│  Progress: [████████░░] 1/2 หมวด   │
│                                     │
│  [ไปยังแบบประเมิน Pre-Impact]      │
│         ↓                           │
│  1. Validate completion             │
│  2. Send to Google Sheets           │
│  3. Set sessionStorage flag         │
│  4. Navigate to calculator.html     │
└─────────────────────────────────────┘
```
