# IMPACT & INVESTMENT EVALUATION

ระบบประเมินผลลัพธ์ ผลกระทบทางเศรษฐกิจและสังคมของผลงานวิจัย

## Overview

เว็บแอปพลิเคชันสำหรับประเมิน Pre-Impact และ Pre-Investment ของผลงานวิจัย พัฒนาโดย NECTEC

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Hosting**: GitHub Pages
- **Backend**: Google Apps Script (Google Sheets as database)
- **Charts**: Chart.js

## Project Structure

```
├── index.html              # หน้าแรก
├── definitions.html        # นิยาม Impact/Investment
├── calculator.html         # Pre-Impact Calculator
├── checklist.html          # Checklist ก่อนใช้ Calculator
├── dashboard.html          # Dashboard สถิติการใช้งาน
├── manual.html             # Contact/Manual
├── css/
│   ├── style.css           # Global styles
│   ├── auth.css            # Authentication overlay styles
│   ├── calculator.css      # Calculator page styles
│   ├── checklist.css       # Checklist page styles
│   ├── dashboard.css       # Dashboard page styles
│   ├── definitions.css     # Definitions page styles
│   └── contact.css         # Contact page styles
├── js/
│   ├── main.js             # Global scripts (mobile menu)
│   ├── auth.js             # Authentication system
│   ├── calculator.js       # Calculator logic
│   ├── checklist.js        # Checklist logic
│   └── dashboard.js        # Dashboard charts
├── docs/                   # Documentation
│   ├── README.md           # This file
│   ├── FEATURES.md         # Features index
│   ├── SPECIFICATIONS.md   # Technical specifications
│   ├── STANDARDS.md        # Coding standards
│   ├── CHANGELOG.md        # Change history
│   └── features/           # Individual feature docs
│       ├── authentication.md
│       ├── checklist.md
│       ├── calculator.md
│       ├── dashboard.md
│       ├── navigation-ui.md
│       └── google-sheets.md
└── google-apps-script.txt  # Google Apps Script code
```

## Quick Start

1. Clone repository
2. Open `index.html` in browser
3. For full functionality, deploy Google Apps Script (see `google-apps-script.txt`)

## Links

- **Live Site**: https://wattanabunsiri.github.io
- **Repository**: https://github.com/wattanabunsiri/wattanabunsiri.github.io

## Credits

- **Developed by**: Thanapat Wattanabunsiri (Bedrock Analytics.AI)
- **Concept & Requirements by**: Napat Wattanabunsiri (NECTEC)
