const convertHandler = {};

// Supported units and return units
const unitMap = {
  gal: 'L',
  L: 'gal',
  mi: 'km',
  km: 'mi',
  lbs: 'kg',
  kg: 'lbs'
};

// Full spell-out of units
const spellOutMap = {
  gal: 'gallons',
  L: 'liters',
  mi: 'miles',
  km: 'kilometers',
  lbs: 'pounds',
  kg: 'kilograms'
};

// Conversion rates
const conversionRates = {
  gal: 3.78541,
  L: 1 / 3.78541,
  mi: 1.60934,
  km: 1 / 1.60934,
  lbs: 0.453592,
  kg: 1 / 0.453592
};

// Get numerical part of input
convertHandler.getNum = function(input) {
  const result = input.match(/^[\d/.]+/);
  if (!result) return 1; // default if no number
  const num = result[0];

  if (num.split('/').length > 2) return 'invalid number'; // double fraction
  try {
    return eval(num); // supports fractions like 1/2 or 5.4/2
  } catch (err) {
    return 'invalid number';
  }
};

// Get unit part of input
convertHandler.getUnit = function(input) {
  const result = input.match(/[a-zA-Z]+$/);
  if (!result) return 'invalid unit';
  let unit = result[0];

  if (unit.toLowerCase() === 'l') return 'L'; // uppercase for liters
  unit = unit.toLowerCase();

  return unitMap[unit] ? (unit === 'l' ? 'L' : unit) : 'invalid unit';
};

// Get the unit to convert to
convertHandler.getReturnUnit = function(initUnit) {
  if (initUnit === 'L') return 'gal';
  return unitMap[initUnit.toLowerCase()];
};

// Spell out a unit
convertHandler.spellOutUnit = function(unit) {
  if (unit === 'L') return spellOutMap['L'];
  return spellOutMap[unit.toLowerCase()];
};

// Perform conversion
convertHandler.convert = function(input) {
  const num = this.getNum(input);
  const unit = this.getUnit(input);

  if (num === 'invalid number' && unit === 'invalid unit') return { error: 'invalid number and unit' };
  if (num === 'invalid number') return { error: 'invalid number' };
  if (unit === 'invalid unit') return { error: 'invalid unit' };

  const normalizedUnit = unit === 'L' ? 'L' : unit.toLowerCase();
  const returnNum = parseFloat((num * conversionRates[normalizedUnit]).toFixed(5));
  const returnUnit = this.getReturnUnit(unit);

  return {
    initNum: num,
    initUnit: unit,
    returnNum,
    returnUnit,
    string: `${num} ${this.spellOutUnit(unit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  };
};

module.exports = convertHandler;
