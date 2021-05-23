const net = require("net");
const sha = require('sha256');

module.exports = class Peer {
    constructor(port) {
        this.port = port;
        this.connection;
        this.receivedMessageSignatures = [];

        const server = net.createServer((socket) => {
            this.onSocketConnected(socket)
        });

        server.listen(port, () => console.log("Listening on port " + port))
    }

    connectTo(address) {
        if (address.split(":").length !== 2)
            throw Error("The other peer's address must be in the format host:port ");

        const [host, port] = address.split(":");

        const socket = net.createConnection({ port, host }, () =>
            this.onSocketConnected(socket)
        );
    }

    onSocketConnected(socket) {
        console.log("New connection");

        this.connection = socket;

        socket.on('data', (data) =>
            this.onData(data)
        );

        this.onConnection();
    }

    onData(data) {
        const json = data.toString();
        const payload = JSON.parse(json);
        if (this.receivedMessageSignatures.includes(payload.signature))
            return;
        this.receivedMessageSignatures.push(payload.signature)
        console.log("received> ", payload.message)
    }

    onConnection() {
        const message = "Hi! I'm on port " + this.port;
        this.write(message)
    }

    write(message) {
        const timestamp = Date.now();
        const randomNumber = Math.floor((Math.random() * 10000) + 1000);
        const myKey = sha(this.port + "" + timestamp + "" + randomNumber);
        const signature = sha(message + myKey + Date.now());
        this.receivedMessageSignatures.push(signature);
        const payload = {
            signature,
            message
        }
        this.connection.write(JSON.stringify(payload));
    }
}