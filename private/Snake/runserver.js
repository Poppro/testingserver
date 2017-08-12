var http = require('http');
var fs = require('fs');

function onRequest(request, response) {
    if(request.method == 'GET' && request.url == '/') {
        fs.readFile('.\index.html', function (err, data) {
            if (err) {
                throw err;
            }
            response.writeHeader(200, {"Content-Type": "text/html"});
            response.write(data);
            response.end();
        });
    } else if(request.method == 'GET' && request.url == '/off') {
        process.exit();
    } else {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(__dirname);
        response.end();
    }
}

http.createServer(onRequest).listen(80);
console.log("Server is now running");
