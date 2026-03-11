</> Javascript
async function detectCaptcha(page) {

    const content = await page.content();

    if (
        content.includes("captcha") ||
        content.includes("verify you are human") ||
        content.includes("cloudflare")
    ) {
        return true;
    }

    return false;
}

module.exports = { detectCaptcha };
