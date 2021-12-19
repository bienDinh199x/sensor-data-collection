/*
########  ########  #######  ##     ## #### ########  ########
##     ## ##       ##     ## ##     ##  ##  ##     ## ##
##     ## ##       ##     ## ##     ##  ##  ##     ## ##
########  ######   ##     ## ##     ##  ##  ########  ######
##   ##   ##       ##  ## ## ##     ##  ##  ##   ##   ##
##    ##  ##       ##    ##  ##     ##  ##  ##    ##  ##
##     ## ########  ##### ##  #######  #### ##     ## ########
*/
const { cli } = require('./moduleCLI');
const wifi = require('node-wifi');
// cần cài gói:  sudo apt install network-manager
wifi.init({
  iface: null // network interface, choose a random wifi interface if set to null
});
/*
######## ##     ## ##    ##  ######  ######## ####  #######  ##    ##
##       ##     ## ###   ## ##    ##    ##     ##  ##     ## ###   ##
##       ##     ## ####  ## ##          ##     ##  ##     ## ####  ##
######   ##     ## ## ## ## ##          ##     ##  ##     ## ## ## ##
##       ##     ## ##  #### ##          ##     ##  ##     ## ##  ####
##       ##     ## ##   ### ##    ##    ##     ##  ##     ## ##   ###
##        #######  ##    ##  ######     ##    ####  #######  ##    ##*/

//NOTE: Scan wifi
function getListWifi(socket) {
  cli(`iwlist wlan0 scan | grep ESSID`, (output) => {
    let arrSSID = output.replace(/"/g, ``).replace(/\n|\s+/g, ``).split(`ESSID:`)
    arrSSID.shift()
    if (socket) {
      socket.emit(`listWifi`, arrSSID)
    }
  })
  // wifi
  //   .scan()
  //   .then(networks => {
  //     // networks
  //     console.table(networks);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
}

function connectWifi(ssid, pass) {
  wifi.connect({ ssid: ssid, password: pass }, error => {
    if (error) {
      console.log(error);
    }
    console.log('Connected');
  });
}
function getWifiInfo(socket) {
  cli(`/sbin/iwconfig wlan0 | grep ESSID`, (output) => {
    let ssid = output.slice(output.search("ESSID:") + 6).replace(/"/g, ``).replace(/\n|\s+/g, ``)
    if (socket) {
      socket.emit(`wifiInfo`, ssid)
    }
  })

  // wifi.getCurrentConnections((error, currentConnections) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.obj(currentConnections);
  //     /*
  //     // you may have several connections
  //     [
  //         {
  //             iface: '...', // network interface used for the connection, not available on macOS
  //             ssid: '...',
  //             bssid: '...',
  //             mac: '...', // equals to bssid (for retrocompatibility)
  //             channel: <number>,
  //             frequency: <number>, // in MHz
  //             signal_level: <number>, // in dB
  //             quality: <number>, // same as signal level but in %
  //             security: '...' //
  //             security_flags: '...' // encryption protocols (format currently depending of the OS)
  //             mode: '...' // network mode like Infra (format currently depending of the OS)
  //         }
  //     ]
  //     */
  //   }
  // });
}
module.exports = {
  getListWifi,
  connectWifi,
  getWifiInfo
}