const chai = require('chai');
const assert = chai.assert;
const convertHandler = require('../controllers/convertHandler');

suite('Unit Tests', function() {
  test('Whole number input', function() {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  test('Decimal number input', function() {
    assert.equal(convertHandler.getNum('3.2kg'), 3.2);
  });

  test('Fractional input', function() {
    assert.equal(convertHandler.getNum('1/2mi'), 0.5);
  });

  test('Fractional input with decimal', function() {
    assert.equal(convertHandler.getNum('5.4/2lbs'), 2.7);
  });

  test('Double-fraction input', function() {
    assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });

  test('Default numerical input (no number)', function() {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  test('Valid input units', function() {
    const validUnits = ['gal','L','mi','km','lbs','kg'];
    validUnits.forEach(unit => {
      assert.equal(convertHandler.getUnit(`5${unit}`), unit);
    });
  });

  test('Invalid input unit', function() {
    assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
  });

  test('Correct return units', function() {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
  });

  test('Spell out units', function() {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('L'), 'liters');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
  });
});
