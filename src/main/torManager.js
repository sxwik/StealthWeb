
const { spawn } = require("child_process");
const path = require("path");

let torProcess = null;

function startTor() {
    const torPath = path.join(__dirname, "../../tor/tor.exe");

    torProcess = spawn(torPath, ["-f", path.join(__dirname, "../../tor/torrc")], {
        windowsHide: true,
        detached: false
    });

    torProcess.stdout.on("data", d => console.log("TOR:", d.toString()));
    torProcess.stderr.on("data", d => console.log("TOR ERR:", d.toString()));

    torProcess.on("close", () => console.log("Tor stopped."));
}

module.exports = { startTor };
