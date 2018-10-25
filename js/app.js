/*
 * Create a list that holds all of your cards
 */
function init() {

    cards = document.querySelectorAll('.card');
    opened = [];
    for (const card of cards) {
        card.classList.remove('open', 'show', 'match');
    }

    // Move Counter
    counter = document.querySelector('.moves');
    moves = 0;
    counter.innerText = moves;

    const deck = document.querySelector('.deck');
    //deck.innerHTML = card
   
    
    // Shuffle cards randomly
    const cardInit = shuffle(cards);
    for (const cardHTML of cardInit) {
        // console.log(cardHTML);
     }

    // Initialize timer
    timer = new Timer();
    match();

    // Star rating
    stars = document.querySelector('.stars');
    console.log(stars.length);
}

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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 function match() {
    console.log(moves);
    timer.start();
    timer.addEventListener('secondsUpdated', function (e) {
        const time = document.getElementById('timer');
        time.innerHTML = timer.getTimeValues().toString();
       // $('#basicUsage').html(timer.getTimeValues().toString());
    });
    for (const card of cards){
        card.addEventListener('click', function() {

        // Add card to opened array if it hasn't been opened 
        if (!card.classList.contains('open') && !card.classList.contains('show')) {
            card.classList.add('open', 'show');
            opened.push(card);
            console.log(opened);
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
            moves++;
            counter.innerText = moves;
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

$('#congrats-popup').on('show.bs.modal', function (event) {
    const time = document.getElementById('timer').innerText;
    var popup = $(this);
    popup.find('.modal-body').text('You completed the game in ' + time + '!');
});

 function matchCards(opened) {
    // const first = opened[0];
    // const second = opened[1];
    // console.log("first: " + first);
    // console.log("second: " + second);
    for (open of opened) {
        console.log(opened.length);
    }
 }