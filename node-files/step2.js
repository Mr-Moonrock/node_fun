const fs = require('fs');
const process = require('process');
const axios = require('axios');

// function for Path
function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log('ERROR:', err);
      return;
    } else {
      console.log(data)
    }
  });
}

// function for URL 
async function webCat(url, out) {
  try {
    let res = await axios.get(url);
    handleOutput(res.data, out);
  } catch (err) { 
      console.err(`Error fetching data from ${url}. Status: ${err.response.status}`);
      process.exit(1);
    }
}

// Determine what the argument is 

let path = process.argv[2];

if (path.slice(0, 4) === 'http') {
  webCat(path);
} else {
  cat(path);
}