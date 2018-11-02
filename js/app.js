/**
 * Create a list that holds all 16 cards
 */
let cardDeck = ['fa-anchor', 'fa-anchor', 'fa-bicycle', 'fa-bicycle',
                'fa-bolt', 'fa-bolt', 'fa-bomb', 'fa-bomb',
                'fa-cube', 'fa-cube', 'fa-diamond', 'fa-diamond',
                'fa-plane', 'fa-plane', 'fa-leaf', 'fa-leaf'];

/**
 * Declare game variables
 */
let opened = [];
let moves = 0;
let counter = document.querySelector('.moves');

/**
 * Initialize timer
 * - powered by easytimer.js
 */
let timer = new Timer();

/**
 * Initalize game when page loads
 * - init() is also called when the restart button is pressed
 */
function init() {

    // Move Counter
    moves = 0;
    counter.innerText = moves;
    
    // Empty the current deck, shuffle, and rebuild the deck
    let deck = document.getElementsByClassName('deck');
    deck[0].innerHTML = '';
    let shuffledDeck = shuffle(cardDeck);

    // Create card list elements
    for (let card of shuffledDeck) {
        let li = document.createElement("li");
        li.classList.add("card");
        let i = document.createElement("i");
        li.appendChild(i);
        i.classList.add("fa");

        // Append the shuffled icons
        i.classList.add(card);

        deck[0].appendChild(li);
    }
    
    let cards = document.getElementsByClassName('card');
    match(cards);

    // Star rating 
    stars = document.querySelectorAll('.stars li');
    for (const star of stars) {
        star.style.visibility = "";
    }

    // Start the timer
    timer.start();
    timer.addEventListener('secondsUpdated', function (e) {
        const time = document.getElementById('timer');
        time.innerHTML = timer.getTimeValues().toString();
    });
}

// Initialize game.
init();

/**
 * Display the cards on the page.
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 * Shuffle function from http://stackoverflow.com/a/2450976
 */ 
function shuffle(cards) {
    var currentIndex = cards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
  return cards;
}

/**
 * Restart the game.
 * Reset the game board, the timer, and the star rating.
 */
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', function() {
    timer.reset();
    init();
})

/**
 * Set up the event listener for a card. If a card is clicked:
 *  - if the list already has another card, check to see if the two cards match
 *  - if the cards match, lock the cards in the open position
 * @param {object} cards - The 16 cards in the deck
 */

 function match(cards) {
    for (const card of cards){
        card.addEventListener('click', function() {

            // Match the opened cards
            matchCards(card);
        
            // Check if cards match        
            if (opened.length == 2) {
                const firstCard = opened[0].classList;
                const secondCard = opened[1].classList;
                const firstIcon = opened[0].firstElementChild.classList;
                const secondIcon = opened[1].firstElementChild.classList;
            // Cards match
            if (firstIcon.value == secondIcon.value) {           
                    firstCard.add('match');
                    secondCard.add('match');
            }
            // Cards don't match
            else {
                rejectCards(opened);
            }
            // Reset the opened array
            opened = [];

            // Update move counter 
            updateMoves();
            }
            // Handle winning scenario
            handleWin();
    })  
 }
 // Reset moves
moves = 0;
}

/**
 * Match two open cards
 * - Display the card's symbol
 * - Add the card to a list of opened cards
 * @param {object} card - The card that the user opened
 */
function matchCards(card){
    if (!card.classList.contains('open') && !card.classList.contains('show')) {
        card.classList.add('open', 'show');
        opened.push(card);
    }
}

/**
 * The cards do not match
 * - Remove the cards from the list
 * - Hide the card's symbol after showing for 1.5s
 * @param {object[]} opened - The cards that are opened
 */
function rejectCards(opened) {
    setTimeout(function() {
        for (const card of opened) {
             card.classList.remove('open', 'show');
        }
    }, 1500);
}

/**
 * Increment the move counter and display it on the page 
 * - Assumes 2 cards equals 1 move
 * - Calls rateGames() to update star rating
 */
function updateMoves(){
    moves++;
    counter.innerText = moves;
    rateGame(moves);
}

/**
 * Update star rating
 * - Start with 3 stars
 * - Remove 1 star when moves > 10
 * - Remove another star when moves > 20
 * @param {number} moves - The number of moves the player has taken, where 2 cards equals 1 move
 */
function rateGame(moves) {
    if(moves > 10) {
        stars[2].style.visibility = "hidden";
    }
    if(moves > 20) {
        stars[1].style.visibility = "hidden";
    }
    else if(moves <= 10) {
        for (const star of stars) {
            star.style.visibility = "";
        }
    }

}

/**
* All cards have matched 
* - Display a message with the final score
* - Stop the timer
*/
function handleWin() {
    if(document.querySelectorAll('.match').length == 16){            
        $('#congrats-popup').modal();
        timer.stop();
    }
}

/**
 * Congratulations Popup
 * - Ask if user wants to play again
 * - Tell user how much time it took to win the game
 * - Show the star rating
 */
$('#congrats-popup').on('show.bs.modal', function (event) {
    const time = document.getElementById('timer').innerText;
    const rating = document.querySelector('.stars');
    const prompt = "Would you like another game?";
    let popupBody = 'You completed the game in ' + time + '! ';
    popupBody += '<h6>Game rating:</h6>'
    popupBody += '<ul class="stars">' + rating.innerHTML + '</ul>';
    popupBody += '<p>' + prompt + '</p>';
    $('.modal-body div').append(popupBody);
    playAgain();
});

/**
 * The "Play Again" button on the popup is pressed
 * - Restarts and initializes the game 
 */
function playAgain() {
    const playButton = document.getElementById('play-again');
    playButton.addEventListener('click', function() {
        init();
    })
}