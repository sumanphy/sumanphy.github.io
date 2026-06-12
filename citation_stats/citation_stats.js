// Load and display Google Scholar citation data
let citationChart = null;

async function loadCitationData() {
    try {
        const response = await fetch('citation_stats/scholar_data.json');
        const data = await response.json();

        // Update metrics
        document.getElementById('total-citations').textContent = data.total_citations;
        document.getElementById('h-index').textContent = data.h_index;
        document.getElementById('i10-index').textContent = data.i10_index;
        document.getElementById('last-updated').textContent = `${data.last_updated}`;

        // Create chart
        createCitationChart(data.citations_per_year);

    } catch (error) {
        console.error('Error loading citation data:', error);
        document.getElementById('total-citations').textContent = 'N/A';
        document.getElementById('h-index').textContent = 'N/A';
        document.getElementById('i10-index').textContent = 'N/A';
    }
}

// Read the current theme's colors from the CSS variables so the chart
// always matches the site theme (light or dark)
function chartTheme() {
    const cs = getComputedStyle(document.documentElement);
    const v = name => cs.getPropertyValue(name).trim();
    return {
        accent: v('--accent') || '#1a5dab',
        ink: v('--ink') || '#1d2433',
        muted: v('--muted') || '#67707d',
        grid: v('--glass-inner-border') || 'rgba(60, 75, 105, 0.22)'
    };
}

function barGradient(ctx, area, accent) {
    const g = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    g.addColorStop(0, accent + '55');
    g.addColorStop(1, accent + 'E6');
    return g;
}

function createCitationChart(citationsPerYear) {
    const years = Object.keys(citationsPerYear).sort();
    const citations = years.map(year => citationsPerYear[year]);

    const canvas = document.getElementById('citationsChart');
    const ctx = canvas.getContext('2d');
    const theme = chartTheme();

    // Keep the metric cards aligned with the chart's plot area (the region
    // right of the y-axis labels) on larger screens
    const syncMetricsPlugin = {
        id: 'syncMetrics',
        afterLayout(chart) {
            const metrics = document.querySelector('.citation-metrics-compact');
            if (!metrics) return;
            if (window.matchMedia('(min-width: 721px)').matches) {
                metrics.style.paddingLeft = chart.chartArea.left + 'px';
                metrics.style.paddingRight = (chart.width - chart.chartArea.right) + 'px';
            } else {
                metrics.style.paddingLeft = '';
                metrics.style.paddingRight = '';
            }
        }
    };

    citationChart = new Chart(ctx, {
        type: 'bar',
        plugins: [syncMetricsPlugin],
        data: {
            labels: years,
            datasets: [{
                label: 'Citations',
                data: citations,
                backgroundColor: (c) => c.chart.chartArea
                    ? barGradient(c.chart.ctx, c.chart.chartArea, chartTheme().accent)
                    : theme.accent,
                hoverBackgroundColor: (c) => chartTheme().accent,
                borderWidth: 0,
                borderRadius: 7,
                borderSkipped: false,
                maxBarThickness: 46,
                categoryPercentage: 0.72
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 700, easing: 'easeOutQuart' },
            plugins: {
                legend: { display: false },
                title: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(20, 25, 38, 0.92)',
                    titleColor: '#ffffff',
                    bodyColor: 'rgba(255, 255, 255, 0.85)',
                    padding: 12,
                    cornerRadius: 9,
                    displayColors: false,
                    callbacks: {
                        label: (item) => `${item.parsed.y} citation${item.parsed.y === 1 ? '' : 's'}`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    border: { display: false },
                    grid: { color: theme.grid, drawTicks: false },
                    ticks: {
                        precision: 0,
                        color: theme.muted,
                        padding: 10,
                        font: { size: 12 }
                    }
                },
                x: {
                    border: { display: false },
                    grid: { display: false },
                    ticks: {
                        color: theme.muted,
                        font: { size: 12, weight: '500' }
                    }
                }
            }
        }
    });
}

// Re-color the chart when the user switches between light and dark mode
new MutationObserver(() => {
    if (!citationChart) return;
    const theme = chartTheme();
    citationChart.options.scales.y.grid.color = theme.grid;
    citationChart.options.scales.y.ticks.color = theme.muted;
    citationChart.options.scales.x.ticks.color = theme.muted;
    citationChart.update('none');
}).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

// Load citation data when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadCitationData();
});
