var menu = document.getElementsByClassName("menubox_body_menu");
var sub = document.getElementsByClassName("menubox_body_sub");
var down = document.getElementsByClassName("fas fa-chevron-down");
var up = document.getElementsByClassName("fas fa-chevron-up");
var menubox = document.getElementsByClassName("menubox");


//메뉴가 열려있는지 닫혀있는지 확인하는 변수
//메뉴의 수만큼 변수의 길이를 조절
var flagArr =[];
flagArr.length=menu.length;   


//전체 배열값에 닫혀있다는 뜻인 0값을 줌  
//열려있으면 1
for(let i=0; i<flagArr.length; i++){
    flagArr[i]=0;
}

let menuNum;

//몇번째 메뉴를 클릭한건지 menuNum에 담아옴
//첫번쨰 메뉴가 0 두번쨰 메뉴가 1...
function sideMenu(menuNum){

    //flag가 0이면 닫혀있는것. 열어주자
     if (flagArr[menuNum]== 0){  

            //메뉴 전체css변경
            $('.menubox_body_menu').css({'background-color':'#353535'});
            $(".menubox_body_sub").css({'height':'0px'});
            $(".fas fa-chevron-down").css({'display':'block'});
            $(".fas fa-chevron-up").css({'display':'none'});

            //on시킨 메뉴만 열어주는 css적용
            menu[menuNum].style.backgroundColor="#01b9ff";
            sub[menuNum].style.height="170px";
            down[menuNum].style.display="none";
            up[menuNum].style.display="block";
        
            for(let i=0; i<flagArr.length; i++){
                flagArr[i]=0;
            }
            flagArr[menuNum]=1;
        }

            //flag가 1이면 열려있는것. 닫아주자
        else if (flagArr[menuNum] == 1){  
        
            menu[menuNum].style.backgroundColor="#353535";
            sub[menuNum].style.height="0px";
            down[menuNum].style.display="block";
            up[menuNum].style.display="none";
        
            flagArr[menuNum]=0;
            }
}





//메인화면 교체
let main = document.getElementsByClassName("main");
let mainNum;

//main클래스의 첫번째가 뭔진 모르겠지만 이미 존재함
//그래서 [2]부터 적용

function mainChange(mainNum){
    [...main].forEach(e=>e.style.display="none");
    document.getElementsByClassName("main")[mainNum].style.display="block";
}



