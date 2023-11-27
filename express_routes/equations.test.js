const { calculateMean, calculateMedian, calculateMode} = require('./equations')

describe("#calculateMedian", function(){
    it("finds the median of an even set", function(){ 
      expect(calculateMedian('1,-1,4,2')).toEqual(1.5)
    })
    it("finds the median of an odd set", function () { 
      expect(calculateMedian('1,-1,4')).toEqual(1)
    })
  })
  
  describe("#calculateMean", function () {
    it("finds the mean of an empty string", function () { 
      expect(calculateMean('')).toEqual(0)
    })
    it("finds the mean of an string of numbers", function () { 
      expect(calculateMean('1,-1,4,2')).toEqual(1.5)
    })
  })
  
  describe("#calculateMode", function () {
    it("finds the mode", function () { 
      expect(calculateMode('1,1,1,2,2,3')).toEqual(1)
    })
  })