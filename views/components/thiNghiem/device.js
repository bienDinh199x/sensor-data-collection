function showListDevice() { // list sensor
  var html = ``
  for (let i in listSensor) {
    html += `
      <button id="${listSensor[i].key}" class="w3-button w3-card w3-border w3-hover-border-red w3-round sensor" onclick="detail('${listSensor[i].key}')">
        <div class="w3-badge w3-deep-orange"></div>
        <div class="icon_val">
          <div class="icon" style="background: transparent url('../static/images/${listSensor[i].type}.png') 0 0/100% 100% no-repeat;"></div>
          <span class="val">${listSensor[i].val}</span><sup class="unit">${listSensor[i].unit}</sup>
        </div>
        <div class="sensor_info">
          <div class="info">
          <b>${listSensor[i].type}</b><br>
          ${listSensor[i].no}
          </div>
          <div class="sensor_status"></div>
        </div>
      </button>
      <div class="btn_menu w3-button w3-round w3-border w3-white" onclick="menu('${listSensor[i].key}')"><i class="fas fa-bars"></i></div>`
  }
  $(`#mySidebar`).html(html)
  statusDevice()
}


function statusDevice() {
  time_string((_str, now, zone) => {
    console.log(listSensor);
    for (let i in listSensor) {
      switch (listSensor[i].key) {
        case flagChart[0].key:
          $(`#${listSensor[i].key} .w3-badge`).html(1)
          break;
        case flagChart[1].key:
          $(`#${listSensor[i].key} .w3-badge`).html(2)
          break;
        default:
          $(`#${listSensor[i].key} .w3-badge`).html(``)
          break;
      }
      if ((now - zone * 60 * 60 * 1000 - listSensor[i].unit_time * 1000) > 5000) {
        $(`#${listSensor[i].key}`).addClass(`w3-light-gray`)
        $(`#${listSensor[i].key}`).removeClass(`w3-green`)
      } else {
        $(`#${listSensor[i].key}`).addClass(`w3-green`)
        $(`#${listSensor[i].key}`).removeClass(`w3-light-gray`)
      }
    }
  })
}


function funSelectChart(x) {
  flagDetail = x
  $(`.chart>div`).removeClass(`w3-border-red`)
  $(`#view_chart_${x}>div`).addClass(`w3-border-red`)
}