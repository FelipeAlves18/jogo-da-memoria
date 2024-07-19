const cardsArray = [
    { name: 'A', img: 'A' },
    { name: 'B', img: 'B' },
    { name: 'C', img: 'C' },
    { name: 'D', img: 'D' },
    { name: 'E', img: 'E' },
    { name: 'F', img: 'F' },
    { name: 'G', img: 'G' },
    { name: 'H', img: 'H' },
];

let cardDeck = cardsArray.concat(cardsArray);
cardDeck.sort(() => 0.5 - Math.random());

const memoryGame = document.getElementById('memory-game');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function createBoard() {
    memoryGame.innerHTML = '';
    cardDeck.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.dataset.name = card.name;

        cardElement.innerHTML = `
            <div class="front-face">${card.img}</div>
            <div class="back-face"></div>
        `;
        memoryGame.appendChild(cardElement);
    });
    attachCardListeners();
}

function attachCardListeners() {
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => card.addEventListener('click', flipCard));
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

document.getElementById('reset-button').addEventListener('click', () => {
    cardDeck.sort(() => 0.5 - Math.random());
    createBoard();
});

createBoard();
