const google_translation = require("./electron/controller/config/google_translation");
const file = require("./electron/controller/general/config_file");
const translate = require("./electron/controller/api/translation");
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Tray = electron.Tray;
const Menu = electron.Menu;
const ipcMain = electron.ipcMain;
const ipcRenderer = electron.ipcRenderer;
const path = require("path");
const isDev = require("electron-is-dev");
const log = require("electron-log");

let MainWindow;
let framelessWin;
let server;
let tray;

const icon_path = path.join(__dirname, "/electron/assets/images/translate.png");
const popup_html = path.join(__dirname, "/electron/assets/html/popup.html");
const background_html = path.join(
  __dirname,
  "/electron/assets/html/background.html",
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
      preload: __dirname + "/electron/preload.js",
    },
  });
  MainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`,
  );
  MainWindow.on("close", e => {
    // Minimize to system tray
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
  // Create and set menu of the tray icon
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show",
      click() {
        MainWindow.show();
      },
    },
    {
      label: "Quit",
      click() {
        app.isQuiting = true;
        app.quit();
      },
    },
  ]);
  tray.setToolTip("Hitrans");
  tray.setContextMenu(contextMenu);
}

function destroyBrowserWindow(win) {
  try {
    win.destroy();
  } catch (e) {
    // Logging
    log.log(e);
  }
  win = null;
}

function popUp(text, x, y) {
  if (framelessWin) {
    destroyBrowserWindow(framelessWin);
  }
  let config;
  return file.get_config(data => {
    config = data.configurations;
    if (!config.api_key) {
      // Do nothing because api key is needed to call google api
      return;
    } else {
      // create the framless window
      framelessWin = new BrowserWindow({
        // Pop up at mouse position
        x: x,
        y: y,
        minHeight: 0,
        minWidth: 0,
        width: 0,
        height: 0,
        movable: false,
        useContentSize: true,
        // Remove all title bar and borders
        frame: false,
        show: false,
        alwaysOnTop: true,
        resizable: false,
        // Enable node so that ipcRenderer can work in popup_html
        webPreferences: {
          nodeIntegration: true,
        },
        // Prevent create a seperate window in task manager
        skipTaskbar: true,
      });

      framelessWin.loadFile(popup_html);
      // Immediately translate after the window is ready
      framelessWin.webContents.once("did-finish-load", () => {
        framelessWin.webContents.send("async-show-loading");
        translate(text, config)
          .then(res => {
            framelessWin.webContents.send("async-show-trans", {
              target_lang: google_translation.lookup_lang[config.target_lang],
              translated_text: res,
              source_lang: google_translation.lookup_lang[config.source_lang],
              text: text,
            });
          })
          .catch(e => {
            framelessWin.webContents.send("async-show-trans-error", e);
          });
      });
      framelessWin.setMenuBarVisibility(false);
      // Handle exceptions by destroying the frameless window
      framelessWin.on("unresponsive", () => {
        destroyBrowserWindow(framelessWin);
      });
      framelessWin.on("blur", () => {
        destroyBrowserWindow(framelessWin);
      });
      framelessWin.on("ready-to-show", () => {
        framelessWin.show();
      });
    }
  });
}

/**
 * Create background Node gRPC Server for Python gRPC Client to call
 * This server runs as ipcRenderer Process in Electron
 */
function createServer() {
  server = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
  });
  server.loadFile(background_html);
  server.on("closed", () => {
    ipcRenderer.send("server-closed");
  });
}

app.on("ready", () => {
  createWindow();
  createServer();

  // Restart the electron server
  ipcMain.on("server-closed", (event, arg) => {
    destroyBrowserWindow(server);
    createServer();
  });

  ipcMain.on("popup", (event, arg) => {
    let data = JSON.parse(arg);
    popUp(data.text, data.x, data.y);
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
  // Communicate with React to get and set the configurations
  ipcMain.on("get-google-translate-config", (event, arg) => {
    event.reply(
      "get-google-translate-config-reply",
      JSON.stringify({
        lang: google_translation.lang,
        engine: google_translation.engine,
        version: google_translation.version,
        lookup_lang: google_translation.lookup_lang,
      }),
    );
  });
  // Resize popUp window "framlessWin" to match its content
  // The max height is set in its css file
  ipcMain.on("async-show-trans-reply", (event, arg) => {
    let data = JSON.parse(arg);
    console.log(data);
    log.debug("Async-show-trans-reply: " + JSON.stringify(data));
    let width = Math.ceil(data.width);
    let height = Math.ceil(data.height);
    framelessWin.setSize(width, height);
  });
  ipcMain.on("async-show-loading-reply", (event, arg) => {
    let data = JSON.parse(arg);
    console.log(data);
    log.debug("Async-show-loading-reply: " + JSON.stringify(data));
    let width = Math.ceil(data.width);
    let height = Math.ceil(data.height);
    framelessWin.setSize(width, height);
  });
});

app.on("activate", () => {
  if (MainWindow === null) {
    createWindow();
  }
});
