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
const deviceOfFolder = async (req, res, next) => {
  let folderId = req.params.folderId
  let query = `
    SELECT deviceId,folderId, title, time, value , rangeTempMin, rangeTempMax, coordinateX, coordinateY
    FROM device
    WHERE folderId = ${folderId}`
  await queryResult(query)
    .then(response => { return JSON.parse(JSON.stringify(response)) })
    .then(json => {
      let jsonExport = []
      for (let key in json) {
        jsonExport.push({
          deviceId: json[key].deviceId,
          folderId: json[key].folderId,
          title: json[key].title || json[key].deviceId,
          time: json[key].time,
          value: json[key].value,
          rangeTemp: [
            json[key].rangeTempMin,
            json[key].rangeTempMax
          ],
          coordinate: {
            x: json[key].coordinateX,
            y: json[key].coordinateY
          },
        })
      }
      return res.status(200).json({ code: 200, data: jsonExport })
    })



}


/*
 
    ##      ########  ######## ##     ## ####  ######  ######## 
  ####      ##     ## ##       ##     ##  ##  ##    ## ##       
    ##      ##     ## ##       ##     ##  ##  ##       ##       
    ##      ##     ## ######   ##     ##  ##  ##       ######   
    ##      ##     ## ##        ##   ##   ##  ##       ##       
    ##      ##     ## ##         ## ##    ##  ##    ## ##       
  ######    ########  ########    ###    ####  ######  ######## 
 
*/
// quynh
const oneDevice = async (req, res, next) => {
  let userId = req.user.sub.userId
  let deviceId = req.params.deviceId;
  let rs = await apiOneDevice({ userId, deviceId });

  if (rs.code == 400) return res.status(rs.code).json({ code: rs.code, message: rs.data });
  return res.status(rs.code).json({ code: rs.code, data: rs.data });
}







/*
.  ###    ########  ########  
. ## ##   ##     ## ##     ## 
.##   ##  ##     ## ##     ## 
##     ## ##     ## ##     ## 
######### ##     ## ##     ## 
##     ## ##     ## ##     ## 
##     ## ########  ########  
*/
const add = async (req, res, next) => {
  let userId = req.user.sub.userId,
    deviceId = req.body.deviceId,


    findCPAP = await queryResult(`SELECT * FROM machine_cpap WHERE deviceId = '${deviceId}' LIMIT 1`),
    findBiPAP = await queryResult(`SELECT * FROM machine_bipap WHERE deviceId = '${deviceId}' LIMIT 1`),
    json = findCPAP.concat(findBiPAP)
  req.body.code = 201
  if (json.length == 0) { // deviceID không tồn tại
    return res.status(200).json({ code: 403, message: `Máy thở ${deviceId} không có trong hệ thống` })
  } else if (json.length == 1) {
    let findDevice = await queryResult(`SELECT * FROM breath_mof_user WHERE (BreathMachine = '${deviceId}') LIMIT 1`)
    if (findDevice == 0) { // chưa add
      await queryNoResult(`INSERT INTO breath_mof_user (UserId, BreathMachine, Role) VALUES ('${userId}', '${deviceId}', 'YY')`)
      io.emit(`sync`, { listDevice: true })
      return await allDevice(req, res, next) // trả về list device
    } else {
      return res.status(200).json({ code: 404, message: `Không thể thêm máy thở ${deviceId} đã được add vào tài khoản khác` })
    }
  }


}

