
let getAllUrlParams = require('./getAllUrlParams');
let modal = require('./modal')();
let scrollSpy = require('./scrollSpy');
new scrollSpy('body__container');

let calc = require('./calc');
new calc(getAllUrlParams());

let form = require('./form')();

$(document).ready(function() {
    let container = $('.body__container');

    $('a[href^="#"]').click(function (e) { 
        e.preventDefault();
        let eClick = $(this).attr('href');

        container.animate({
            scrollTop: container.scrollTop() + $(eClick).position().top
        }, 1000);
    });
});    
