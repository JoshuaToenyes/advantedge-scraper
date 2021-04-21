const fs = require('fs')

const urls = fs.readFileSync('urls.txt', 'utf8').split('\n');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const articles = [];

  for (const url of urls) {
    console.log(`Scraping ${url}`); 
    await page.goto(url, { waitUntil: 'networkidle2' });
    try { 
      const article = await page.evaluate(()=> {
        let background;
        const backgroundImageElement = document.querySelector('.post > .elementor-section-wrap:first-child > .elementor-section:first-child')
        if (backgroundImageElement) {
          const style = getComputedStyle(backgroundImageElement)
          const backgroundImage = style.backgroundImage || ''
          const matches = /url\("([^"]*)"\)/.exec(backgroundImage)
          background = matches && matches[1]
        }
        
        const title = document.querySelector('.elementor-heading-title').innerText
        const text = document.querySelectorAll('.elementor-text-editor.elementor-clearfix')

        const body = Array.from(text).slice(0, -8).flatMap(node => node.innerHTML).join('\n');

        return { background, title, body }
      });

      console.log({ url, ...article })
      articles.push({ url, ...article })
    } catch (e) {
      console.error('Error scraping page.', e);
    }
  }

  fs.writeFileSync('articles.json', JSON.stringify(articles, null, 2), 'utf8');

  await browser.close()
})();
