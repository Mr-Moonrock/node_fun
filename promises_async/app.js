function searchWithInputValue () {
	let n = parseFloat(document.getElementById('number').value);
	let url = `http://numbersapi.com/${n}/trivia`;
	let display = document.getElementById('display');

	function getFourRandomFacts (url) {
		let fourNumberFacts = [];
	
		for (let i = 1; i < 5; i++) {
			fourNumberFacts.push(
				axios.get(url)
			);
		}
	
		Promise.all(fourNumberFacts)
			.then(fourNumberArr => {
				display.innerHTML = '';

				for (res of fourNumberArr) {
					let displayFacts = document.createElement('li');
					displayFacts.textContent = res.data;
					display.appendChild(displayFacts);
				}
			})
			.catch(err => console.log('Error', err))
	}
	getFourRandomFacts(url)
}

function searchWithRandomInput () {
	const r = document.getElementById('random-btn');
	r.addEventListener('click', () => {
		let randomNum = Math.floor(Math.random() * 500)
		console.log(randomNum)
		document.getElementById('number').value = randomNum;
		searchWithInputValue();
	});
}

const s = document.getElementById('search-btn');
s.addEventListener('click', searchWithInputValue)
searchWithRandomInput()


