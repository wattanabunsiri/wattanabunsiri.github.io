# Google Sheets Integration

## Overview
Backend integration ใช้ Google Apps Script เป็น API และ Google Sheets เป็น Database

## Files
- `google-apps-script.txt` - Source code สำหรับ deploy
- `js/checklist.js` - Checklist data submission
- `js/calculator.js` - Calculator data submission
- `js/dashboard.js` - Dashboard data fetching

---

## 6.1 Google Apps Script URL

### Current URL
```
https://script.google.com/macros/s/AKfycbzl6F5Xxi_aa5GMly81j-NZ9Hbe3VxnyBeKzC3X7s0IhqE9mci8SNQDlCdCGfcpgbxf/exec
```

### Deployment Settings
- Execute as: Me (owner)
- Who has access: Anyone

---

## 6.2 Data Sheets

### Sheet: Checklist
บันทึกข้อมูลจาก Checklist page

| Column | Type | Description |
|--------|------|-------------|
| Timestamp | DateTime | เวลาที่บันทึก (auto) |
| Organization | String | หน่วยงาน |
| EmployeeId | String | รหัสพนักงาน |
| A1 | Boolean | Checkbox A1 |
| A2 | Boolean | Checkbox A2 |
| B1 | Boolean | Checkbox B1 |
| B2 | Boolean | Checkbox B2 |
| B3 | Boolean | Checkbox B3 |
| B4 | Boolean | Checkbox B4 |
| B5 | Boolean | Checkbox B5 |

### Sheet: PreImpact
บันทึกข้อมูลจาก Calculator page

| Column | Type | Description |
|--------|------|-------------|
| Timestamp | DateTime | เวลาที่บันทึก (auto) |
| Organization | String | หน่วยงาน |
| EmployeeId | String | รหัสพนักงาน |
| ProjectId | String | รหัสโครงการ |
| ProjectName | String | ชื่อโครงการ |
| ReportType | String | รายปี / 5ปี |
| SectionB | Number | มูลค่า Section B |
| SectionC | Number | มูลค่า Section C |
| SectionD | Number | มูลค่า Section D |
| SectionE | Number | มูลค่า Section E |
| SectionF | Number | มูลค่า Section F |
| SectionG | Number | มูลค่า Section G |
| SectionH | Number | มูลค่า Section H |
| SectionI | Number | มูลค่า Section I |
| SectionJ | Number | มูลค่า Section J |
| SectionK | Number | มูลค่า Section K |
| TotalImpact | Number | รวม Pre-Impact |
| TotalInvestment | Number | รวม Pre-Investment |

---

## 6.3 API Endpoints

### POST /exec - Save Data

#### Request
```javascript
fetch(URL, {
    method: 'POST',
    mode: 'no-cors',  // Required!
    body: JSON.stringify({
        type: 'checklist' | 'preimpact',
        // ... data fields
    })
});
```

#### Checklist Data
```json
{
    "type": "checklist",
    "organization": "NECTEC",
    "employeeId": "12345",
    "a1": true,
    "a2": false,
    "b1": true,
    "b2": false,
    "b3": false,
    "b4": false,
    "b5": false
}
```

#### PreImpact Data
```json
{
    "type": "preimpact",
    "organization": "NECTEC",
    "employeeId": "12345",
    "projectId": "PRJ001",
    "projectName": "ชื่อโครงการ",
    "reportType": "รายปี",
    "sectionB": "100000",
    "sectionC": "",
    "sectionD": "50000",
    "sectionE": "",
    "sectionF": "",
    "sectionG": "",
    "sectionH": "30000",
    "sectionI": "",
    "sectionJ": "",
    "sectionK": "",
    "totalImpact": "150000",
    "totalInvestment": "30000"
}
```

#### Response
```json
{ "success": true }
```

### GET /exec?action=dashboard - Get Statistics

#### Request
```javascript
const response = await fetch(URL + '?action=dashboard');
const data = await response.json();
```

