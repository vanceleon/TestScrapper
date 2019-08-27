const Nightmare = require('nightmare');
const cheerio = require('cheerio');

const nightmare = Nightmare({ show: true });
// const url = 'https://tradingeconomics.com/currencies';
const url = 'https://tradingeconomics.com/currencies';

nightmare
  .goto(url)
  .wait('body')
  .wait('div.container')
  .evaluate(() => document.querySelector('body'))
  .end()
  .then(res => {
    console.log(getData(res));
  })
  .catch(err => {
    console.log(err);
  });

let getData = html => {
  data = [];
//   console.log(html)
  const $ = cheerio.load(html);
  $('div.panel div.table-responsive').each((row, row_element) => {
    // console.log('looping to find');
    $(row_element)
      .find('table.table tbody tr')
      .each((i, elem) => {
        console.log('looping to findeach element');
        let title = $(elem)
          .find('td.datatable-item')
          .text();
        if (title) {
          title;
        }
      });
  });
  return data;
};





















// const Nightmare = require('nightmare');
// const cheerio = require('cheerio');

// const nightmare = Nightmare({ show:  true });
// // const url = 'https://tradingeconomics.com/currencies';
// const url = 'https://www.cnbc.com';

// nightmare
//   .goto(url)
//   .wait('body')
//   .click('a.HeroLedePlusThreeDeckItem-heading')
//   .wait('div.KeyPoints-wrapper')
//   .evaluate(() => document.querySelector('body').innerHTML)
//   .end()
//   .then(res => {
//     // console.log('what is res', res);
//     console.log(getData(res));
//   })
//   .catch(err => {
//     console.log(err);
//   });

// let getData = html => {
//   data = [];
//   const $ = cheerio.load(html);
//   $('div.KeyPoints-keyPoints').each(row_element => {
//     $(row_element)
//       .find('div-KeyPoints-header div.KeyPoints-list div div.group ul')
//       .each((i, elem) => {
//         let bullet = $(elem)
//           .find('li')
//           .text();
//         if (bullet) {
//             data.push({
//                 bullet: bullet

//             })
//         }
//       });
//   });
//   return data;
// };
