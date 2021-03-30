var scrollDiv=document.querySelector(".main-join-yearChart-year");
var scrollLocation=scrollDiv.querySelectorAll("H1");
 $('main-join-yearChart-year').offset;


var wheel;
var indexc=0;
$(".main-join-yearChart").on('mousewheel',function(e){ 
    wheel = e.originalEvent.wheelDelta; 
    e.preventDefault() //마우스 스크롤 밑에서 scrollby로 설정한것만 이동하게

    if(wheel>0){ 
      //스크롤 올릴때
        scrollDiv.scrollBy(0,-65);
        if(indexc>=1)
        indexc=indexc-1;
        console.log(indexc);  
    } else { 
      //스크롤  내릴때 
        scrollDiv.scrollBy(0,65);
        if(indexc<=7){
        indexc=indexc+1;
        }
        console.log(indexc);
        } 
  });



