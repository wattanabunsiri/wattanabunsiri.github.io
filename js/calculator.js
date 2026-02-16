// Google Sheet Web App URL (same as checklist)
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzylM96oiM837gDntJnqvfR3t7GEKb8OBaD2VdFfUaQ93PQ0j0Hrc3EHiqayIgHWsQg/exec';

// Helper function to get numeric value
function getVal(id) {
    const val = parseFloat(document.getElementById(id)?.value) || 0;
    return val;
}

// Helper function to set value with formatting
function setVal(id, value) {
    const el = document.getElementById(id);
    if (el) {
        el.value = formatNumber(value);
    }
}

// Format number with commas
function formatNumber(num) {
    if (isNaN(num) || num === 0) return '0';
    return num.toLocaleString('th-TH', { maximumFractionDigits: 2 });
}

// Parse formatted number back to float
function parseFormattedNumber(str) {
    if (!str) return 0;
    return parseFloat(str.replace(/,/g, '')) || 0;
}

// Toggle section visibility
function toggleSection(section) {
    const checkbox = document.getElementById('section' + section);
    const content = document.getElementById('content' + section);
    if (checkbox && content) {
        content.style.display = checkbox.checked ? 'block' : 'none';
        if (!checkbox.checked) {
            // Clear values when unchecked
            clearSection(section);
        }
        calculateTotal();
    }
}

// Clear section values
function clearSection(section) {
    const content = document.getElementById('content' + section);
    if (content) {
        const inputs = content.querySelectorAll('input[type="number"], input[type="text"]');
        inputs.forEach(input => {
            if (!input.readOnly) {
                input.value = '';
            } else {
                input.value = '';
            }
        });
        const selects = content.querySelectorAll('select');
        selects.forEach(select => {
            select.selectedIndex = 0;
        });
    }
}

// Toggle exclusive sections (B vs C-G)
function toggleExclusive(section) {
    const sectionB = document.getElementById('sectionB');
    const sectionsToDisable = ['C', 'D', 'E', 'F', 'G'];

    if (section === 'B' && sectionB.checked) {
        sectionsToDisable.forEach(s => {
            const wrapper = document.getElementById('section' + s + 'Wrapper');
            const checkbox = document.getElementById('section' + s);
            if (wrapper) {
                wrapper.classList.add('disabled');
            }
            if (checkbox) {
                checkbox.checked = false;
                checkbox.disabled = true;
                toggleSection(s);
            }
        });
    } else if (section === 'B' && !sectionB.checked) {
        sectionsToDisable.forEach(s => {
            const wrapper = document.getElementById('section' + s + 'Wrapper');
            const checkbox = document.getElementById('section' + s);
            if (wrapper) {
                wrapper.classList.remove('disabled');
            }
            if (checkbox) {
                checkbox.disabled = false;
            }
        });
    }
}

// Check if "other" option is selected
function checkOther(selectId) {
    const select = document.getElementById(selectId);
    const note = document.getElementById(selectId + '_note');
    if (select && note) {
        if (select.value === 'other') {
            note.style.display = 'block';
        } else {
            note.style.display = 'none';
        }
    }
}

// Get activity value (handle "other" case)
function getActivityVal(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return 0;
    const val = select.value;
    if (val === '' || val === 'other') return 0;
    return parseFloat(val) || 0;
}

// Section B Calculation
function calculateB() {
    const b1 = getVal('b1');
    const b2 = getVal('b2');
    const b3 = b1 - b2;
    setVal('b3', b3);

    const b4 = getVal('b4') / 100;
    const b5 = getVal('b5');
    const b6 = getActivityVal('b6');
    const b7 = getVal('b7') / 100;

    const b8 = b3 * b4 * b5 * b6 * b7;
    setVal('b8', b8);

    calculateTotal();
}

// Section C Calculation
function calculateC() {
    const c1 = getVal('c1');
    const c2 = getVal('c2');
    const c3 = getVal('c3');
    const c4 = getVal('c4');
    const c5 = (c3 - c4) - (c1 - c2);
    setVal('c5', c5);

    const c6 = getActivityVal('c6');
    const c7 = getVal('c7') / 100;

    const c8 = c5 * c6 * c7;
    setVal('c8', c8);

    calculateTotal();
}

