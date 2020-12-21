// Server dependencies
const app = require('./app');
const http = require('http');

// Define a port for the server to listen on
const PORT = process.env.SERVER_PORT || 9999;
app.set('port', PORT);

// Create a new http server instance
const server = http.createServer(app);

// Start server and make it listen on a PORT
server.listen(PORT);

server.on('error', onError);
server.on('listening', onListening);

function pipeOrPort(address) {
    return typeof address == "string" ? `pipe ${address}` : `port ${address.port}`;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = pipeOrPort(server.address());

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    let bind = pipeOrPort(server.address());
    console.log('Server started and listening on port ' + bind);
}
