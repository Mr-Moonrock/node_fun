const express = require('express');
const { calculateMean, calculateMedian, calculateMode} = require('./equations')
const ExpressError = require('./errors');
const app = express();

// Handle Errors 
const handleErrors = (err, req, res, next) => {
  let status = err.status || 500
  let message = err.message || 'Something went wrong';
  res.status(status).json({ error: {message} });
};

// ##### ROUTES #####

app.get('/mean', (req, res, next) => {
  const { nums } = req.query;
  try {
    if (!nums) {
      throw new ExpressError('No numbers provided');
    }
    const numbers = nums.split(',').map(Number);
    if (numbers.some(isNaN)) {
      throw new ExpressError('Contains invalid number(s)');
    }
    if (numbers.length === 0) {
      throw new ExpressError('No valid numbers provided')
    }
    const mean = calculateMean(nums);
    res.json({ operation: 'mean', value: mean });
  } catch(e) {
    next(e);
  }
})

app.get('/median', (req, res, next) => {
  const { nums } = req.query;
  try {
    if(!nums) {
      throw new ExpressError('No numbers provided');
    }
    const numbers = nums.split(',').map(Number);
    if (numbers.some(isNaN)) {
      throw new ExpressError('Contains invalid number(s)');
    }
    if (numbers.length === 0) {
      throw new ExpressError('No valid numbers provided')
    }
    const median = calculateMedian(nums);
    res.json({ operation: 'median', value: median });
  } catch (e) {
    next(e);
  }
})

app.get('/mode', (req, res, next) => {
  const { nums } = req.query;
  try {
    if (!nums) {
      throw new ExpressError('No numbers provided')
    }
    const numbers = nums.split(',').map(Number);
    if (numbers.some(isNaN)) {
      throw new ExpressError('Contains invalid number(s)');
    }
    if (numbers.length === 0) {
      throw new ExpressError('No valid numbers provided')
    }
    const mode = calculateMode(nums);
    res.json({ operation: 'mode', value: mode });
  } catch (e) {
    next(e);
  }
})

app.use(handleErrors);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening to port 3000')
});
