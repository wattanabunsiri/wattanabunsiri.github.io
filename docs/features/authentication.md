# Authentication System

## Overview
ระบบยืนยันตัวตนผู้ใช้งานก่อนเข้าใช้ Checklist และ Calculator

## Files
- `js/auth.js` - Authentication logic
- `css/auth.css` - Authentication overlay styles

---

## 1.1 Organization Selection

### Description
Custom styled dropdown สำหรับเลือกหน่วยงาน

### Current Options
| Value | Display |
|-------|---------|
| NSTDA | NSTDA |
| NECTEC | NECTEC |
| BIOTEC | BIOTEC |
| MTEC | MTEC |
| NANOTEC | NANOTEC |
| ENTEC | ENTEC |
| Guest | Guest |

### Features
- ไม่ใช่ native browser select
- Styled ให้เข้ากับ Earth tone theme
- Animation เมื่อเปิด/ปิด dropdown
- Check icon แสดงตัวเลือกที่เลือก

### How to Add New Organization
1. Edit `checklist.html` and `calculator.html`
2. Add new `<div class="custom-option">` in auth overlay:
```html
<div class="custom-option" data-value="NEW_ORG">
    <svg class="check-icon">...</svg>
    <span>New Organization Name</span>
</div>
```
3. Google Apps Script automatically handles new organizations

---

## 1.2 Employee ID Validation

### Validation Rules
- ต้องกรอกอย่างน้อย 3 ตัวอักษร
- Guest ไม่ต้องกรอก (field จะซ่อน)

### Error Messages
| Condition | Message |
|-----------|---------|
| Empty or < 3 chars | กรุณากรอกรหัสพนักงานอย่างน้อย 3 ตัวอักษร |

### Code Reference
```javascript
// js/auth.js
function validateEmployeeId(id) {
    if (!id || id.trim().length < 3) {
        return { valid: false, message: 'กรุณากรอกรหัสพนักงานอย่างน้อย 3 ตัวอักษร' };
    }
    return { valid: true };
}
```

---

## 1.3 Session Management

### Storage Type
`sessionStorage` - หมดอายุเมื่อปิด browser tab

### Storage Keys
| Key | Description | Example Value |
|-----|-------------|---------------|
| `nectec_employee_id` | รหัสพนักงาน หรือ "Guest" | "12345" / "Guest" |
| `nectec_organization` | ชื่อหน่วยงาน | "NECTEC" / "Guest" |
| `nectec_checklist_completed` | สถานะ checklist | "true" |

### Public API
```javascript
window.authSystem = {
    isAuthenticated(),    // Check if logged in
    getEmployeeId(),      // Get stored employee ID
    getOrganization(),    // Get stored organization
    logout(),             // Clear session and reload
    handleAuthSubmit(e)   // Form submit handler
};
```

---

## 1.4 Login Flow

```
1. User opens checklist.html or calculator.html
2. auth.js checks sessionStorage
3. If not authenticated:
   - Show auth overlay
   - User selects organization
   - User enters employee ID (skip for Guest)
   - Click "เข้าสู่ระบบ"
   - Validate input
   - Store in sessionStorage
   - Redirect to index.html
4. If authenticated:
   - Hide auth overlay
   - Show user info bar
   - Check if checklist required (for calculator page)
```

---

## 1.5 Guest Mode

### Behavior
- เมื่อเลือก Guest จาก dropdown
- Employee ID field จะซ่อน
- ไม่ต้อง validate employee ID
- Employee ID ถูก set เป็น "Guest"

### Code Reference
```javascript
// js/auth.js - Show/hide employee ID field
if (value === 'Guest') {
    employeeIdGroup.style.display = 'none';
} else {
    employeeIdGroup.style.display = 'block';
}
```
