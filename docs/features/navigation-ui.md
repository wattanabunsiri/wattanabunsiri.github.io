# Navigation & UI

## Overview
ส่วนประกอบ UI ที่ใช้ร่วมกันทุกหน้า

## Files
- `css/style.css` - Global styles
- `js/main.js` - Mobile menu toggle

---

## 5.1 Header

### Structure
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

### Navigation Items
| Link | Destination |
|------|-------------|
| Home | index.html |
| Self Assessment | calculator.html |
| Contact | manual.html |

### Active State
เพิ่ม class `active` ที่ link ของหน้าปัจจุบัน

---

## 5.2 Footer

### Structure
```html
<footer>
    <div class="footer-content">
        <p>© DEVELOPED BY THANAPAT WATTANABUNSIRI (BEDROCK ANALYTICS.AI)</p>
        <p>© CONCEPT & REQUIREMENTS BY NAPAT WATTANABUNSIRI (NECTEC)</p>
    </div>
</footer>
```

### Styling
- Background: white
- Text: left-aligned
- Border-top: 1px solid border-color

---

## 5.3 Mobile Menu

### Breakpoint
768px

### Behavior
- Desktop: แสดง nav แบบ horizontal
- Mobile: ซ่อน nav, แสดงปุ่ม hamburger (☰)

### Toggle Logic
```javascript
// js/main.js
menuToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
});
```

---

## 5.4 Color Theme (Earth Tone)

### CSS Variables
```css
:root {
    --primary-color: #5D4E37;      /* Dark brown - headings, buttons */
    --secondary-color: #8B7355;    /* Medium brown - hover states */
    --accent-color: #A68B5B;       /* Light brown - accents */
    --text-color: #3D3D3D;         /* Dark gray - body text */
    --text-light: #6B6B6B;         /* Medium gray - secondary text */
    --bg-color: #FAF8F5;           /* Off-white - page background */
    --white: #FFFFFF;              /* White - card backgrounds */
    --cream: #F5F1EB;              /* Cream - section backgrounds */
    --border-color: #E0D6C8;       /* Light brown - borders */
    --shadow: 0 1px 3px rgba(93, 78, 55, 0.08);
}
```

### Usage Guidelines
| Element | Color |
|---------|-------|
| Headings | --primary-color |
| Body text | --text-color |
| Secondary text | --text-light |
| Page background | --bg-color |
| Card background | --white |
| Section background | --cream |
| Borders | --border-color |
| Primary buttons | --primary-color bg, --white text |
| Hover states | --secondary-color |

---

## 5.5 Common Components

### Buttons
```css
.btn {
    padding: 0.875rem 1.5rem;
    border-radius: 4px;
    font-size: 0.95rem;
    font-weight: 500;
}

.btn-primary {
    background-color: var(--primary-color);
    color: var(--white);
}

.btn-secondary {
    background-color: var(--cream);
    color: var(--primary-color);
    border: 1px solid var(--border-color);
}
```

### Cards
```css
.feature-card {
    background: var(--white);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    /* Left accent bar */
    position: relative;
}

.feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg,
        var(--primary-color),
        var(--secondary-color));
}
```

### Form Inputs
```css
.form-group input {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background-color: var(--bg-color);
}

.form-group input:focus {
    border-color: var(--secondary-color);
    background-color: var(--white);
}
```

---

## 5.6 Responsive Design

### Breakpoint
```css
@media (max-width: 768px) {
    /* Mobile styles */
}
```

### Common Adaptations
| Desktop | Mobile |
|---------|--------|
| Horizontal nav | Hamburger menu |
| Multi-column grids | Single column |
| Large padding | Reduced padding |
| Larger fonts | Smaller fonts |

---

## 5.7 Animations & Transitions

### Standard Transition
```css
transition: all 0.2s ease;
```

### Hover Effects
```css
/* Cards */
.feature-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(93, 78, 55, 0.12);
}

/* Stat cards */
.stat-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}
```

---

## 5.8 Typography

### Font Family
```css
font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Font Sizes
| Element | Size |
|---------|------|
| Body | 1rem (16px) |
| H1 | 2rem / 1.5rem (mobile) |
| H2 | 1.1rem |
| H3 | 1rem |
| Small text | 0.9rem |
| Labels | 0.85rem |

### Line Height
```css
line-height: 1.7;
```
