require('@datdp88/nodejs-datdp-pretty-console-log')
console.log(`_bg_yellow=============_bg_red START APP _bg_yellow=============`);
/*
.######   ##        #######  ########     ###    ##       
##    ##  ##       ##     ## ##     ##   ## ##   ##       
##        ##       ##     ## ##     ##  ##   ##  ##       
##   #### ##       ##     ## ########  ##     ## ##       
##    ##  ##       ##     ## ##     ## ######### ##       
##    ##  ##       ##     ## ##     ## ##     ## ##       
.######   ########  #######  ########  ##     ## ########*/
require(`./modules/moduleGlobal`) // Khai báo biến/hàm toàn cục
unixTimerNow()

/*
########  ########  #######  ##     ## #### ########  ########
##     ## ##       ##     ## ##     ##  ##  ##     ## ##
##     ## ##       ##     ## ##     ##  ##  ##     ## ##
########  ######   ##     ## ##     ##  ##  ########  ######
##   ##   ##       ##  ## ## ##     ##  ##  ##   ##   ##
##    ##  ##       ##    ##  ##     ##  ##  ##    ##  ##
##     ## ########  ##### ##  #######  #### ##     ## ########*/
const { readJson, writeJson } = require('./helpers/helperJson')


// NOTE: Khai báo biến toàn cục
var box_id_name = {}, // id + tên tủ 
  total_list_box = [], // danh sách các tủ kết nối trong hệ thống
  total_list_nac = [],
  total_list_io = [],
  total_list_dte = [],
  total_list_facp = [],
  flag_send = 1, // cờ báo trạng thái đường truyền 485 (0: đang truyền + chờ trả về / 1: sẵn sàng truyền lệnh mới)
  flag_time = 0, // cờ báo thời gian truyền lệnh gần nhất theo ms (dùng để tính timeout)
  flag_module = '', // cờ báo module nhận lệnh
  flag_send_key = '', // cờ báo key gửi lệnh

  flag_facp = 0, // cờ báo index board FACP tiếp theo được đọc giá trị
  flag_facp_nac_io = 0, // cờ báo index board tiếp theo được đọc trạng thái

  flag_output_nac_io = [], // cờ ghi trạng thái các output
  flag_output_nac_io_control_key = {}, // cờ ghi các output được điều khiển


  json_control = [],
  list_facp = [],
  json_facp = [],
  list_facp_keys = [],

  json_nac = [],
  list_io = [],
  list_type_sensor = [],
  list_zone_json = [],
  list_zone_array = [],
  list_zone_tree = [],
  list_audio = [],
  list_file_audio = [],
  json_board_status = [],
  json_board_status_temp = [],

  json_alarm = [],

  array_board = [], // mảng các FACP cần hỏi dữ liệu + NAC, IO cần hỏi trạng thái
  array_board_facp = [], // mảng các FACP cần hỏi trạng thái

  str_sensor_type = '[]',
  json_user = [],
  json_dte = [],
  flag_audio = { timems: 86400000 },
  list_mp3_play = [],
  temp_list_mp3_play = [],
  flag_mp3_play = 0,
  xxx = `xxxxxxxxxxxxxxxxxxxx`,
  json_lang = require('./views/json_lang.json'),
  ioClient



// NOTE: Khai báo require module

const express = require(`express`), //thư viện web server
  app = express(),
  server = require("http").Server(app), // khởi tạo server

  compression = require(`compression`), //nén js, css => gzip
  fs = require(`fs`),
  os = require(`os`)




//////////////////////////
const serial = require('./modules/moduleSerialPort')
serial.listSerialPort() // List danh sách cổng RS485
serial.readSerialPort() // Đọc cổng RS485


global.io = require(`socket.io`)(server)

listSensor = readJson(`sensor`)

console.log(listSensor);

/*
##     ## #### ########  ########  ##       ######## ##      ##    ###    ########  ######## 
###   ###  ##  ##     ## ##     ## ##       ##       ##  ##  ##   ## ##   ##     ## ##       
#### ####  ##  ##     ## ##     ## ##       ##       ##  ##  ##  ##   ##  ##     ## ##       
## ### ##  ##  ##     ## ##     ## ##       ######   ##  ##  ## ##     ## ########  ######   
##     ##  ##  ##     ## ##     ## ##       ##       ##  ##  ## ######### ##   ##   ##       
##     ##  ##  ##     ## ##     ## ##       ##       ##  ##  ## ##     ## ##    ##  ##       
##     ## #### ########  ########  ######## ########  ###  ###  ##     ## ##     ## ######## 
*/
//ENABLE CORS
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  // res.header("Cache-Control", "public")
  // res.header("Cache-Control", "no-cache")
  // res.header("Cache-Control", "max-age=3600")
  next()
})

