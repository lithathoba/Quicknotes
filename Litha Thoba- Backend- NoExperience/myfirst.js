var http = require('http');

http.createServer(function (req, res) { //require is not supported in ES module syntax
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello, Quicknotes!');
}).listen(8080); // JavaScript source code, writes "Hello, Quicknotes!" on your port 8080