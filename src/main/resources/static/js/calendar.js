var scrollDiv=document.querySelector(".main-join-yearChart-year");
var scrollLocation=scrollDiv.querySelectorAll("H1");
 $('main-join-yearChart-year').offset;


var wheel;
var date = new Date();
var currentYear = date.getFullYear();
var indexc=currentYear;
$(".main-join-yearChart").on('mousewheel',function(e){ 
    wheel = e.originalEvent.wheelDelta; 
    e.preventDefault() //마우스 스크롤 밑에서 scrollby로 설정한것만 이동하게

    if(wheel>0){ 
      //스크롤 올릴때
        scrollDiv.scrollBy(0,-65);
        if(indexc<currentYear){ //현재년도보다 출력하는 년도가 낮다면 스크롤 올릴때 함수 실행 허용
        indexc=indexc+1;
        count=1;//차트에서 년도를 올릴지 내릴지 계산하는 count 1이면 년도 +1
        viewsChartYearSelect(count);
        joinChartYearSelect(count);
        }
 
    } else { 
      //스크롤  내릴때 
        scrollDiv.scrollBy(0,65);
        if(indexc>2013){  //최대 2013년까지 출력가능
        indexc=indexc-1;
        count=0;//차트에서 년도를 올릴지 내릴지 계산하는 count 0이면 년도 -1
        viewsChartYearSelect(count);
        joinChartYearSelect(count);
        }
    }
      
  });



