const express = require('express');
const router = express.Router();
const ConvertHandler = require('../controllers/convertHandler');

const convertHandler = new ConvertHandler();

router.get('/api/convert', (req, res) => {
  const input = req.query.input;

  if (!input) {
    return res.status(400).send('No input provided');
  }

  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  const numInvalid = initNum === 'invalid number';
  const unitInvalid = initUnit === 'invalid unit';

  if (numInvalid && unitInvalid) {
    return res.send('invalid number and unit');
  }
  if (numInvalid) {
    return res.send('invalid number');
  }
  if (unitInvalid) {
    return res.send('invalid unit');
  }

  const returnNum = convertHandler.convert(initNum, initUnit);
  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const initUnitString = convertHandler.spellOutUnit(initUnit);
  const returnUnitString = convertHandler.spellOutUnit(returnUnit);
  const string = `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;

  return res.json({
    initNum,
    initUnit,
    returnNum,
    returnUnit,
    string,
  });
});

module.exports = router;