/*
##     ## ########  ########     ###    ######## ######## 
##     ## ##     ## ##     ##   ## ##      ##    ##       
##     ## ##     ## ##     ##  ##   ##     ##    ##       
##     ## ########  ##     ## ##     ##    ##    ######   
##     ## ##        ##     ## #########    ##    ##       
##     ## ##        ##     ## ##     ##    ##    ##       
.#######  ##        ########  ##     ##    ##    ######## 
*/
const update = async (req, res, next) => {
  let userId = req.user.sub.userId,
    json = req.body,
    query,

    queryX = '',
    arrSetting = [],
    arrFalse = [];

  findDevice = await checkUserDevice(req, res, next)

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

  const check = async (type, req, res, next) => {


    return


  }





  if (findDevice) {
    let sendToDevice = false
    if (typeof json.deviceName != `undefined` || typeof json.patientName != `undefined` || typeof json.patientBed != `undefined` || typeof json.patientAddress != `undefined` || typeof json.patientBirthday != `undefined`) {



      //   query = `
      //   UPDATE breath_mof_patient
      //   SET
      //     PatientId=PatientId
      //     ${json.deviceName ? `, deviceName='${json.deviceName}'` : ``}
      //   WHERE BreathMachineId='${json.deviceId}'
      // `.replace(/(\r\n|\n|\r)/gm, ``).replace(/(\t)/gm, ` `).replace(/\s\s+/g, ` `)
      //   updateDevice = await queryNoResult(query)
      //   if (!updateDevice) {
      //     query = `
      //   INSERT INTO breath_mof_patient
      //   ()
      // `.replace(/(\r\n|\n|\r)/gm, ``).replace(/(\t)/gm, ` `).replace(/\s\s+/g, ` `)

      //   }



      sendToDevice = false
      query = `
      INSERT INTO breath_mof_patient (
        BreathMachineId
        ${json.deviceName ? `, deviceName` : ``}
        ${json.patientName ? `, patientName` : ``}
        ${json.patientBed ? `, patientBed` : ``}
        ${json.patientAddress ? `, patientAddress` : ``}
        ${json.patientBirthday ? `, patientBirthday` : ``}
      ) VALUES(
        '${json.deviceId}'
        ${json.deviceName ? `, '${json.deviceName}'` : ``}
        ${json.patientName ? `,'${json.patientName}'` : ``}
        ${json.patientBed ? `, '${json.patientBed}'` : ``}
        ${json.patientAddress ? `, '${json.patientAddress}'` : ``}
        ${json.patientBirthday ? `, '${json.patientBirthday}'` : ``}
      ) ON DUPLICATE KEY UPDATE
        BreathMachineId='${json.deviceId}'
        , deviceName='${json.deviceName || ''}'
        , patientName='${json.patientName || ''}'
        , patientBed='${json.patientBed || ''}'
        , patientAddress='${json.patientAddress || ''}'
        , patientBirthday='${json.patientBirthday || ''}'
      `.replace(/(\r\n|\n|\r)/gm, ``).replace(/(\t)/gm, ` `).replace(/\s\s+/g, ` `)





    } else if (typeof json.cpap != `undefined`) { // cài dặt cpap
      sendToDevice = true
      query = `
    UPDATE machine_cpap
    SET
      countControl=${config.mqttClient.reSendComand}`
      for (let key in json.cpap) {
        query += `, ${key}X=${json.cpap[key]}`
      }
      query += ` WHERE deviceId='${json.deviceId}' LIMIT 1`
      query = query.replace(/(\r\n|\n|\r)/gm, ``).replace(/(\t)/gm, ` `).replace(/\s\s+/g, ` `)


      queryX = `SELECT * FROM machine_cpap WHERE deviceId='${json.deviceId}' LIMIT 1`;
      arrSetting = ['modeSet', 'monitorSet', 'buzzerSet', 'lowSpo2Set', 'cpapLowPeepSet', 'hfncFlowSet'];

    } else if (typeof json.bipap != `undefined`) {
      sendToDevice = true
      query = `
    UPDATE machine_bipap
    SET
      countControl=${config.mqttClient.reSendComand}`
      for (let key in json.bipap) {
        query += `, ${key}X=${json.bipap[key]}`
      }
      query += ` WHERE deviceId='${json.deviceId} LIMIT 1'
    `.replace(/(\r\n|\n|\r)/gm, ``).replace(/(\t)/gm, ` `).replace(/\s\s+/g, ` `)

    }


    updateDevice = await queryNoResult(query)
    console.log(query);
    console.log(updateDevice);

    if (updateDevice) {
      req.body.code = 202
      if (sendToDevice) { // cài đặt device



        let countCheck = 5;


        while (countCheck > 0) {
          arrFalse = []
          countCheck--;
          results = await queryResult(queryX);
          result = results[0]
          for (const key in arrSetting) {
            if (result[arrSetting[key]] != result[arrSetting[key] + 'X'] && result[arrSetting[key] + 'X'] != null) {
              arrFalse.push(arrSetting[key])
            }
          }
          if (arrFalse.length == 0) {
            io.emit(`sync`, { listDevice: true })
            return res.status(200).json({ code: 200, deviceId: json.deviceId, message: `Update thiết bị thành công` })
          } else {
            await delay(1000)
          }
        }
        req.body.code = 203
        return res.status(200).json({ code: 400, deviceId: json.deviceId, message: `Update thiết bị không thành công`, listFalse: arrFalse })


      } else { // thay đổi thông tin device
        io.emit(`sync`, { listDevice: true })
        return await allDevice(req, res, next) // trả về list device
      }
    } else {
      return res.status(400).json({ code: 400, message: `Lỗi khi update thiết bị` })
    }


  }
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
const del = async (req, res, next) => {
  console.log(__file, __line, `qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq`);
  let userId = req.user.sub.userId,
    deviceId = req.body.deviceId
  console.log(`DELETE FROM breath_mof_user WHERE (UserId='${userId}' AND BreathMachine='${deviceId}')`);
  delDevice = await queryNoResult(`DELETE FROM breath_mof_user WHERE (UserId='${userId}' AND BreathMachine='${deviceId}')`)
  req.body.code = 202
  if (delDevice) {
    io.emit(`sync`, { listDevice: true })
    return await allDevice(req, res, next) // trả về list device
  } else {
    return res.status(400).json({ code: 400, message: `Lỗi khi xóa thiết bị` })
  }
}


/*
.######  ##     ##    ###    ########  ########
##    ## ##     ##   ## ##   ##     ## ##
##       ##     ##  ##   ##  ##     ## ##
.######  ######### ##     ## ########  ######
.     ## ##     ## ######### ##   ##   ##
##    ## ##     ## ##     ## ##    ##  ##
.######  ##     ## ##     ## ##     ## ########
*/
const shareDevice = async (req, res, next) => {
  let userIdShare = req.user.sub.userId
  let userId = req.params.userId;
  return res.status(200).json(await apiShareDevice(userId, userIdShare))
}



module.exports = {
  deviceOfFolder,
  oneDevice,
  add,
  update,
  del,
  shareDevice
}
