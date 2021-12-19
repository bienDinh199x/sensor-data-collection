require('../helpers/helper_mysql.js')
const { apiHistoryAlarmConfig, apiHistoryLogData } = require('../models/model_history.js')

/*
##       ####  ######  ######## 
##        ##  ##    ##    ##    
##        ##  ##          ##    
##        ##   ######     ##    
##        ##        ##    ##    
##        ##  ##    ##    ##    
######## ####  ######     ##    
*/
const alarmConfig = async (req, res, next) => {
  let userId = req.user.sub.userId,
    deviceId = req.params.deviceId
  return res.status(200).json({ code: req.body.code || 200, deviceId: deviceId, data: await apiHistoryAlarmConfig(userId, deviceId) })
}

const logData = async (req, res, next) => {
  let userId = req.user.sub.userId,
    deviceId = req.params.deviceId,
    timeStart = req.params.timeStart,
    rangeTime = req.params.rangeTime
  return res.status(200).json({ code: req.body.code || 200, deviceId: deviceId, data: await apiHistoryLogData(userId, deviceId, timeStart, rangeTime) })
}


const logChartBipap = async (req, res, next) => {
  let userId = req.user.sub.userId,
    deviceId = req.params.deviceId,
    timeStart = req.params.timeStart * 1,
    rangeTime = req.params.rangeTime * 1

  console.log(timeStart);
  console.log(rangeTime);
  let find = {
    deviceId: deviceId,
    time: {
      "$gte": timeStart, // >=
      "$lte": timeStart + rangeTime // <=
    }
  }
  console.json(find);
  const json = await dbo.collection('logChart').find(find).sort({ "time": 1, "point": 1 }).limit(1000).toArray()

  return res.status(200).json({ code: req.body.code || 200, deviceId: deviceId, data: json })
}



module.exports = {
  alarmConfig,
  logData,
  logChartBipap
}