// app.use(express.static(__dirname + '/node_modules'))
app.use('/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free'));
app.use('/chart.js', express.static(__dirname + '/node_modules/chart.js'));
app.use('/chartjs-gauge', express.static(__dirname + '/node_modules/chartjs-gauge'));
app.use('/chartjs-plugin-datalabels', express.static(__dirname + '/node_modules/chartjs-plugin-datalabels'));
// app.use('/fortawesome', express.static(__dirname + '/node_modules/@fortawesome'));
app.use(`/static`, express.static(__dirname + '/views'))
app.set("view engine", "ejs")

app.use(compression()) // Nén data res


/*
########   #######  ##     ## ######## ######## 
##     ## ##     ## ##     ##    ##    ##       
##     ## ##     ## ##     ##    ##    ##       
########  ##     ## ##     ##    ##    ######   
##   ##   ##     ## ##     ##    ##    ##       
##    ##  ##     ## ##     ##    ##    ##       
##     ##  #######   #######     ##    ########*/
const routes = require('./routes')
routes(app)
/*
######## #### ##     ## ######## ########
.  ##     ##  ###   ### ##       ##     ##
.  ##     ##  #### #### ##       ##     ##
.  ##     ##  ## ### ## ######   ########
.  ##     ##  ##     ## ##       ##   ##
.  ##     ##  ##     ## ##       ##    ##
.  ##    #### ##     ## ######## ##     ##*/
//
// NOTE: TIMER hệ thống
//
function timer() {
  console.log(new Date().getTime());
}

/*
.######   #######   ######  ##    ## ######## ########     ####  #######
##    ## ##     ## ##    ## ##   ##  ##          ##         ##  ##     ##
##       ##     ## ##       ##  ##   ##          ##         ##  ##     ##
.######  ##     ## ##       #####    ######      ##         ##  ##     ##
.     ## ##     ## ##       ##  ##   ##          ##         ##  ##     ##
##    ## ##     ## ##    ## ##   ##  ##          ##    ###  ##  ##     ##
.######   #######   ######  ##    ## ########    ##    ### ####  #######*/
const arrTopicSocketIO = [ // Các sự kiện Server cần hứng
  `disconnect`,
  `shutdown`,
  `reboot`,

  `getUserInfo`,
  `saveUserInfo`,
  `getWifiInfo`,
  `getListSensor`,
  `getListFile`,

  `saveDataChart`,
  `reviewFile`,
]
const socketIO = require(`./modules/moduleSocketIO`)
io.on("connection", (socket) => {
  console.log(` _green Client IP _yellow ${socket.handshake.address.slice(7)} _green SocketID: _yellow ${socket.id} `);
  arrTopicSocketIO.map((key) => {
    socket.on(key, (data) => {
      socketIO.route(socket, key, data)
    })
  })
})
/*
##     ## ######## ######## ########
##     ##    ##       ##    ##     ##
##     ##    ##       ##    ##     ##
#########    ##       ##    ########
##     ##    ##       ##    ##
##     ##    ##       ##    ##
##     ##    ##       ##    ##*/
const { getListWifi, connectWifi, getWifiInfo } = require(`./modules/moduleWifi`)
server.listen(config.portserver, () => {
  console.info(`Khởi động Server cổng:_yellow ${config.portserver}`);
  getListWifi()
  // connectWifi(`Hien`, `21051988`)
  // getWifiInfo()
  setInterval(() => { timer() }, 1000)
})


// const usbEvents = require('detect-usb');

/*
######## #### ##     ## ######## ########  
.  ##     ##  ###   ### ##       ##     ## 
.  ##     ##  #### #### ##       ##     ## 
.  ##     ##  ## ### ## ######   ########  
.  ##     ##  ##     ## ##       ##   ##   
.  ##     ##  ##     ## ##       ##    ##  
.  ##    #### ##     ## ######## ##     ## */
// NOTE: lấy thời gian hệ thống
// Thời gian hệ thống tính theo gốc UTC0
// Sử dụng khi nhận data, đồng bộ thời gian socketIO, thòi điểm đăng nhập,...
setInterval(() => {
  unixTimerNow()
}, 500)
function unixTimerNow() {
  common.getTime((_str, time, timeZone) => {
    utc0Time = Math.round(time / 1000 - timeZone * 60 * 60)
    // console.log(utc0Time);
  })
}
