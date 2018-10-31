/**
 * Create a list that holds all of your cards
 */
let cardDeck = ['fa-anchor', 'fa-anchor', 'fa-bicycle', 'fa-bicycle',
                'fa-bolt', 'fa-bolt', 'fa-bomb', 'fa-bomb',
                'fa-cube', 'fa-cube', 'fa-diamond', 'fa-diamond',
                'fa-plane', 'fa-plane', 'fa-leaf', 'fa-leaf'];

/**
 * Declare game variables and initialize timer.
 */
let opened = [];
let moves = 0;
let counter = document.querySelector('.moves');
let timer = new Timer();

/**
 * Initalize game.
 * init() is called when the restart button is pressed
 * or when the page is loaded.
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

/*
 * Set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 function match(cards) {
    for (const card of cards){
        card.addEventListener('click', function() {

        // Add card to opened array if it hasn't been opened 
        if (!card.classList.contains('open') && !card.classList.contains('show')) {
            card.classList.add('open', 'show');
            opened.push(card);
        }
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
                // Reset the opened array
                opened = [];
           }
           // Cards don't match; Hide after showing briefly
           else {
               setTimeout(function() {
                   for (const card of opened) {
                        card.classList.remove('open', 'show');
                   }
                   // Reset the opened array
                    opened = [];
               }, 1500);
            
            }
            // Update move counter and assumes 2 cards equals 1 move
            counter.innerText = moves;
            rateGame(moves);
        }
        // Handle winning scenario
        if(document.querySelectorAll('.match').length == 16){            
            $('#congrats-popup').modal();
            timer.stop();
        }
    })
     
 }
 moves = 0;
}

/**
 * Update star rating
 * - Start with 3 stars
 * - Remove 1 star when moves > 10
 * - Remove another star when moves > 20
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
 * Congratulations Popup
 * - Ask if user wants to play again
 * - Tell user how much time it took to win the game
 * - Show the star rating
 */
$('#congrats-popup').on('show.bs.modal', function (event) {
    const time = document.getElementById('timer').innerText;
    const prompt = "Would you like another game?";
    var popup = $(this);
    popup.find('.modal-body').text('You completed the game in ' + time + '! ' + prompt);
    playAgain();
});

/**
 * Restarts and initializes the game 
 * when the "Play Again" button is pressed on the popup.
 */
function playAgain() {
    const playButton = document.getElementById('play-again');
    playButton.addEventListener('click', function() {
    init();
    })
}
