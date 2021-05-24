const net = require("net");
const sha = require('sha256');
const crypto =  require('./encrypt');

module.exports = class Peer {
    constructor(port) {
        this.port = port;
        this.connection;
        this.receivedMessageSignatures = [];
        this.key;

        const server = net.createServer((socket) => {
            this.onSocketConnected(socket)
        });

        server.listen(port, () => console.log("Listening on port " + port))
        server.on('connection', () => server.close());          
    }

    setKey(key){
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
        if (this.receivedMessageSignatures.includes(payload.signature))
            return;
        this.receivedMessageSignatures.push(payload.signature);
        const msg = crypto.decryptECB(payload.message, this.key)
        console.log("\nThem: " + msg);
        process.stdout.write("You: ");
    }

    onConnection() {
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