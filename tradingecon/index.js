const Nightmare = require('nightmare');
const cheerio = require('cheerio');

const nightmare = Nightmare({ show: true });
const url = 'https://tradingeconomics.com/currencies';

nightmare
  .goto(url)
  .wait('body')
  .wait('div.container')
  .evaluate(() => document.querySelector('body').innerHTML)
  .end()
  .then(res => {
    console.log(getData(res));
  })
  .catch(err => {
    console.log(err);
  });

let getData = html => {
  data = [];
  const $ = cheerio.load(html);
  $('table.table thead tr').each(raw_element => {
      console.log('looping to find')
      $(raw_element)
      .find('th')
      .each((i, elem) => {
        console.log('looping to findeach element')
        let title = $(elem)
          .find('th')
          .text();
        if (title) {
          title;
        }
      });
  });
  return data;
};
