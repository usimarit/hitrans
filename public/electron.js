const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

let MainWindow;

function createWindow() {
  MainWindow = new BrowserWindow({
    width: 1100,
    height: 680,
    title: 'Hitrans',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/preload.js',
    },
  });
  MainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );
  MainWindow.on('closed', () => (MainWindow = null));
  MainWindow.on('page-title-updated', function(e) {
    e.preventDefault();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (MainWindow === null) {
    createWindow();
  }
});
