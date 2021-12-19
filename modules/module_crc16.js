module.exports = function (buffer) {
  var crc = 0xFFFF;
  var odd;
  for (var i = 0; i < buffer.length; i++) {
    crc = crc ^ buffer[i];
    for (var j = 0; j < 8; j++) {
      odd = crc & 0x0001;
      crc = crc >> 1;
      if (odd) {
        crc = crc ^ 0xA001;
      }
    }
  }
  return `0000${crc.toString(16)}`.slice(-4);
}