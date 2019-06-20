import client from '../../controller/monitor/py_connection';
import translate from '../../controller/api/translation';
import { lookup_lang } from '../../config/api_config';
const BrowserWindow = window.electron.BrowserWindow;

const _width = 400;
const _height = 250;

function popUp(text, config) {
  let x, y;
  client.invoke('get_mouse_position', (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    x = result[0];
    y = result[1];
    let framelessWin = new BrowserWindow({
      x: x,
      y: y,
      width: _width,
      height: _height,
      minWidth: _width,
      maxHeight: _height,
      movable: false,
      frame: false,
      alwaysOnTop: false,
      resizable: false,
      useContentSize: true,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    framelessWin.loadFile('public/popup.html');
    framelessWin.webContents.on('set-height', (event, arg) => {
      console.log(arg);
    });
    framelessWin.webContents.on('did-finish-load', () => {
      translate(text, config).then(res => {
        framelessWin.webContents.send('async-show-trans', {
          target_lang: lookup_lang[config.target_lang],
          translated_text: res,
          source_lang: lookup_lang[config.source_lang],
          text: text,
        });
      });
    });
    framelessWin.setMenuBarVisibility(false);
    framelessWin.on('blur', () => framelessWin.close());
    framelessWin.show();
  });
}

export default popUp;
