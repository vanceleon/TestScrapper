Testing Web scrapper using this: 
https://blog.bitsrc.io/https-blog-bitsrc-io-how-to-perform-web-scraping-using-node-js-5a96203cb7cb

https://blog.bitsrc.io/how-to-perform-web-scraping-using-node-js-part-2-7a365aeedb43



install dep
npm init -y
npm install nightmare cheerio --unsafe-perm=true

const Nightmare = require('nightmare');
const cheerio = require('cheerio');


const nightmare = Nightmare({ show: true })
const url = 'https://news.ycombinator.com';

// Request making using nightmare
nightmare
  .goto(url)
  .wait('body')
  .evaluate(() => document.querySelector('body').innerHTML)
  .end()
.then(response => {
  console.log(getData(response));
}).catch(err => {
  console.log(err);
});

// Parsing data using cheerio
let getData = html => {
  data = [];
  const $ = cheerio.load(html);
  $('table.itemlist tr td:nth-child(3)').each((i, elem) => {
    data.push({
      title : $(elem).text(),
      link : $(elem).find('a.storylink').attr('href')
    });
  });
  return data;
}



const nightmare = Nightmare({ show: true })
const url = 'https://www.flipkart.com/';

// Request making using nightmare
nightmare
  .goto(url)
  .wait('body')
  .click('button._2AkmmA._29YdH8')
  .type('input.LM6RPg', 'nodejs books')
  .click('button.vh79eN')
  .wait('div.bhgxx2')
  .evaluate(() => document.querySelector('body').innerHTML)
  .end()
  .then(response => {
    console.log(getData(response));
  }).catch(err => {
    console.log(err);
  });

// Parsing data using cheerio
let getData = html => {
  data = [];
  const $ = cheerio.load(html);
  $('div._1HmYoV._35HD7C:nth-child(2) div.bhgxx2.col-12-12').each((row, raw_element) => {
    $(raw_element).find('div div div').each((i, elem) => {
      let title = $(elem).find('div div a:nth-child(2)').text();
      let link = $(elem).find('div div a:nth-child(2)').attr('href');
      if (title) {
        data.push({
          title : title,
          link : link
        });
      }
    });
  });
  return data;
}