// Section D Calculation
function calculateD() {
    const d1 = getVal('d1');
    const d2 = getVal('d2');
    const d3 = d1 - d2;
    setVal('d3', d3);

    const d4 = getActivityVal('d4');
    const d5 = getVal('d5') / 100;

    const d6 = d3 * d4 * d5;
    setVal('d6', d6);

    calculateTotal();
}

// Section E Calculation
function calculateE() {
    const e1 = getVal('e1');
    const e2 = getVal('e2');
    const e3 = e2 * 60;
    setVal('e3', e3);

    const e4 = e3 * 20;
    setVal('e4', e4);

    const e5 = e4 > 0 ? e1 / e4 : 0;
    setVal('e5', e5);

    const e6 = getVal('e6');
    const e7 = getVal('e7');
    const e8 = e6 - e7;
    setVal('e8', e8);

    const e9 = getVal('e9');
    const e10 = getActivityVal('e10');
    const e11 = getVal('e11') / 100;

    const e12 = e5 * e8 * e9 * e10 * e11;
    setVal('e12', e12);

    calculateTotal();
}

// Section F Calculation
function calculateF() {
    const f1 = getVal('f1');
    const f2 = getVal('f2') / 100;
    const f3 = getVal('f3') / 100;
    const f4 = getActivityVal('f4');
    const f5 = getVal('f5') / 100;

    const f6 = f1 * f2 * f3 * f4 * f5;
    setVal('f6', f6);

    calculateTotal();
}

// Section G Calculation
function calculateG() {
    const g1 = getVal('g1');
    const g2 = getVal('g2');
    const g3 = getActivityVal('g3');
    const g4 = getVal('g4') / 100;

    const g5 = g1 * g2 * g3 * g4;
    setVal('g5', g5);

    calculateTotal();
}

// Section H Calculation
function calculateH() {
    const h1 = getVal('h1');
    const h2 = getActivityVal('h2');
    const h3 = getVal('h3') / 100;

    const h4 = h1 * h2 * h3;
    setVal('h4', h4);

    calculateTotal();
}

// Section I Calculation
function calculateI() {
    const i1 = getVal('i1');
    const i2 = getActivityVal('i2');
    const i3 = getVal('i3') / 100;

    const i4 = i1 * i2 * i3;
    setVal('i4', i4);

    calculateTotal();
}

// Section J Calculation
function calculateJ() {
    const j1 = getVal('j1');
    const j2 = getVal('j2') / 100;
    const j3 = getActivityVal('j3');
    const j4 = getVal('j4') / 100;

    const j5 = j1 * j2 * j3 * j4;
    setVal('j5', j5);

    calculateTotal();
}

// Section K Calculation
function calculateK() {
    const k1 = getVal('k1');
    const k2 = getActivityVal('k2');
    const k3 = getVal('k3') / 100;

    const k4 = k1 * k2 * k3;
    setVal('k4', k4);

    calculateTotal();
}

// Calculate Total
function calculateTotal() {
    let totalImpact = 0;
    let totalInvestment = 0;

    // Impact sections (B-G, K) - ไม่รวม H, I, J
    const impactSections = [
        { id: 'b8', checkbox: 'sectionB' },
        { id: 'c8', checkbox: 'sectionC' },
        { id: 'd6', checkbox: 'sectionD' },
        { id: 'e12', checkbox: 'sectionE' },
        { id: 'f6', checkbox: 'sectionF' },
        { id: 'g5', checkbox: 'sectionG' },
        { id: 'k4', checkbox: 'sectionK' }
    ];

    // Investment sections (H, I, J)
    const investmentSections = [
        { id: 'h4', checkbox: 'sectionH' },
        { id: 'i4', checkbox: 'sectionI' },
        { id: 'j5', checkbox: 'sectionJ' }
    ];

    // Calculate Pre-Impact (B-G, K)
    impactSections.forEach(section => {
        const checkbox = document.getElementById(section.checkbox);
        if (checkbox && checkbox.checked) {
            const el = document.getElementById(section.id);
            if (el) {
                totalImpact += parseFormattedNumber(el.value);
            }
        }
    });

    // Calculate Pre-Investment (H, I, J)
    investmentSections.forEach(section => {
        const checkbox = document.getElementById(section.checkbox);
        if (checkbox && checkbox.checked) {
            const el = document.getElementById(section.id);
            if (el) {
                totalInvestment += parseFormattedNumber(el.value);
            }
        }
    });

    setVal('totalImpact', totalImpact);
    setVal('totalInvestment', totalInvestment);
}

