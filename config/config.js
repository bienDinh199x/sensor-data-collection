module.exports = {
  "proxy": "firealarm",
  "ipaddress": "127.0.0.1",
  "portserver": 3000,
  "ipMaster": "192.168.1.235",
  "setMaster": true,
  "mail": {
    "username": "mkvcsensingiot@gmail.com",
    "password": "meiko12345"
  },
  "_comment_mail": "Tài khoản mail tự gửi khi có cảnh báo ",
  "data": "./views/data.db",
  "_comment_data": "Link bảng CSDL Sqlite",
  rs485: {
    comPort: "/dev/ttyS0",
    // comPort: "/dev/ttyUSB0",
    // comPort: "COM5",
    baudRate: 115200,
    "endBuffer": "\n"
  },
  "box": "Tủ master",
  "countDisconnect": 5,
  "mysql": {
    "limit": 1000,
    "host": "localhost",
    "port": 3306,
    "database": "sensor",
    "user": "root",
    "pass": ""
  },
  "timeout_command": 400,
  "_comment_timeout_command": "Thời gian timeout khi lệnh gửi không được phản hồi => Hỏi lệnh khác",
  "timeout_485": 100,
  "_comment_timeout_485": "Thời gian timeout sau khi nhận phản hồi => Hỏi lệnh khác",
  "output": {
    "NAC": 2,
    "IO": 4
  }
}