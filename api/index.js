const http = require('http');
const app = require('./app.js');

const port = 4000;
const server = http.createServer(app);
server.listen(port);