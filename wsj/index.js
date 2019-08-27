const Nightmare = require('nightmare');
const cheerio = require('cheerio');
require('dotenv').config();



const nightmare = Nightmare({show: true});
const url = 'https://www.wsj.com/';

nightmare 
    .goto(url)
    .wait('div.root')
    .click(`a[role=button]`)
    .wait('body.wsj hok')
    .click(`input[type='email'].username`)
    .type(`input[type='email'].username`, process.env.USER)
    .click(`input[type='password']`)
    .type(`input[type='password']`, process.env.PASS)
    .click('button.basic-login-submit')
    .wait('div.root')
    .evaluate(() => document.querySelector('div.root'))
    .end()
    .then(res => {
        console.log(getData(res))
    })
    .catch(err => {
        console.log(err)
    })

let getData = html => {
    data = [];
    const $ = cheerio.load(html);
    console.log("getData")
    // $(div.)
}