$(document).ready(function () {
    const $slide = $(".photo");
    const $item = $slide.find(".photo-item");
    const $length = $item.length-1;
    const $arrow = $slide.find(".arrow");
    let count = 0;
    let time = false;
    let auto_play = setInterval(timer, 3000);

    function timer(){
        $item.eq(count).stop().animate({
            left: "-100%"
        }, 900)
        count++;
        if(count > $length){
            count = 0;
        }
        $item.eq(count).css("left", "100%").animate({
            left: "0"
        }, 400)
    }

    $arrow.mouseover(function(){
        clearInterval(auto_play);
    })
    $arrow.mouseout(function(){
        auto_play = setInterval(timer, 3000)
    })

    $arrow.click(function(e){
        e.preventDefault();
        let i = $arrow.index(this);
        if(time == true){
            return;
        }
        setTimeout(function(){
            time = false;
        }, 1000)
        time = true;
        if(i==0){
//왼
            $item.eq(count).stop().animate({
                left: "100%"
            }, 1000)
            count--;
            if(count < 0){
                count = $length;
            }
            $item.eq(count).css("left", "-100%").animate({
                left: "0"
            }, 900)
        }else{
//오
            $item.eq(count).stop().animate({
                left: "-100%"
            }, 1000)
            count++;
            if(count > $length){
                count = 0;
            }
            $item.eq(count).css("left", "100%").animate({
                left: "0"
            }, 900)
        }
    })
});