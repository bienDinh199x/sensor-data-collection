
/*
 ########  ######## ########    ###    #### ##       
 ##     ## ##          ##      ## ##    ##  ##       
 ##     ## ##          ##     ##   ##   ##  ##       
 ##     ## ######      ##    ##     ##  ##  ##       
 ##     ## ##          ##    #########  ##  ##       
 ##     ## ##          ##    ##     ##  ##  ##       
 ########  ########    ##    ##     ## #### ######## 
*/
function detail(key) {
  if (flagChart[0].key != key && flagChart[1].key != key) {
    console.log(flagDetail);
    if (flagChart[flagDetail].start == false) { // Không cho chọn lại sensor khi đang vẽ biểu đồ

      flagChart[flagDetail] = JSON.parse(JSON.stringify(resetFlagchart))
      flagChart[flagDetail].key = key // Gán key cho flagChart



      $(`#view_chart_${flagDetail} .name`).html(`${listSensor[key].type} (${listSensor[key].no})`)
      $(`#view_chart_${flagDetail} .time`).html(`${listSensor[key].time}`)
      $(`#view_chart_${flagDetail} .val span`).html(listSensor[key].val)
      $(`#view_chart_${flagDetail} .val sup`).html(listSensor[key].unit)
      $(`#view_chart_${flagDetail} .icon`).html(`<div style="background: transparent url('./static/images/${listSensor[key].type}.png') 0 0/100% 100% no-repeat; height: 100%; width: 100%;"></div>`)

      if (typeof listSensor[key].min == `number` && typeof listSensor[key].max == `number`) { // Set max min gauge nếu có
        var x = -1
        if (key == flagChart[0].key) { x = 0 }
        else if (key == flagChart[1].key) { x = 1 }
        let min = listSensor[key].min
        let max = listSensor[key].max
        let range = max - min

        line[x].options.scales.y.min = min;
        line[x].options.scales.y.max = max;
        line[x].update();

        data = [min + range * .1, min + range * .2, min + range * .3, min + range * .4, min + range * .5, min + range * .6, min + range * .7, min + range * .8, min + range * .9, max]
        // gauge[x][0].config.data.datasets[0].data = data; gauge[x][0].update();
        // gauge[x][1].config.data.datasets[0].data = data; gauge[x][1].update();
        // gauge[x][2].config.data.datasets[0].data = data; gauge[x][2].update();
      } else { // Không có max, min --> Set mặc định
        // gauge[x][0].config.data.datasets[0].data = gaugeData; gauge[x][0].update();
        // gauge[x][1].config.data.datasets[0].data = gaugeData; gauge[x][1].update();
        // gauge[x][2].config.data.datasets[0].data = gaugeData; gauge[x][2].update();
      }

      // gauge[x][0].config.data.datasets[0].value = 0; gauge[x][0].update();
      // gauge[x][1].config.data.datasets[0].value = 0; gauge[x][1].update();
      // gauge[x][2].config.data.datasets[0].value = 0; gauge[x][2].update();
      line[x].data.datasets[0].data = []; line[x].update();
      line[x].data.datasets[1].data = []; line[x].update();
      line[x].data.datasets[2].data = []; line[x].update();

    }
  }
  statusDevice()
}

function updateDetail(json) {
  var x = -1
  if (json.key == flagChart[0].key) { x = 0 }
  else if (json.key == flagChart[1].key) { x = 1 }
  if (x > -1) {
    $(`#view_chart_${x} .time`).html(`${json.time}`)
    $(`#view_chart_${x} .val span`).html(json.val)
    $(`#view_chart_${x} .val sup`).html(json.unit)
    if (flagChart[x].start == true) { addDataChart(x, json) }
  }
}



function addDataChart(x, json) {
  console.log(x);
  // console.log(x);
  // gauge[x][flagChart[x].numChart].config.data.datasets[0].value = json.val
  // gauge[x][flagChart[x].numChart].update();

  flagChart[x].count++;
  if (flagChart[x].count > config.chart.maxLength) {
    flagChart[x].count = config.chart.maxLength
    line[x].data.datasets[flagChart[x].numChart].data.splice(0, 1)
  }
  // chart[x].data.datasets[flagChart[x].numChart].data.push(json.val);
  line[x].data.datasets[flagChart[x].numChart].data[flagChart[x].count] = json.val;
  flagChart[x].data[flagChart[x].numChart].push(json.val)
  line[x].update();
}