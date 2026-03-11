</> Javascript
require("dotenv").config();

const { launchBrowser } = require("./browserManager");
const { detectCaptcha } = require("./captchaDetector");
const { loadUrls } = require("../utils/urlLoader");
const { saveResult } = require("../utils/dataExporter");
const { log } = require("../utils/logger");

const MAX_CONCURRENCY = process.env.MAX_CONCURRENCY || 5;
const RETRY_LIMIT = process.env.RETRY_LIMIT || 3;
const REQUEST_DELAY = process.env.REQUEST_DELAY || 3000;

const urls = loadUrls();

async function scrapeUrl(url, retry = 0) {

    let browser;

    try {

        const session = await launchBrowser();

        browser = session.browser;
        const page = session.page;

        log(`Scraping: ${url}`);

        await page.goto(url, {
            waitUntil: "domcontentloaded",
            timeout: 60000
        });

        const blocked = await detectCaptcha(page);

        if (blocked) {
            throw new Error("Captcha detected");
        }

        const data = await page.evaluate(() => {

            return {
                title: document.title,
                h1: document.querySelector("h1")?.innerText || null
            };

        });

        saveResult({
            url,
            title: data.title,
            heading: data.h1
        });

        await browser.close();

        await new Promise(r => setTimeout(r, REQUEST_DELAY));

    } catch (error) {

        log(`Error scraping ${url}: ${error.message}`);

        if (browser) await browser.close();

        if (retry < RETRY_LIMIT) {

            log(`Retrying ${url} (${retry + 1})`);

            return scrapeUrl(url, retry + 1);

        }

    }

}

async function start() {

    const queue = [...urls];

    const workers = Array.from({ length: MAX_CONCURRENCY }).map(async () => {

        while (queue.length) {

            const url = queue.shift();

            await scrapeUrl(url);

        }

    });

    await Promise.all(workers);

    log("Scraping completed");

}

start();
