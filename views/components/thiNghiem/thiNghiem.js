
function renderHtmlThiNghiem() {
  let h = `
<nav class="w3-sidebar w3-bar-block w3-collapse w3-large w3-theme-l1 w3-animate-left" id="mySidebar"></nav>

<div class="w3-btn w3-circle w3-blue toggle_chart" onclick="toggleMultiChart()"><i class="fas fa-pause fa-rotate-270"></i></div>
<div class="w3-main w3-white" style="margin-left:200px; height: 100%;">
  ${renderHtmlInfoChart(0)}
  ${renderHtmlInfoChart(1)}
</div>
  `
  return h
}


function renderHtmlInfoChart(x) {
  let html = `
  <div id="popup_save_chart" class="w3-modal">
  </div>
      <div id="view_chart_${x}" class="chart chart_view_50" onclick="funSelectChart(${x})">
      <span class="w3-badge w3-red">${x + 1}</span>
      <div class="w3-border w3-round-xlarge w3-card ${flagDetail == x ? `w3-border-red` : ``}">
        <div class="view_chart">
          <div class="list_chart">
            <div class="metter_chart">
              <div class="w3-card w3-round-large">
                <b>Đo lần 1</b>
                <canvas id="gauge${x}_0"></canvas>
              </div>
              <div class="w3-card w3-round-large">
                <b>Đo lần 2</b>
                <canvas id="gauge${x}_1"></canvas>
              </div>
              <div class="w3-card w3-round-large">
                <b>Đo lần 3</b>
                <canvas id="gauge${x}_2"></canvas>
              </div>
            </div>
            <div class="w3-card w3-round-large line_chart">
              <canvas id="line_${x}" width="587" height="230"></canvas>
            </div>
            <div class="w3-card w3-round-large table_chart">
            
            </div>
          </div>
          <div class="control_chart">
            <input class="w3-radio" type="radio" name="type_chart${x}" value="line" checked onclick="changeChart()"><label> Biểu đồ</label>
            <input class="w3-radio" type="radio" name="type_chart${x}" value="table" onclick="changeChart()"><label> Bảng</label>
            <input class="w3-radio" type="radio" name="type_chart${x}" value="metter" onclick="changeChart()"><label> Đồng hồ</label>
            <i class="lan_do">Lần đo thứ <b>...</b></i>
          </div>
        </div>
        <div class="info_chart w3-theme-l4">
          <div class="icon"><div style=" height: 100%; width: 100%;"></div></div>
          <div class="val"><span>__</span><sup>__</sup></div>
          <div class="time">__</div>
          <div class="name">__</div>
          <div class="">
            <div class="butonChart">
              <button class="w3-btn w3-round-large w3-green" onclick="startChart(${x},true)"><i class="fas fa-play-circle"></i> Start</button>
              <button class="w3-btn w3-round-large w3-red" onclick="startChart(${x},false)" style="display: none"><i class="fas fa-stop-circle"></i> Stop</button>
            </div>

            <div class="butonChart">
              <button class="w3-btn w3-round-large w3-yellow" onclick="clearChart(${x})" style="display: none"><i class="fas fa-minus-circle"></i> Clear</button>
            </div>

            <div class="butonChart">
              <button class="w3-btn w3-round-large w3-white" onclick="addChart(${x})" style="display: none"><i class="fas fa-plus-circle"></i> New chart</button>
            </div>
            
            <div class="butonChart">
              <button class="w3-btn w3-round-large w3-blue" onclick="fromSaveChart(${x})" style="display: none"><i class="fas fa-save"></i> Save</button>
            </div>
          </div>


        </div>
      </div>
    </div>
    `
  return html;
}

var flagToggleMultiChart = false;

function toggleMultiChart() {
  console.log(`toggleMultiChart`);
  flagToggleMultiChart = !flagToggleMultiChart
  changeChart()
}

function changeChart() {
  console.log("changeChart!");
  var typeChart0 = $('#view_chart_0 input[type=radio]:checked').val();
  var typeChart1 = $('#view_chart_1 input[type=radio]:checked').val();
  if (!flagToggleMultiChart) {
    $(`#view_chart_0`).removeClass('chart_view_50')
    $(`#view_chart_1`).removeClass('chart_view_50')
    $(`#view_chart_0`).addClass('chart_view_100')
    $(`#view_chart_1`).addClass('chart_view_0')

    $(`#view_chart_0 .list_chart div`).hide()
    $(`#view_chart_0 .list_chart .metter_chart`).show()
    $(`#view_chart_0 .list_chart .metter_chart div`).show()
    $("#view_chart_0 input[type=radio][value='metter']").prop("disabled", true);

    if (typeChart0 != 'metter') {
      $(`#view_chart_0 .list_chart .${typeChart0}_chart`).show()
    } else {
      $(`#view_chart_0 .list_chart .line_chart`).show()
      $("#view_chart_0 input[type=radio][value='line']").prop("checked", true);
    }
  } else {
    $(`#view_chart_0`).removeClass('chart_view_100')
    $(`#view_chart_1`).removeClass('chart_view_0')
    $(`#view_chart_0`).addClass('chart_view_50')
    $(`#view_chart_1`).addClass('chart_view_50')

    $(`.list_chart div`).hide()
    $("#view_chart_0 input[type=radio][value='metter']").attr("disabled", false);
    $(`#view_chart_0 .list_chart .${typeChart0}_chart`).show()
    $(`#view_chart_0 .list_chart .${typeChart0}_chart div`).show()
    $(`#view_chart_1 .list_chart .${typeChart1}_chart`).show()
    $(`#view_chart_1 .list_chart .${typeChart1}_chart div`).show()
  }
}