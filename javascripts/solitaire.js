(function () {
    'use strict';

    var id = 'js-puzzle_widget';
    var widget_location = document.getElementById(id);
    var puzzle_size_width = 800;
    var puzzle_size_height = 600;

    function templateBase() {
        return [
            '<div class="puzzle_wrapper">',
            '<div class="score_board">Score: <span class="score">0</span></div>',
            '<div class="time_board">Time: <span class="time">0</span></div>',
            '<div id="puzzle" style="width: ',
            puzzle_size_width,
            'px; height: ',
            puzzle_size_height,
            'px;"></div>'
        ].join('');
    }

    function shuffle(o) {
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function buildCard(suit, face) {
        return [
            '<div class="card ' + suit + '" data-face="' + face + '">',
            '<span class="top icon-' + suit + '"></span>',
            '<span class="bottom icon-' + suit + '"></span></div>'].join('');
    }

    function buildDeck() {
        var puzzle = document.querySelector('#puzzle');
        var cards_values = 'A,2,3,4,5,6,7,8,9,10,J,Q,K'.split(',');
        var card_suit = ['spades', 'clubs', 'diamonds', 'heart'];
        var cards = [];
        for (var i = 0; i < card_suit.length; i++) {
            for (var x = 0; x < cards_values.length; x++) {
                cards.push(buildCard(card_suit[i], cards_values[x]));
            }
        }
        console.log(cards);
        puzzle.innerHTML = '';
        puzzle.insertAdjacentHTML('afterbegin', shuffle(shuffle(cards)).join(''));
    }
    function init() {
        widget_location.insertAdjacentHTML('beforebegin', templateBase());
        buildDeck();

    }

    init();
}());
