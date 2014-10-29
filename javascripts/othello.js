//
(function() {
    'use strict';

    var id = 'js-puzzle_widget';
    var widget_location = document.getElementById(id);
    var rows = 8;
    var columns = 8;
    var new_divs = rows * columns;
    var puzzle_size_width = 700;
    var puzzle_size_height = 700;

    function templateBase() {
        return [
            '<div class="puzzle_wrapper">',
            '<div class="white_score_board">White Score: <span class="white_score">0</span></div>',
            '<div class="black_score_board">Black Score: <span class="black_score">0</span></div>',
            '<div id="puzzle" style="width: ',
            puzzle_size_width,
            'px; height: ',
            puzzle_size_height,
            'px;"></div>'
        ].join('');
    }

    function othelloDisc() {
        var html = '<div class="othello_disc _white';
        html += '"></div><div class="othello_disc _black';
        html += '"></div>';
        return html;
    }

    function buildPuzzle() {
        var puzzle = document.getElementById('puzzle');
        var box_width = puzzle_size_width / columns;
        var box_height = puzzle_size_height / rows;
        var html = [];

        for (var x = 0; x < new_divs; x++) {
            var row = Math.floor(x / 8);
            var column = x - (row * 8);
            var default_disc = '';
            var side = '';
            if ((row === 3 && column === 3) || (row === 4 && column === 4)) {
                default_disc = othelloDisc();
                side = ' white';
            } else if ((row === 3 && column === 4) || (row === 4 && column === 3)) {
                default_disc = othelloDisc();
                side = ' black';
            }
            html.push('<div style="height:' + box_height + 'px;width:' + box_width + 'px;" class="innerdiv div' + row + '_' + column + side + '">' + default_disc + '</div>');
        }

        puzzle.innerHTML = '';
        puzzle.insertAdjacentHTML('afterbegin', html.join(''));

    }

    function getClipRect(obj) {
        if (typeof obj === 'string') {
            obj = document.querySelector(obj);
        }

        var curleft = 0;
        var curtop = 0;

        var findPos = function(obj) {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
            if(obj.offsetParent) {
                findPos(obj.offsetParent);
            }
        };
        findPos(obj);

        return {
            top: curtop,
            left: curleft,
            width: obj.offsetWidth,
            height: obj.offsetHeight
        };
    }

    function updateScore() {
        var score_board = document.querySelector('.score');
        var current_score = parseFloat(score_board.innerHTML);
        score_board.innerHTML = current_score + 1;
    }

    function timmer() {
        var start_time = new Date();
        window.timmer_count = window.setInterval(function(){
            var current_time = new Date();
            var total_time = ((current_time - start_time) / 1000).toFixed(2)
            document.querySelector('.time').textContent = (total_time > 60)? (total_time / 60).toFixed(2) : total_time;
        }, 1);
    }

    function addEvent(el, type, fn) {
        if(el && el.length) {
            for(var x = 0; x < el.length; x++) {
                el[x].addEventListener(type, fn, false);
            }
        } else if (el && el.nodeName || el === window) {
            el.addEventListener(type, fn, false);
        }
    }

    function events() {
        addEvent(document.querySelector('.setup'), 'click', function (e) {
            var new_row = document.querySelector('.rows').value;
            var new_columns = document.querySelector('.columns').value;
            columns = (new_columns > 0) ? new_columns : columns;
            rows = (new_row > 1) ? new_row : rows;
            buildPuzzle();
        });

        addEvent(document.querySelectorAll('.card_back'), 'click', function (e) {
            e.target.parentNode.classList.toggle('active');
            var active_cards = document.querySelectorAll('.innerdiv.active');

            if (!time) {
                time = true;
                timmer();
            }

            if (active_cards.length >= 2) {
                setTimeout(function () {
                    if (active_cards[0].getAttribute('data-card') === active_cards[1].getAttribute('data-card')) {
                        active_cards[0].removeChild(active_cards[0].querySelector('.card_back'));
                        active_cards[1].removeChild(active_cards[1].querySelector('.card_back'));
                        active_cards[0].className += ' match';
                        active_cards[1].className += ' match';
                        if (document.querySelectorAll('.match').length >= new_divs) {
                            clearInterval(timmer_count);
                        }
                        updateScore();
                    }
                    for(var x = 0; x < active_cards.length;x++){
                        active_cards[x].classList.toggle('active');
                    }
                }, 500);
            }

        });
    }

    function init() {
        widget_location.insertAdjacentHTML('beforebegin', templateBase());
        buildPuzzle();
        events();
    }

    init();
}());
