var serialport = require("serialport")
  , SerialPort = serialport.SerialPort;

function SendSMS(deviceID, phoneNumber){

  var sp = new SerialPort("/dev/"+deviceID, {
    parser: serialport.parsers.readline("\r"),
  	baudrate: 115200,
  	dataBits: 8, // this is the default for Arduino serial communication
  	parity: 'none', // this is the default for Arduino serial communication
  	stopBits: 1, // this is the default for Arduino serial communication
  	flowControl: false // this is the default for Arduino serial communication
  });

  sp.on("open", function () {

    sp.on('data', function(data) {
  		var variavel  = data.toString('utf8').trim();
  		console.log("Receive: " + variavel);
  		if(variavel == "+CMGS: 204") {
  			console.log("enviado com sucesso");
  		}
  	});

  	sp.on('close', function(a){
  		console.log("Close: " + a);
  	});

  	sp.on('error', function(a){
  		console.log("Close: " + a);
  	});

  	sp.write('AT+CMGF=1\r');
  	sp.write('AT+CMGS="'+phoneNumber+'"\r');
    sp.write('SMS sent on: ' + new Date() + ' .');
    sp.write(new Buffer([0x1a]));

  });

}

var _deviceID = process.argv[2]
  , _phoneNumber = process.argv[3];

if(!_deviceID || !_phoneNumber) {
  module.exports = SendSMS;
} else {
  SendSMS(_deviceID, _phoneNumber);
}
