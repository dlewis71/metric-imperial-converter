const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    suite('Functional tests with chai-http', function () {
        test('Convert 10L: GET request to /api/convert', function (done) {
            chai
                .request(server)
                .get('/api/convert?input=10L')
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.type, 'application/json');
                    assert.equal(res.body.initNum, 10);
                    assert.equal(res.body.initUnit, 'L');
                    assert.equal(res.body.returnUnit, 'gal');
                    assert.approximately(res.body.returnNum, 2.64172, 0.0001);
                    assert.equal(res.body.string, '10 liters converts to 2.64172 gallons');
                    done();
                });
        });

        test('Convert 32g: GET request to /api/convert', function (done) {
            chai
                .request(server)
                .get('/api/convert?input=32g')
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.type, 'application/json');
                    assert.equal(res.body, 'invalid unit');
                    done();
                });
        });

        test('Convert 3/7.2/4kg: GET request to /api/convert', function (done) {
            chai
                .request(server)
                .get('/api/convert?input=3/7.2/4kg')
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.type, 'application/json');
                    assert.equal(res.body, 'invalid number');
                    done();
                });
        });

        test('Convert 3/7.2/4kilomegagram: GET request to /api/convert', function (done) {
            chai
                .request(server)
                .get('/api/convert?input=3/7.2/4kilomegagram')
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.type, 'application/json');
                    assert.equal(res.body, 'invalid number and unit');
                    done();
                });
        });

        test('Convert kg: GET request to /api/convert', function (done) {
            chai
                .request(server)
                .get('/api/convert?input=kg')
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.type, 'application/json');
                    assert.equal(res.body.initNum, 1);
                    assert.equal(res.body.initUnit, 'kg');
                    assert.equal(res.body.returnUnit, 'lbs');
                    assert.approximately(res.body.returnNum, 2.20462, 0.0001);
                    assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds');
                    done();
                });
        });
    });
});