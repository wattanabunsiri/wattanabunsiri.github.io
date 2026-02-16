# Claude Code Rules for IMPACT & INVESTMENT EVALUATION

## Mandatory Rules

### Before Implementing Any New Feature:

1. **READ DOCUMENTATION FIRST**
   - Read `/docs/FEATURES.md` to understand existing features
   - Read `/docs/SPECIFICATIONS.md` for technical details
   - Read `/docs/STANDARDS.md` for coding conventions

2. **CHECK IMPACT**
   - Verify if the new feature affects existing functionality
   - Check if authentication, checklist, or calculator logic is affected
   - Verify Google Sheets integration if data logging is involved

### During Implementation:

3. **FOLLOW STANDARDS**
   - Use CSS variables from `:root` (defined in style.css)
   - Follow naming conventions in STANDARDS.md
   - Maintain responsive design (test at 768px breakpoint)
   - Keep Earth tone color theme

4. **TEST THOROUGHLY**
   - Test on desktop view
   - Test on mobile view (< 768px)
   - Test authentication flow if affected
   - Test Google Sheets logging if affected

### After Implementation:

5. **UPDATE DOCUMENTATION**
   - Update `/docs/FEATURES.md` with new feature details
   - Update `/docs/SPECIFICATIONS.md` if technical specs changed
   - Add entry to `/docs/CHANGELOG.md` with date and description
   - Update `/docs/STANDARDS.md` if new patterns are introduced

---

## Quick Reference

### File Locations
```
docs/
├── README.md           # Project overview
├── FEATURES.md         # Features index (links to individual files)
├── SPECIFICATIONS.md   # Technical specs (formulas, API, etc.)
├── STANDARDS.md        # Coding conventions
├── CHANGELOG.md        # Version history
└── features/           # Individual feature documentation
    ├── authentication.md   # Login, organization, session
    ├── checklist.md        # Checklist system
    ├── calculator.md       # Pre-Impact Calculator
    ├── dashboard.md        # Statistics dashboard
    ├── navigation-ui.md    # Header, footer, theme
    └── google-sheets.md    # Backend integration
```

### CSS Variables (use these!)
```css
--primary-color: #5D4E37
--secondary-color: #8B7355
--accent-color: #A68B5B
--text-color: #3D3D3D
--text-light: #6B6B6B
--bg-color: #FAF8F5
--white: #FFFFFF
--cream: #F5F1EB
--border-color: #E0D6C8
```

### Storage Keys
```javascript
'nectec_employee_id'        // sessionStorage
'nectec_organization'       // sessionStorage
'nectec_checklist_completed' // sessionStorage
```

### Google Apps Script URL
```
https://script.google.com/macros/s/AKfycbzl6F5Xxi_aa5GMly81j-NZ9Hbe3VxnyBeKzC3X7s0IhqE9mci8SNQDlCdCGfcpgbxf/exec
```

---

## Checklist Before Completing Task

- [ ] Read relevant docs before implementation
- [ ] Followed coding standards
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Updated FEATURES.md (if new feature)
- [ ] Updated SPECIFICATIONS.md (if technical changes)
- [ ] Added CHANGELOG.md entry
