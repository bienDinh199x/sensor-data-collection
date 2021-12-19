/*
########  ########  #######  ##     ## #### ########  ########
##     ## ##       ##     ## ##     ##  ##  ##     ## ##
##     ## ##       ##     ## ##     ##  ##  ##     ## ##
########  ######   ##     ## ##     ##  ##  ########  ######
##   ##   ##       ##  ## ## ##     ##  ##  ##   ##   ##
##    ##  ##       ##    ##  ##     ##  ##  ##    ##  ##
##     ## ########  ##### ##  #######  #### ##     ## ########
*/
const fs = require("fs");


/*
 ########     ###    ########    ###    
 ##     ##   ## ##      ##      ## ##   
 ##     ##  ##   ##     ##     ##   ##  
 ##     ## ##     ##    ##    ##     ## 
 ##     ## #########    ##    ######### 
 ##     ## ##     ##    ##    ##     ## 
 ########  ##     ##    ##    ##     ## 
*/
// NOTE: Read json file
function readJson(file) {
  let data = fs.readFileSync(`./data/json/${file}.json`) || '{}';
  let str = data.toString() || '{}'
  return JSON.parse(str);
}

// NOTE: Write json file
function writeJson(file, json) {
  fs.writeFileSync(`./data/json/${file}.json`, JSON.stringify(json));
}

module.exports = {
  readJson,
  writeJson,
}