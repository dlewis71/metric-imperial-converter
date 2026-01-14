

function ConvertHandler() {
  this.getNum = function(input) {
    const firstLetterIndex = input.search(/[a-zA-Z]/); //changed
    const numString = firstLetterIndex === -1 ? input : input.slice(0, firstLetterIndex);

    if (numString === '') return 1;

      const parts = numString.split('/');
      if(parts.length > 2) return 'invalid number';

      if (parts.length === 2){
        const numerator = parseFloat(parts[0]);
        const denominator = parseFloat(parts[1]);
        if (isNaN(numerator) || isNaN(denominator) || denominator === 0) return 'invalid number';
        return numerator / denominator;
      }

      const value = parseFloat(numString);
      if (isNaN(value)) return 'invalid number';
      return value;

  };
  
  this.getUnit = function(input) {
    const firstLetterIndex= input.search(/[a-zA-Z]/);
    if (firstLetterIndex === -1) return 'invalid unit';
    
    const unitString = input.slice(firstLetterIndex).toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (!validUnits.includes(unitString)) return 'invalid unit';

    if (unitString === 'l') return 'L';
    return unitString;
  };
  
  this.getReturnUnit = function(initUnit) {
    const map = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    return map[initUnit]
  };
    

  this.spellOutUnit = function(unit) {
   const map = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    return map[unit]
  };
  
  this.convert = function(initNum, initUnit) {
    const GAL_TO_L = 3.78541;
    const LBS_TO_KG = 0.453592;
    const MI_TO_KM = 1.60934;

    let result;

    if (initUnit === 'gal') result = initNum * GAL_TO_L;
    if (initUnit === 'L') result = initNum / GAL_TO_L;
    if (initUnit === 'lbs') result = initNum * LBS_TO_KG;
    if (initUnit === 'kg') result = initNum / LBS_TO_KG;
    if (initUnit === 'mi') result = initNum * MI_TO_KM;
    if (initUnit === 'km') result = initNum / MI_TO_KM;

    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
   return (
    initNum +
    ' ' +
    this.spellOutUnit(initUnit) +
    ' converts to ' +
    returnNum +
    ' ' +
    this.spellOutUnit(returnUnit)
   );
  };
}

module.exports = ConvertHandler;