// Section titles mapping
const sectionTitles = {
    'B': 'ผู้รับบริการลดการนำเข้าจากต่างประเทศ',
    'C': 'ผู้รับบริการมีกำไร/รายได้เพิ่มขึ้น',
    'D': 'ผู้รับบริการประหยัดค่าใช้จ่าย/ลดต้นทุน',
    'E': 'ผู้รับบริการมีประสิทธิภาพในการทำงานเพิ่มสูงขึ้น',
    'F': 'ลดความเสี่ยงในการสูญเสีย/ป้องกันความเสียหาย',
    'G': 'ผู้รับบริการมีทักษะเพิ่มขึ้นจากการฝึกอบรม',
    'H': 'ผู้รับบริการมีการลงทุนวิจัยต่อยอด',
    'I': 'ผู้รับบริการมีการลงทุนในกระบวนการผลิตและบริการ',
    'J': 'ผู้รับบริการมีการจ้างงานเพิ่ม',
    'K': 'อื่น ๆ เปรียบเทียบสิ่งที่เกิดขึ้นก่อน-หลังใช้ผลงานวิจัย'
};

// Field labels mapping
const fieldLabels = {
    'b1': 'มูลค่าสินค้า/บริการจากต่างประเทศ',
    'b2': 'มูลค่าสินค้า/บริการของเนคเทค',
    'b3': 'มูลค่าที่ประหยัดได้',
    'b4': 'สัดส่วนเปรียบเทียบคุณสมบัติ',
    'b5': 'จำนวนสินค้าที่ทดแทน',
    'b6': 'กิจกรรมส่งมอบหลัก',
    'b7': 'Contribution',
    'b8': 'มูลค่า Pre-Impact',
    'c1': 'รายได้ก่อนใช้ผลงาน',
    'c2': 'ต้นทุนก่อนใช้ผลงาน',
    'c3': 'รายได้หลังใช้ผลงาน',
    'c4': 'ต้นทุนหลังใช้ผลงาน',
    'c5': 'กำไรเพิ่ม',
    'c6': 'กิจกรรมส่งมอบหลัก',
    'c7': 'Contribution',
    'c8': 'มูลค่า Pre-Impact',
    'd1': 'ค่าใช้จ่าย/ต้นทุนก่อนใช้ผลงาน',
    'd2': 'ค่าใช้จ่าย/ต้นทุนหลังใช้ผลงาน',
    'd3': 'ค่าใช้จ่าย/ต้นทุนที่ลดลง',
    'd4': 'กิจกรรมส่งมอบหลัก',
    'd5': 'Contribution',
    'd6': 'มูลค่า Pre-Impact',
    'e1': 'เงินเดือนของพนักงาน',
    'e2': 'จำนวนชั่วโมงการทำงานต่อวัน',
    'e3': 'คิดเป็นนาทีต่อวัน',
    'e4': 'คิดเป็นนาทีต่อเดือน',
    'e5': 'มูลค่าการทำงานต่อ 1 นาที',
    'e6': 'ระยะเวลาก่อนใช้ผลงาน',
    'e7': 'ระยะเวลาหลังใช้ผลงาน',
    'e8': 'ระยะเวลาที่ลดลง',
    'e9': 'จำนวนครั้งที่ใช้ต่อปี',
    'e10': 'กิจกรรมส่งมอบหลัก',
    'e11': 'Contribution',
    'e12': 'มูลค่า Pre-Impact',
    'f1': 'มูลค่าความเสียหายในอดีต',
    'f2': 'โอกาสที่จะเกิดความเสียหาย',
    'f3': 'ระดับความรุนแรง',
    'f4': 'กิจกรรมส่งมอบหลัก',
    'f5': 'Contribution',
    'f6': 'มูลค่า Pre-Impact',
    'g1': 'จำนวนผู้เข้าอบรม',
    'g2': 'ราคาคอร์สอบรมเทียบเคียง',
    'g3': 'กิจกรรมส่งมอบหลัก',
    'g4': 'Contribution',
    'g5': 'มูลค่า Pre-Impact',
    'h1': 'มูลค่าการลงทุนวิจัยต่อยอด',
    'h2': 'กิจกรรมส่งมอบหลัก',
    'h3': 'Contribution',
    'h4': 'มูลค่า Pre-Impact',
    'i1': 'มูลค่าการลงทุนในกระบวนการผลิต',
    'i2': 'กิจกรรมส่งมอบหลัก',
    'i3': 'Contribution',
    'i4': 'มูลค่า Pre-Impact',
    'j1': 'มูลค่าการจ้างงานเพิ่มต่อปี',
    'j2': 'FTE ที่ปฏิบัติงาน',
    'j3': 'กิจกรรมส่งมอบหลัก',
    'j4': 'Contribution',
    'j5': 'มูลค่า Pre-Impact',
    'k1': 'มูลค่า (ระบุ)',
    'k2': 'กิจกรรมส่งมอบหลัก',
    'k3': 'Contribution',
    'k4': 'มูลค่า Pre-Impact'
};

