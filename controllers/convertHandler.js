// controllers/convertHandler.js
class ConvertHandler {
  constructor() {
    this.units = {
      gal: { name: 'gal', return: 'L', factor: 3.78541, spell: 'gallons' },
      L:   { name: 'L', return: 'gal', factor: 1 / 3.78541, spell: 'liters' },
      mi:  { name: 'mi', return: 'km', factor: 1.60934, spell: 'miles' },
      km:  { name: 'km', return: 'mi', factor: 1 / 1.60934, spell: 'kilometers' },
      lbs: { name: 'lbs', return: 'kg', factor: 0.453592, spell: 'pounds' },
      kg:  { name: 'kg', return: 'lbs', factor: 1 / 0.453592, spell: 'kilograms' }
    };
  }

  // Extract the numeric part from input
  getNum(input) {
    const match = input.match(/^[\d.\/]+/); // match numbers, decimals, fractions
    if (!match) return 1; // default to 1 if no number

    const numStr = match[0];

    if ((numStr.match(/\//g) || []).length > 1) return 'invalid number'; // double fraction

    if (numStr.includes('/')) {
      const [numerator, denominator] = numStr.split('/').map(Number);
      if (isNaN(numerator) || isNaN(denominator)) return 'invalid number';
      return numerator / denominator;
    }

    const num = Number(numStr);
    return isNaN(num) ? 'invalid number' : num;
  }

  // Extract unit part from input
  getUnit(input) {
    const match = input.match(/[a-zA-Z]+$/);
    if (!match) return 'invalid unit';

    let unit = match[0].toLowerCase();
    if (unit === 'l') unit = 'L'; // uppercase L

    return this.units[unit] ? unit : 'invalid unit';
  }

  // Get the return unit for a given unit
  getReturnUnit(initUnit) {
    const unit = this.units[initUnit];
    return unit ? unit.return : 'invalid unit';
  }

  // Return the spelled-out version of a unit
  spellOutUnit(unit) {
    const u = this.units[unit];
    return u ? u.spell : 'invalid unit';
  }

  // Perform conversion
  convert(initNum, initUnit) {
    const unit = this.units[initUnit];
    if (!unit) return 'invalid unit';
    return parseFloat((initNum * unit.factor).toFixed(5));
  }

  // Format the conversion string
  getString(initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  }
}

module.exports = ConvertHandler;
