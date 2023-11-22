const MarkovMachine = require('./markov')
const fs = require('fs')

describe('MarkovMachine', () => {
  let mm;
  let text;

  beforeAll(() => {
    try {
      text = fs.readFileSync('eggs.txt', 'utf8');
      mm = new MarkovMachine(text);
    } catch (err) {
      console.error(`Error reading file: ${err.message}`)
    }
  });

  test('Generated text has the expected length', () => {
    const generatedText = mm.makeText(100);
    const wordCount = generatedText.split(' ').length;
    expect(wordCount).toBe(100);
  });

  test('Multiple runs generate different text', () => {
    const generatedText1 = mm.makeText(100);
    const generatedText2 = mm.makeText(100);
    expect(generatedText1).not.toBe(generatedText2);
  });

});
