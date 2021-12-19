// const db = require(`../helpers/connect_sqlite3.js`)


function list(done) {
  db(`SELECT * FROM control WHERE count > -1`, (err, results) => {
    if (err) { return done([]) } else { return done(results) }
  })
}







function nac_io(name, id, command, done) {
  module_name = `${name}${id}`
  common.time_string((time_string, time) => {
    switch (name) {
      case `NAC`:
        command = `00${command}0`.slice(-3)
        query = `INSERT INTO control (count, module, time, command, key) VALUES (5, '${module_name}', '${time_string}', '02200${id}${time}xxxxxxx000${command}', '${time}')`
        db(query, (_err, _results) => {
          db(`INSERT INTO log (time_start, time_string_start, type_log, device, note, data) VALUES ('${time}', '${time_string}', 'control', 'NAC${id}', '${command}', '')`, () => { })
          return done()
        })
        break;
      case `IO`:
        command = `0000${command}0`.slice(-5)
        query = `INSERT INTO control (count, module, time, command, key) VALUES (5, '${module_name}', '${time_string}', '03300${id}${time}xxxxxxx000${command}', '${time}')`
        db(query, (_err, _results) => {
          db(`INSERT INTO log (time_start, time_string_start, type_log, device, note, data) VALUES ('${time}', '${time_string}', 'control', 'IO${id}', '${command}', '')`, () => { })
          return done()
        })
        break;
    }
  })
}


//
// NOTE: Ghi số lần điều khiển
// * count == 10 => Đếm lùi count--
// * count != 10 => gán luôn giá trị count
//
function saveCount(key, count, done) {
  if (count == -10) {
    db(`SELECT count FROM control WHERE key='${key}'`, (_err, results) => {
      if (results.length > 0) { db(`UPDATE control SET count = ${results[0].count - 1} WHERE key='${key}'`, (_err, _results) => { list((json) => { return done(json) }) }) }
    })
  } else { db(`UPDATE control SET count = ${count} WHERE key='${key}'`, (_err, _results) => { list((json) => { return done(json) }) }) }
}





//
// NOTE: Tổng hợp lệnh điều khiển output NAC - IO
// * control_key: json chứa các output cần đóng tương ứng các board NAC, IO hoặc zone
// * array_output: array chứa các output cần đóng tổng hợp từ control_key
//










module.exports = {
  list: list,
  saveCount: saveCount,
  nac_io: nac_io
}