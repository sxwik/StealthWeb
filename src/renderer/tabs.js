
let tabsDiv = document.getElementById("tabs");
let newTabBtn = document.getElementById("new-tab");
let urlBar = document.getElementById("url");

let currentTab = null;
let tabElements = {};

newTabBtn.onclick = () => window.stealth.newTab();

window.stealth.onAddTab(id => {
    const div = document.createElement("div");
    div.className = "tab";
    div.id = "tab-" + id;

    const icon = document.createElement("img");
    icon.src = "https://www.google.com/favicon.ico";

    const title = document.createElement("span");
    title.innerText = "New Tab";

    const close = document.createElement("span");
    close.innerText = "×";
    close.className = "close";
    close.onclick = e => {
        e.stopPropagation();
        window.stealth.closeTab(id);
    };

    div.appendChild(icon);
    div.appendChild(title);
    div.appendChild(close);

    div.onclick = () => window.stealth.switchTab(id);
    tabsDiv.appendChild(div);

    tabElements[id] = { div, icon, title };

    setActive(id);
});

window.stealth.onRemoveTab(id => {
    const el = document.getElementById("tab-" + id);
    if(el) el.remove();
    delete tabElements[id];
});

window.stealth.onSetActive(id => {
    setActive(id);
});

function setActive(id){
    currentTab = id;
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    const el = document.getElementById("tab-" + id);
    if(el) el.classList.add("active");
}

window.stealth.onTabTitle(data => {
    const el = tabElements[data.id];
    if(el) el.title.innerText = data.title;
});

window.stealth.onFavicon(data => {
    const el = tabElements[data.id];
    if(el && data.icon) el.icon.src = data.icon;
});

window.stealth.onURL(url => urlBar.value = url);

urlBar.addEventListener("keydown", e => {
    if(e.key === "Enter") window.stealth.go(urlBar.value);
});

document.getElementById("back").onclick = () => window.stealth.back();
document.getElementById("forward").onclick = () => window.stealth.forward();
document.getElementById("reload").onclick = () => window.stealth.reload();