#### Response
```json
{
    "total": 150,
    "organizations": {
        "NECTEC": 100,
        "Guest": 50
    },
    "daily": {
        "labels": ["10 Feb", "11 Feb", "12 Feb", "13 Feb", "14 Feb", "15 Feb", "16 Feb"],
        "data": {
            "NECTEC": [5, 3, 8, 2, 6, 4, 7],
            "Guest": [2, 1, 4, 1, 3, 2, 5]
        }
    },
    "monthly": {
        "labels": ["Sep 24", "Oct 24", "Nov 24", "Dec 24", "Jan 25", "Feb 25"],
        "data": {
            "NECTEC": [20, 25, 18, 30, 22, 15],
            "Guest": [10, 8, 12, 15, 10, 8]
        }
    },
    "yearly": {
        "labels": ["ปี 2567", "ปี 2568", "ปี 2569"],
        "data": {
            "NECTEC": [50, 80, 35],
            "Guest": [20, 40, 18]
        }
    }
}
```

---

## 6.4 Apps Script Code Structure

### doPost(e)
- รับ POST request
- Parse JSON body
- Route ตาม `data.type`:
  - `checklist` → บันทึกลง Checklist sheet
  - `preimpact` → บันทึกลง PreImpact sheet
- Return success/error JSON

### doGet(e)
- รับ GET request
- Check `action` parameter:
  - `dashboard` → เรียก getDashboardData()
- Return JSON

### getDashboardData()
- อ่านข้อมูลจากทั้ง Checklist และ PreImpact sheets
- นับจำนวนทั้งหมดและแยกตามหน่วยงาน
- สร้างข้อมูลสำหรับ daily, monthly, yearly charts
- Return JSON

---

## 6.5 Deployment Guide

### Initial Setup
1. สร้าง Google Sheet ใหม่
2. ไปที่ Extensions > Apps Script
3. Copy code จาก `google-apps-script.txt`
4. Save

### Deploy
1. Click Deploy > New deployment
2. Type: Web app
3. Execute as: Me
4. Who has access: Anyone
5. Click Deploy
6. Copy Web app URL

### Update Code
1. Edit code ใน Apps Script
2. Click Deploy > Manage deployments
3. Click pencil icon (edit)
4. Version: New version
5. Click Deploy

**Important**: ต้อง deploy เป็น New version ทุกครั้งที่แก้ code

---

## 6.6 CORS Handling

### Problem
Google Apps Script ไม่ support CORS preflight

### Solution
ใช้ `mode: 'no-cors'` ใน fetch

```javascript
fetch(URL, {
    method: 'POST',
    mode: 'no-cors',  // ไม่มี response body
    body: JSON.stringify(data)
});
```

### Limitation
- ไม่สามารถอ่าน response body ได้
- ใช้ `.then()` เพื่อรู้ว่า request ถูกส่งแล้ว (ไม่รู้ว่า success หรือไม่)

### Workaround for GET
GET requests สามารถใช้ปกติได้ (ไม่ต้องใช้ no-cors)

---

## 6.7 Error Handling

### Client Side
```javascript
fetch(URL, { ... })
    .then(() => {
        console.log('Data sent');
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

### Server Side (Apps Script)
```javascript
try {
    // Process data
    return ContentService.createTextOutput(
        JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
} catch (error) {
    return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
}
```

---

## 6.8 Adding New Organization

### No Code Changes Required!

1. เพิ่มตัวเลือกใน HTML (auth overlay)
2. User เลือกหน่วยงานใหม่และ submit
3. Google Apps Script บันทึกลง Sheet
4. Dashboard ดึงข้อมูลและแสดงหน่วยงานใหม่อัตโนมัติ

### Dynamic Organization Detection
```javascript
// Dashboard reads organizations from data
const orgNames = Object.keys(data.organizations);
// Creates cards and chart datasets dynamically
```
