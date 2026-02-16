// Dashboard JavaScript
(function() {
    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzylM96oiM837gDntJnqvfR3t7GEKb8OBaD2VdFfUaQ93PQ0j0Hrc3EHiqayIgHWsQg/exec';

    let chartInstance = null;
    let dashboardData = null;

    // Color palette for organizations
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

    // Icon palette for organizations
    const iconPalette = ['🏢', '👤', '🏛️', '🏭', '🏫', '🏥', '🏦', '🏪'];

    // Fetch dashboard data from Google Sheet
    async function fetchDashboardData() {
        try {
            const response = await fetch(GOOGLE_SHEET_URL + '?action=dashboard');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            return null;
        }
    }

    // Update stats cards dynamically
    function updateStatsCards(data) {
        const container = document.getElementById('statsCards');
        const totalEl = document.getElementById('totalUsers');

        if (!container || !data) return;

        // Update total
        if (totalEl) totalEl.textContent = data.total || 0;

        // Remove existing org cards (keep total card)
        const existingOrgCards = container.querySelectorAll('.stat-card.org-card');
        existingOrgCards.forEach(card => card.remove());

        // Add cards for each organization
        if (data.organizations) {
            const orgs = Object.entries(data.organizations);
            orgs.forEach(([orgName, count], index) => {
                const card = document.createElement('div');
                card.className = 'stat-card org-card';
                card.style.borderLeftColor = colorPalette[index % colorPalette.length].border;

                const icon = iconPalette[index % iconPalette.length];

                card.innerHTML = `
                    <div class="stat-icon">${icon}</div>
                    <div class="stat-info">
                        <span class="stat-number">${count}</span>
                        <span class="stat-label">${orgName}</span>
                    </div>
                `;

                container.appendChild(card);
            });
        }
    }

    // Create or update chart (with optional organization filter)
    function updateChart(data, period, filterOrg = 'all') {
        const ctx = document.getElementById('usageChart');
        if (!ctx) return;

        const chartData = data[period];
        if (!chartData) return;

        if (chartInstance) {
            chartInstance.destroy();
        }

        // Build datasets for each organization (filtered if needed)
        const datasets = [];
        let orgNames = Object.keys(chartData.data || {});

        // Filter to specific organization if selected
        if (filterOrg !== 'all') {
            orgNames = orgNames.filter(name => name === filterOrg);
        }

        orgNames.forEach((orgName, index) => {
            // Find original index for consistent coloring
            const originalIndex = Object.keys(chartData.data || {}).indexOf(orgName);
            const color = colorPalette[originalIndex % colorPalette.length];
            datasets.push({
                label: orgName,
                data: chartData.data[orgName],
                backgroundColor: color.bg,
                borderColor: color.border,
                borderWidth: 1,
                borderRadius: 4
            });
        });

        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartData.labels || [],
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                }
            }
        });
    }

    // Initialize filter buttons (period: daily, monthly, yearly)
    function initFilterButtons() {
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                buttons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const period = this.dataset.period;
                if (dashboardData) {
                    const selectedOrg = document.getElementById('orgFilter')?.value || 'all';
                    updateChart(dashboardData, period, selectedOrg);
                }
            });
        });
    }

    // Populate organization filter dropdown
    function populateOrgFilter(data) {
        const select = document.getElementById('orgFilter');
        if (!select || !data.organizations) return;

        // Clear existing options except "ทั้งหมด"
        select.innerHTML = '<option value="all">ทั้งหมด</option>';

        // Add organization options
        Object.keys(data.organizations).forEach(orgName => {
            const option = document.createElement('option');
            option.value = orgName;
            option.textContent = orgName;
            select.appendChild(option);
        });

        // Add change event listener
        select.addEventListener('change', function() {
            const activeBtn = document.querySelector('.filter-btn.active');
            const period = activeBtn?.dataset.period || 'daily';
            updateChart(dashboardData, period, this.value);
        });
    }

    // Show/hide loading
    function setLoading(loading) {
        const loadingEl = document.getElementById('chartLoading');
        if (loadingEl) {
            if (loading) {
                loadingEl.classList.remove('hidden');
            } else {
                loadingEl.classList.add('hidden');
            }
        }
    }

    // Initialize dashboard
    async function initDashboard() {
        if (!document.getElementById('usageChart')) return;

        setLoading(true);
        initFilterButtons();

        dashboardData = await fetchDashboardData();

        if (dashboardData) {
            updateStatsCards(dashboardData);
            populateOrgFilter(dashboardData);
            updateChart(dashboardData, 'daily', 'all');
        } else {
            // Show empty state - no demo data
            dashboardData = getEmptyData();
            updateStatsCards(dashboardData);
            updateChart(dashboardData, 'daily');
            showErrorMessage('ไม่สามารถโหลดข้อมูลได้ กรุณาตรวจสอบการเชื่อมต่อ Google Sheets');
        }

        setLoading(false);
    }

    // Show error message
    function showErrorMessage(message) {
        const container = document.getElementById('statsCards');
        if (container) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'stat-card error-card';
            errorDiv.style.borderLeftColor = '#e74c3c';
            errorDiv.style.gridColumn = '1 / -1';
            errorDiv.innerHTML = `
                <div class="stat-icon">⚠️</div>
                <div class="stat-info">
                    <span class="stat-label" style="color: #e74c3c;">${message}</span>
                </div>
            `;
            container.appendChild(errorDiv);
        }
    }

    // Empty data when API fails (no mock data)
    function getEmptyData() {
        const today = new Date();

        // Daily labels (last 7 days)
        const dailyLabels = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            dailyLabels.push(date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }));
        }

        // Monthly labels (last 6 months)
        const monthlyLabels = [];
        for (let i = 5; i >= 0; i--) {
            const date = new Date(today);
            date.setMonth(date.getMonth() - i);
            monthlyLabels.push(date.toLocaleDateString('th-TH', { month: 'short', year: '2-digit' }));
        }

        // Yearly labels (last 3 years)
        const yearlyLabels = [];
        for (let i = 2; i >= 0; i--) {
            const year = today.getFullYear() - i + 543;
            yearlyLabels.push('ปี ' + year);
        }

        return {
            total: 0,
            organizations: {},
            daily: { labels: dailyLabels, data: {} },
            monthly: { labels: monthlyLabels, data: {} },
            yearly: { labels: yearlyLabels, data: {} }
        };
    }

    document.addEventListener('DOMContentLoaded', initDashboard);
})();
