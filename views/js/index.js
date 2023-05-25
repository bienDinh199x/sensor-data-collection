var listCom = '',
  readJson = [],
  flagModeChart = 1,
  flagViewDetail = false,
  flagCountChart = 0,

  flagStart0 = false,
  numChart0 = 0,

  flagSelectSensor0,
  flagSelectSensor1,
  flagSelectSensor2,



  flagDetail = 0,
  resetFlagchart = {
    count: -1,
    numChart: 0,
    start: false,
    key: "",
    data: {
      0: [],
      1: [],
      2: []
    }
  },

  flagChart = [
    JSON.parse(JSON.stringify(resetFlagchart)),
    JSON.parse(JSON.stringify(resetFlagchart)),
  ],

  line = [],
  gauge = {
    0: [],
    1: [],
    2: []
  },
  listSensor = []



const arrTopicSocketIO = [ // Các sự kiện Server cần hứng
  `connect`,
  `disconnect`,

  `userInfo`,
  `wifiInfo`,
  `listSensor`,
  `dataSensor`,

  `listFile`,
]
/*
########  ########    ###    ########  ##    ##
##     ## ##         ## ##   ##     ##  ##  ##
##     ## ##        ##   ##  ##     ##   ####
########  ######   ##     ## ##     ##    ##
##   ##   ##       ######### ##     ##    ##
##    ##  ##       ##     ## ##     ##    ##
##     ## ######## ##     ## ########     ##*/
$(document).ready(() => { // NOTE: tự chạy khi đã tải xong toàn bộ web

  // NOTE: giao thức socketIO
  socket = io()
  arrTopicSocketIO.map((key) => {
    socket.on(key, (data) => {
      socketIOroute(key, data)
    })
  })


  socket.emit(`getUserInfo`) // lấy thông tin người dùng cuối
  socket.emit(`getWifiInfo`) // lấy thông tin wifi đang kết nối
  socket.emit(`getListSensor`) // lấy danh sách sensor đã có
  socket.emit(`getListFile`) // lấy danh sách file excel



  renderRoot()
  renderHtmlThiNghiem()
  openMainTab('thi_nghiem')
  start()
})
/*
 ######  ########    ###    ########  ########
##    ##    ##      ## ##   ##     ##    ##
##          ##     ##   ##  ##     ##    ##
 ######     ##    ##     ## ########     ##
      ##    ##    ######### ##   ##      ##
##    ##    ##    ##     ## ##    ##     ##
 ######     ##    ##     ## ##     ##    ##
*/

function start() {


  socket.emit(`list`)
  toggleMultiChart()
  setInterval(() => { timer() }, 5000)
}
function timer() {
  statusDevice()
}

// updateDetail(json)
function viewInfo() {
  $(`#popup`).show()
  $(`#popup header>div`).html('Info')
  $(`#popup nav`).html(listCom)

  var arr = listCom.split(`,`)
  if (arr.length > 0) {
    for (var i = 0; i < arr.length; i++) {
      arr[i]
    }
  }
}

/*
 ######  ##     ##    ###    ########  ########
##    ## ##     ##   ## ##   ##     ##    ##
##       ##     ##  ##   ##  ##     ##    ##
##       ######### ##     ## ########     ##
##       ##     ## ######### ##   ##      ##
##    ## ##     ## ##     ## ##    ##     ##
 ######  ##     ## ##     ## ##     ##    ##
*/
function modeChart() {
  flagModeChart = 3 - flagModeChart
  if (flagModeChart == 1) {
    funSelectChart(0)
    $(`#mode_chart_1`).show();
    $(`#mode_chart_2`).hide();
  } else {
    funSelectChart(1)
    $(`#mode_chart_1`).hide();
    $(`#mode_chart_2`).show();
  }
}





/*
########  ##     ## ######## ########  #######  ##    ##
##     ## ##     ##    ##       ##    ##     ## ###   ##
##     ## ##     ##    ##       ##    ##     ## ####  ##
########  ##     ##    ##       ##    ##     ## ## ## ##
##     ## ##     ##    ##       ##    ##     ## ##  ####
##     ## ##     ##    ##       ##    ##     ## ##   ###
########   #######     ##       ##     #######  ##    ##
*/
function startChart(x, command) {
  flagChart[x].start = command
  if (command) {
    $(`#view_chart_${x} .w3-green`).hide()
    $(`#view_chart_${x} .w3-red`).show()
    $(`#view_chart_${x} .w3-white`).hide()
    $(`#view_chart_${x} .w3-blue`).hide()
    $(`#view_chart_${x} .w3-yellow`).hide()
    $(`#mode_chart`).hide()
  } else {
    $(`#view_chart_${x} .w3-green`).show()
    $(`#view_chart_${x} .w3-blue`).show()
    $(`#view_chart_${x} .w3-red`).hide()
    if (flagChart[x].count > 0) {
      $(`#view_chart_${x} .w3-yellow`).show()
      if (flagChart[x].numChart < 2) {
        $(`#view_chart_${x} .w3-white`).show()
      }
    }
    // Hiện nút chuyển mode chart khi không còn biểu đồ đang vẽ
    $(`#mode_chart`).show()
    for (let key in flagChart) { if (flagChart[key].start) { $(`#mode_chart`).hide() } }
  }
  $(`#view_chart_${x} .lan_do b`).html(flagChart[x].numChart + 1)
}

function addChart(x) {
  flagChart[x].numChart++;
  flagChart[x].count = -1;
  $(`#view_chart_${x} .w3-yellow`).hide()
  $(`#view_chart_${x} .w3-white`).hide()
}


function clearChart(x) {
  console.log(x);
  if (line[x] && line[x].data && line[x].data.datasets) {
    for (let i = 0; i <= flagChart[x].count; i++) {
      if (line[x].data.datasets[i]) {
        line[x].data.datasets[i].data = [];
        line[x].update();
      }
      if (gauge[x][i]) {
        gauge[x][i].config.data.datasets[0].value = 0;
        gauge[x][i].update();
      }
    }
  }

  if (flagChart[x]) {
    flagChart[x].count = -1;
    flagChart[x].numChart = -1;
  }

  $(`#info_chart_${x} .w3-white`).hide();
  $(`#info_chart_${x} .w3-yellow`).hide();

  $(`#view_chart_${x} .lan_do b`).html(flagChart[x].numChart + 1);
  addChart(x);
}

function fromSaveChart(x) {
  $(`#popup_save_chart`).html(`
    <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:500px">
      <div class="w3-container">
        <div class="w3-section">
          <label><b>Bài thí nghiệm</b></label>
          <input id="name_test" class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Nhập tên thí nghiệm tại đây" required>
          <button class="w3-button w3-green w3-section w3-padding" type="submit" onclick="saveChart(${x})">Save</button>
          <button onclick="$('#popup_save_chart').hide()" type="button" class="w3-button w3-red">Cancel</button>
        </div>
          <div class="w3-panel w3-light-grey w3-leftbar">
            <p>Vui lòng nhập tên bài thí nghiệm
            <p>Vì thông tin này giúp tránh nhầm lẫn giữa các báo cáo sau này
          </div>
      </div>
    </div>`)
  $(`#popup_save_chart`).show()

}
function saveChart(x) {
  let chartName = $(`#name_test`).val()
  let userName = $(`#user_name`).html().replace(/\s||\s+/g, '')
  socket.emit(`saveDataChart`, {
    chartName: chartName,
    userName: userName,
    data: flagChart[x].data
  })
  $('#popup_save_chart').hide()
}
