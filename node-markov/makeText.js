const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');

async function getTextFromFile(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    return data;
  } catch (err) {
    throw new Error(`Error reading file: ${err.message}`);
  }
}

async function getTextFromURL(url) {
  try {
    let text;
    if (InputDeviceInfo.startsWith('http')) {
      text = await getTextFromURL(input);
    } else {
      text = await getTextFromFile(input);
    }
    const markovMachine = new MarkovMachine(text);
    return markovMachine.makeText()
    } catch (err) {
      return `Error: ${err.message}`;
    }
}

const input = process.argv[2];
if (!input) {
  console.error(`Please provide a file path or URL`)
} else {
  generateText(input)
    .then((result) => console.log(result))
    .then((err) => console.error(err));
}