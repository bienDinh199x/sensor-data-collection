/*
########  ########  #######  ##     ## #### ########  ########
##     ## ##       ##     ## ##     ##  ##  ##     ## ##
##     ## ##       ##     ## ##     ##  ##  ##     ## ##
########  ######   ##     ## ##     ##  ##  ########  ######
##   ##   ##       ##  ## ## ##     ##  ##  ##   ##   ##
##    ##  ##       ##    ##  ##     ##  ##  ##    ##  ##
##     ## ########  ##### ##  #######  #### ##     ## ########*/
const serialPort = require(`serialport`);
const ByteLength = require(`@serialport/parser-byte-length`);
const { data2Db } = require(`./moduleData2Db`);
const { listFile } = require(`./moduleFile`);
const cli = require(`./moduleCLI`)
const { readJson, writeJson } = require(`../helpers/helperJson`)
const { connectWifi, getWifiInfo, getListWifi } = require(`./moduleWifi`)
const { getUserInfo, saveUserInfo } = require(`./moduleUser`)
const { saveChart, readChart } = require(`./moduleExcel`)

/*
########   #######  ##     ## ######## ########  ######
##     ## ##     ## ##     ##    ##    ##       ##    ##
##     ## ##     ## ##     ##    ##    ##       ##
########  ##     ## ##     ##    ##    ######    ######
##   ##   ##     ## ##     ##    ##    ##             ##
##    ##  ##     ## ##     ##    ##    ##       ##    ##
##     ##  #######   #######     ##    ########  ######*/
//NOTE: Route socketIO
function route(socket, key, data) {
  switch (key) {
    case 'disconnect': disconnect(socket); break;

    case 'reboot': cli.reboot(); break;
    case 'shutdown': cli.shutdown(); break;

    case 'getUserInfo': getUserInfo(socket); break;
    case 'saveUserInfo': saveUserInfo(socket, data); break;

    case 'getWifiInfo': getWifiInfo(socket); break;

    case 'getListSensor': getListSensor(socket); break;
    case 'getListFile': listFile(); break;
    case 'saveDataChart': saveDataChart(socket, data); break;
    case 'reviewFile': reviewFile(socket, data); break;


    default: console.warn(`socketIO topic ${key}`); break;
  }
}
/*
######## ##     ## ##    ##  ######  ######## ####  #######  ##    ##
##       ##     ## ###   ## ##    ##    ##     ##  ##     ## ###   ##
##       ##     ## ####  ## ##          ##     ##  ##     ## ####  ##
######   ##     ## ## ## ## ##          ##     ##  ##     ## ## ## ##
##       ##     ## ##  #### ##          ##     ##  ##     ## ##  ####
##       ##     ## ##   ### ##    ##    ##     ##  ##     ## ##   ###
##        #######  ##    ##  ######     ##    ####  #######  ##    ##*/
function disconnect(socket) {
  console.log(` _red Disconnect client IP _yellow ${socket.handshake.address.slice(7)} _red SocketID: _yellow ${socket.id} `);
}

function getListSensor(socket) {
  listSensor = readJson(`sensor`)
  socket.emit(`listSensor`, listSensor)
}




function saveDataChart(socket, data) {
  console.log('em o day anh oi !!!!!!!!!!');
  saveChartExcelData(data)
}


function reviewFile(socket, obj) {
  json = readChart(obj.fileName)
  console.log(json);
}




module.exports = {
  route
}