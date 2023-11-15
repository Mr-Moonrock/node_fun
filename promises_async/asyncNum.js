async function searchWithInputValue() {
    let n= parseFloat(document.getElementById('number').value);
    let url = `http://numbersapi.com/${n}/trivia`;
    let display = document.getElementById('display');

    async function getFourRandomFacts(url) {
        let fourNumberFacts = [];

        for (let i=1; i < 5; i++) {
            fourNumberFacts.push(
                axios.get(url)
            );
        }
        try {
            let fourNumberArr = await Promise.all(fourNumberFacts);
            display.innerHTML = '';

            for (let res of fourNumberArr) {
                let displayFacts = document.createElement('li');
                displayFacts.textContent = res.data;
                display.appendChild(displayFacts);
            }
        } catch (e) {
            console.log('Error', e);
        }
    }
    await getFourRandomFacts(url);
}

const s = document.getElementById('search-btn');
s.addEventListener('click', () => {
  searchWithInputValue();
});