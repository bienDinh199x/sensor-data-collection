
function renderHtmlCaiDat() {
  let h = `
    <div class="w3-card card_setting">
      <button id="tab_set_user" class="w3-bar-item w3-button tablink1 w3-red" onclick="settingTabs('set_user')"><i class="fas fa-user-graduate"></i> Học sinh</button>
      <div id="set_user" class="w3-container w3-border tab_set">
        <p></p>  
        <label>Tên học sinh</label>
        <input id="set_username" class="w3-input w3-border w3-round" name="first" placeholder="Tên học sinh"></p>
        
        <label>Lớp</label>
        <input id="set_classname" class="w3-input w3-border w3-round" name="first" placeholder="Tên lớp"></p>

        <p><button class="w3-button w3-blue w3-round" onclick="saveUserInfo()">Lưu</button></p>

        <div class="w3-panel w3-light-grey w3-leftbar">
          <p>Vui lòng nhập tên và lớp của bạn</p>
          <p></p>
          <p>Vì thông tin này sẽ được đính kèm kết quả thí nghiệm, bởi vậy hãy nhập chính xác thông tin</p>
          
        </div>
      </div>


      <button id="tab_set_network" class="w3-bar-item w3-button tablink1 w3-gray" onclick="settingTabs('set_network')"><i class="fas fa-network-wired"></i> Cài đặt mạng</button>
      <div id="set_network" class="w3-container w3-border tab_set" style="display:none">


        <p><button class="w3-button w3-blue w3-round">Lưu</button></p>

        <div class="w3-panel w3-light-grey w3-leftbar">
          <p>Chọn wifi cần kết nối</p>
          <p>Nhập mật khẩu</p>
        </div>
      </div>


      <button id="tab_set_setting" class="w3-bar-item w3-button tablink1 w3-gray" onclick="settingTabs('set_setting')"><i class="fas fa-cog"></i> Cài đặt khác</button>
      <div id="set_setting" class="w3-container w3-border tab_set" style="display:none">

        <p><button class="w3-button w3-blue w3-round">Lưu</button></p>

        <div class="w3-panel w3-light-grey w3-leftbar">
          <p>Các cài đặt khác</p>
        </div>
      </div>





    </div>
    <div class="w3-card card_setting">
      <h3>Info</h3>
      Bản quyền thuộc về cty Điện tử 360
    </div>
    `
  return h
}



function settingTabs(tabname) {

  $(`.tablink1`).removeClass('w3-red').addClass('w3-gray')
  $(`.tab_set`).hide()
  $(`#tab_${tabname}`).removeClass('w3-gray')
  $(`#tab_${tabname}`).addClass('w3-red')
  $(`#${tabname}`).show()
}


function saveUserInfo() {
  let username = $(`#set_username`).val()
  let classname = $(`#set_classname`).val()
  socket.emit(`saveUserInfo`, {
    username: username,
    classroom: classname
  })
}
