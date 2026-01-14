const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Valid input: 10L', function(done) {
    chai.request(server)
      .get('/api/convert?input=10L')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.approximately(res.body.returnNum, 2.64172, 0.1);
        done();
      });
  });

  test('Invalid input unit: 32g', function(done) {
    chai.request(server)
      .get('/api/convert?input=32g')
      .end((err, res) => {
        assert.equal(res.text, 'invalid unit');
        done();
      });
  });

  test('Invalid number: 3/7.2/4kg', function(done) {
    chai.request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end((err, res) => {
        assert.equal(res.text, 'invalid number');
        done();
      });
  });

  test('Invalid number and unit: 3/7.2/4kilomegagram', function(done) {
    chai.request(server)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end((err, res) => {
        assert.equal(res.text, 'invalid number and unit');
        done();
      });
  });

  test('No number input: kg', function(done) {
    chai.request(server)
      .get('/api/convert?input=kg')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        done();
      });
  });
});
