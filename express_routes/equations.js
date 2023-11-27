// Calculate Mean
const calculateMean = (nums) => {
    const numbers = nums.split(',').map(Number);
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
  }
  
  // Calculate Median 
  const calculateMedian = (nums) => {
    const numbers = nums.split(',').map(Number).sort((a, b) => a - b);
    const middle = Math.floor(numbers.length /2 );
    return numbers.length % 2 === 0 ? (numbers[middle - 1] + numbers[middle]) / 2 : numbers[middle];
  };
  
  // Calculate Mode 
  const calculateMode = (nums) => {
    const numbers = nums.split(',').map(Number);
    const frequency = {};
    numbers.forEach((num) => {
      frequency[num] = (frequency[num] || 0) + 1;
    });
    const mode = Object.keys(frequency).reduce((a, b) => (frequency[a] > frequency[b] ? a : b));
    return Number(mode);
  };

module.exports = { calculateMean, calculateMedian, calculateMode };