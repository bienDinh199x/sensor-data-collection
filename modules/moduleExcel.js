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
const { listFile } = require('./moduleFile');
const XLSX = require('xlsx')
const fs = require('fs');

/*
######## ##     ## ##    ##  ######  ######## ####  #######  ##    ##
##       ##     ## ###   ## ##    ##    ##     ##  ##     ## ###   ##
##       ##     ## ####  ## ##          ##     ##  ##     ## ####  ##
######   ##     ## ## ## ## ##          ##     ##  ##     ## ## ## ##
##       ##     ## ##  #### ##          ##     ##  ##     ## ##  ####
##       ##     ## ##   ### ##    ##    ##     ##  ##     ## ##   ###
##        #######  ##    ##  ######     ##    ####  #######  ##    ##*/


async function saveChartExcelData(data) {
  console.log('em o day!!!!!!!!!')
  let dir = __dirname.replace('\\modules', '')
  dir = dir.replace('/modules', '')


  try {
    fs.unlinkSync(`${dir}/data/xlsx/${data.userName}-${data.chartName}.xlsx`) // Xóa file nếu đã tồn tại
    //file removed
  } catch (err) {
    console.error(err)
  }


  // await copyFileExcel(`${data.userName}-${data.chartName}`)
  const file = XLSX.readFile(`${dir}/data/file_mau.xlsx`)

  // // Sample data set
  let dataXlsx = []

  data.data[0].map((key, i) => {
    if (typeof dataXlsx[i] == 'undefined') {
      dataXlsx[i] = { L1: "", L2: "", L3: "" }
    }
    dataXlsx[i][`L1`] = key
  })

  data.data[1].map((key, i) => {
    if (typeof dataXlsx[i] == 'undefined') {
      dataXlsx[i] = { L1: "", L2: "", L3: "" }
    }
    dataXlsx[i][`L2`] = key
  })

  data.data[2].map((key, i) => {
    if (typeof dataXlsx[i] == 'undefined') {
      dataXlsx[i] = { L1: "", L2: "", L3: "" }
    }
    dataXlsx[i][`L3`] = key
  })

  console.log(data.data);
  const ws = XLSX.utils.json_to_sheet(dataXlsx)

  XLSX.utils.book_append_sheet(file, ws, "du_lieu")

  // Writing to our file
  XLSX.writeFile(file, `${dir}/data/xlsx/${data.userName}-${data.chartName}.xlsx`)
  listFile()
}



function readChart(fileName) {
  let dir = __dirname.replace('\\modules', '')
  dir = dir.replace('/modules', '')


  var workbook = XLSX.readFile(`${dir}/data/xlsx/${fileName}`);
  data = XLSX.utils.sheet_to_json(workbook.Sheets['du_lieu']);
  let json = { L1: [], L2: [], L3: [] }
  data.map(key => {
    if (key.L1 != "") { json.L1.push(key.L1) }
    if (key.L2 != "") { json.L2.push(key.L2) }
    if (key.L3 != "") { json.L3.push(key.L3) }

  })
  return json
}
module.exports = {
  saveChart,
  readChart,
}