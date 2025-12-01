
const { app, BrowserWindow, BrowserView, session } = require('electron');
const path = require('path');
const { startTor } = require("./torManager");

let mainWindow;
let view;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1300,
        height: 900,
        backgroundColor: "#000000",
        title: "STEALTHWEB BETA (TOR MODE)",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true
        }
    });

    mainWindow.loadFile(path.join(__dirname, "../renderer/tor_indicator.html"));

    // Force all traffic through TOR
    session.defaultSession.setProxy({
        proxyRules: "socks5://127.0.0.1:9050"
    });

    setTimeout(() => {
        createTorBrowserView("https://check.torproject.org");
    }, 4000);
}

function createTorBrowserView(url) {
    view = new BrowserView({
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true
        }
    });

    mainWindow.setBrowserView(view);
    view.setBounds({ x: 0, y: 70, width: 1300, height: 830 });
    view.webContents.loadURL(url);
}

app.whenReady().then(() => {
    startTor();
    createWindow();
});
