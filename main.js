const electron = require('electron');
const { app, BrowserWindow } = electron;

let win;
const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 480,
    minWidth: 480,
    frame: false,
    show: false,
    icon: `file://${__dirname}/dist/assets/favicon.ico`
  });
  win.loadURL(`file://${__dirname}/dist/index.html`);
  // win.webContents.openDevTools();
  win.on('closed', () => win = null);
  win.on('ready-to-show', () => {
    win.show()
    win.focus()
  });
};

app.on('ready', _ => createWindow());
app.on('window-all-closed', _ => process.platform !== 'darwin' && app.quit());
app.on('activate', _ => win === null && createWindow());