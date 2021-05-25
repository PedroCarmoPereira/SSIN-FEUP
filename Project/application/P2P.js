if (!process.env.PORT)
    throw Error("Env variable PORT not found");

const port = process.env.PORT;

const Peer = require("./Peer");
const peer = new Peer(port);

process.argv.slice(2).forEach(anotherPeerAddress => peer.connectTo(anotherPeerAddress));

process.stdin.on('data', data => {
    const message = data.toString().replace(/\n/g, "");
    peer.write(message);
});