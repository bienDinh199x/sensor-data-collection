require('../helpers/helper_mysql.js')
const { apiListDevice, apiOneDevice, apiShareDevice } = require('../models/model_device.js')

/*
######## ##     ## ##    ##  ######  ######## ####  #######  ##    ##
##       ##     ## ###   ## ##    ##    ##     ##  ##     ## ###   ##
##       ##     ## ####  ## ##          ##     ##  ##     ## ####  ##
######   ##     ## ## ## ## ##          ##     ##  ##     ## ## ## ##
##       ##     ## ##  #### ##          ##     ##  ##     ## ##  ####
##       ##     ## ##   ### ##    ##    ##     ##  ##     ## ##   ###
##        #######  ##    ##  ######     ##    ####  #######  ##    ##
*/

const checkUserDevice = async (req, res, next) => {
  let userId = req.user.sub.userId,
    deviceId = req.body.deviceId || req.params.deviceId,
    results = await queryResult(`SELECT * FROM breath_mof_user WHERE (UserId = '${userId}' AND BreathMachine = '${deviceId}') LIMIT 1`)
  if (results.length == 0) {
    return res.status(200).json({ code: 402, message: `User ${userId} không có quyền với thiết bị ${deviceId}` })
  } else {
    return results[0]
  }
}





/*
##       ####  ######  ######## 
##        ##  ##    ##    ##    
##        ##  ##          ##    
##        ##   ######     ##    
##        ##        ##    ##    
##        ##  ##    ##    ##    
######## ####  ######     ##    
*/
const getFolder = async (req, res, next) => {
  let userId = req.user.sub.userId
  // let query = `
  // WITH recursive cte (id, title, parentId) as
  // (
  //   SELECT id, title, parentId FROM folder WHERE parentId = (SELECT folderId FROM user WHERE userId = '${userId}')
  //   UNION ALL
  //   SELECT p.id, p.title, p.parentId FROM folder p
  //   INNER JOIN cte
  //   ON p.parentId = cte.id
  // )
  // select * from cte;
  // `
  let query = `
  select  id, title, parentId
  from (select * from folder order by parentId, id) products_sorted, (select @pv := (SELECT folderId FROM user WHERE userId = '${userId}')) initialisation
  where find_in_set(parentId, @pv)
  and length(@pv := concat(@pv, ',', id))
  `
  return res.status(200).json({ code: 200, data: await queryResult(query) })
}






module.exports = {
  getFolder,
}
