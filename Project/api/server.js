'use strict';

const express = require('express');

// Constants
const PORT = 8010;
const HOST = '0.0.0.0';


// App
const app = express();

// Parse incoming requests data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./routes')(app);

app.listen(PORT, HOST);
console.log(`Running on http://localhost:${PORT}`);

// WebSocket
const webSocketsServerPort = 8011;
const webSocketServer = require('websocket').server;
const http = require('http');

// Spinning the http server and the websocket server
const server = http.createServer(function (request, response) {
    console.log('Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(webSocketsServerPort, () => {
    console.log('Server is listening on port ' + webSocketsServerPort);
});
const wsServer = new webSocketServer({
    httpServer: server
});

require('./websocket.js')(wsServer);