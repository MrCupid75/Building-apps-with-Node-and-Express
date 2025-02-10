const http = require('http')

const requestListener = (req, res) => {
    res.writeHead(200);
    res.end("Hello Wolrd");
}

const port = 8080;

const server = http.createServer(requestListener)

server.listen(port)
console.log('Server listening on port: ' + port)