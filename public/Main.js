const {app, BrowserWindow, globalShortcut} = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
    
    const win = new BrowserWindow({
        width: 1300,
        height: 800,
        minWidth: 400,
        webPreferences: {
            nodeIntegration: true,
            devTools: false,
        },
    });

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });

    win.loadURL(startUrl);

}

app.on('browser-window-focus', function () {
    globalShortcut.register("CommandOrControl+R", () => {
        console.log("CommandOrControl+R is pressed: Shortcut Disabled");
    });
    globalShortcut.register("CommandOrControl+Shift+R", () => {
        console.log("CommandOrControl+Shift+R is pressed: Shortcut Disabled");
    });
    globalShortcut.register("F5", () => {
        console.log("F5 is pressed: Shortcut Disabled");
    });
});

app.on('browser-window-blur', function () {
    globalShortcut.unregister('CommandOrControl+R');
    globalShortcut.unregister("CommandOrControl+Shift+R");
    globalShortcut.unregister('F5');
});

app.on('ready', createWindow);
