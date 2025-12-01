
const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let tabs = [];
let activeTab = null;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1300,
        height: 900,
        title: "STEALTHWEB BETA",
        backgroundColor: "#000000",
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true
        }
    });

    mainWindow.loadFile(path.join(__dirname, '../renderer/tabs.html'));
    return mainWindow;
}

function createTab(url = "https://www.google.com") {
    const view = new BrowserView({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true
        }
    });

    const id = Date.now();
    tabs.push({ id, view });

    view.webContents.on("page-title-updated", (_, title) => {
        mainWindow.webContents.send("update-tab-title", { id, title });
    });

    view.webContents.on("page-favicon-updated", (_, favs) => {
        mainWindow.webContents.send("update-tab-favicon", { id, icon: favs[0] });
    });

    switchTab(id);
    view.webContents.loadURL(url);

    return id;
}

function switchTab(id) {
    const tab = tabs.find(t => t.id === id);
    if (!tab) return;

    if (activeTab) mainWindow.removeBrowserView(activeTab.view);

    activeTab = tab;
    mainWindow.setBrowserView(tab.view);
    tab.view.setBounds({ x: 0, y: 95, width: 1300, height: 805 });

    mainWindow.webContents.send("set-active-tab", id);
    mainWindow.webContents.send("update-url", tab.view.webContents.getURL());
}

function closeTab(id){
    const index = tabs.findIndex(t => t.id === id);
    if(index === -1) return;

    const closing = tabs[index];

    tabs.splice(index,1);

    if(tabs.length === 0){
        const newID = createTab();
        mainWindow.webContents.send("add-tab", newID);
        return;
    }

    if(activeTab.id === id){
        const next = tabs[index] || tabs[index-1];
        switchTab(next.id);
    }

    mainWindow.webContents.send("remove-tab", id);
}

ipcMain.on("new-tab", () => {
    const id = createTab();
    mainWindow.webContents.send("add-tab", id);
});

ipcMain.on("switch-tab", (_, id) => switchTab(id));
ipcMain.on("close-tab", (_, id) => closeTab(id));

ipcMain.on("navigate", (_, url) => {
    if (!activeTab) return;
    if (!url.startsWith("http")) url = "https://" + url;
    activeTab.view.webContents.loadURL(url);
});

ipcMain.on("nav-back", () => activeTab?.view.webContents.goBack());
ipcMain.on("nav-forward", () => activeTab?.view.webContents.goForward());
ipcMain.on("nav-reload", () => activeTab?.view.webContents.reload());

app.whenReady().then(() => {
    createMainWindow();
    const first = createTab();
    mainWindow.webContents.once("did-finish-load", () => {
        mainWindow.webContents.send("add-tab", first);
    });
});
