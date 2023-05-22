/*
########  ########  #######  ##     ## #### ########  ########
##     ## ##       ##     ## ##     ##  ##  ##     ## ##
##     ## ##       ##     ## ##     ##  ##  ##     ## ##
########  ######   ##     ## ##     ##  ##  ########  ######
##   ##   ##       ##  ## ## ##     ##  ##  ##   ##   ##
##    ##  ##       ##    ##  ##     ##  ##  ##    ##  ##
##     ## ########  ##### ##  #######  #### ##     ## ########
*/

const { readJson, writeJson } = require(`../helpers/helperJson`)

/*
 ########     ###    ########    ###    
 ##     ##   ## ##      ##      ## ##   
 ##     ##  ##   ##     ##     ##   ##  
 ##     ## ##     ##    ##    ##     ## 
 ##     ## #########    ##    ######### 
 ##     ## ##     ##    ##    ##     ## 
 ########  ##     ##    ##    ##     ## 
*/
// NOTE:10 Nhận bản tin 485
function data2Db(data) {

  data = data.replace(/\r/g, ""); // lọc dấu \n và \r
  data = data.replace(/\n/g, "");
  console.log(data);
  if (data.slice(0, 1) == '@') { // chỉ nhận bắt đầu @
    // console.log(data);
    data = data.replace(/@/g, ""); // bỏ @
    data = data.replace(/%/g, ""); // bỏ @
    if (data == data.replace(/[^a-zA-Z0-9,._-]/g, "")) { // Không có ký tự lạ
      arr = data.split(',')
      console.time(arr[1]);
      if (arr.length >= 4) {
        json = {
          type: arr[0],
          no: arr[1],
          val: +arr[2],
          unit: arr[3],
          min: arr[2] ? arr[2] : null,
          max: arr[2] ? +arr[2] : null,
          key: `${arr[0]}_${arr[1]}`,
          unit_time: utc0Time
        }
        listSensor[json.key] = json;
        console.log(json);
        // writeJson(`sensor`, listSensor)
        io.emit(`dataSensor`, json)
        console.timeEnd(arr[1]);
      }
    }
  }

}

module.exports = {
  data2Db
}