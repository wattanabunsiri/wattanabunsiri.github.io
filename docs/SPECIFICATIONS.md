# Technical Specifications

## 1. Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

---

## 2. CSS Architecture

### 2.1 File Structure
```
css/
├── style.css         # Base styles, layout, common components
├── auth.css          # Authentication overlay (shared)
├── calculator.css    # Calculator-specific styles
├── checklist.css     # Checklist-specific styles
├── dashboard.css     # Dashboard-specific styles
├── definitions.css   # Definitions page styles
└── contact.css       # Contact page styles
```

### 2.2 CSS Variables (Defined in style.css)
```css
:root {
    --primary-color: #5D4E37;      /* Dark brown */
    --secondary-color: #8B7355;    /* Medium brown */
    --accent-color: #A68B5B;       /* Light brown */
    --text-color: #3D3D3D;         /* Dark gray */
    --text-light: #6B6B6B;         /* Medium gray */
    --bg-color: #FAF8F5;           /* Off-white */
    --white: #FFFFFF;
    --cream: #F5F1EB;
    --border-color: #E0D6C8;
    --shadow: 0 1px 3px rgba(93, 78, 55, 0.08);
}
```

### 2.3 Naming Conventions
- BEM-like: `.block`, `.block-element`, `.block--modifier`
- Semantic names: `.filter-btn`, `.stat-card`, `.chart-wrapper`
- State classes: `.active`, `.disabled`, `.hidden`, `.show`

---

## 3. JavaScript Architecture

### 3.1 File Structure
```
js/
├── main.js           # Global utilities (mobile menu)
├── auth.js           # Authentication IIFE module
├── calculator.js     # Calculator functions (global)
├── checklist.js      # Checklist functions (global)
└── dashboard.js      # Dashboard IIFE module
```

### 3.2 Module Patterns

**IIFE Pattern (auth.js, dashboard.js):**
```javascript
(function() {
    // Private variables
    const PRIVATE_VAR = 'value';

    // Private functions
    function privateFunction() {}

    // Expose public API
    window.moduleName = {
        publicMethod: publicMethod
    };

    // Initialize
    document.addEventListener('DOMContentLoaded', init);
})();
```

**Global Functions (calculator.js, checklist.js):**
```javascript
// Used for onclick handlers in HTML
function calculateB() { ... }
function toggleSection(section) { ... }
```

### 3.3 Storage Keys
| Key | Type | Description |
|-----|------|-------------|
| `nectec_employee_id` | sessionStorage | Employee ID or "Guest" |
| `nectec_organization` | sessionStorage | Organization name |
| `nectec_checklist_completed` | sessionStorage | "true" when completed |
| `draft-[projectId]-*` | localStorage | Calculator draft data (JSON) |

---

## 4. Google Apps Script API

### 4.1 Base URL
```
https://script.google.com/macros/s/{DEPLOYMENT_ID}/exec
```

### 4.2 POST Request (Log Data)
```javascript
fetch(URL, {
    method: 'POST',
    mode: 'no-cors',  // Required for Google Apps Script
    body: JSON.stringify({
        type: 'checklist' | 'preimpact',
        organization: 'NECTEC',
        employeeId: '12345',
        // ... other fields
    })
});
```

### 4.3 GET Request (Dashboard Data)
```javascript
fetch(URL + '?action=dashboard')
    .then(response => response.json())
    .then(data => {
        // data.total - number
        // data.organizations - { [name]: count }
        // data.daily - { labels: [], data: { [org]: [] } }
        // data.monthly - { labels: [], data: { [org]: [] } }
        // data.yearly - { labels: [], data: { [org]: [] } }
    });
```

### 4.4 Response Format (Dashboard)
```json
{
    "total": 150,
    "organizations": {
        "NECTEC": 100,
        "Guest": 50
    },
    "daily": {
        "labels": ["10 Feb", "11 Feb", ...],
        "data": {
            "NECTEC": [5, 3, 8, ...],
            "Guest": [2, 1, 4, ...]
        }
    },
    "monthly": { ... },
    "yearly": { ... }
}
```

---

## 5. Calculator Formulas

### Section B - ลดการนำเข้า
```
B3 = B1 - B2  (มูลค่าที่ประหยัด)
B8 = B3 × B4% × B5 × B6 × B7%  (Pre-Impact)
```

### Section C - กำไร/รายได้เพิ่ม
```
C5 = (C3 - C4) - (C1 - C2)  (กำไรเพิ่ม)
C8 = C5 × C6 × C7%  (Pre-Impact)
```

### Section D - ประหยัดค่าใช้จ่าย
```
D3 = D1 - D2  (ต้นทุนที่ลดลง)
D6 = D3 × D4 × D5%  (Pre-Impact)
```

### Section E - ประสิทธิภาพเพิ่ม
```
E3 = E2 × 60  (นาทีต่อวัน)
E4 = E3 × 20  (นาทีต่อเดือน)
E5 = E1 / E4  (มูลค่าต่อนาที)
E8 = E6 - E7  (เวลาที่ลดลง)
E12 = E5 × E8 × E9 × E10 × E11%  (Pre-Impact)
```

### Section F - ลดความเสี่ยง
```
F6 = F1 × F2% × F3% × F4 × F5%  (Pre-Impact)
```

### Section G - ทักษะเพิ่ม
```
G5 = G1 × G2 × G3 × G4%  (Pre-Impact)
```

### Section H - ลงทุนวิจัยต่อยอด
```
H4 = H1 × H2 × H3%  (Pre-Investment)
```

### Section I - ลงทุนผลิต/บริการ
```
I4 = I1 × I2 × I3%  (Pre-Investment)
```

### Section J - จ้างงานเพิ่ม
```
J5 = J1 × J2% × J3 × J4%  (Pre-Investment)
```

### Section K - อื่นๆ
```
K4 = K1 × K2 × K3%  (Pre-Impact)
```

### Totals
```
Total Pre-Impact = Sum of B8, C8, D6, E12, F6, G5, K4
Total Pre-Investment = Sum of H4, I4, J5
```

---

## 6. Activity Weights (กิจกรรมส่งมอบหลัก)

| Value | Description |
|-------|-------------|
| 1.00 | ถ่ายทอดเทคโนโลยี |
| 0.80 | ร่วมวิจัยและพัฒนา |
| 0.60 | ทดสอบ/รับรองมาตรฐาน |
| 0.40 | ให้คำปรึกษา |
| 0.20 | ฝึกอบรม |
| other | อื่นๆ (user input) |

---

## 7. Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| > 768px | Desktop |
| <= 768px | Mobile/Tablet |

### Mobile Adaptations
- Hamburger menu instead of horizontal nav
- Single column layouts
- Smaller font sizes
- Touch-friendly button sizes (min 44px)
- Vertical stacking of elements
