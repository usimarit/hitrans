const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Tray = electron.Tray;
const Menu = electron.Menu;

const path = require('path');
const isDev = require('electron-is-dev');

let MainWindow = null;
let tray = null;

const icon_path = path.join(__dirname, 'translate.png');

function createWindow() {
  MainWindow = new BrowserWindow({
    width: 1100,
    height: 680,
    title: 'Hitrans',
    autoHideMenuBar: true,
    icon: icon_path,
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
  MainWindow.on('close', e => {
    if (!app.isQuiting) {
      e.preventDefault();
      MainWindow.hide();
    }
    return false;
  });
  MainWindow.on('page-title-updated', function(e) {
    e.preventDefault();
  });

  tray = new Tray(icon_path);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show',
      click() {
        MainWindow.show();
      },
    },
    {
      label: 'Quit',
      click() {
        app.isQuiting = true;
        app.quit();
      },
    },
  ]);
  tray.setToolTip('Hitrans');
  tray.setContextMenu(contextMenu);
}

app.on('ready', createWindow);

app.on('activate', () => {
  if (MainWindow === null) {
    createWindow();
  }
});
