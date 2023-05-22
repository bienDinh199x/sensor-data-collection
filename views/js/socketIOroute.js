function socketIOroute(key, data) {
  switch (key) {
    case `connect`:
      console.info(`Connected Server`);
      break;
    case `userInfo`:
      console.info(`Người dùng cuối: ${data}`);
      $(`#user_name`).html(`${data.username} - ${data.classroom}`)
      $(`#set_username`).val(data.username)
      $(`#set_classname`).val(data.classroom)
      break;

    case `wifiInfo`:
      console.info(`Đang kết nối wifi: ${data}`);
      $(`#ssid_name`).html(data)
      break;
    case `listSensor`:
      console.info(`Nhận danh sách sensor`);
      listSensor = data
      showListDevice()
      break;
    case `dataSensor`:
      // console.log("dataSensor=" + data.val);
      listSensor[data.key] = data
      updateListSensor(data)
      updateDetail(data)
      break;

    case `listFile`:
      console.log(data);
      let h = ``
      h += `<table>`
      data.map((file) => {

        h += `<tr>
        <td style="font-size: 35px;color: green;" onclick="reviewFile('${file}')"><i class="fas fa-file-excel"></i></td>
        <td>${file}</td>
        </tr>`
      })

      h += `</tr>`
      $(`#list_file_excel`).html(h)

      break;
  }
}