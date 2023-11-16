const fs = require('fs').promises;
const process = require('process');
const axios = require('axios');

// function for Path
function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log('ERROR:', err);
      process.exit(1);
    } else {
        handleOutput(data, out);
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
    }
}

function handleOutput(text, out) {
    if (out) {
      fs.writeFile(out, text, 'utf8', function(err) {
        if (err) {
          console.error(`Couldn't write ${out}: ${err}`);
          process.exit(1);
        }
      });
    } else {
      console.log(text);
    }
  }

let path;
let out;

if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
  webCat(path, out);
} else {
  cat(path, out);
}