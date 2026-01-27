// Checklist Page JavaScript

// Toggle A2 - Show link button when checked
function toggleA2() {
    const checkbox = document.getElementById('a2');
    const action = document.getElementById('a2-action');

    if (checkbox.checked) {
        action.style.display = 'block';
    } else {
        action.style.display = 'none';
    }
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
}
