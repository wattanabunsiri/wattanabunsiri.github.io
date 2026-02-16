# Features Documentation

## Overview
เอกสารรวม features ทั้งหมดของระบบ IMPACT & INVESTMENT EVALUATION

---

## Feature Index

| # | Feature | Description | File |
|---|---------|-------------|------|
| 1 | [Authentication](features/authentication.md) | ระบบ login, organization, session | `features/authentication.md` |
| 2 | [Checklist](features/checklist.md) | Checklist ก่อนใช้ Calculator | `features/checklist.md` |
| 3 | [Calculator](features/calculator.md) | Pre-Impact/Investment Calculator | `features/calculator.md` |
| 4 | [Dashboard](features/dashboard.md) | สถิติการใช้งาน, กราฟ | `features/dashboard.md` |
| 5 | [Navigation & UI](features/navigation-ui.md) | Header, Footer, Theme, Components | `features/navigation-ui.md` |
| 6 | [Google Sheets](features/google-sheets.md) | Backend API, Data Storage | `features/google-sheets.md` |

---

## Quick Links

### By Page
| Page | Features |
|------|----------|
| index.html | [Navigation](features/navigation-ui.md) |
| checklist.html | [Auth](features/authentication.md), [Checklist](features/checklist.md) |
| calculator.html | [Auth](features/authentication.md), [Calculator](features/calculator.md) |
| dashboard.html | [Dashboard](features/dashboard.md) |
| definitions.html | [Navigation](features/navigation-ui.md) |
| manual.html | [Navigation](features/navigation-ui.md) |

### By Technology
| Tech | Features |
|------|----------|
| sessionStorage | [Authentication](features/authentication.md) |
| localStorage | [Calculator Drafts](features/calculator.md) |
| Google Apps Script | [Google Sheets](features/google-sheets.md) |
| Chart.js | [Dashboard](features/dashboard.md) |
| CSS Variables | [Navigation & UI](features/navigation-ui.md) |

---

## Feature Summary

### 1. Authentication System
- Organization dropdown (NECTEC, Guest)
- Employee ID validation
- Guest mode (no ID required)
- Session-based auth (sessionStorage)
- Redirect to home after login

### 2. Checklist System
- Section A: หลักเกณฑ์เบื้องต้น (1 of 2)
- Section B: ลักษณะของผลงาน (1 of 5)
- Progress indicator
- Data logging to Google Sheets

### 3. Pre-Impact Calculator
- 10 calculation sections (B-K)
- Impact: B, C, D, E, F, G, K
- Investment: H, I, J
- Exclusive logic (B disables C-G)
- Report generation
- Data logging to Google Sheets
- Save/Load draft (localStorage)

### 4. Dashboard
- Total users card
- Per-organization breakdown
- Bar chart (Chart.js)
- Period filters: daily, monthly, yearly
- Dynamic organization support

### 5. Navigation & UI
- Responsive header with mobile menu
- Earth tone color theme
- Common components (buttons, cards, forms)
- Typography and spacing standards

### 6. Google Sheets Integration
- POST: Save checklist and calculator data
- GET: Fetch dashboard statistics
- Dynamic organization detection
- No CORS issues (mode: no-cors)

---

## Adding New Features

1. **Read existing docs** - Understand current implementation
2. **Create feature file** - Add to `docs/features/`
3. **Update this index** - Add link to new feature
4. **Update CHANGELOG** - Document the addition
