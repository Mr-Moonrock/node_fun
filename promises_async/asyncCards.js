let deck_id;
let remainingCards;

async function initializeDeck() {
  try {
    const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    console.log(res.data.deck_id);
    deck_id = res.data.deck_id;
    remainingCards = res.data.remaining;
  } catch (err) {
    console.log('Error initializing deck:', err);
  }
}

document.addEventListener('DOMContentLoaded', initializeDeck);
document.getElementById('card').addEventListener('click', drawCard);

async function drawCard() {
  if (!deck_id) {
    console.error('Deck ID is not available.');
    return;
  }

  if (remainingCards === 0) {
    alert('All cards have been drawn');
    return;
  }

  try {
    const drawnCard = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
    const display = document.getElementById('display');
    display.innerHTML = '';
    const cardImage = document.createElement('img');
    cardImage.src = drawnCard.data.cards[0].image;
    cardImage.alt = `${drawnCard.data.cards[0].value} of ${drawnCard.data.cards[0].suit}`;
    display.appendChild(cardImage);

    remainingCards = drawnCard.data.remaining;

    if (remainingCards === 0) {
      alert('All cards have been drawn!');
    }
  } catch (err) {
    console.log('Error drawing card:', err);
  }
}
