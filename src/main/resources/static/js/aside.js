$(document).ready(function () {
    function scrollTop(selector, event, select, speed){
        $(selector).on(event, function(){
            $(select).stop().animate({
                scrollTop: 0
            }, speed)
        })
    }
    scrollTop("aside", "click", "html, body", 1000, 500)
});