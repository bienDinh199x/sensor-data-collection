function renderRoot() {
  let h = `
  <div class="w3-bar w3-black">
    <div id="logo">
      <div id="logo_thanhnam"></div><span>DIEN TU 360 TECH</span>
    </div>

    <button id="tab_thi_nghiem" class="w3-bar-item w3-button tablink" onclick="openMainTab('thi_nghiem')"><i class="fas fa-flask"></i> Thí nghiệm</button>
    <button id="tab_bao_cao" class="w3-bar-item w3-button tablink" onclick="openMainTab('bao_cao')"><i class="fas fa-file-medical-alt"></i> Báo cáo</button>
    <button id="tab_cai_dat" class="w3-bar-item w3-button tablink" onclick="openMainTab('cai_dat')"><i class="fas fa-cogs"></i> Cài đặt</button>


    <div class="w3-dropdown-click w3-right">
      <button onclick="toggleMenuPower()" class="w3-button w3-text-red"><i class="fas fa-power-off" style="font-size: 20px;"></i></button>
      <div id="dropdown_power" class="w3-dropdown-content w3-bar-block w3-card-4 w3-animate-zoom"  style="right:0">
        <a href="#" class="w3-bar-item w3-button" onclick="shutdown()"><i class="fas fa-power-off"></i> Tắt máy</a>
        <a href="#" class="w3-bar-item w3-button" onclick="reboot()"><i class="fas fa-redo"></i> Khởi động lại</a>
      </div>
    </div>
    <div id="icon_status">
      <div><b class="fas fa-user-graduate"></b><div id="user_name">--</div></div>
      <div><b class="fas fa-battery-three-quarters"></b><div id="battery_val">--%</div></div>
      <div><b class="fas fa-wifi"></b><div id="ssid_name">--</div></div>
    </div>
  </div>

  <div id="thi_nghiem" class="main_tab">${renderHtmlThiNghiem()}</div>

  <div id="bao_cao" class="main_tab">${renderHtmlBaoCao()}</div>

  <div id="cai_dat" class="main_tab">${renderHtmlCaiDat()}</div>`
  $(`#root`).html(h)
  setTimeout(() => {
    line[0] = new Chart(document.getElementById(`line_0`), JSON.parse(JSON.stringify(configChartLine)));
    // gauge[0][0] = new Chart(document.getElementById('gauge0_0').getContext('2d'), configChartGauge0);
    // gauge[0][1] = new Chart(document.getElementById('gauge0_1').getContext('2d'), configChartGauge1);
    // gauge[0][2] = new Chart(document.getElementById('gauge0_2').getContext('2d'), configChartGauge2);

    line[1] = new Chart(document.getElementById(`line_1`), JSON.parse(JSON.stringify(configChartLine)));
    // gauge[1][0] = new Chart(document.getElementById('gauge1_0').getContext('2d'), configChartGauge0);
    // gauge[1][1] = new Chart(document.getElementById('gauge1_1').getContext('2d'), configChartGauge1);
    // gauge[1][2] = new Chart(document.getElementById('gauge1_2').getContext('2d'), configChartGauge2);
  }, 2000)

}

function openMainTab(tabName) {
  $(".tablink").removeClass('w3-red');
  $(`#tab_${tabName}`).addClass("w3-red");
  $(".main_tab").hide();
  $(`#${tabName}`).show();
  switch (tabName) {
    case 'thi_nghiem':
      socket.emit(`listSensor`)
      break;
  }
}

function toggleMenuPower() {
  $('#dropdown_power').toggle()
}

function reboot() {
  socket.emit(`reboot`)
}
function shutdown() {
  socket.emit(`shutdown`)
}