// Field units mapping
const fieldUnits = {
    'b1': 'บาท', 'b2': 'บาท', 'b3': 'บาท', 'b4': '%', 'b5': 'ชิ้น', 'b7': '%', 'b8': 'บาท',
    'c1': 'บาท', 'c2': 'บาท', 'c3': 'บาท', 'c4': 'บาท', 'c5': 'บาท', 'c7': '%', 'c8': 'บาท',
    'd1': 'บาท', 'd2': 'บาท', 'd3': 'บาท', 'd5': '%', 'd6': 'บาท',
    'e1': 'บาท', 'e2': 'ชั่วโมง', 'e3': 'นาที', 'e4': 'นาที', 'e5': 'บาท', 'e6': 'นาที', 'e7': 'นาที', 'e8': 'นาที', 'e9': 'ครั้ง', 'e11': '%', 'e12': 'บาท',
    'f1': 'บาท', 'f2': '%', 'f3': '%', 'f5': '%', 'f6': 'บาท',
    'g1': 'คน', 'g2': 'บาท', 'g4': '%', 'g5': 'บาท',
    'h1': 'บาท', 'h3': '%', 'h4': 'บาท',
    'i1': 'บาท', 'i3': '%', 'i4': 'บาท',
    'j1': 'บาท', 'j2': '%', 'j4': '%', 'j5': 'บาท',
    'k1': 'บาท', 'k3': '%', 'k4': 'บาท'
};

// Section fields mapping
const sectionFields = {
    'B': ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8'],
    'C': ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'],
    'D': ['d1', 'd2', 'd3', 'd4', 'd5', 'd6'],
    'E': ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'e10', 'e11', 'e12'],
    'F': ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'],
    'G': ['g1', 'g2', 'g3', 'g4', 'g5'],
    'H': ['h1', 'h2', 'h3', 'h4'],
    'I': ['i1', 'i2', 'i3', 'i4'],
    'J': ['j1', 'j2', 'j3', 'j4', 'j5'],
    'K': ['k1', 'k2', 'k3', 'k4']
};

