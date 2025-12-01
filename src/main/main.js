const { app, BrowserWindow } = require('electron');
const path = require('path');
const wipe = require('./wipe');
const fp = require('./fingerprint');
const fs = require('fs');

const VERSION = "BETA 1.0";
const LOG_FILE = path.join(__dirname, '../../logs/stealthweb.log');

function log(msg) {
    fs.appendFileSync(LOG_FILE, `[${new Date().toISOString()}] ${msg}\n`);
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1300,
        height: 900,
        title: `STEALTHWEB BETA`,
        backgroundColor: "#000000",
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    win.loadFile(path.join(__dirname, '../renderer/home.html'));

    setInterval(() => {
        wipe.clearAll();
        fp.applyRandomFingerprint(win);
        log("Wipe + fingerprint refresh cycle completed.");
    }, 30000);
}

app.whenReady().then(createWindow);