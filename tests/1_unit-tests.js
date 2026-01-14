const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    suite('Function convertHandler.getNum(input)', function () {

        test('convertHandler should correctly read a whole number input.', function () {
            const input = '10L';
            const result = convertHandler.getNum(input);
            assert.strictEqual(result, 10);
        });

        test('convertHandler should correctly read a decimal number input.', function () {
            const input = '3.5kg';
            const result = convertHandler.getNum(input);
            assert.strictEqual(result, 3.5);
        })

        test('convertHandler should correctly read a fractional input.', function () {
            const input = '1/2mi';
            const result = convertHandler.getNum(input);
            assert.strictEqual(result, 0.5);
        });

        test('convertHandler should correctly read a fractional input with a decimal.', function () {
            const input = '3.5/7km';
            const result = convertHandler.getNum(input);
            assert.strictEqual(result, 0.5);
        });

        test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
            const input = '3/2/3kg';
            const result = convertHandler.getNum(input);
            assert.strictEqual(result, 'invalid number');
        });

        test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
            const input = 'kg';
            const result = convertHandler.getNum(input);
            assert.strictEqual(result, 1);
        });
    });

    suite('Function convertHandler.getUnit(input)', function () {
        
        test('convertHandler should correctly read each valid input unit.', function () {
            const inputs = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'l'];
            const expected = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'L'];
            inputs.forEach(function (input, index) {
                const result = convertHandler.getUnit(input);
                assert.strictEqual(result, expected[index]);
            });
        });

        test('convertHandler should correctly return an error for an invalid input unit.', function () {
            const input = '32g';
            const result = convertHandler.getUnit(input);
            assert.strictEqual(result, 'invalid unit');
        });
    });

    suite('Function convertHandler.getReturnUnit(initUnit)', function () {

        test('convertHandler should return the correct return unit for each valid input unit.', function () {
            const inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            const expected = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
            inputUnits.forEach(function (unit, index){
                const result = convertHandler.getReturnUnit(unit);
                assert.strictEqual(result, expected[index]);
            });
        });
    });

    suite('Function convertHandler.spellOutUnit(unit)', function () {

        test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
            const inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            const expected = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
            inputUnits.forEach(function (unit, index){
                const result = convertHandler.spellOutUnit(unit);
                assert.strictEqual(result, expected[index]);
            });
        });
    });

    suite('Function convertHandler.spellOutUnit(unit)', function () {

        test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
         const inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
         const expected = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
         inputUnits.forEach(function (unit, index){
            const result = convertHandler.spellOutUnit(unit);
            assert.strictEqual(result, expected[index]);
         });
        });
    });

    suite('Function convertHandler.convert(initNum, initUnit)', function () {

        test('convertHandler should correctly convert gal to L.', function () {
            const inputNum = 10;
            const inputUnit = 'gal';
            const result = convertHandler.convert(inputNum, inputUnit);
            const expected = 37.8541;
            assert.approximately(result, expected, 0.1);
        });

        test('convertHandler should correctly convert L to gal.', function () {
            const inputNum = 10;
            const inputUnit = 'L';
            const result = convertHandler.convert(inputNum, inputUnit);
            const expected = 2.64172;
            assert.approximately(result, expected, 0.1);
        });

         test('convertHandler should correctly convert mi to km.', function () {
            const inputNum = 5;
            const inputUnit = 'mi';
            const result = convertHandler.convert(inputNum, inputUnit);
            const expected = 8.0467;
            assert.approximately(result, expected, 0.1);
        });

         test('convertHandler should correctly convert km to mi.', function () {
            const inputNum = 5;
            const inputUnit = 'km';
            const result = convertHandler.convert(inputNum, inputUnit);
            const expected = 3.10686;
            assert.approximately(result, expected, 0.1);
        });

         test('convertHandler should correctly convert lbs to kg.', function () {
            const inputNum = 10;
            const inputUnit = 'lbs';
            const result = convertHandler.convert(inputNum, inputUnit);
            const expected = 4.53592;
            assert.approximately(result, expected, 0.1);
        });

         test('convertHandler should correctly convert kg to lbs.', function () {
            const inputNum = 10;
            const inputUnit = 'kg';
            const result = convertHandler.convert(inputNum, inputUnit);
            const expected = 22.04624;
            assert.approximately(result, expected, 0.1);
        });
    });
});