/*
##       ####  ######  ########
##        ##  ##    ##    ##
##        ##  ##          ##
##        ##   ######     ##
##        ##        ##    ##
##        ##  ##    ##    ##
######## ####  ######     ##
*/



function updateListSensor(json) {
  $(`#${json.type}_${json.no} .val`).html(json.val)
  $(`#${json.type}_${json.no} .unit`).html(json.unit)
  $(`#${json.type}_${json.no} .sensor_status`).html(`Connected`)
  $(`#${json.type}_${json.no}`).removeClass(`w3-light-gray w3-hover-light-gray`)
  $(`#${json.type}_${json.no}`).addClass(`w3-green w3-hover-green`)

}

