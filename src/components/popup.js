import client from './py_connection';
const BrowserWindow = window.electron.BrowserWindow;

function popUp() {
  let x, y;
  client.invoke('getMousePosition', (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    x = result[0];
    y = result[1];
    let framelessWin = new BrowserWindow({
      x: x,
      y: y,
      width: 400,
      height: 500,
      frame: false,
      alwaysOnTop: true,
      resizable: false,
    });

    framelessWin.setMenuBarVisibility(false);
    framelessWin.on('blur', () => framelessWin.close());
    framelessWin.show();
  });
}

export default popUp;
