var http = require('http');
var fs = require('fs');
var url = require('url');
var port = process.env.PORT || 8080;

function getNaturalTime(time) {
	var date = time.getDate();
	var month = time.getMonth();
	var year = time.getFullYear();
	switch(month) {
		case 0:
			month = 'January';
			break;
		case 1:
			month = 'February';
			break;
		case 2:
			month = 'March';
			break;
		case 3:
			month = 'April';
			break;
		case 4:
			month = 'May';
			break;
		case 5:
			month = 'June';
			break;
		case 6:
			month = 'July';
			break;
		case 7:
			month = 'August';
			break;
		case 8:
			month = 'September';
			break;
		case 9:
			month = 'October';
			break;
		case 10:
			month = 'November';
			break;
		case 11:
			month = 'December';
			break;
	}
	return (month + ' ' + date + ', ' + year);
}

function getUnixTime(time) {
	return time.getTime();
}

var server = http.createServer(function(req, res) {
	var parseURL = url.parse(req.url, true);
	if(parseURL.pathname === '/') {
		fs.readFile('index.html', function(err, html) {
			res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': html.length});
			res.write(html);
			res.end();
		});
	} else {
		var pathname = parseURL.pathname.replace('/',''); console.log(pathname);
		if(pathname.match(/%20/)) {
			console.log('natural');
			pathname = pathname.replace(/%20/g,' ');
		} else {
			console.log('unix');
			pathname = Number(pathname);
		}
		
		var time = new Date(pathname);
		if(time.toString() === 'Invalid Date') {
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify({
				natural: null, 
				unix: null
			}));
		} else {
			var natural = getNaturalTime(time);
			var unix = getUnixTime(time);
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify({
				natural: natural,
				unix: unix
			}));	
		}
	}
})
server.listen(port);