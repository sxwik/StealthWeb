
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("stealth", {
    newTab: () => ipcRenderer.send("new-tab"),
    switchTab: id => ipcRenderer.send("switch-tab", id),
    closeTab: id => ipcRenderer.send("close-tab", id),
    go: url => ipcRenderer.send("navigate", url),
    back: () => ipcRenderer.send("nav-back"),
    forward: () => ipcRenderer.send("nav-forward"),
    reload: () => ipcRenderer.send("nav-reload"),

    onURL: cb => ipcRenderer.on("update-url", (_, url) => cb(url)),
    onAddTab: cb => ipcRenderer.on("add-tab", (_, id) => cb(id)),
    onRemoveTab: cb => ipcRenderer.on("remove-tab", (_, id) => cb(id)),
    onTabTitle: cb => ipcRenderer.on("update-tab-title", (_, data) => cb(data)),
    onFavicon: cb => ipcRenderer.on("update-tab-favicon", (_, data) => cb(data)),
    onSetActive: cb => ipcRenderer.on("set-active-tab", (_, id) => cb(id))
});
