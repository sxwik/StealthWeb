const fingerprints = require('../../config/fingerprints.json');
function random(){ return fingerprints[Math.floor(Math.random()*fingerprints.length)]; }
function applyRandomFingerprint(win){ win.webContents.setUserAgent(random().userAgent); }
module.exports = { applyRandomFingerprint };