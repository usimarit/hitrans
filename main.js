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

let MainWindow;
let framelessWin;
let server;
let tray;

const icon_path = path.join(__dirname, "/electron/assets/images/translate.png");
const popup_html = path.join(__dirname, "/electron/assets/html/popup.html");
const background_html = path.join(
  __dirname,
  "/electron/assets/html/background.html"
);

function createWindow() {
  MainWindow = new BrowserWindow({
    width: 1100,
    height: 680,
    title: "Hitrans",
    autoHideMenuBar: true,
    icon: icon_path,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + "/electron/preload.js"
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
  file.get_config(data => {
    config = data.configurations;
  });
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
      nodeIntegration: true
    }
  });

  framelessWin.loadFile(popup_html);
  framelessWin.webContents.once("did-finish-load", () => {
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
  framelessWin.on("blur", () => {
    try {
      framelessWin.close();
    } catch (e) {
      console.error(e);
    }
    framelessWin = null;
  });
  framelessWin.show();
}

function createServer() {
  server = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    show: false
  });
  server.loadFile(background_html);
}

app.on("ready", () => {
  createWindow();
  createServer();

  ipcMain.on("popup", (event, arg) => {
    let data = JSON.parse(arg);
    popUp(data.text, data.x, data.y);
  });

  // ipcMain.on("async-show-trans-reply", (event, arg) => {
  //   arg = JSON.parse(arg);
  //   framelessWin.setSize(arg.width, arg.height);
  //   console.log("New size: " + arg.width + ", " + arg.height);
  // });

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
});

app.on("activate", () => {
  if (MainWindow === null) {
    createWindow();
  }
});
