
function renderHtmlBaoCao() {
  let h = `
    <div class="w3-card card_setting">
      <h1>Thiết bị thí nghiệm</h1>
      <div id="list_file_excel">
      </div>
    </div>
    <div class="w3-card card_setting">
      <h1>USB</h1>
    </div>
    `
  return h
}


function reviewFile(fileName) {
  console.log(fileName);
  socket.emit('reviewFile', { fileName: fileName })
}