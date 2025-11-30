
const { session } = require('electron');
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../../logs/stealthweb.log');
function log(msg) {
    fs.appendFileSync(LOG_FILE, `[${new Date().toISOString()}] ${msg}\n`);
}

function clearAll() {
    const ses = session.defaultSession;
    ses.clearStorageData({ storages:[
        "cookies","localstorage","cachestorage","indexdb",
        "filesystem","serviceworkers","websql","shadercache"
    ]});
    ses.clearCache();
    log("All browser data wiped.");
}
module.exports = { clearAll };
