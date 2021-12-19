var gaugeData = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
var gaugeOptions = {
 responsive: true,
 title: {
  display: false,
 },
 layout: {
  padding: {
   top: 0,
   bottom: 5,
   left: 0,
   right: 0
  }
 },
 needle: {
  // Needle circle radius as the percentage of the chart area width
  radiusPercentage: 1,
  // Needle width as the percentage of the chart area width
  widthPercentage: 3.2,
  // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
  lengthPercentage: 80,
  // The color of the needle
  color: 'rgba(0, 0, 0, 1)'
 }
}
var configChartGauge0 = {
 type: 'gauge',
 data: {
  datasets: [{
   data: gaugeData,
   value: 0,
   backgroundColor: ['#d2eafd', '#a6d4fa', '#79bff8', '#4daaf6', '#2196f3', '#0c87eb', '#0b78d1', '#0a69b7', '#085a9d', '#074b83'],
   borderWidth: 1
  }]
 },
 options: gaugeOptions
};

var configChartGauge1 = {
 type: 'gauge',
 data: {
  datasets: [{
   data: gaugeData,
   value: 0,
   backgroundColor: ['#fdd9d6', '#fbb3ae', '#f98d85', '#f6665c', '#f44336', '#f32617', '#e11a0c', '#c5170a', '#a91409', '#8d1007'],
   borderWidth: 1
  }]
 },
 options: gaugeOptions
};

var configChartGauge2 = {
 type: 'gauge',
 data: {
  datasets: [{
   data: gaugeData,
   value: 0,
   backgroundColor: ['#d9efda ', '#b3dfb5 ', '#8dce91 ', '#68be6c ', '#48a74c ', '#419745 ', '#3a863d ', '#327536 ', '#2b652e ', '#245426 '],
   borderWidth: 1
  }]
 },
 options: gaugeOptions
};