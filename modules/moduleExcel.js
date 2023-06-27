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

   // Kiểm tra xem sheet "Sheet1" có tồn tại không
   if (file.SheetNames.includes("Sheet1")) {
    // Xóa sheet "Sheet1"
    delete file.Sheets["Sheet1"];
    // Xóa sheet "Sheet1" khỏi mảng SheetNames
    const sheetIndex = file.SheetNames.indexOf("Sheet1");
    file.SheetNames.splice(sheetIndex, 1);
  }

  // Khởi tạo mảng dataXlsx với các đối tượng rỗng
  let dataXlsx = Array.from({ length: Math.max(data.data[0].length, data.data[1].length, data.data[2].length) }, () => ({ L1: "", L2: "", L3: "" }));

  console.log(data.data);
  console.log(data.data[0].length);
  console.log(data.data[1].length);
  console.log(data.data[2].length);
  for (let i = 0; i < data.data[0].length; i++) {
    if (dataXlsx[i]) {
      dataXlsx[i].L1 = data.data[0][i] || "";
    }
  }

  for (let i = 0; i < data.data[1].length; i++) {
    if (dataXlsx[i]) {
      dataXlsx[i].L2 = data.data[1][i] || "";
    }
  }

  for (let i = 0; i < data.data[2].length; i++) {
    if (dataXlsx[i]) {
      dataXlsx[i].L3 = data.data[2][i] || "";
    }
  }


  const ws = XLSX.utils.json_to_sheet(dataXlsx);
  console.log(ws);

  XLSX.utils.book_append_sheet(file, ws, "du_lieu");

  // Writing to our file
  XLSX.writeFile(file, `${dir}/data/xlsx/${data.userName}-${data.chartName}.xlsx`)
  listFile()
}



function readChart(fileName, callback) {
  let dir = __dirname.replace('\\modules', '');
  dir = dir.replace('/modules', '');
  var workbook = XLSX.readFile(`${dir}/data/xlsx/${fileName}`);
  var data = XLSX.utils.sheet_to_json(workbook.Sheets['du_lieu']);
  var json = { L1: [], L2: [], L3: [] };
  data.map(key => {
    if (key.L1 != "") { json.L1.push(key.L1) }
    if (key.L2 != "") { json.L2.push(key.L2) }
    if (key.L3 != "") { json.L3.push(key.L3) }
  });
  console.log('readChart=' + JSON.stringify(json));
  if (callback && typeof callback === 'function') {
    callback(json);
  }
}



module.exports = {
  saveChartExcelData,
  readChart,
}