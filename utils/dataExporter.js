</> Javascript
const fs = require("fs");

function saveResult(data) {

    fs.appendFileSync(
        "results.json",
        JSON.stringify(data) + "\n"
    );

}

module.exports = { saveResult };
