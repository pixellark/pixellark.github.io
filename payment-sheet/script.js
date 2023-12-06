document.addEventListener('DOMContentLoaded', function() {
    // Sample data for the line chart
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Current Year Sales',
          data: [10, 20, 15, 25, 18],
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.2)',
          borderWidth: 2,
          pointRadius: 5,
          pointBackgroundColor: '#3498db',
        },
        {
          label: 'Previous Year Sales',
          data: [8, 18, 12, 20, 15],
          borderColor: '#e74c3c',
          backgroundColor: 'rgba(231, 76, 60, 0.2)',
          borderWidth: 2,
          pointRadius: 5,
          pointBackgroundColor: '#e74c3c',
        }
      ]
    };
  
    // Get the canvas element
    const ctx = document.getElementById('lineChart').getContext('2d');
  
    // Create the line chart
    const lineChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: [{
            grid: {
              display: false,
            },
          }],
          y: [{
            grid: {
              display: true,
            },
          }]
        },
      }
    });
  });
  