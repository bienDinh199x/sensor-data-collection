/*
########  ########  #######  ##     ## #### ########  ########
##     ## ##       ##     ## ##     ##  ##  ##     ## ##
##     ## ##       ##     ## ##     ##  ##  ##     ## ##
########  ######   ##     ## ##     ##  ##  ########  ######
##   ##   ##       ##  ## ## ##     ##  ##  ##   ##   ##
##    ##  ##       ##    ##  ##     ##  ##  ##    ##  ##
##     ## ########  ##### ##  #######  #### ##     ## ########
*/
const serialPort = require(`serialport`);
const ByteLength = require(`@serialport/parser-byte-length`);
const { data2Db } = require(`./moduleData2Db`);

/*
######## ##     ## ##    ##  ######  ######## ####  #######  ##    ##
##       ##     ## ###   ## ##    ##    ##     ##  ##     ## ###   ##
##       ##     ## ####  ## ##          ##     ##  ##     ## ####  ##
######   ##     ## ## ## ## ##          ##     ##  ##     ## ## ## ##
##       ##     ## ##  #### ##          ##     ##  ##     ## ##  ####
##       ##     ## ##   ### ##    ##    ##     ##  ##     ## ##   ###
##        #######  ##    ##  ######     ##    ####  #######  ##    ##
*/

//NOTE: List all SerialPort
async function listSerialPort() {
  await serialPort.list()
    .then(portInfos => {
      console.table(`List serialport`, portInfos);

      return
    })
    .catch(err => {
      console.error(err);
      return
    })
}


//NOTE: Read data from SerialPort
function readSerialPort() {
  const Readline = serialPort.parsers.Readline
  const port = new serialPort(config.rs485.comPort, { baudRate: config.rs485.baudRate })
  var temp = ``
  port.on('open', () => {
    console.info(`Connect RS485 in serial port_yellow ${config.rs485.comPort}_green baudRate: _yellow${config.rs485.baudRate}`);
    const parser = port.pipe(new ByteLength({ length: 1 })) // Nhân từng ký tự
    parser.on('data', (data) => { // Thu dữ liệu 485
      // data = data.toString();
      // console.log(data);
      if (data.toString() == `#`) { // ngắt khi gặp ký tự kết thúc
        data2Db(temp)
        temp = ``
      } else {
        temp = temp + data
      }
    })
  })
}


module.exports = {
  listSerialPort,
  readSerialPort
}