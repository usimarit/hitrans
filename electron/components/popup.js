const ipcRenderer = require("electron").ipcRenderer;
var translated_text = document.getElementById("translated_text");
var target_lang = document.getElementById("target_lang");
var source_lang = document.getElementById("source_lang");
var text = document.getElementById("text");
ipcRenderer.once("async-show-trans", (event, arg) => {
  target_lang.innerHTML = arg.target_lang;
  translated_text.innerHTML = arg.translated_text;
  source_lang.innerHTML = arg.source_lang;
  text.innerHTML = arg.text;
  // ipcRenderer.send(
  //   "async-show-trans-reply",
  //   JSON.stringify({
  //     width: window.innerWidth,
  //     height: window.innerHeight
  //   })
  // );
});
