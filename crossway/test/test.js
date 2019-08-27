const Nightmare = require('nightmare');
const assert = require('assert');

describe('Load a Page', function() {
  // Recommended: 5s locally, 10s to remote server, 30s from airplane ¯\_(ツ)_/¯
  this.timeout('30s');

  let nightmare = null;
  beforeEach(() => {
    nightmare = new Nightmare();
  });

  describe('/ (Home Page)', () => {
    it('should load without error', done => {
      // your actual testing urls will likely be `http://localhost:port/path`
      nightmare
        .goto('https://www.crossway.org/')
        .end()
        .then(function(result) {
          done();
        })
        .catch(done);
    });
  });

  describe('/auth (Login Page', () => {
    it('should load without error', done => {
      nightmare
        .goto(
          'https://my.crossway.org/cas/login/?service=https://www.crossway.org/cas/login/'
        )
        .end()
        .then(result => {
          done();
        })
        .catch(done);
    });
  });
});

describe('Login Page', function() {
  this.timeout('30s');
  let nightmare = null;
  beforeEach(() => {
    nightmare = new Nightmare({ show: true });
  });

  describe('given bad data, and using the app', () => {
    it('should not fail, and load the books page', done => {
      nightmare
        .goto(
          'https://my.crossway.org/cas/login/?service=https://www.crossway.org/cas/login/'
        )
        .type(`input#id_email`, '') //username
        .type('input#id_password', '')//password
        .click("input[value='Sign in']")
        .wait(2000)
        .click("a[href='/books/']")
        .wait('div#item-list')
        .end()
        .then(result => {
          done();
        })
        .catch(done);
    });
  });
});
