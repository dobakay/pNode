var fs = require('fs'),
	express = require('express'),
	bodyparser = require('body-parser'),
	config = JSON.parse(fs.readFileSync('config.json')),
	pn = require('./pn.js'),
	host = config.host,
	port = config.port,
	//TODO: add pn module
	app = express(),
	pn = pn(config);


// serves main page
app.get('/', function(req, res) {
	res.sendfile('./index.html');
});

app.post('/register', function(req, res) {
	res.send('success');
	res.end();
});

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
 });

//uploading static css/js files and whatnot
app.use('/static', express.static(__dirname + '/static')); 

//config for json consumption on post
app.use(bodyparser.json());




var server = app.listen(port, function() {
	console.log('Listening on port %d', server.address().port);
});