</> Javascript
require("dotenv").config();

function generateSession() {
    return Math.floor(Math.random() * 1000000);
}

function getProxyCredentials() {

    const session = generateSession();

    const proxyHost = process.env.PROXY_HOST;
    const proxyPort = process.env.PROXY_PORT;
    const proxyUser = process.env.PROXY_USER;
    const proxyPass = process.env.PROXY_PASS;

    return {
        server: `http://${proxyHost}:${proxyPort}`,
        username: `${proxyUser}-session-${session}`,
        password: proxyPass
    };

}

module.exports = { getProxyCredentials };
