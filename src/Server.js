const http = require('http');
const app = require('./App');
const port = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(port);

console.log("Server Listening on Port : "+ port);