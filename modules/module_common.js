const crc16 = require('../modules/module_crc16.js')
// db = require(`./connect_sqlite3.js`),
os = require(`os`)

/////////////////////////////////////////////////////
function getIP(json, done) {
  json_temp = os.networkInterfaces()
  for (key in json_temp) {
    for (var i = 0; i < json_temp[key].length; i++) {
      for (var j = 0; j < json.length; j++) {
        if (`192.168.1.${json[j].id}` == json_temp[key][i].address) {
          return done(json[j].id, json[j].name)
        }
      }
    }
  }
  return done(false)
}

/////////////////////////////////////////////////////
function saveLog(json) {
  time_string((time_string, time) => {
    db(`UPDATE log SET time_end = '${time}', time_string_end = '${time_string}' WHERE id = (SELECT id FROM log WHERE (device = '${json.device}' AND type_log='${json.type_log}') ORDER BY id DESC LIMIT 1)`, (_err, _results) => { })
    db(`INSERT INTO log (time_start, time_string_start, type_log, device, note) VALUES ('${time}', '${time_string}', '${json.type_log}', '${json.device}', '${json.note}')`, (_err, _results) => { })
  })
}

function readLog(time, done) {
  if (time == ``) { // lấy bản tin mới nhất
    var query = `SELECT * FROM log WHERE id > (SELECT MAX(id) from log) - 100 ORDER BY id ASC`
  } else {
    var query = `SELECT * FROM log WHERE time_start > ${time} ORDER BY id ASC`
  }
  db(query, (err, results) => {
    if (err) {
      return done([])
    } else {
      for (var i = 0; i < results.length; i++) {
        if (results[i].time_end * 1 != 0) {
          results[i].time_string_end = `<br><i class="fas fa-arrow-right"></i> ${results[i].time_string_end}`
        } else { results[i].time_string_end = `` }
      }
      return done(results)
    }
  })
}


/////////////////////////////////////////////////////
function readTemp(x, done) {
  db(`SELECT data FROM temp WHERE type = '${x}'`, (err, results) => { if (err) { return done([]) } else { return done(JSON.parse(results[0].data)) } })
}

function saveTemp(x, data) {
  db(`UPDATE temp SET data = '${data}' WHERE type = '${x}'`, (_err, _results) => { })
}
/////////////////////////////////////////////////////


function time_string(done) {
  var d = new Date(), // lấy thời gian thực cho đồng hồ
    date = `0${d.getDate()}`.slice(-2),
    month = `0${d.getMonth() + 1}`.slice(-2),
    year = d.getFullYear(),
    hour = `0${d.getHours()}`.slice(-2),
    minute = `0${d.getMinutes()}`.slice(-2),
    second = `0${d.getSeconds()}`.slice(-2),
    time = d.getTime(),
    zone = -d.getTimezoneOffset() / 60
  return done(`${year}-${month}-${date} ${hour}:${minute}:${second}`, time, zone)
}



function index_of(json, key, x, done) { // callback index theo key json
  return done(fun_index_of(json, key, x))
}

function fun_index_of(json, key, x) { // tìm index theo key json
  if (json.length > 0) {
    for (var i = 0; i < json.length; i++) {
      if (typeof json[i][key] !== "undefined") { if (json[i][key] == x) { return i } }
    }
    return -1
  } else { return -1 }
}

function find_delete(json, key, x, done) { // xóa theo key json
  a_json = JSON.parse(JSON.stringify(json))
  var a = fun_index_of(json, key, x)
  while (a != -1) {
    json.splice(a, 1);
    a = fun_index_of(json, key, x)
  }
  return done(json)
}



function get_flag_audio(list_audio, done) {
  var d = new Date(),
    now = d.getHours() * 3600000 + d.getMinutes() * 60000,
    year = d.getFullYear(),
    month = d.getMonth(),
    date = d.getDate(),
    day = d.getDay(),
    max = 28
  switch (month + 1) {
    case 2:
      if (year % 100 == 0) { year = year / 100 }
      if (year % 4 == 0) { max = 29 }
      break;
    case 4:
    case 6:
    case 9:
    case 11: max = 30; break;
    default: max = 31; break;
  }

  for (let i = 0; i < list_audio.length; i++) {
    if (list_audio[i].enable * 1 == 1 && list_audio[i].timems > now) { // tìm các notify enable
      switch (list_audio[i].type_loop) {
        case `no_loop`: // lặp theo tuần
          if (list_audio[i].data.slice(-2) * 1 > max) { list_audio[i].data = `${list_audio[i].data.slice(0, -2)}${max}` }
          if (list_audio[i].data == `${year}-${month}-${date}`) { return done(list_audio[i]) } // Đúng ngày
          break;
        case `week_loop`: // lặp theo tuần
          if (list_audio[i].data.indexOf(day) != -1) { return done(list_audio[i]) } // Đúng thứ trong tuần
          break;
        case `month_loop`: // lặp theo tháng
          if (list_audio[i].data * 1 > max) { list_audio[i].data = max }
          if (list_audio[i].data == date) { return done(list_audio[i]) } // đúng ngày trong tháng
          break;
        case `year_loop`: // lặp theo tháng
          if (list_audio[i].data.slice(-2) * 1 > max) { list_audio[i].data = `${list_audio[i].data.slice(0, -2)}${max}` }
          if (list_audio[i].data == `${month}-${date}`) { return done(list_audio[i]) } // đúng ngày trong năm
          break;
      }
    }
  }
  return done('')
}
function checkCRC(data, done) {
  crc(data, (x) => { // 2f
    if (x) { return done(true, data) } else {
      crc(data = `${data}f`, (x) => { // 3f
        if (x) { return done(true, data) } else {
          crc(data = `${data}f`, (x) => { // 4f
            if (x) { return done(true, data) } else {
              crc(data = `${data}f`, (x) => { // 5f
                if (x) { return done(true, data) } else {
                  crc(data = `${data}f`, (x) => { //6f
                    if (x) { return done(true, data) }
                    else { return done(false, data) }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
}
/*
 
 ######## ##     ## ##    ##  ######  ######## ####  #######  ##    ## 
 ##       ##     ## ###   ## ##    ##    ##     ##  ##     ## ###   ## 
 ##       ##     ## ####  ## ##          ##     ##  ##     ## ####  ## 
 ######   ##     ## ## ## ## ##          ##     ##  ##     ## ## ## ## 
 ##       ##     ## ##  #### ##          ##     ##  ##     ## ##  #### 
 ##       ##     ## ##   ### ##    ##    ##     ##  ##     ## ##   ### 
 ##        #######  ##    ##  ######     ##    ####  #######  ##    ## 
 
*/

function crc(data, done) {
  let buffer = Buffer.from(data.slice(0, -6), 'hex')
  return done(crc16(buffer) == data.slice(-6, -2))
}
module.exports = {
  getIP: getIP,
  readTemp: readTemp,
  saveTemp: saveTemp,
  saveLog: saveLog,
  readLog: readLog,
  time_string: time_string,
  index_of: index_of,
  find_delete: find_delete,
  get_flag_audio: get_flag_audio,
  checkCRC: checkCRC
}