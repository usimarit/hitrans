const google_translation = require("./electron/controller/config/google_translation");
const file = require("./electron/controller/general/config_file");
const translate = require("./electron/controller/api/translation");
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Tray = electron.Tray;
const Menu = electron.Menu;
const ipcMain = electron.ipcMain;
const path = require("path");
const isDev = require("electron-is-dev");

let MainWindow = null;
let framelessWin = null;
let tray = null;

const icon_path = path.join(__dirname, "/electron/assets/images/translate.png");
const popup_html = path.join(__dirname, "/electron/assets/html/popup.html");

function createWindow() {
  MainWindow = new BrowserWindow({
    width: 1100,
    height: 680,
    title: "Hitrans",
    autoHideMenuBar: true,
    icon: icon_path,
    webPreferences: {
      nodeIntegration: true
    }
  });
  MainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  MainWindow.on("close", e => {
    if (!app.isQuiting) {
      e.preventDefault();
      MainWindow.hide();
    }
    return false;
  });
  MainWindow.on("page-title-updated", function(e) {
    e.preventDefault();
  });

  tray = new Tray(icon_path);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show",
      click() {
        MainWindow.show();
      }
    },
    {
      label: "Quit",
      click() {
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);
  tray.setToolTip("Hitrans");
  tray.setContextMenu(contextMenu);
}

function popUp(text, x, y) {
  let config;
  framelessWin = new BrowserWindow({
    x: x,
    y: y,
    width: 400,
    height: 180,
    movable: false,
    frame: false,
    alwaysOnTop: false,
    resizable: false,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: false
    }
  });

  framelessWin.loadFile(popup_html);
  framelessWin.webContents.on("did-finish-load", () => {
    translate(text, config).then(res => {
      framelessWin.webContents.send("async-show-trans", {
        target_lang: google_translation.lookup_lang[config.target_lang],
        translated_text: res,
        source_lang: google_translation.lookup_lang[config.source_lang],
        text: text
      });
    });
  });
  framelessWin.setMenuBarVisibility(false);
  framelessWin.on("blur", () => framelessWin.close());
  framelessWin.show();
}

app.on("ready", createWindow);

app.on("activate", () => {
  if (MainWindow === null) {
    createWindow();
  }
});

ipcMain.on("popup", (event, arg) => {
  arg = JSON.parse(arg);
  popUp(arg.text, arg.x, arg.y);
  console.log("Pop up arg: " + arg);
});

ipcMain.on("async-show-trans-reply", (event, arg) => {
  arg = JSON.parse(arg);
  framelessWin.setSize(arg.width, arg.height);
  console.log("New size: " + arg.width + ", " + arg.height);
});

ipcMain.on("create-config-file", (event, arg) => {
  file.create_config_file(error => {
    if (error) {
      console.error(error);
    }
    file.get_config(data => {
      event.reply("create-config-file-reply", JSON.stringify(data));
    });
  });
});

ipcMain.on("write-config-file", (event, arg) => {
  let data = JSON.parse(arg);
  file.write_config(data, message => {
    event.reply("write-config-file-reply", message);
  });
});

ipcMain.on("get-config-file", (event, arg) => {
  file.get_config(data => {
    event.reply("get-config-file-reply", JSON.stringify(data));
  });
});

ipcMain.on("get-google-translate-config", (event, arg) => {
  event.reply(
    "get-google-translate-config-reply",
    JSON.stringify({
      lang: google_translation.lang,
      engine: google_translation.engine,
      version: google_translation.version,
      lookup_lang: google_translation.lookup_lang
    })
  );
});
