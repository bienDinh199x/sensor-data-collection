const cookie = require('cookie')


//
// NOTE: Common Tạo 1 chuỗi ngẫu nhiên
// * gọi hàm randomString(do_dai_chuoi)
//
function randomString(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
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


function getTime(done) {
  var d = new Date(), // lấy thời gian thực cho đồng hồ
    timeZone = d.getTimezoneOffset() / (-60), // lấy timezone
    date = `0${d.getDate()}`.slice(-2),
    month = `0${d.getMonth() + 1}`.slice(-2),
    year = d.getFullYear(),
    hour = `0${d.getHours()}`.slice(-2),
    minute = `0${d.getMinutes()}`.slice(-2),
    second = `0${d.getSeconds()}`.slice(-2),
    time = d.getTime()
  return done(`${year}-${month}-${date} ${hour}:${minute}:${second}`, time, timeZone)
}


function index_of(json, key, x, done) { // timf index theo key json
  if (json.length > 0) {
    for (var i = 0; i < json.length; i++) { if (json[i][key] == x) { return done(i) } }
    return done(-1)
  } else { return done(-1) }
}

function hexToString(data, done) { // timf index theo key json
  str = ``
  for (var i = 0; i < data.length; i += 2) {
    a = `0x` + data.slice(i, i + 2)
    str += String.fromCharCode(a)
  }
  return done(str)
}

function get_flag_audio(list_audio, done) {
  var d = new Date(),
    now = d.getHours() * 3600000 + d.getMinutes() * 60000
  for (let i = 0; i < list_audio.length; i++) {
    if (list_audio[i].enable = 'true' && list_audio[i].loop != 0) { // tìm các notify enable và loop khác 0

      switch (list_audio[i].type_loop) {
        // case `count`: // lặp theo lươt
        //   if (list_audio[i].data.indexOf(d.getDay()) != -1) {
        //     if (list_audio[i].timems > now) {
        //       return done(list_audio[i])
        //     }
        //   }
        //   break;
        case `week`: // lặp theo tuần
          if (list_audio[i].data.indexOf(d.getDay()) != -1) { // Đúng thứ trong tuần
            if (list_audio[i].timems > now) {
              return done(list_audio[i], i)
            }
          }
          break;
        case `month`: // lặp theo tháng
          if (`0${list_audio[i].data}`.slice(-2).indexOf(`0${d.getDate()}`.slice(-2)) != -1) { // đúng ngày
            if (list_audio[i].timems > now) {
              return done(list_audio[i], i)
            }
          }
          break;
      }
    }
  }
  return done('')
}


function getSocketKey(socket) {
  if (socket.handshake.headers.cookie) {
    return cookie.parse(socket.handshake.headers.cookie).key
  } else { return '' }
}

module.exports = {
  randomString,
  readTemp,
  saveTemp,
  saveLog,
  readLog,
  getTime,
  index_of,
  hexToString,
  get_flag_audio,
  getSocketKey
}
