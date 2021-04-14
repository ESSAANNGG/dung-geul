$(document).ready(function () {
    const swiper = new Swiper(".swiper-container", {
        slidesPerView: 2, spaceBetween: 20,
        navigation: {
            nextEl:".swiper-button-next",
            prevEl:".swiper-button-prev"
        },
        loop: true,
        autoplay:{
            delay: 2500
        },
        pagination:{
            el: ".swiper-pagination"
            , clickable: true
            // , type: "progressbar"
            // , type: "fraction"
            , dynamicBullets: true
        },
        breakpoints:{
            480: {
                slidesPerView: 1, spaceBetween: 10,
            },
            768: {
                slidesPerView: 2, spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3, spaceBetween: 30,
            },
            1400: {
                slidesPerView: 4, spaceBetween: 40,
            }
        }
    })
    $(".swiper-container").mouseover(function(){
        swiper.autoplay.stop();
    })
    $(".swiper-container").mouseout(function(){
        swiper.autoplay.start();
    })
});