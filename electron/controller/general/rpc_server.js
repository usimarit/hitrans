const ipcRenderer = require('electron').ipcRenderer;
//const zerorpc = require('zerorpc');
//
//let server = new zerorpc.Server({
//  popUp: function(text, x, y) {
//    console.log(text);
//    ipcRenderer.send(
//      'popup',
//      JSON.stringify({
//        text: text,
//        x: x,
//        y: y,
//      }),
//    );
//  },
//});
//server.bind('tcp://0.0.0.0:1235');
//server.on('error', function(error) {
//  console.error('RPC server error:', error);
//});
//console.log('server started at pro 1235');

var PROTO_PATH = __dirname + '/../../../rpc/protos/secondrpc.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var server_proto = grpc.loadPackageDefinition(packageDefinition).rpc_server;

function PopUp(call, callback) {
  callback(null);
}

function main() {}
