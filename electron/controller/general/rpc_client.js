//const zerorpc = require("zerorpc");
//
//let client = new zerorpc.Client();
//const server = "tcp://0.0.0.0:1234";
//client.connect(server);
//

var PROTO_PATH = __dirname + '/../../../rpc/protos/firstrpc.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var client_proto = grpc.loadPackageDefinition(packageDefinition).firstrpc;

var client = new client_proto.FirstRpc(
  'localhost:1234',
  grpc.credentials.createInsecure(),
);

module.exports = client;
