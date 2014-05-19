(function ($) {
	$(document).on('deviceready', function() {
		$('#tabs').tabs();
	})

	$(document).on('touchend', '.clear-messages', function(e) {
		var token = appConfig.token,
			uuid = device.uuid;
		$.ajax({
			url: '/register', // change URL to http://yourServerUrl/register
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				token: token,
				uuid: uuid
			}),
			success: function (data) {
				console.log('success man');
				console.log(data);
			},
			error: function (error) {
				console.log(JSON.parse(error));
			}
		});	
	});
})(jQuery);