//array for fonts of cards 
let list = ['bicycle', 'bicycle', 'leaf', 'leaf', 'heart', 'heart', 'futbol', 'futbol', 'baseball-ball', 'baseball-ball','birthday-cake','birthday-cake',
'heartbeat','heartbeat','music','music'],

// TODO: set initial value to variables
    $container = $('.container'),
    $scorePanel = $('.score-panel'),
    $rating = $('.fa-star'),
    $moves = $('.moves'),
    $timer = $('.timer'),
    $restart = $('.restart'),
    $deck = $('.deck'),

    nowTime,
    allOpen = [],
    match = 0,
    second = 0,
    moves = 0,
    wait = 420,
    totalCard = list.length / 2,

    // TODO: scoring from 1 to 3
    stars3 = 14,
    stars2 = 16,
    star1 = 20;

// Shuffling function : the game never have same arrangement
function shuffle(array)
 {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// The function init() enables the game to begin
function init() {
    let allCards = shuffle(list);
    $deck.empty();

    match = 0;
    moves = 0;
    $moves.text('0');

    for (let x = 0; x < allCards.length; x++) {
        $deck.append($('<li class="card"><i class="fa fa-' + allCards[x] + '"></i></li>'))
    }
    addCardListener();

    resetTimer(nowTime);
    second = 0;
    $timer.text(`${second}`)
    initTime();
}
// TODO: rating
function rating(moves) {
    let rating = 3;
    if (moves > stars3 && moves < stars2) {
        $rating.eq(3).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > stars2 && moves < star1) {
        $rating.eq(2).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > star1) {
        $rating.eq(1).removeClass('fa-star').addClass('fa-star-o');
        rating = 1;
    }
    return { score: rating };
}

// TODO : add the popup to tell us about the result
function gameOver(moves, score) {
    $('#winnerText').text(`In ${second} seconds, you did it  total of ${moves} moves with a score of ${score}. good job `);
    $('#winnerModal').modal('toggle');
}


$restart.bind('click', function (confirmed) {
    if (confirmed) {
        $rating.removeClass('fa-star-o').addClass('fa-star');
        init();
    }
});

let addCardListener = function () {

    $deck.find('.card').bind('click', function () {
        let $this = $(this);

        if ($this.hasClass('show') || $this.hasClass('match')) { return true; }

        let card = $this.context.innerHTML;
        $this.addClass('open show');
        allOpen.push(card);

        /* if cards matched */
        if (allOpen.length > 1) {
            if (card === allOpen[0]) {
                $deck.find('.open').addClass('match');
                setTimeout(function () {
                    $deck.find('open').removeClass('open show');
                }, wait);
                match++;

                /* If cards are not matched */
            } else {
                $deck.find('.open').addClass('notmatch');
                setTimeout(function () {
                    $deck.find('.open').removeClass('open show');
                }, wait / 1.5);
            }

          
            allOpen = [];

    
            moves++;

           
            rating(moves);

           
            $moves.html(moves);
        }

       
        if (totalCard === match) {
            rating(moves);
            let score = rating(moves).score;
            setTimeout(function () {
                gameOver(moves, score);
            }, 500);
        }
    });
}

function initTime() {
    nowTime = setInterval(function () {
        $timer.text(`${second}`)
        second = second + 1
    }, 1000);
}


function resetTimer(timer) {
    if (timer) {
        clearInterval(timer);
    }
}

init();