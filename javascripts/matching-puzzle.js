//
(function() {
    'use strict';

    var id = 'js-puzzle_widget';
    var widget_location = document.getElementById(id);
    var image_location = 'http://lorempixel.com';
    var image_type = ['abstract', 'business', 'animals', 'city', 'food', 'nightlife', 'people', 'nature', 'sports', 'transport', 'cats', 'fashion', 'technics'];
    var rows = 8;
    var columns = 8;
    var new_divs = rows * columns;
    var puzzle_size_width = 800;
    var puzzle_size_height = 600;
    var image_height = 1;
    var time = false;
    var image_width = 1;

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

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getImageSize(image, callback) {
        // Get on screen image
        // Create new offscreen image to test
        var img = new Image();
        img.src = image;
        img.onload = function(){
            callback([img.width, img.height]);
        };
    }

    function puzzle_html(card_class, image, box_width, box_height) {
        return [
            '<div class="innerdiv"',
            ' data-card="',
            card_class,
            '" style="width:',
            box_width,
            'px;height:',
            box_height,
            'px;">',
            '<div class="card_back"></div>',
            '<div class="card_front"',
            ' style="background-image: url(',
            image,
            ');"></div></div>'].join('');
    }

    function buildPuzzle() {
        var puzzle = document.getElementById('puzzle');
        var box_width = puzzle_size_width / columns;
        var box_height = puzzle_size_height / rows;
        var used = {};
        var half_divs = new_divs / 2;
        var html = [];

        shuffle(image_type);

        for (var x = 0; x < half_divs; x++) {
            var imageselection = (x < 10)? [0, x]: x.toString().split('');
            var card_class = image_type[+imageselection[0]] + '_' + (parseFloat(imageselection[1]) + 1);
            var image = image_location + '/' + Math.ceil(box_width) + '/' + Math.ceil(box_height) + '/' + card_class.replace('_', '/');
            html.push(puzzle_html(card_class, image, box_width, box_height));
            html.push(puzzle_html(card_class, image, box_width, box_height));
        }

        puzzle.innerHTML = '';
        puzzle.insertAdjacentHTML('afterbegin', shuffle(shuffle(html)).join(''));
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

    function timmer(){
        var start_time = new Date();
        window.timmer_count = window.setInterval(function(){
            var current_time = new Date();
            var total_time = ((current_time - start_time) / 1000).toFixed(2)
            document.querySelector('.time').textContent = (total_time > 60)? (total_time / 60).toFixed(2) : total_time;
        }, 1);
    }

    function addEvent(el, type, fn){
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