// Generate Report
function generateReport() {
    let html = '';

    // Add date
    const today = new Date();
    const dateStr = today.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    html += '<div class="report-date">วันที่ออกรายงาน: ' + dateStr + '</div>';

    // Project Info
    const projectId = document.getElementById('projectId')?.value || '-';
    const projectName = document.getElementById('projectName')?.value || '-';

    html += '<div class="report-section project-info-report">';
    html += '<h3>ข้อมูลโครงการ</h3>';
    html += '<div class="report-section-content">';
    html += '<div class="report-item"><span class="label">รหัสโครงการ</span><span class="value">' + projectId + '</span></div>';
    html += '<div class="report-item"><span class="label">ชื่อโครงการ</span><span class="value">' + projectName + '</span></div>';
    html += '</div></div>';

    // Check report type
    const reportYearly = document.getElementById('a1');
    const report5Years = document.getElementById('a2');
    let reportType = '';
    if (reportYearly && reportYearly.checked) {
        reportType = 'รายงานเป็นรายปี';
    } else if (report5Years && report5Years.checked) {
        reportType = 'รวมรายงาน 5 ปี หรือ 60 เดือน';
    }

    if (reportType) {
        html += '<div class="report-section">';
        html += '<h3>แนวทางการรายงาน</h3>';
        html += '<div class="report-section-content">';
        html += '<div class="report-item"><span class="label">รูปแบบการรายงาน</span><span class="value">' + reportType + '</span></div>';
        html += '</div></div>';
    }

    // Result field IDs for each section (to highlight)
    const resultFields = ['b8', 'c8', 'd6', 'e12', 'f6', 'g5', 'h4', 'i4', 'j5', 'k4'];

    // Check each section
    const sections = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

    sections.forEach(section => {
        const checkbox = document.getElementById('section' + section);
        if (checkbox && checkbox.checked) {
            html += '<div class="report-section">';
            html += '<h3>' + sectionTitles[section] + '</h3>';
            html += '<div class="report-section-content">';

            const fields = sectionFields[section];
            fields.forEach(fieldId => {
                const el = document.getElementById(fieldId);
                if (el) {
                    let value = el.value;
                    if (el.tagName === 'SELECT') {
                        value = el.options[el.selectedIndex]?.text || '-';
                        if (value === '-- เลือกกิจกรรม --') value = '';
                    }
                    if (value && value !== '0' && value !== '') {
                        const unit = fieldUnits[fieldId] || '';
                        const label = fieldLabels[fieldId] || fieldId;
                        const isResult = resultFields.includes(fieldId);
                        html += '<div class="report-item' + (isResult ? ' highlight' : '') + '">';
                        html += '<span class="label">' + label + '</span>';
                        html += '<span class="value">' + value + (unit ? ' ' + unit : '') + '</span>';
                        html += '</div>';
                    }
                }
            });

            html += '</div></div>';
        }
    });

    // Add totals
    const totalImpact = document.getElementById('totalImpact')?.value || '0';
    const totalInvestment = document.getElementById('totalInvestment')?.value || '0';

    html += '<div class="report-total">';
    html += '<div class="report-total-title">สรุปผลการประเมิน</div>';
    html += '<div class="report-item"><span class="label">มูลค่า Pre-Impact รวมทั้งหมด</span><span class="value">' + totalImpact + ' บาท</span></div>';
    html += '<div class="report-item"><span class="label">มูลค่า Pre-Investment รวมทั้งหมด</span><span class="value">' + totalInvestment + ' บาท</span></div>';
    html += '</div>';

    // Show modal
    document.getElementById('reportContent').innerHTML = html;
    document.getElementById('reportModal').style.display = 'flex';

    // Remove drafts for this project
    removeDraftsForProject(projectId);

    // Send data to Google Sheets
    sendPreImpactLog();
}

// Send Pre-Impact data to Google Sheets
function sendPreImpactLog() {
    if (!GOOGLE_SHEET_URL) {
        console.log('Google Sheet URL not configured');
        return;
    }

    const employeeId = sessionStorage.getItem('nectec_employee_id') || 'unknown';
    const organization = sessionStorage.getItem('nectec_organization') || 'unknown';

    // Get report type
    const reportYearly = document.getElementById('a1');
    const report5Years = document.getElementById('a2');
    let reportType = '';
    if (reportYearly && reportYearly.checked) {
        reportType = 'รายปี';
    } else if (report5Years && report5Years.checked) {
        reportType = '5 ปี';
    }

    // Get section values (result fields)
    const getSectionValue = (sectionId, resultFieldId) => {
        const checkbox = document.getElementById('section' + sectionId);
        if (checkbox && checkbox.checked) {
            const value = document.getElementById(resultFieldId)?.value || '0';
            return value.replace(/,/g, '');
        }
        return '';
    };

    const data = {
        type: 'preimpact',
        organization: organization,
        employeeId: employeeId,
        projectId: document.getElementById('projectId')?.value || '',
        projectName: document.getElementById('projectName')?.value || '',
        reportType: reportType,
        sectionB: getSectionValue('B', 'b8'),   // ลดการนำเข้า
        sectionC: getSectionValue('C', 'c8'),   // กำไร/รายได้เพิ่ม
        sectionD: getSectionValue('D', 'd6'),   // ประหยัดค่าใช้จ่าย
        sectionE: getSectionValue('E', 'e12'),  // ประสิทธิภาพเพิ่ม
        sectionF: getSectionValue('F', 'f6'),   // ลดความเสี่ยง
        sectionG: getSectionValue('G', 'g5'),   // ทักษะเพิ่ม
        sectionH: getSectionValue('H', 'h4'),   // ลงทุนวิจัยต่อยอด
        sectionI: getSectionValue('I', 'i4'),   // ลงทุนผลิต/บริการ
        sectionJ: getSectionValue('J', 'j5'),   // จ้างงานเพิ่ม
        sectionK: getSectionValue('K', 'k4'),   // อื่นๆ
        totalImpact: (document.getElementById('totalImpact')?.value || '0').replace(/,/g, ''),
        totalInvestment: (document.getElementById('totalInvestment')?.value || '0').replace(/,/g, '')
    };

    fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        console.log('Pre-Impact data sent to Google Sheet');
    })
    .catch(error => {
        console.error('Error sending to Google Sheet:', error);
    });
}

