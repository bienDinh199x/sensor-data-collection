const sqlite3 = require('sqlite3').verbose()
module.exports = function (query, done) {
  var db = new sqlite3.Database(config.data, (err) => { if (err) { console.log(__file, __line, `_red ${err.message}`); } })
  db.serialize(() => {
    db.all(query, (err, results) => { return done(err, results) })
    db.close((err) => { if (err) { console.log(__file, __line, `_red ${err.message}`); } })
  })
}