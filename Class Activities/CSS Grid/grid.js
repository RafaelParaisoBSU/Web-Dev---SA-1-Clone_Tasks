const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart) => {
        const ctx = chart.ctx;
        const data = chart.config.data.datasets[0].data;
        const total = data.reduce((a, b) => a + b, 0);
        const percentage = Math.round((data[0] / total) * 100);
        const label = `${percentage}%`;

        ctx.restore();
        ctx.font = 'bold 32px Montserrat';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000'; // Text color
        const centerX = chart.getDatasetMeta(0).data[0].x;
        const centerY = chart.getDatasetMeta(0).data[0].y;
        ctx.fillText(label, centerX, centerY);
        ctx.save();
    }
};

document.addEventListener('DOMContentLoaded', function () {
    // Work Completed Chart
    const workCompletedData = {
        labels: ['Finished', 'Remaining'],
        datasets: [{
            data: [7, 3],
            backgroundColor: ['#00A308', 'grey'],
            hoverBackgroundColor: ['lime', 'lightgrey'],
            borderColor: ['#ffffff', '#ffffff'],
            borderWidth: 2
        }]
    };

    const workCompletedConfig = {
        type: 'doughnut',
        data: workCompletedData,
        options: {
            responsive: true,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const label = tooltipItem.label || '';
                            const value = tooltipItem.raw || 0;
                            return `${label}: ${value}`;
                        }
                    }
                }
            }
        },
        plugins: [centerTextPlugin]
    };

    const workCompletedChart = new Chart(
        document.getElementById('workCompletedChart'),
        workCompletedConfig
    );

    // Work Graded Chart
    const workGradedData = {
        labels: ['Graded', 'Remaining'],
        datasets: [{
            data: [89, 11],
            backgroundColor: ['purple', 'grey'],
            hoverBackgroundColor: ['violet', 'lightgrey'],
            borderColor: ['#ffffff', '#ffffff'],
            borderWidth: 2
        }]
    };

    const workGradedConfig = {
        type: 'doughnut',
        data: workGradedData,
        options: {
            responsive: true,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const label = tooltipItem.label || '';
                            const value = tooltipItem.raw || 0;
                            return `${label}: ${value}%`;
                        }
                    }
                }
            }
        },
        plugins: [centerTextPlugin]
    };

    const workGradedChart = new Chart(
        document.getElementById('workGradedChart'),
        workGradedConfig
    );
});