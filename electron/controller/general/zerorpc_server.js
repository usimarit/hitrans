const zerorpc = require("zerorpc");
const ipcRenderer = require("electron").ipcRenderer;

let server = new zerorpc.Server({
  popUp: function(text, x, y) {
    console.log(text);
    ipcRenderer.send(
      "popup",
      JSON.stringify({
        text: text,
        x: x,
        y: y
      })
    );
  }
});
server.bind("tcp://0.0.0.0:1235");
server.on("error", function(error) {
  console.error("RPC server error:", error);
});
console.log("server started at pro 1235");