// Close Report
function closeReport() {
    document.getElementById('reportModal').style.display = 'none';
}

// Print Report
function printReport() {
    window.print();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const reportModal = document.getElementById('reportModal');
    const draftModal = document.getElementById('draftModal');
    if (event.target === reportModal) {
        closeReport();
    }
    if (event.target === draftModal) {
        closeDraftModal();
    }
}

// ===== Draft Save/Load Feature =====

const DRAFT_PREFIX = 'draft-';

// Save current form as draft
function saveDraft() {
    const projectId = document.getElementById('projectId')?.value?.trim();
    if (!projectId) {
        alert('กรุณากรอกรหัสโครงการก่อนบันทึกแบบร่าง');
        document.getElementById('projectId')?.focus();
        return;
    }

    const now = new Date();
    const timestamp = now.getFullYear()
        + String(now.getMonth() + 1).padStart(2, '0')
        + String(now.getDate()).padStart(2, '0')
        + '-'
        + String(now.getHours()).padStart(2, '0')
        + String(now.getMinutes()).padStart(2, '0')
        + String(now.getSeconds()).padStart(2, '0');

    const key = DRAFT_PREFIX + projectId + '-' + timestamp;

    // Collect report type
    const a1 = document.getElementById('a1');
    const a2 = document.getElementById('a2');
    let reportType = '';
    if (a1 && a1.checked) reportType = 'yearly';
    else if (a2 && a2.checked) reportType = '5years';

    // Collect section checkboxes
    const sectionKeys = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    const sections = {};
    sectionKeys.forEach(s => {
        const cb = document.getElementById('section' + s);
        sections[s] = cb ? cb.checked : false;
    });

    // Collect all field values
    const fields = {};
    const form = document.getElementById('impactForm');
    if (form) {
        form.querySelectorAll('input[type="number"], input[type="text"]').forEach(input => {
            if (input.id && input.id !== 'projectId' && input.id !== 'projectName') {
                fields[input.id] = input.value;
            }
        });
        form.querySelectorAll('select').forEach(select => {
            if (select.id) {
                fields[select.id] = select.selectedIndex;
            }
        });
    }

    const draft = {
        projectId: projectId,
        projectName: document.getElementById('projectName')?.value || '',
        reportType: reportType,
        sections: sections,
        fields: fields,
        savedAt: now.toISOString()
    };

    localStorage.setItem(key, JSON.stringify(draft));
    alert('บันทึกแบบร่างเรียบร้อยแล้ว');
}

// Show draft list modal
function showDraftList() {
    const drafts = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(DRAFT_PREFIX)) {
            try {
                const data = JSON.parse(localStorage.getItem(key));
                drafts.push({ key: key, data: data });
            } catch (e) {
                // skip invalid entries
            }
        }
    }

    const container = document.getElementById('draftListContent');
    if (!container) return;

    if (drafts.length === 0) {
        container.innerHTML = '<div class="draft-empty">ไม่มีแบบร่างที่บันทึกไว้</div>';
    } else {
        // Sort by savedAt descending
        drafts.sort((a, b) => (b.data.savedAt || '').localeCompare(a.data.savedAt || ''));

        let html = '<div class="draft-list">';
        drafts.forEach(draft => {
            const d = draft.data;
            const savedDate = d.savedAt ? new Date(d.savedAt).toLocaleString('th-TH', {
                year: 'numeric', month: 'short', day: 'numeric',
                hour: '2-digit', minute: '2-digit'
            }) : '-';

            html += '<div class="draft-item">';
            html += '<div class="draft-item-info">';
            html += '<div class="draft-item-title">' + escapeHtml(d.projectId || '-') + '</div>';
            html += '<div class="draft-item-name">' + escapeHtml(d.projectName || '-') + '</div>';
            html += '<div class="draft-item-date">' + savedDate + '</div>';
            html += '</div>';
            html += '<div class="draft-item-actions">';
            html += '<button class="btn-draft-action btn-load" onclick="loadDraft(\'' + escapeHtml(draft.key) + '\')">โหลด</button>';
            html += '<button class="btn-draft-action btn-delete" onclick="deleteDraft(\'' + escapeHtml(draft.key) + '\')">ลบ</button>';
            html += '</div>';
            html += '</div>';
        });
        html += '</div>';
        container.innerHTML = html;
    }

    document.getElementById('draftModal').style.display = 'flex';
}

