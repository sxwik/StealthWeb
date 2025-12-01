const { session } = require('electron');
module.exports = {
    clearAll(){
        const ses=session.defaultSession;
        ses.clearCache();
        ses.clearStorageData();
    }
};