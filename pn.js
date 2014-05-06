var gcm = require('node-gcm');

var pn = (function (config) {
	var sender = new gcm.Sender(config.gcmApiKey),
		deviceList = {},
		messageList = {},
		pnModule = {};

	function addDevice (deviceObj) {
		//TODO check if such device exists already
		if(deviceList[deviceObj.uuid] === undefined) {
			deviceObject.timeStamp = new Date();
			deviceList[device.uuid] = deviceObj;
		}
	}

	function removeDevice (deviecObj) {
		if(deviceList[deviceObj.uuid] === undefined) {
			delete deviceList[deviceObj.uuid];
		}
	}

	function createMessage (messageText) {
		var message = {
			// id : idGenerator(),
			text : messageText,
			timestampString : getTime(),
			dayStamp : new Date().getDay()
		};
	}

	function sendMessage (message, devicesToNotify) {
		var message = new gcm.Message({
				collapseKey: null,
				delayWhileIdle: true,
				timeToLive: 3,
				data: {
					message : message//,
					// command: command
				}
			});
			sender.send(message, devicesToNotify, 4, function (err, result) {
				console.log(err);
				console.log(result);
			});
	}

	pnModule.addDevice = addDevice;
	pnModule.removeDevice = removeDevice;
	pnModule.sendMessage = sendMessage;

	return pnModule;
});

module.exports = pn;