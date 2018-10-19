/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


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

 const deck = document.querySelectorAll('.card');
 var opened = [];

 for (const card of deck){
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
               console.log("MATCH");             
                firstCard.add('match');
                secondCard.add('match');
                // Reset the opened array
                opened = [];
           }
           // Cards don't match; Hide after showing for 2s
           else {
               setTimeout(function() {
                   for (const card of opened) {
                        card.classList.remove('open', 'show');
                   }
                   // Reset the opened array
                   opened = [];
               }, 1500);
            
            }
        }
         
         //console.log(opened[0].firstElementChild.classList[1]);
     })
     
 }

 function matchCards(opened) {
    // const first = opened[0];
    // const second = opened[1];
    // console.log("first: " + first);
    // console.log("second: " + second);
    for (open of opened) {
        console.log(opened.length);
    }
 }