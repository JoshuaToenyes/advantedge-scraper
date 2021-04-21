const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let nextPage = 'https://advantedgeadvisors.com/investment-banker-articles';
  const urls = [];

  while (nextPage) {
    console.log(`Scraping ${nextPage}`);

    try {
      await page.goto(nextPage, { waitUntil: 'networkidle2' });
    } catch (e) {
      console.error(`Error navigating to page ${nextPage}`, e);
      process.exit(1)
    }
    
    try {
      let data = await page.evaluate(()=> {
          const list = document.querySelectorAll('div[class="elementor-post__card"] > a');
          const anchors = Array.from(list);
          return anchors.map(a => a.href);
      })
      urls.push(...data) 
    } catch (e) {
      console.error('Error scraping page URLs', e);
      process.exit(1)
    }
    
    try {
      nextPage = await page.evaluate(() => {
        const nextPageLink = document.querySelector('.page-numbers.next');
        if (nextPageLink) {
          return nextPageLink.href;
        }
      });
    } catch (e) {
      console.error('Error getting the next page', e);
      process.exit(1)
    }
  }

  fs.writeFileSync('urls.txt', urls.join('\n'), 'utf8');

  await browser.close();
})();

