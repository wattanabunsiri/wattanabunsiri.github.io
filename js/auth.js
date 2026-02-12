// Authentication System
(function() {
    const AUTH_KEY = 'nectec_employee_id';
    const ORG_KEY = 'nectec_organization';
    const CHECKLIST_KEY = 'nectec_checklist_completed';

    // Check if user is authenticated
    function isAuthenticated() {
        return sessionStorage.getItem(AUTH_KEY) !== null;
    }

    // Get stored organization
    function getOrganization() {
        return sessionStorage.getItem(ORG_KEY);
    }

    // Store organization
    function setOrganization(org) {
        sessionStorage.setItem(ORG_KEY, org);
    }

    // Check if checklist is completed
    function isChecklistCompleted() {
        return sessionStorage.getItem(CHECKLIST_KEY) === 'true';
    }

    // Get stored employee ID
    function getEmployeeId() {
        return sessionStorage.getItem(AUTH_KEY);
    }

    // Store employee ID
    function setEmployeeId(id) {
        sessionStorage.setItem(AUTH_KEY, id);
    }

    // Clear authentication
    function logout() {
        sessionStorage.removeItem(AUTH_KEY);
        sessionStorage.removeItem(ORG_KEY);
        sessionStorage.removeItem(CHECKLIST_KEY);
        location.reload();
    }

    // Validate employee ID format (customize as needed)
    function validateEmployeeId(id) {
        // Basic validation: at least 3 characters
        if (!id || id.trim().length < 3) {
            return { valid: false, message: 'กรุณากรอกรหัสพนักงานอย่างน้อย 3 ตัวอักษร' };
        }
        return { valid: true };
    }

    // Check if current page requires checklist completion
    function requiresChecklist() {
        return window.location.pathname.includes('calculator');
    }

    // Initialize authentication
    function initAuth() {
        const overlay = document.getElementById('authOverlay');
        const checklistOverlay = document.getElementById('checklistRequiredOverlay');
        const userInfoBar = document.getElementById('userInfoBar');
        const userIdDisplay = document.getElementById('userIdDisplay');

        if (!overlay) return;

        if (isAuthenticated()) {
            // User is authenticated, hide auth overlay
            overlay.classList.add('hidden');

            // Check if this page requires checklist completion
            if (requiresChecklist() && !isChecklistCompleted()) {
                // Show checklist required overlay
                if (checklistOverlay) {
                    checklistOverlay.classList.remove('hidden');
                }
                if (userInfoBar) {
                    userInfoBar.classList.add('hidden');
                }
            } else {
                // All good, show the page
                if (checklistOverlay) {
                    checklistOverlay.classList.add('hidden');
                }
                if (userInfoBar) {
                    userInfoBar.classList.remove('hidden');
                    const orgDisplay = document.getElementById('userOrgDisplay');
                    if (orgDisplay) {
                        orgDisplay.textContent = getOrganization();
                    }
                    if (userIdDisplay) {
                        userIdDisplay.textContent = getEmployeeId();
                    }
                }
            }
        } else {
            // Show authentication overlay
            overlay.classList.remove('hidden');
            if (checklistOverlay) {
                checklistOverlay.classList.add('hidden');
            }
            if (userInfoBar) {
                userInfoBar.classList.add('hidden');
            }
        }
    }

    // Handle form submission
    function handleAuthSubmit(e) {
        e.preventDefault();

        const orgSelect = document.getElementById('organization');
        const input = document.getElementById('employeeId');
        const errorEl = document.getElementById('authError');
        const organization = orgSelect ? orgSelect.value : 'NECTEC';
        const employeeId = input.value.trim();

        const validation = validateEmployeeId(employeeId);

        if (!validation.valid) {
            errorEl.textContent = validation.message;
            errorEl.classList.add('show');
            input.focus();
            return;
        }

        // Store and proceed
        setOrganization(organization);
        setEmployeeId(employeeId);

        const overlay = document.getElementById('authOverlay');
        const userInfoBar = document.getElementById('userInfoBar');
        const userIdDisplay = document.getElementById('userIdDisplay');
        const userOrgDisplay = document.getElementById('userOrgDisplay');

        overlay.classList.add('hidden');
        if (userInfoBar) {
            userInfoBar.classList.remove('hidden');
            if (userOrgDisplay) {
                userOrgDisplay.textContent = organization;
            }
            if (userIdDisplay) {
                userIdDisplay.textContent = employeeId;
            }
        }
    }

    // Expose functions globally
    window.authSystem = {
        isAuthenticated,
        getEmployeeId,
        getOrganization,
        logout,
        handleAuthSubmit
    };

    // Initialize custom select dropdown
    function initCustomSelect() {
        const customSelect = document.getElementById('customSelect');
        const hiddenSelect = document.getElementById('organization');
        const selectedText = document.getElementById('selectedText');

        if (!customSelect) return;

        const trigger = customSelect.querySelector('.custom-select-trigger');
        const options = customSelect.querySelectorAll('.custom-option');

        // Toggle dropdown
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            customSelect.classList.toggle('open');
        });

        // Select option
        options.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const value = this.dataset.value;
                const text = this.querySelector('span').textContent;

                // Update hidden select
                if (hiddenSelect) {
                    hiddenSelect.value = value;
                }

                // Update display text
                if (selectedText) {
                    selectedText.textContent = text;
                }

                // Update selected state
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');

                // Close dropdown
                customSelect.classList.remove('open');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!customSelect.contains(e.target)) {
                customSelect.classList.remove('open');
            }
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                customSelect.classList.remove('open');
            }
        });
    }

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        initAuth();
        initCustomSelect();
    });
})();
