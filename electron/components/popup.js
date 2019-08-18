const ipcRenderer = require("electron").ipcRenderer;
var body = document.body;
function changeElement(arg) {
  // Display the content
  body.innerHTML = `<div class="popup_detail"><h5 id="source_lang">${
    arg.source_lang
  }</h5><p id="text">${
    arg.text
  }</p></div><div class="popup_detail"><h5 id="target_lang">${
    arg.target_lang
  }</h5><p id="translated_text">${arg.translated_text}</p></div>`;
}
function showError(e) {
  body.innerHTML = `<p>${e}</p>`;
}
function showLoading() {
  body.innerHTML = `<img src="../images/spinner.gif" height="28" width="28"/>`;
}
function sendSize(sender, ev) {
  let ele = document.documentElement;
  sender.send(
    ev,
    JSON.stringify({
      height: ele.offsetHeight,
      width: ele.offsetWidth
    })
  );
}
ipcRenderer.on("async-show-trans", (event, arg) => {
  // Send back the whole document height
  changeElement(arg);
  // for ipcMain to resize the pop up "framelessWin"
  sendSize(event.sender, "async-show-trans-reply");
});
ipcRenderer.on("async-show-trans-error", (event, arg) => {
  showError(arg);
});
ipcRenderer.on("async-show-loading", (event, arg) => {
  showLoading();
  sendSize(event.sender, "async-show-loading-reply");
});
