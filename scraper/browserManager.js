</> Javascript
const puppeteer = require("puppeteer");
const { getProxyCredentials } = require("../config/proxyConfig");

async function launchBrowser() {

    const proxy = getProxyCredentials();

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            `--proxy-server=${proxy.server}`,
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ]
    });

    const page = await browser.newPage();

    await page.authenticate({
        username: proxy.username,
        password: proxy.password
    });

    return { browser, page };

}

module.exports = { launchBrowser };
