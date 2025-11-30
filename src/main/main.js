
const { app, BrowserWindow } = require('electron');
const path = require('path');
const wipe = require('./wipe');
const fp = require('./fingerprint');
const fs = require('fs');

const VERSION = "1.0.0";
const LOG_FILE = path.join(__dirname, '../../logs/stealthweb.log');

function log(msg) {
    const full = `[${new Date().toISOString()}] ${msg}\n`;
    fs.appendFileSync(LOG_FILE, full);
    console.log(full);
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        title: `StealthWeb v${VERSION}`,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    win.loadFile(path.join(__dirname, '../renderer/index.html'));
    fp.applyRandomFingerprint(win);
    log("Applied random fingerprint.");

    setInterval(() => {
        wipe.clearAll();
        fp.applyRandomFingerprint(win);
        log("Wipe + fingerprint refresh cycle completed.");
    }, 30000);
}

app.whenReady().then(createWindow);
