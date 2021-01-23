/** Server Dependencies **/
const http = require('http');
const app = require('./app');
const secrets = require('./secrets.json');

// Define a port for the server to listen on
const PORT = process.env.SERVER_PORT || secrets.serverPort || '9999';
app.set('port', PORT);

// Create a new http server instance
const server = http.createServer(app);


server.on('listening', () => {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Server started and listening on port ' + bind);
});
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(PORT + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(PORT + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});

// Start server and make it listen on a PORT
server.listen(PORT);
