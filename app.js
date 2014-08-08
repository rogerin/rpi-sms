 var serialport = require("serialport");
 var SerialPort = serialport.SerialPort; // localize object constructor

  var sp = new SerialPort("/dev/ttyUSB5", {
    parser: serialport.parsers.readline("\r"),
	baudrate: 115200,
	dataBits: 8, // this is the default for Arduino serial communication
	parity: 'none', // this is the default for Arduino serial communication
	stopBits: 1, // this is the default for Arduino serial communication
	flowControl: false // this is the default for Arduino serial communication

  });
	sp.on("open", function () {


		 //sp.write('AT\r');

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
 		sp.write('AT+CMGS="+558899347065"\r');
	 	sp.write('Teste eenvios multiplos por vez ' + new Date() + ' .');
	 	sp.write(new Buffer([0x1a]));

	});
