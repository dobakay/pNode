var pushNotificationsManager = (function ($) {
	
	var managerModule = {}, //instantiating module
		pushNotification = null // phonegap pushnotifications plugin object;

	$(document).on('deviceready', function () {
		pushNotification = window.plugins.pushNotification;
		if(!appConfig.token) {
			registerDeviceForPushNotifications();
		}
	});

	function gcmTokenSuccessHandler (result) {
		// console.log('Token res:' + result);
		appConfig.token = result.token;
	}

	function gcmTokenErrorHandler (error) {
		console.log(error);
	}

	//note: function MUST BE globally exposed
	window.onNotificationGCM = function (e) {
		console.log(e.event);

		switch( e.event ) {
			case 'registered': 
				if ( e.regid.length > 0 ) {
					// Your GCM push server needs to know the regID before it can push to this device
					// here is where you might want to send it the regID for later use.
					console.log("regID = " + e.regid);
					appConfig.token = e.regid;
					// TODO: send regId to server
				}
			break;

			case 'message':
				// if this flag is set, this notification happened while we were in the foreground.
				// you might want to play a sound to get the user's attention, throw up a dialog, etc.
				if ( e.foreground ) {
					// if the notification contains a soundname, play it.
					// var my_media = new Media("/android_asset/www/"+e.soundname);
					// my_media.play();
				}
				else {  // otherwise we were launched because the user touched a notification in the notification tray.
					if ( e.coldstart ) {
						$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
					}
					else {
						$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
					}
				}

				$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
				//Only works for GCM
				$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
				//Only works on Amazon Fire OS
				$status.append('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');
			break;

			case 'error':
				$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
			break;

			default:
				$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
			break;
		}
	}

	function registerDeviceForPushNotifications () {
		if( device.platform == 'android' || device.platform == 'Android' || device.platform == "Amazon" || device.platform == "amazon") {
			// register to GCM 
			// note: 'ecb' value should be a string name of the callback function
			pushNotification.register(
				gcmTokenSuccessHandler,
				gcmTokenErrorHandler, 
				{
					"senderID": appConfig.senderID,
					"ecb": "onNotificationGCM" //event callback that gets called when your device receives a notification
				});
		}
		else {	 
			// register to APN
			pushNotification.register(
				tokenHandler,
				errorHandler, {
					"badge": "true",
					"sound": "true",
					"alert": "true",
					"ecb": "onNotificationAPN"
				});
		}
	}

	/**
	 * Called when user has previously unsubscribed from PN and subscribes again.
	 */
	function subscribeDeviceForPNFromServer () {
		registerDeviceForPushNotifications
	}

	/**
	 * Callbed when user unsubscribes from PNs from server 
	 * @param  {Obj} config
	 * @param {String} config.uuid [device.uuid; The phonegap-device's Universally unique identifier]
	 * @param {String} config.token [appConfig.token; Token that app gets from GCM after registration]
	 */
	function unsubscribeDeviceFromPNFromServer (config) {
		
	}

	return managerModule;
})(jQuery);