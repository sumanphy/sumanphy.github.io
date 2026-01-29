// Load and display Google Scholar citation data
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

function createCitationChart(citationsPerYear) {
    const years = Object.keys(citationsPerYear).sort();
    const citations = years.map(year => citationsPerYear[year]);
    
    const ctx = document.getElementById('citationsChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Citations per Year',
                data: citations,
                backgroundColor: '#2a5298',
                borderColor: '#1e3c72',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Citations by Year',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: '#1e3c72'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    },
                    title: {
                        display: true,
                        text: 'Number of Citations',
                        font: {
                            size: 12
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year',
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

// Load citation data when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadCitationData();
});