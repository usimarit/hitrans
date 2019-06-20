import client from '../../controller/monitor/py_connection';
const BrowserWindow = window.electron.BrowserWindow;

const _width = 400;
const _height = 250;

function popUp(source_lang, text, target_lang, translated_text) {
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
      framelessWin.webContents.send('async-show-trans', {
        target_lang: target_lang,
        translated_text: translated_text,
        source_lang: source_lang,
        text: text,
      });
    });
    framelessWin.setMenuBarVisibility(false);
    framelessWin.on('blur', () => framelessWin.close());
    framelessWin.show();
  });
}

export default popUp;
