
let tabsDiv = document.getElementById("tabs");
let newTabBtn = document.getElementById("new-tab");
let urlBar = document.getElementById("url");

let currentTab = null;

newTabBtn.onclick = () => {
    window.stealth.newTab();
};

window.stealth.onAddTab(id => {
    const div = document.createElement("div");
    div.className = "tab";
    div.id = "tab-" + id;
    div.innerText = "Tab";
    div.onclick = () => window.stealth.switchTab(id);
    tabsDiv.appendChild(div);
    setActive(id);
});

function setActive(id){
    currentTab = id;
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    let tabEl = document.getElementById("tab-" + id);
    if(tabEl) tabEl.classList.add("active");
}

window.stealth.onURL(url => {
    urlBar.value = url;
});

urlBar.addEventListener("keydown", e => {
    if(e.key === "Enter"){
        window.stealth.go(urlBar.value);
    }
});

document.getElementById("back").onclick = () => window.stealth.back();
document.getElementById("forward").onclick = () => window.stealth.forward();
document.getElementById("reload").onclick = () => window.stealth.reload();
