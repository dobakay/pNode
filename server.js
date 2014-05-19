var fs = require('fs'),
	express = require('express'),
	bodyparser = require('body-parser'), //middleware specific for express (express no longer contains in it's self such mechanisms)
	config = JSON.parse(fs.readFileSync('config.json')),
	pn = require('./pn.js'),
	host = config.host,
	port = config.port,
	app = express(),
	pn = pn(config);


// serves main page
app.get('/', function(req, res) {
	res.sendfile('./index.html');
});

//NOTE: needed to parse json (express using another module 'connect')
app.use(bodyparser.json());

app.post('/register', function(req, res) {
	//NOTE: req.body is an already parsed JSON object
	pn.addDevice(req.body); // adding device info to our simulated database
	res.send(200);
});

app.post('/unregister', function(req, res) {
	console.log(req.body.uuid);
	pn.removeDevice(req.body.uuid); // removing device info from our simulated database
	res.send(200);
});


//this request is sent from within the server when we want to send a message to our users
app.post('/sendmessage', function(req, res) {
	pn.sendMessage(req.body.message);
	res.send(200);
});

//for cross domain calls
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
 });

//uploading static css/js files and whatnot
app.use('/static', express.static(__dirname + '/static')); 


var server = app.listen(port, function() {
	console.log('Live & prosper on port %d', server.address().port);
});