// Escape HTML to prevent XSS
function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// Load a draft into the form
function loadDraft(key) {
    const raw = localStorage.getItem(key);
    if (!raw) {
        alert('ไม่พบแบบร่างนี้');
        return;
    }

    let draft;
    try {
        draft = JSON.parse(raw);
    } catch (e) {
        alert('ข้อมูลแบบร่างไม่ถูกต้อง');
        return;
    }

    // Set project info
    const projectIdEl = document.getElementById('projectId');
    const projectNameEl = document.getElementById('projectName');
    if (projectIdEl) projectIdEl.value = draft.projectId || '';
    if (projectNameEl) projectNameEl.value = draft.projectName || '';

    // Set report type
    const a1 = document.getElementById('a1');
    const a2 = document.getElementById('a2');
    if (a1) a1.checked = (draft.reportType === 'yearly');
    if (a2) a2.checked = (draft.reportType === '5years');

    // Reset all sections first
    const sectionKeys = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    sectionKeys.forEach(s => {
        const cb = document.getElementById('section' + s);
        if (cb) {
            cb.checked = false;
            cb.disabled = false;
        }
        const wrapper = document.getElementById('section' + s + 'Wrapper');
        if (wrapper) wrapper.classList.remove('disabled');
        const content = document.getElementById('content' + s);
        if (content) content.style.display = 'none';
    });

    // Restore field values
    const form = document.getElementById('impactForm');
    if (form && draft.fields) {
        // Restore selects first (by selectedIndex)
        form.querySelectorAll('select').forEach(select => {
            if (select.id && draft.fields[select.id] !== undefined) {
                select.selectedIndex = draft.fields[select.id];
            }
        });
        // Restore inputs
        form.querySelectorAll('input[type="number"], input[type="text"]').forEach(input => {
            if (input.id && input.id !== 'projectId' && input.id !== 'projectName' && draft.fields[input.id] !== undefined) {
                input.value = draft.fields[input.id];
            }
        });
    }

    // Restore section checkboxes and toggle visibility
    if (draft.sections) {
        // Handle B first for exclusive logic
        if (draft.sections['B']) {
            const cbB = document.getElementById('sectionB');
            if (cbB) {
                cbB.checked = true;
                document.getElementById('contentB').style.display = 'block';
                toggleExclusive('B');
            }
        }

        sectionKeys.forEach(s => {
            if (s === 'B') return; // already handled
            if (draft.sections[s]) {
                const cb = document.getElementById('section' + s);
                if (cb && !cb.disabled) {
                    cb.checked = true;
                    const content = document.getElementById('content' + s);
                    if (content) content.style.display = 'block';
                }
            }
        });
    }

    // Re-check "other" notes for selects
    const selectIds = ['b6', 'c6', 'd4', 'e10', 'f4', 'g3', 'h2', 'i2', 'j3', 'k2'];
    selectIds.forEach(id => checkOther(id));

    // Re-run calculations
    calculateB();
    calculateC();
    calculateD();
    calculateE();
    calculateF();
    calculateG();
    calculateH();
    calculateI();
    calculateJ();
    calculateK();
    calculateTotal();

    closeDraftModal();
    alert('โหลดแบบร่างเรียบร้อยแล้ว');
}

// Delete a draft
function deleteDraft(key) {
    if (!confirm('ต้องการลบแบบร่างนี้หรือไม่?')) return;
    localStorage.removeItem(key);
    showDraftList(); // refresh list
}

// Remove drafts matching current projectId after report generation
function removeDraftsForProject(projectId) {
    if (!projectId) return;
    const prefix = DRAFT_PREFIX + projectId + '-';
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(prefix)) {
            keysToRemove.push(key);
        }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
}

// Close draft modal
function closeDraftModal() {
    document.getElementById('draftModal').style.display = 'none';
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set initial total
    calculateTotal();
});
