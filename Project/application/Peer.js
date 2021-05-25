const net = require("net");
const sha = require('sha256');
const crypto = require('./encrypt');

module.exports = class Peer {
    constructor(port) {
        this.port = port;
        this.connection;
        this.receivedMessageSignatures = [];
        this.key;
        this.token;

        const server = net.createServer((socket) => {
            this.onSocketConnected(socket)
        });

        server.listen(port, () => console.log("Listening on port " + port))
        server.on('connection', () => server.close());
    }

    setToken(token) {
        this.token = token;
    }
    setKey(key) {
        this.key = key;
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
        this.connection = socket;

        socket.on('data', (data) =>
            this.onData(data)
        );

        this.onConnection();
    }

    onData(data) {
        const json = data.toString();
        const payload = JSON.parse(json);

        this.receivedMessageSignatures.push(payload.signature);
        const msg = crypto.decryptECB(payload.message, this.key)
        console.log("\nThem: " + msg);
        process.stdout.write("You: ");
    }

    onConnection() {
    }

    write(message) {
        const signature = sha(this.token);
        this.receivedMessageSignatures.push(signature);
        const payload = {
            signature,
            message
        }
        this.connection.write(JSON.stringify(payload));
    }
}