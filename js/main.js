// ===== Mobile Menu Toggle =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('header') && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
});

// ===== Calculator Functions =====
function calculate() {
    // Get input values
    const num1Input = document.getElementById('number1');
    const num2Input = document.getElementById('number2');
    const resultBox = document.getElementById('result-box');
    const resultValue = document.getElementById('result-value');

    // Validate inputs
    if (!num1Input.value || !num2Input.value) {
        alert('กรุณากรอกตัวเลขให้ครบทั้ง 2 ช่อง');
        return;
    }

    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);

    // Validate numbers
    if (isNaN(num1) || isNaN(num2)) {
        alert('กรุณากรอกเฉพาะตัวเลขเท่านั้น');
        return;
    }

    // Calculate (Sum - can be modified for other calculations)
    const result = num1 + num2;

    // Display result
    resultValue.textContent = formatNumber(result);
    resultBox.classList.add('show');
}

// ===== Clear Function =====
function clearForm() {
    document.getElementById('number1').value = '';
    document.getElementById('number2').value = '';
    document.getElementById('result-box').classList.remove('show');
    document.getElementById('number1').focus();
}

// ===== Format Number with Commas =====
function formatNumber(num) {
    // Handle decimal numbers
    if (Number.isInteger(num)) {
        return num.toLocaleString('th-TH');
    } else {
        return num.toLocaleString('th-TH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
}

// ===== Allow Enter Key to Calculate =====
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.calculator-container input');

    inputs.forEach(function(input) {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                calculate();
            }
        });
    });
});
