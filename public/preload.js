const electron = require('electron').remote;
const dialog = electron.dialog;
const BrowserView = electron.BrowserView;
const BrowserWindow = electron.BrowserWindow;

window.electron = {};
window.electron.dialog = dialog;
window.electron.BrowserView = BrowserView;
window.electron.BrowserWindow = BrowserWindow;
