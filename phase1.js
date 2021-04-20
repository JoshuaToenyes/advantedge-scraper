
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://advantedgeadvisors.com/investment-banker-articles/page/4/', {
    waitUntil: 'networkidle2',
  });
  let data = await page.evaluate(()=> {
      const list = document.querySelectorAll('div[class="elementor-post__card"] > a');
      const anchors = Array.from(list);
      const hrefs = anchors.map( a => a.href);

      return { hrefs }
  })
  console.log(data)

  await browser.close();

})();


