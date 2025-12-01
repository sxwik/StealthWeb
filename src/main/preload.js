
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("stealth", {
    newTab: () => ipcRenderer.send("new-tab"),
    switchTab: id => ipcRenderer.send("switch-tab", id),
    go: url => ipcRenderer.send("navigate", url),
    back: () => ipcRenderer.send("nav-back"),
    forward: () => ipcRenderer.send("nav-forward"),
    reload: () => ipcRenderer.send("nav-reload"),
    onURL: cb => ipcRenderer.on("update-url", (e, url) => cb(url)),
    onAddTab: cb => ipcRenderer.on("add-tab", (e, id) => cb(id))
});
