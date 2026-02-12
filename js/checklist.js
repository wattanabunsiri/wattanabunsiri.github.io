// Checklist Page JavaScript

const CHECKLIST_KEY = 'nectec_checklist_completed';

// Google Sheet Web App URL - ใส่ URL ที่ได้จาก Google Apps Script ที่นี่
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzl6F5Xxi_aa5GMly81j-NZ9Hbe3VxnyBeKzC3X7s0IhqE9mci8SNQDlCdCGfcpgbxf/exec';

// Toggle A2 - Show link button when checked
function toggleA2() {
    const checkbox = document.getElementById('a2');
    const action = document.getElementById('a2-action');

    if (checkbox.checked) {
        action.style.display = 'block';
    } else {
        action.style.display = 'none';
    }
    checkCompletion();
}

// Toggle B items (B1-B4) - Show info box when checked
function toggleB(id) {
    const checkbox = document.getElementById(id);
    const info = document.getElementById(id + '-info');

    if (checkbox.checked) {
        info.style.display = 'block';
    } else {
        info.style.display = 'none';
    }
    checkCompletion();
}

// Toggle B5 - Show text input when checked
function toggleB5() {
    const checkbox = document.getElementById('b5');
    const info = document.getElementById('b5-info');

    if (checkbox.checked) {
        info.style.display = 'block';
    } else {
        info.style.display = 'none';
        // Clear the text when unchecked
        document.getElementById('b5-text').value = '';
    }
    checkCompletion();
}

// Check if all required items are completed
function checkCompletion() {
    const a1 = document.getElementById('a1');
    const a2 = document.getElementById('a2');
    const b1 = document.getElementById('b1');
    const b2 = document.getElementById('b2');
    const b3 = document.getElementById('b3');
    const b4 = document.getElementById('b4');
    const b5 = document.getElementById('b5');

    // Section A: at least one must be checked
    const sectionAComplete = (a1 && a1.checked) || (a2 && a2.checked);

    // Section B: at least one must be checked
    const sectionBComplete = (b1 && b1.checked) || (b2 && b2.checked) ||
                             (b3 && b3.checked) || (b4 && b4.checked) ||
                             (b5 && b5.checked);

    const isComplete = sectionAComplete && sectionBComplete;

    // Update button state
    const calcButton = document.querySelector('.btn-calculator');
    if (calcButton) {
        if (isComplete) {
            calcButton.classList.remove('disabled');
            calcButton.setAttribute('onclick', 'goToCalculator(event)');
            sessionStorage.setItem(CHECKLIST_KEY, 'true');
        } else {
            calcButton.classList.add('disabled');
            calcButton.setAttribute('onclick', 'showIncompleteMessage(event)');
            sessionStorage.removeItem(CHECKLIST_KEY);
        }
    }

    // Update progress indicator
    updateProgress(sectionAComplete, sectionBComplete);

    return isComplete;
}

// Show message when trying to proceed without completing
function showIncompleteMessage(e) {
    e.preventDefault();

    const a1 = document.getElementById('a1');
    const a2 = document.getElementById('a2');
    const sectionAComplete = a1 && a1.checked && a2 && a2.checked;

    let message = 'กรุณาทำ Checklist ให้ครบก่อน:\n\n';

    if (!sectionAComplete) {
        message += '❌ หมวด 1: หลักเกณฑ์เบื้องต้น - ต้องเลือกอย่างน้อย 1 ข้อ\n';
    }

    const b1 = document.getElementById('b1');
    const b2 = document.getElementById('b2');
    const b3 = document.getElementById('b3');
    const b4 = document.getElementById('b4');
    const b5 = document.getElementById('b5');
    const sectionBComplete = (b1 && b1.checked) || (b2 && b2.checked) ||
                             (b3 && b3.checked) || (b4 && b4.checked) ||
                             (b5 && b5.checked);

    if (!sectionBComplete) {
        message += '❌ หมวด 2: ลักษณะของผลงาน/บริการ - ต้องเลือกอย่างน้อย 1 ข้อ\n';
    }

    alert(message);
}

// Update progress indicator
function updateProgress(sectionAComplete, sectionBComplete) {
    const progressEl = document.getElementById('checklistProgress');
    if (!progressEl) return;

    let completed = 0;
    if (sectionAComplete) completed++;
    if (sectionBComplete) completed++;

    const percentage = (completed / 2) * 100;
    progressEl.style.width = percentage + '%';

    const progressText = document.getElementById('progressText');
    if (progressText) {
        progressText.textContent = completed + '/2 หมวด';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add change listeners to all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', checkCompletion);
    });

    // Initial check
    checkCompletion();
});

// Check if checklist is completed (for use by other pages)
function isChecklistCompleted() {
    return sessionStorage.getItem(CHECKLIST_KEY) === 'true';
}

// Send checklist data to Google Sheets
function sendToGoogleSheet() {
    if (!GOOGLE_SHEET_URL) {
        console.log('Google Sheet URL not configured');
        return Promise.resolve();
    }

    const employeeId = sessionStorage.getItem('nectec_employee_id') || 'unknown';
    const organization = sessionStorage.getItem('nectec_organization') || 'unknown';

    const data = {
        organization: organization,
        employeeId: employeeId,
        a1: document.getElementById('a1')?.checked || false,
        a2: document.getElementById('a2')?.checked || false,
        b1: document.getElementById('b1')?.checked || false,
        b2: document.getElementById('b2')?.checked || false,
        b3: document.getElementById('b3')?.checked || false,
        b4: document.getElementById('b4')?.checked || false,
        b5: document.getElementById('b5')?.checked || false
    };

    return fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        console.log('Data sent to Google Sheet');
    })
    .catch(error => {
        console.error('Error sending to Google Sheet:', error);
    });
}

// Handle calculator button click
function goToCalculator(e) {
    if (!checkCompletion()) {
        e.preventDefault();
        showIncompleteMessage(e);
        return false;
    }

    // Send data to Google Sheet before navigating
    e.preventDefault();

    const btn = document.querySelector('.btn-calculator');
    btn.innerHTML = '<span>กำลังบันทึก...</span>';
    btn.style.pointerEvents = 'none';

    sendToGoogleSheet().finally(() => {
        window.location.href = 'calculator.html';
    });

    return false;
}
