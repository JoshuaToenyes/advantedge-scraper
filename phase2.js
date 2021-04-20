const hrefs = [
    // 'https://advantedgeadvisors.com/2017/11/21/the-difference-between-business-brokers-ma-advisors-and-investment-bankers/',
    // 'https://advantedgeadvisors.com/2017/02/22/what-is-my-business-worth/',
    // 'https://advantedgeadvisors.com/2020/09/09/benefits-of-an-advisor-beyond-finding-a-buyer/',
    // 'https://advantedgeadvisors.com/2019/06/04/why-you-should-exit-while-youre-ahead-a-cautionary-tale/',
    // 'https://advantedgeadvisors.com/2019/05/06/5-reasons-why-your-business-is-too-dependent-on-you/',
    // 'https://advantedgeadvisors.com/2019/04/15/why-companies-are-adopting-subscription-billing-models/',
    // 'https://advantedgeadvisors.com/2019/03/11/the-big-thing-holding-back-small-businesses/',
    // 'https://advantedgeadvisors.com/2019/01/02/the-one-number-owners-need-to-stop-focusing-on/',
    // 'https://advantedgeadvisors.com/2018/12/11/the-surprising-way-companies-like-netflix-and-amazon-conduct-market-research/',
    // 'https://advantedgeadvisors.com/2018/12/11/creating-sticky-customers/',
    // 'https://advantedgeadvisors.com/2018/10/16/exiting-tips-from-one-of-the-top-40-under-40/',
    // 'https://advantedgeadvisors.com/2018/09/10/the-biggest-mistake-owners-make-when-selling/',
    // 'https://advantedgeadvisors.com/2018/08/13/the-anatomy-of-a-successful-exit/',
    // 'https://advantedgeadvisors.com/2018/07/02/the-buy-vs-build-equation/',
    // 'https://advantedgeadvisors.com/2018/05/22/growing-fast-heres-whats-likely-to-kill-your-company/',
    // 'https://advantedgeadvisors.com/2018/04/11/successful-entrepreneurs-can-be-the-doer-and-the-dealmaker/',
    // 'https://advantedgeadvisors.com/2018/03/05/how-to-lure-a-giant-like-facebook-into-buying-your-company/',
    //'https://advantedgeadvisors.com/2018/01/30/one-tweak-that-can-instantly-add-millions-to-the-value-of-your-business/',
    //  'https://advantedgeadvisors.com/2017/11/21/the-difference-between-business-brokers-ma-advisors-and-investment-bankers/',
    //  'https://advantedgeadvisors.com/2017/11/15/one-way-to-decide-when-to-sell/',
    //  'https://advantedgeadvisors.com/2017/10/25/maximizing-the-sale-of-your-company-building-business-value/',
    //  'https://advantedgeadvisors.com/2017/10/24/5-lessons-from-home-depots-acquisition-of-blinds-com/',
    //  'https://advantedgeadvisors.com/2017/09/22/5-reasons-why-now-might-be-the-right-time-to-sell/',
    //  'https://advantedgeadvisors.com/2017/08/14/why-now-is-the-riskiest-time-to-own-your-business/',
    //  'https://advantedgeadvisors.com/2017/07/24/how-to-find-the-perfect-buyer-for-your-business/',
    //  'https://advantedgeadvisors.com/2017/07/18/3-ways-to-make-your-company-more-valuable-than-your-industry-peers/',
    //  'https://advantedgeadvisors.com/2017/06/27/preparation-the-difference-between-successful-and-failed-deals/',
    //  'https://advantedgeadvisors.com/2017/05/17/increasing-business-value-before-a-sale/'
      'https://advantedgeadvisors.com/2017/04/24/how-to-avoid-7-common-deal-killers/',
     'https://advantedgeadvisors.com/2017/03/21/the-benefits-of-an-ma-advisor/',
      'https://advantedgeadvisors.com/2017/02/22/what-is-my-business-worth/'
  ];
  
const puppeteer = require('puppeteer');
const list = hrefs.map ((href) => {

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

    await page.goto(href, {
        waitUntil: 'networkidle2',
      });
      let data = await page.evaluate(()=> {
          const background = document.querySelector('style[id="elementor-frontend-inline-css"]').innerText.split('"')[1];
          const title = document.querySelector('div[class="elementor-widget-container"] > h1').innerText;
          const text = document.querySelectorAll('div[class="elementor-text-editor elementor-clearfix"] > p');

          const allTexts = Array.from(text);
          const textList = allTexts.map( a => a.innerText).toString();

          const articles = {background: background, title: title, textList: textList};
          const jsonArticles = JSON.stringify(articles);
          return { jsonArticles }
      })
      console.log(data)
    
      await browser.close();

})();
})