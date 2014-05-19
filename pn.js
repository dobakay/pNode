var gcm = require('node-gcm');

var pn = (function (config) {
	var sender = new gcm.Sender(config.gcmApiKey),
		deviceList = {},
		messageList = {},
		lastMessageId = 0,
		pnModule = {};

	function addDevice (deviceObj) {
		if(deviceList[deviceObj.uuid] === undefined) {
			deviceObj.timeStamp = new Date();
			deviceList[deviceObj.uuid] = deviceObj;
		}
		console.log('Added device:' + JSON.stringify(deviceList[deviceObj.uuid]));
	}

	function removeDevice (deviecObjUuid) {
		if(deviceList[deviecObjUuid] !== undefined) {
			console.log('Removing device:' + JSON.stringify(deviceList[deviecObjUuid]));
			delete deviceList[deviecObjUuid];
		}
	}

	function sendMessage (message, devicesToNotify) {
		if(devicesToNotify === undefined) {
			//broadcasting to all devices if no-particular are specified
			var devicesToNotify = [];
			for (var uuid in deviceList) {
				devicesToNotify.push(deviceList[uuid].token);
			}
		}

		var message = new gcm.Message({
				collapseKey: 'push demo',
				delayWhileIdle: true,
				timeToLive: 3,
				data: {
					message : message
				}
			});

		sender.send(message, devicesToNotify, 4, function (err, result) {
			console.log(err);
			console.log(result);
		});

		messageList[lastMessageId++] = message;
	}

	pnModule.addDevice = addDevice;
	pnModule.removeDevice = removeDevice;
	pnModule.sendMessage = sendMessage;

	return pnModule;
});

module.exports = pn;