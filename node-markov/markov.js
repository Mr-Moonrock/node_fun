/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.markovChains = {};
    this.makeChains();
  }

  makeChains() {
    this.markovChains = {};

    for (let i = 0; i < this.words.length -1; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1];

      if (!this.markovChains[word]) {
        this.markovChains[word] = [];
      }
      this.markovChains[word].push(nextWord);
  }
  const lastWord = this.words[this.words.length - 1];
  if (!this.markovChains[lastWord]) {
    this.markovChains[lastWord] = [null]
    }
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let result = [];
    let currentWord = this.words[Math.floor(Math.random() * this.words.length)];

    while (result.length < numWords && currentWord !== null) {
      result.push(currentWord);
      const nextOptions = this.markovChains[currentWord];
      currentWord = nextOptions[Math.floor(Math.random() * nextOptions.length)]
    }
    return result.join(" ");
  }
}
let mm = new MarkovMachine('Green');
mm.makeText();
mm.makeText(numWords=100);
module.exports = MarkovMachine;