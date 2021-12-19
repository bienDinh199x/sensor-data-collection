function trans(x) {
  for (var i = 0; i < json_lang.length; i++) {
    var y = new RegExp('(\\{' + json_lang[i].key + '\\})', 'g');
    if (typeof json_lang[i][flag_lang] != `undefined` && json_lang[i][flag_lang] != `` && json_lang[i][flag_lang] != null && json_lang[i][flag_lang] != `null`) {
      x = x.replace(y, json_lang[i][flag_lang])
    } else { x = x.replace(y, json_lang[i].vi) }
  }
  return x
}

function select_lang() {
  var x = document.getElementById("dropdown_select_lang");
  if (x.className.indexOf("w3-show") == -1) { x.className += " w3-show"; } else { x.className = x.className.replace(" w3-show", ""); }
}


function viewNumber(x) { if (x > 0) { return x } return `` }

function showNews(json) {
  $(`.header`).removeClass('blink_ok blink_alarm blink_not_ok')
  $(`.new`).html(trans(json.data))
  switch (json.check) {
    case true: $(`.header`).addClass(`blink_ok`); break;
    case false: $(`.header`).addClass(`blink_not_ok`); break;
    default: $(`.header`).addClass(`blink_alarm`); break;
  }
  flag.time_news = flag.time + 10000
}

function index_of(json, key, x, done) { // timf index theo key json
  if (json.length > 0) {
    if (key == ``) {
      for (var i = 0; i < json.length; i++) { if (json[i] == x) { return done(i) } }
    } else {
      for (var i = 0; i < json.length; i++) { if (json[i][key] == x) { return done(i) } }
    }
    return done(-1)
  } else { return done(-1) }
}

function change_layout(x, done) { // chuyển layout giao diện
  for (let i = 1; i < 11; i++) { removeButton(`.body #button${i}`) }
  flag.system_status = x
  $(`.ui-keyboard`).remove()
  Cookies.set(`flag`, JSON.stringify(flag))
  $(`.main>div`).hide()
  $(`#${x}`).show()
  return done()
}
function removeButton(x) {
  $(`${x}`).removeClass('w3-button w3-gray button_big')
  $(`${x} div`).html(``)
  $(`${x} table tr`).html(``)
}



function sortJsonDown(array, key) {
  return array.sort(function (a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0))
  })
}
function sortJsonUp(array, key) {
  if (array != null && array.length > 0) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x > y) ? -1 : ((x < y) ? 1 : 0))
    })
  } else {
    return array
  }




}

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