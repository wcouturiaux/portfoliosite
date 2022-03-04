/*
 * Create a list that holds all of your cards
 */

let cardsInDeck = document.querySelectorAll('.card'), //create node list of cards
	deck = document.querySelector('.deck').firstElementChild, //assign first card to deck
	i = 0;

let cardArray = []; //create array to store card "names"
//loop through node list and push each inner html (card name) to array
for (let j = 0; j<cardsInDeck.length; j++){
	cardArray.push(cardsInDeck[j].innerHTML)
}

//shuffle Array of card names
let shuffledCards = shuffle(cardArray);

//while element children exist in deck assign that childs inner html from shuffled array
while(deck){
	deck.innerHTML = shuffledCards[i];
	deck = deck.nextElementSibling;
	i++;
}

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

//Global Variable Declarations
let openCardList = [];
let countMoves = 0;
let numMatches = 0;


function flipCard(event){
	if (event.target.className === 'card'){
		event.target.className = 'card open show';
	}
}

function openCards(event){
	openCardList.push(event.target.innerHTML.toString());
	if (openCardList.length === 1){
		numMoves();
		starRemoval();
	}
	if (openCardList.length === 2){
		if (openCardList[0] === openCardList[1]){
			 [].forEach.call(document.querySelectorAll('.card.open.show'),function(item){item.className='card match';});
			 openCardList.length = 0;
			 numMatches += 1;
		}
		else{
			setTimeout(function(){[].forEach.call(document.querySelectorAll('.card.open.show'),function(item){item.className="card";});},1000);
			openCardList.length = 0;
		}
	}
}

/*
* Increment moves counter and write value to text content of moves class in html
*/
function numMoves(){
	countMoves +=1;
	document.querySelector('.moves').textContent=countMoves;
}

/*
* starRemoval changes stars from solid to outline based on number of moves.
*/
function starRemoval(){
	stars = document.querySelectorAll('.fa-star');
	starCount = countMoves;
	switch (starCount) {
		case 10:
			stars[stars.length-1].className='fa fa-star-o';
			break;
		case 13:
			stars[stars.length-1].className='fa fa-star-o';
			break;
		case 16:
			stars[stars.length-1].className='fa fa-star-o';
			break;
		default:
			break;
	}
}

/*
* winGame displays modal if all matches are made.
*/
function winGame(event){
	if(numMatches === 8){
		window.clearInterval(timer);
		endTime = document.getElementById('time').innerText;
		starRating = document.querySelector('.stars').cloneNode(true);
		document.querySelector('.modal').style.display = 'block';
		document.querySelector('.win-text').innerText = 'It took you ' + endTime + ' to find all matches in ' + countMoves + ' moves.';
		document.querySelector('.modal-footer').innerText = 'FINAL STAR RATING  ';
		document.querySelector('.modal-footer').appendChild(starRating);
	}
}

/*
Set start to current clock time update interval on 100ms and calculate time then write to index.html in h:mm:ss format.
Timer functionality adapted from :
/***************************************************************************************
*    Author: James Edwards
*    Date: 2010-06-23
*    Availability: https://www.sitepoint.com/creating-accurate-timers-in-javascript/
***************************************************************************************
*/

function runTimer(event){
	let start = new Date().getTime();
	timer = window.setInterval(function(){
					let time = new Date().getTime()-start,
						seconds = Math.floor(time/1000)%60%10,
						tensSecs = Math.floor(time/10000)%6,
						minutes = Math.floor(time/60000)%60%10,
						tensMins = Math.floor(time/600000)%6
						hours = Math.floor(time/3600000);

						document.getElementById('time').innerText = hours + ':' + tensMins + minutes + ':' + tensSecs + seconds;
					},
				100);
}

/*
Event listener that executes only on the first click of the deck to start the timer
*/
document.querySelector('.deck').addEventListener('click',function(event){event.preventDefault(); if(event.target.className ==='card'){runTimer(event)}},{once: true});
/*
*Event listener on deck to make appropriate function calls
*/
document.querySelector('.deck').addEventListener('click', function(event){event.preventDefault(); if(event.target.className ==='card'){ flipCard(event); openCards(event); winGame(event)};})
/*
*Event listener on score panel to reload game
*/
document.querySelector('.score-panel').addEventListener('click', function(event){event.preventDefault(); location.reload();})
/*
*Event listener on modal to close the modal
*/
document.querySelector('.modal').addEventListener('click', function(event){event.preventDefault(); document.querySelector('.modal').style.display = 'none';})
/*
*Event listener to reload page when Play Again button is clicked.
*/
document.querySelector('.btn-again').addEventListener('click', function(event){event.preventDefault(); location.reload();})


