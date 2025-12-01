const fp=[{"userAgent":"Mozilla/5.0 Chrome","timezone":"Asia/Tokyo"}];
module.exports={applyRandomFingerprint:win=>win.webContents.setUserAgent(fp[0].userAgent)};
