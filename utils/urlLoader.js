</> Javascript
const fs = require("fs");

function loadUrls() {

    const urls = fs.readFileSync("urls.txt", "utf-8")
        .split("\n")
        .map(u => u.trim())
        .filter(Boolean);

    return urls;

}

module.exports = { loadUrls };
