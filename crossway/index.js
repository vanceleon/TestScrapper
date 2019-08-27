const Nightmare = require('nightmare');
const cheerio = require('cheerio');

const nightmare = Nightmare({ show: false });
const url = 'https://www.crossway.org/';

nightmare
  .goto(url)
  .wait('body')
  .click('a#personal-button')
  .click("a[href='/customer/login/']")
  .type(`input#id_email`, 'vanceleon44@gmail.com') //insert username
  .type('input#id_password', 'Word@652!') //insert password here
  .click("input[value='Sign in']")
  .wait(2000)
  .click("a[href='/books/']")
  .wait('div#item-list')
  .evaluate(() => document.querySelector('body').innerHTML)
  .end()
  .then(response => {
    // console.log("res", response);
    console.log(getData(response));
    // return $;
  })
  .catch(err => {
    console.log(err);
  });

let getData = html => {
  data = [];
  // console.log('passing html', html);
  $ = cheerio.load(html);
  console.log('getdata function');
  $('div#item-list div').each((i, elem) => {
    console.log('in 1st each ');
    $(elem)
      .find('p strong')
        console.log("last nested ", elem);
        let img = $(elem).find('a.thumb-cover img').attr('src');
        let title = $(elem)
          .find('a')
          .text();
        let cover_blurb = $(elem)
          .find('span.cover-blurb')
          .text();
        let price = $(elem)
          .find('span.picker-price')
          .text();
        if (title) {
          data.push({
            title: title,
            img: img,
            cover_blurb: cover_blurb,
            price: price
          });
        }
      });
  return data;
};
