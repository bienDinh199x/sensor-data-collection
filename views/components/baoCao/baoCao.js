
function renderHtmlBaoCao() {
  let h = `
    <div>
      <div class="w12-card card_setting">
        <h1>File kết quả</h1>
        <label>
          <input type="radio" name="viewType" value="table" checked="checked" onclick="handleViewTypeChange()"> Bảng
        </label>
        <label>
          <input type="radio" name="viewType" value="chart" onclick="handleViewTypeChange()"> Biểu đồ
        </label>
        <div id="list_file_excel"></div>
      </div>
      <div>
        <div id="show_table" class="w12-card card_setting">
          <h1>Bảng kết quả</h1>
          <div id="show_table_result"></div>
        </div>
        <div id="show_chart" class="w12-card card_setting" style="display: none;">
          <h1>Biểu đồ kết quả</h1>
          <div id="show_chart_result"></div>
        </div>
      </div>
    </div>
  `;
  return h;
}

function showTable() {
  document.getElementById('show_table').style.display = 'block';
  document.getElementById('show_chart').style.display = 'none';
}

function showChart() {
  document.getElementById('show_chart').style.display = 'block';
  document.getElementById('show_table').style.display = 'none';
}

function handleViewTypeChange() {
  const viewType = document.querySelector('input[name="viewType"]:checked').value;
  if (viewType === 'table') {
    showTable();
  } else if (viewType === 'chart') {
    showChart();
  }
}



function reviewFile(fileName) {
  console.log(fileName);
  // Gửi yêu cầu đến máy chủ
  socket.emit('reviewFile', { fileName: fileName });
  // Xóa biểu đồ cũ
  document.getElementById('show_chart_result').innerHTML = '';
  document.getElementById('show_table_result').innerHTML = '';
  // Tạo một hàm để xử lý sự kiện 'reviewFileResponse'
  function handleReviewFileResponse(response) {
    console.log('reviewFile response:', response);
    // Xử lý phản hồi JSON ở đây
    // Ví dụ: Gọi hàm drawChart để hiển thị biểu đồ dạng đường
    drawChart(response);
    createTableFromData(response);
    // Gỡ bỏ bộ lắng nghe sự kiện sau khi xử lý
    socket.off('reviewFileResponse', handleReviewFileResponse);
  }
  // Lắng nghe sự kiện 'reviewFileResponse' một lần duy nhất
  socket.once('reviewFileResponse', handleReviewFileResponse);
}

function drawChart(json) {
  const labels = Object.keys(json);
  const datasets = [];

  let min = Infinity;
  let max = -Infinity;

  for (let key in json) {
    if (json.hasOwnProperty(key)) {
      const values = json[key];

      if (values.length > 0) {
        const dataset = {
          label: key,
          data: values,
          borderColor: 'blue',
          backgroundColor: 'transparent'
        };

        datasets.push(dataset);

        const minVal = Math.min(...values);
        const maxVal = Math.max(...values);

        if (minVal < min) {
          min = minVal;
        }

        if (maxVal > max) {
          max = maxVal;
        }
      }
    }
  }

  const data = {
    labels: labels,
    datasets: datasets
  };

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.id = 'chart';
  document.getElementById('show_chart_result').appendChild(canvas);

  const configChart = {
    type: 'line',
    data: data,
    options: configChartLine
  };

  const line = new Chart(context, configChart);

  line.options.scales.y.min = min;
  line.options.scales.y.max = max;
  line.update();
}

function createTableFromData(data) {
  const keys = Object.keys(data);
  const numMeasurements = data[keys[0]].length;

  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.tableLayout = 'fixed';
  table.style.borderCollapse = 'collapse';

  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const headerRow = document.createElement('tr');
  const headerCell = document.createElement('th');
  headerCell.textContent = 'STT';
  headerCell.style.textAlign = 'center'; // Thêm textAlign center cho ô tiêu đề
  headerRow.appendChild(headerCell);

  keys.forEach((key) => {
    const headerCell = document.createElement('th');
    headerCell.textContent = `Lần đo ${key}`;
    headerCell.style.textAlign = 'center'; // Thêm textAlign center cho các ô cột
    headerRow.appendChild(headerCell);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  for (let i = 0; i < numMeasurements; i++) {
    const dataRow = document.createElement('tr');

    const indexCell = document.createElement('td');
    indexCell.textContent = `${i + 1}`;
    indexCell.style.textAlign = 'center'; // Thêm textAlign center cho ô STT
    dataRow.appendChild(indexCell);

    keys.forEach((key) => {
      const measurements = data[key];
      const measurement = measurements[i] || '';

      const dataCell = document.createElement('td');
      dataCell.textContent = measurement;
      dataCell.style.textAlign = 'center'; // Thêm textAlign center cho các ô dữ liệu
      dataRow.appendChild(dataCell);
    });

    tbody.appendChild(dataRow);
  }

  table.appendChild(tbody);

  const showTableResult = document.getElementById('show_table_result');
  showTableResult.innerHTML = '';
  showTableResult.appendChild(table);
}
