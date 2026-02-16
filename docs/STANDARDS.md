# Coding Standards & Conventions

## 1. General Principles

- Keep it simple - ไม่ over-engineer
- Consistency - ใช้ pattern เดียวกันทั้งโปรเจค
- Mobile-first - ออกแบบสำหรับ mobile ก่อน
- Accessibility - ใส่ aria-labels, semantic HTML

---

## 2. HTML Standards

### 2.1 Document Structure
```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - IMPACT & INVESTMENT EVALUATION</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/page-specific.css">
</head>
<body>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
    <script src="js/main.js"></script>
    <script src="js/page-specific.js"></script>
</body>
</html>
```

### 2.2 Header Template
```html
<header>
    <div class="header-container">
        <div class="logo">
            <a href="index.html">IMPACT & INVESTMENT EVALUATION</a>
        </div>
        <button class="menu-toggle" aria-label="เปิดเมนู">☰</button>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="calculator.html">Self Assessment</a></li>
                <li><a href="manual.html">Contact</a></li>
            </ul>
        </nav>
    </div>
</header>
```

### 2.3 Footer Template
```html
<footer>
    <div class="footer-content">
        <p>© DEVELOPED BY THANAPAT WATTANABUNSIRI (BEDROCK ANALYTICS.AI)</p>
        <p>© CONCEPT & REQUIREMENTS BY NAPAT WATTANABUNSIRI (NECTEC)</p>
    </div>
</footer>
```

### 2.4 Authentication Overlay
- ใส่ใน pages ที่ต้อง login (calculator.html, checklist.html)
- ต้อง include auth.css และ auth.js

---

## 3. CSS Standards

### 3.1 Use CSS Variables
```css
/* Good */
color: var(--primary-color);
background: var(--bg-color);

/* Bad */
color: #5D4E37;
background: #FAF8F5;
```

### 3.2 File Organization
```css
/* ===== Section Name ===== */

/* Component styles */
.component {
    /* Layout */
    display: flex;
    position: relative;

    /* Sizing */
    width: 100%;
    padding: 1rem;

    /* Visual */
    background: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 12px;

    /* Typography */
    font-size: 0.9rem;
    color: var(--text-color);

    /* Animation */
    transition: all 0.2s ease;
}

/* States */
.component:hover { }
.component.active { }
.component.disabled { }

/* Responsive */
@media (max-width: 768px) {
    .component { }
}
```

### 3.3 Spacing Units
- Use `rem` for consistent spacing
- Base: 1rem = 16px
- Common values: 0.5rem, 1rem, 1.5rem, 2rem, 2.5rem, 3rem

### 3.4 Border Radius
- Small: 4px
- Medium: 8px
- Large: 12px
- Pill: 20px (for buttons)

---

## 4. JavaScript Standards

### 4.1 Variable Naming
```javascript
// Constants - UPPER_SNAKE_CASE
const GOOGLE_SHEET_URL = '...';
const AUTH_KEY = 'nectec_employee_id';

// Functions - camelCase
function calculateTotal() { }
function handleAuthSubmit(e) { }

// Private variables - camelCase
let chartInstance = null;
let dashboardData = null;
```

### 4.2 DOM Selection
```javascript
// Prefer getElementById for single elements
const element = document.getElementById('myId');

// Use querySelector for complex selectors
const element = document.querySelector('.parent .child');

// Use querySelectorAll for multiple elements
const elements = document.querySelectorAll('.my-class');
```

### 4.3 Event Handling
```javascript
// Inline (for simple handlers defined in JS files)
<button onclick="functionName()">Click</button>

// addEventListener (for complex logic)
document.addEventListener('DOMContentLoaded', function() {
    element.addEventListener('click', handleClick);
});
```

### 4.4 Async Operations
```javascript
// Prefer async/await for Google Sheets calls
async function fetchData() {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Use mode: 'no-cors' for POST to Google Apps Script
fetch(URL, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(data)
});
```

### 4.5 Number Formatting
```javascript
// Format with Thai locale
function formatNumber(num) {
    return num.toLocaleString('th-TH', { maximumFractionDigits: 2 });
}

// Parse formatted number
function parseFormattedNumber(str) {
    return parseFloat(str.replace(/,/g, '')) || 0;
}
```

---

## 5. Git Conventions

### 5.1 Commit Messages
```
feat: Add new feature
fix: Fix bug description
style: Update styling
docs: Update documentation
refactor: Refactor code
```

### 5.2 Branch Strategy
- `main` - production branch
- Feature branches optional for major changes

---

## 6. Adding New Features

### 6.1 Before Implementation
1. Read `/docs/FEATURES.md` to understand existing features
2. Read `/docs/SPECIFICATIONS.md` for technical details
3. Check if feature affects existing functionality

### 6.2 During Implementation
1. Follow coding standards in this document
2. Use existing CSS variables and patterns
3. Test on both desktop and mobile
4. Test Google Sheets integration if affected

### 6.3 After Implementation
1. Update `/docs/FEATURES.md` with new feature details
2. Update `/docs/SPECIFICATIONS.md` if technical specs changed
3. Add entry to `/docs/CHANGELOG.md`

---

## 7. Common Patterns

### 7.1 Adding New Organization
1. Edit `checklist.html` and `calculator.html`
2. Add new `<div class="custom-option">` in auth overlay
3. Google Apps Script automatically handles new organizations

### 7.2 Adding New Calculator Section
1. Add HTML structure in `calculator.html`
2. Add calculate function in `calculator.js`
3. Add to `sectionTitles`, `sectionFields`, `fieldLabels`, `fieldUnits`
4. Update `calculateTotal()` if it affects totals
5. Update docs

### 7.3 Adding New Page
1. Create HTML file with standard header/footer
2. Create CSS file if needed (add to css/)
3. Create JS file if needed (add to js/)
4. Add to navigation in all pages
5. Update docs
