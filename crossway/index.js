const Nightmare = require('nightmare');
const cheerio = require('cheerio');

const nightmare = Nightmare({ show: true });
const url = 'https://www.crossway.org/';

nightmare
  .goto(url)
  .wait('body')
  .click('a#personal-button')
  .click("a[href='/customer/login/']")
  .type(`input#id_email`, '') //insert username
  .type('input#id_password', '') //insert password here
  .click("input[value='Sign in']")
  .wait(2000)
  .click("a[href='/books/']")
  .wait(2000)
  .end()
  .then(() => {
    console.log(getData());
    // return $;
  })
  .catch(err => {
    console.log(err);
  });

let getData = (html, $) => {
  data = [];
  $ = cheerio.load(html);
  console.log('getdata function');
  $('div.item-list').each(row_element => {
    console.log('in 1st each ');
    $(row_element)
      .find('div')
      .each(elem => {
        let img = $(elem).find('a.thumb-cover img');
        let title = $(elem)
          .find('p strong a')
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
  });
  return data;
};
