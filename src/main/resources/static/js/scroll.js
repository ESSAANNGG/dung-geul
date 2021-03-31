$(document).ready(function () {
    const $notice = $(".notice");
    const $notice_ul = $notice.find("ul");
    const $notice_list = $notice.find("ul li");
    const $btn = $notice.find(".btn span");
    const length = $notice_list.length-1;
    let count = 0;
    let time = false;
    //버튼 클릭 이벤트를 추가한다
    $btn.click(function(){
        //위를 클릭했는지 아래를 클릭했는지 구분하기 위해 현재의 인덱스 값을 변수명 i에 값을 저장한다
        let i = $(this).index();
        if(time==true){
            return;
        }
        setTimeout(function(){
            time = false;
        }, 300)
        time = true;
        if(i==0){
            count--;
            if(count<0){
                count=length;
            }
            for(let k=1; k<length+1; k++){
                let t = $notice_list.eq(k).offset().top;
                console.log(t)
                if(t>541){
                    $notice_list.eq(k).css("top", "-="+(length+1)*60+"px")
                }
            }
            $notice_ul.stop().animate({
                top: "+=60px"
            }, 300)
        }else{
            count++;
            if(count>length){
                count=0;
            }
            for(let k=0; k<length+1; k++){
                let t = $notice_list.eq(k).offset().top;
                console.log(t)
                if(t<240){
                    $notice_list.eq(k).css("top", "+="+(length+1)*60+"px")
                }
            }
            $notice_ul.stop().animate({
                top: "-=60px"
            }, 300)
        }
    })
});