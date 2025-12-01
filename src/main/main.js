
const { app, BrowserWindow, BrowserView } = require('electron');
const path = require('path');
const wipe = require('./wipe');
const fp = require('./fingerprint');
const fs = require('fs');

let tabs = [];
let activeTab = null;

function createMainWindow() {
    const win = new BrowserWindow({
        width: 1300,
        height: 900,
        title: "STEALTHWEB BETA",
        backgroundColor: "#000000",
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    win.loadFile(path.join(__dirname, '../renderer/tabs.html'));
    return win;
}

function createTab(win, url="https://google.com") {
    const view = new BrowserView({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true
        }
    });

    const id = Date.now();
    tabs.push({ id, view });

    if(activeTab !== null){
        win.removeBrowserView(activeTab.view);
    }

    activeTab = { id, view };
    win.setBrowserView(view);
    view.setBounds({ x: 0, y: 95, width: 1300, height: 805 });
    view.webContents.loadURL(url);
}

app.whenReady().then(() => {
    const win = createMainWindow();
    createTab(win);
});
