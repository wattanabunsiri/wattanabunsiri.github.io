# Changelog

All notable changes to this project will be documented in this file.

---

## [Unreleased]

### Added
- Documentation system in `/docs/` folder
  - README.md - Project overview
  - FEATURES.md - Feature documentation
  - SPECIFICATIONS.md - Technical specifications
  - STANDARDS.md - Coding standards
  - CHANGELOG.md - This file

---

## [1.1.0] - 2026-02-16

### Added
- **Save/Load Draft** for Pre-Impact Calculator
  - Save in-progress form data as drafts in localStorage
  - Draft key format: `draft-[projectId]-YYYYMMdd-HHmmss`
  - Load Draft modal with list of saved drafts (sorted by date)
  - Delete individual drafts
  - Auto-delete drafts for a project when report is generated
  - XSS protection via escapeHtml for draft display

---

## [1.0.0] - 2024

### Added

#### Authentication System
- Organization dropdown (NECTEC, Guest)
- Employee ID validation (min 3 characters)
- Guest login without Employee ID
- Session-based authentication (sessionStorage)
- Custom styled dropdown matching theme
- Redirect to home after login

#### Checklist System
- Section A: หลักเกณฑ์เบื้องต้น (at least 1 required)
- Section B: ลักษณะของผลงาน/บริการ (at least 1 required)
- Progress indicator (real-time)
- Google Sheets logging
- Required before accessing Calculator

#### Pre-Impact Calculator
- Project information fields (ID, Name, Researcher)
- 10 calculation sections (B-K)
- Impact sections: B, C, D, E, F, G, K
- Investment sections: H, I, J
- Exclusive logic (Section B disables C-G)
- Activity weight multipliers
- Report generation with modal
- Print functionality
- Google Sheets logging

#### Dashboard
- Total users card
- Per-organization breakdown (dynamic)
- Bar chart visualization (Chart.js)
- Time period filters (daily, monthly, yearly)
- Organization filter
- Demo data fallback

#### UI/UX
- Earth tone color palette
- Responsive design (mobile-first)
- Mobile hamburger menu
- Card-based layout
- Hover animations
- Consistent styling across pages

#### Pages
- index.html - Home with feature cards
- definitions.html - Impact/Investment definitions
- calculator.html - Pre-Impact Calculator
- checklist.html - Pre-assessment checklist
- dashboard.html - Usage statistics
- manual.html - Contact information

#### Backend Integration
- Google Apps Script for data storage
- Checklist sheet for checklist data
- PreImpact sheet for calculator data
- Dashboard API endpoint

---

## Template for Future Entries

```markdown
## [Version] - YYYY-MM-DD

### Added
- New features

### Changed
- Changes in existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security improvements
```
