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
    const modal = document.getElementById('reportModal');
    if (event.target === modal) {
        closeReport();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set initial total
    calculateTotal();
});
