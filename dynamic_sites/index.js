const Nightmare = require('nightmare');
const cheerio = require('cheerio');

const nightmare = Nightmare({show: false});
const url = 'https://www.flipkart.com';


// dynamic code
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
      let price = $(elem).find('div div div div').text();
      let link = $(elem).find('div div a:nth-child(2)').attr('href');
      if (title) {
        data.push({
          title : title,
          link : link,
          price: price,
        });
      }
    });
  });
  return data;
}







// static site code
// nightmare 
//     .goto(url)
//     .wait('body')
//     .evaluate(() => document.querySelector('body').innerHTML)
//     .end()
// .then(res => {
//     console.log(getData(res));
// }).catch(err => {
//     console.log(err);
// })


// let getData = html => {
//     data = [];
//     const $ = cheerio.load(html);
//     $('table.itemlist tr td:nth-child(3)').each((i, elem) =>{
//         data.push({
//             title: $(elem).text(),
//             link: $(elem).find('a.storylink').attr('href')
            
//         })
//     });
//     return data;
// }



