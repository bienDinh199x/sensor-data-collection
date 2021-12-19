const
  // db = require(`../helpers/connect_sqlite3.js`),
  { readJson, writeJson } = require(`../helpers/helperJson`),
  control = require('./module_control.js')
/*
 
 ##       ####  ######  ######## 
 ##        ##  ##    ##    ##    
 ##        ##  ##          ##    
 ##        ##   ######     ##    
 ##        ##        ##    ##    
 ##        ##  ##    ##    ##    
 ######## ####  ######     ##    
 
*/
function listAllDevice() {
  return readJson(`sensor`)
}
/*
 
    ###    ########  ########  
   ## ##   ##     ## ##     ## 
  ##   ##  ##     ## ##     ## 
 ##     ## ##     ## ##     ## 
 ######### ##     ## ##     ## 
 ##     ## ##     ## ##     ## 
 ##     ## ########  ########  
 
*/
function saveDevices(json) {
  write(`sensor`, json)
}
/*
 
 ######## ########  #### ######## 
 ##       ##     ##  ##     ##    
 ##       ##     ##  ##     ##    
 ######   ##     ##  ##     ##    
 ##       ##     ##  ##     ##    
 ##       ##     ##  ##     ##    
 ######## ########  ####    ##    
 
*/
function edit(json) {
  // common.time_string((time_string, time) => {
  //   let query = `UPDATE sensor SET val=${json.val}, unit='${json.unit}', time='${time_string}', unit_time=${time} WHERE key='${json.type}_${json.no}'`
  //   db(query, (err, _results) => {
  //     let query = `INSERT INTO data (key, val, date, time) VALUES ('${json.type}_${json.no}', ${json.val}, '${time_string.slice(0, 10)}', '${time_string}')`
  //     db(query, (err, _results) => {
  //     })
  //   })
  // })
}
/*
 ########  ######## ##       ######## ######## ######## 
 ##     ## ##       ##       ##          ##    ##       
 ##     ## ##       ##       ##          ##    ##       
 ##     ## ######   ##       ######      ##    ######   
 ##     ## ##       ##       ##          ##    ##       
 ##     ## ##       ##       ##          ##    ##       
 ########  ######## ######## ########    ##    ######## 
*/
function del(json, done) {
  db(`DELETE FROM sensor WHERE (facp_id='${json.dte_id.slice(0, 2)}' AND dte_id='${json.dte_id.slice(-3)}')`, (err, _results) => {
    if (err) { return done(false, '') }
    else {
      control.dte_to_facp(json.facp_id, (check) => {
        return done(true, `Delete DTE id ${json.dte_id} successful!`)
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
function listDteToFacp(facp_id) {



}

module.exports = {
  listAllDevice,
  saveDevices
}