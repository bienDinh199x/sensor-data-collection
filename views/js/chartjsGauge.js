var gaugeData = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
var gaugeOptions = {
    title: {
        display: false,
    },
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            yAlign: 'bottom',
            displayColors: false
        }
    }
}
const gaugeNeedle = {
    id: 'gaugeNeedle',
    afterDatasetDraw(chart, args, options) {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;
        const centerX = chartArea.left + chartArea.width / 2;
        const centerY = chartArea.top + chartArea.height / 2 + 40;
        const radius = chartArea.width / 2;
        const needleLength = radius * 0.8;
        const needleWidth = radius * 0.032;
        const needleCircleRadius = radius * 0.02;
        const value = chart.data.datasets[0].value;
        const angle = ((value / 100) * Math.PI) + Math.PI; // Đảo ngược góc để kim chỉ trỏ vào trung tâm
        const needleEnd = {
            x: centerX + needleLength * Math.cos(angle),
            y: centerY + needleLength * Math.sin(angle)
        };
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(needleEnd.x, needleEnd.y);
        ctx.lineWidth = needleWidth;
        ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
        ctx.stroke();

        //needle dot
        ctx.beginPath();
        ctx.arc(centerX, centerY, needleCircleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fill();

        ctx.font = '30px Helvetica'
        ctx.fillText(value, centerX, centerY);
        ctx.textAlign = 'center';
        ctx.fill();
        ctx.restore();
    }
}



var configChartGauge0 = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: gaugeData,
            value: 0,
            backgroundColor: ['#d2eafd', '#a6d4fa', '#79bff8', '#4daaf6', '#2196f3', '#0c87eb', '#0b78d1', '#0a69b7', '#085a9d', '#074b83'],
            borderWidth: 1,
            cutout: '95%',
            circumference: 180,
            rotation: 270,
            borderRadius: 5
        }]
    },
    options: gaugeOptions,
    plugins: [gaugeNeedle]
};

var configChartGauge1 = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: gaugeData,
            value: 0,
            backgroundColor: ['#fdd9d6', '#fbb3ae', '#f98d85', '#f6665c', '#f44336', '#f32617', '#e11a0c', '#c5170a', '#a91409', '#8d1007'],
            borderWidth: 1,
            cutout: '95%',
            circumference: 180,
            rotation: 270,
            borderRadius: 5
        }]
    },
    options: gaugeOptions,
    plugins: [gaugeNeedle]
};

var configChartGauge2 = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: gaugeData,
            value: 0,
            backgroundColor: ['#d9efda ', '#b3dfb5 ', '#8dce91 ', '#68be6c ', '#48a74c ', '#419745 ', '#3a863d ', '#327536 ', '#2b652e ', '#245426 '],
            borderWidth: 1,
            cutout: '95%',
            circumference: 180,
            rotation: 270,
            borderRadius: 5
        }]
    },
    options: gaugeOptions,
    plugins: [gaugeNeedle]
};