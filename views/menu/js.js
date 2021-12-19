

function menu(key) {

  console.log(readJson);
  // index_of(flagChart, `key`, key, (i) => {
  //   if (i == -1) { // Chỉ cho chọn sensor chưa được chọn
  //     if (flagChart[flagDetail].start == false) { // Không cho chọn lại sensor khi đang vẽ biểu đồ
  //       index_of(readJson, `key`, key, (i) => {
  //         flagChart[flagDetail].key = key // Gán key cho flagChart
  //         $(`#info_chart_${flagDetail} .name`).html(`${readJson[i].type} (${readJson[i].no})`)
  //         $(`#info_chart_${flagDetail} .time`).html(`${readJson[i].time}`)
  //         $(`#info_chart_${flagDetail} .val span`).html(readJson[i].val)
  //         $(`#info_chart_${flagDetail} .val sup`).html(readJson[i].unit)
  //         listSensor()
  //       })
  //     }
  //   }
  // })

  $(`#menu`).show()

}
