
const fingerprints = require('../../config/fingerprints.json');

function random() {
    return fingerprints[Math.floor(Math.random() * fingerprints.length)];
}
function applyRandomFingerprint(win) {
    const fp = random();
    win.webContents.setUserAgent(fp.userAgent);
}
module.exports = { applyRandomFingerprint };
