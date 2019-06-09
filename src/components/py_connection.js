var zerorpc = require('zerorpc');
let client = new zerorpc.Client();
const server = 'tcp://127.0.0.1:1234';
client.connect(server);

export default client;
