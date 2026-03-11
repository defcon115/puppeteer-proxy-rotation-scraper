# puppeteer-proxy-rotation-scraper

Overview
This project is a robust, scalable, and high-performance web scraping solution built using Puppeteer, Puppeteer Cluster, and NetNut residential proxies. It is optimized for scraping large volumes of pages (1000+ per hour) while minimizing blocks and detection. Ideal for developers, data analysts, and businesses needing reliable automated data collection.

Features

Scalable Scraping with Clustering
Uses puppeteer-cluster to manage multiple concurrent browser instances for high-throughput scraping.

Proxy Rotation via NetNut
Integrates NetNut residential proxies to avoid IP bans and ensure maximum reliability.

Customizable Concurrency & Retry Logic
Fine-tune scraping speed, concurrency, and automatic retries for failed requests.

Dynamic Content Handling
Supports websites that rely heavily on JavaScript and dynamic content rendering.
Data Export
Save scraped data in JSON or CSV format for easy integration with your analytics or databases.

Error Handling & Logging
Automatic error logging and graceful handling of failed requests.

Table of Contents

->Installation
->Configuration
->Usage
->Proxy Integration
->Advanced Features
->Contributing
->License

Installation
Make sure you have Node.js v18+ installed.
</> Bash
# Clone the repository
git clone https://github.com/defcon115/puppeteer-netnut-scraper.git
cd puppeteer-netnut-scraper

# Install dependencies
npm install

 Configuration
Create a .env file in the root directory and configure the following:
</> Env
NETNUT_API_KEY=your_netnut_api_key
CONCURRENCY=10           # Number of simultaneous browser instances
RETRY_COUNT=3            # Retry attempts for failed pages
OUTPUT_PATH=./data       # Folder to save scraped results
⚠️ Keep your NetNut API key secure. 

 Usage
Basic Scraper
</> Bash
npm run scrape
The scraper will:

Launch a Puppeteer Cluster with the specified concurrency.
Rotate IPs using NetNut proxies.
Scrape the target pages and save the results to OUTPUT_PATH.

Advanced Options
You can customize the scraper by editing config.js:
</> Javascript
module.exports = {
  concurrency: 20,
  retryCount: 5,
  headless: true,
  exportFormat: 'csv', // 'json' or 'csv'
};

Proxy Integration
This scraper uses NetNut residential proxies for high reliability:
</> Javascript
const browser = await puppeteer.launch({
  args: [
    `--proxy-server=https://${process.env.NETNUT_API_KEY}@proxy.netnut.io:22225`
  ],
  headless: true
});

Benefits of NetNut Proxies
->Residential IPs reduce chances of blocking
->Automatic geographic targeting for location-specific scraping
->High-speed, unlimited bandwidth for enterprise-grade scraping

Advanced Features
->Clustered Scraping – Handles hundreds of pages in parallel with intelligent queuing.
->Auto-Retry & Error Logging – Ensures failed requests are retried without losing progress.
->Dynamic Content Handling – Works with SPAs and JavaScript-heavy sites.
->CSV/JSON Export – Plug-and-play with analytics tools or databases.

Contributing

Contributions are welcome! Please follow these steps:

1.Fork the repository
2.Create a feature branch (git checkout -b feature/YourFeature)
3.Commit your changes (git commit -am 'Add new feature')
4.Push to the branch (git push origin feature/YourFeature)
5.Open a Pull Request

License

This project is licensed under the MIT License

Try Netnut Proxy->https://fas.st/t/scA2pPL2

