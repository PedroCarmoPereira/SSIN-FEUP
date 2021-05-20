module.exports = (wsServer) => {

    // Save all active connections in this object
    const clients = {};

    // Generate unique userIDs for every user
    const getUniqueID = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4();
    };

    function originIsAllowed(origin) {
        // put logic here to detect whether the specified origin is allowed.
        return true;
    }

    wsServer.on('request', function (request) {
        if (!originIsAllowed(request.origin)) {
            // Make sure we only accept requests from an allowed origin
            request.reject();
            console.log('Connection from origin ' + request.origin + ' rejected.');
            return;
        }

        var connection = request.accept(null, request.origin);
        console.log('Connection from origin ' + request.origin + ' accepted.');

        var userID = getUniqueID();
        clients[userID] = connection;

        connection.on('message', function (message) {
            if (message.type === 'utf8') {
                console.log('Received Message: ' + message.utf8Data);
                connection.sendUTF(message.utf8Data);
            }
            else if (message.type === 'binary') {
                console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
                connection.sendBytes(message.binaryData);
            }
        });

        connection.on('close', function (reasonCode, description) {
            console.log('Origin ' + request.origin + ' disconnected.');
        });
    });
};