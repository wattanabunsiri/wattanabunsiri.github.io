# Dashboard

## Overview
หน้าแสดงสถิติการใช้งานระบบ

## Files
- `dashboard.html` - Dashboard page
- `js/dashboard.js` - Dashboard logic (Chart.js integration)
- `css/dashboard.css` - Dashboard styles

---

## 4.1 Statistics Cards

### Total Users Card
- แสดงจำนวนผู้ใช้งานทั้งหมด
- Icon: 👥
- Border: primary color

### Organization Cards (Dynamic)
- สร้างอัตโนมัติจากข้อมูล
- แต่ละหน่วยงานมี card แยก
- Icon และ color หมุนเวียนจาก palette

### Color Palette
```javascript
const colorPalette = [
    { bg: 'rgba(93, 78, 55, 0.8)', border: 'rgba(93, 78, 55, 1)' },      // Brown
    { bg: 'rgba(127, 140, 141, 0.8)', border: 'rgba(127, 140, 141, 1)' }, // Gray
    { bg: 'rgba(41, 128, 185, 0.8)', border: 'rgba(41, 128, 185, 1)' },   // Blue
    { bg: 'rgba(39, 174, 96, 0.8)', border: 'rgba(39, 174, 96, 1)' },     // Green
    { bg: 'rgba(155, 89, 182, 0.8)', border: 'rgba(155, 89, 182, 1)' },   // Purple
    { bg: 'rgba(230, 126, 34, 0.8)', border: 'rgba(230, 126, 34, 1)' },   // Orange
    { bg: 'rgba(231, 76, 60, 0.8)', border: 'rgba(231, 76, 60, 1)' },     // Red
    { bg: 'rgba(26, 188, 156, 0.8)', border: 'rgba(26, 188, 156, 1)' },   // Teal
];
```

### Icon Palette
```javascript
const iconPalette = ['🏢', '👤', '🏛️', '🏭', '🏫', '🏥', '🏦', '🏪'];
```

---

## 4.2 Organization Filter

### Location
Filter section ด้านบน chart

### Options
- ทั้งหมด (default)
- Dynamic options จากข้อมูล

### Behavior
กรอง chart ให้แสดงเฉพาะหน่วยงานที่เลือก

---

## 4.3 Chart Visualization

### Library
Chart.js (CDN)

### Chart Type
Bar chart (stacked by organization)

### Period Filters
| Button | Data Range |
|--------|------------|
| รายวัน | 7 วันย้อนหลัง |
| รายเดือน | 6 เดือนย้อนหลัง |
| รายปี | 3 ปีย้อนหลัง |

### Chart Options
```javascript
{
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            labels: { usePointStyle: true, padding: 20 }
        }
    },
    scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true, ticks: { stepSize: 1 } }
    }
}
```

---

## 4.4 Data Source

### API Endpoint
```
GET {GOOGLE_SHEET_URL}?action=dashboard
```

### Response Format
```json
{
    "total": 150,
    "organizations": {
        "NECTEC": 100,
        "Guest": 50
    },
    "daily": {
        "labels": ["10 Feb", "11 Feb", "12 Feb", ...],
        "data": {
            "NECTEC": [5, 3, 8, 2, 6, 4, 7],
            "Guest": [2, 1, 4, 1, 3, 2, 5]
        }
    },
    "monthly": {
        "labels": ["Sep 24", "Oct 24", ...],
        "data": { ... }
    },
    "yearly": {
        "labels": ["ปี 2567", "ปี 2568", "ปี 2569"],
        "data": { ... }
    }
}
```

---

## 4.5 Fallback / Demo Data

### When Used
- API fetch fails
- Network error
- Google Apps Script not configured

### Demo Data Generator
```javascript
function getDemoData() {
    const orgs = ['NECTEC', 'Guest', 'BIOTEC', 'MTEC'];
    // Generate random data for each org
    // Return same structure as API response
}
```

---

## 4.6 Loading State

### Display
- Overlay บน chart area
- Text: "กำลังโหลดข้อมูล..."

### Control
```javascript
function setLoading(loading) {
    if (loading) {
        loadingEl.classList.remove('hidden');
    } else {
        loadingEl.classList.add('hidden');
    }
}
```

---

## 4.7 Dynamic Organization Support

### Principle
ไม่ hardcode รายชื่อหน่วยงาน

### How It Works
1. Fetch data from Google Sheets
2. Extract organization names from `data.organizations`
3. Generate stat cards dynamically
4. Generate chart datasets dynamically

### Benefits
- เพิ่มหน่วยงานใหม่ได้โดยไม่ต้องแก้ code
- ลบหน่วยงานที่ไม่มีข้อมูลอัตโนมัติ

---

## 4.8 Responsive Design

### Desktop (> 768px)
- Stats cards: grid 4 columns
- Chart: full width
- Filter buttons: inline

### Mobile (<= 768px)
- Stats cards: 1 column
- Chart: reduced height (250px)
- Filter buttons: full width, equal size
