var menu = document.getElementsByClassName("menubox-body-menu");
var sub = document.getElementsByClassName("menubox-body-sub");
var down = document.getElementsByClassName("fas fa-chevron-down");
var up = document.getElementsByClassName("fas fa-chevron-up");
var menubox = document.getElementsByClassName("menubox");

var flag_1 = 0;
var flag_2 = 0;
var flag_3 = 0;
var flag_4 = 0;

//사이드 메뉴
function menu_script_1(){
    if (flag_1 == 0){  

        menu[0].style.backgroundColor="#01b9ff";
        sub[0].style.height="170px";
        down[0].style.display="none";
        up[0].style.display="block";


        menu[1].style.backgroundColor="#353535";
        sub[1].style.height="0px";
        down[1].style.display="block";
        up[1].style.display="none";

        menu[2].style.backgroundColor="#353535";
        sub[2].style.height="0px";
        down[2].style.display="block";
        up[2].style.display="none";

        menu[3].style.backgroundColor="#353535";
        sub[3].style.height="0px";
        down[3].style.display="block";
        up[3].style.display="none";

        
        flag_1 = 1; 
        flag_2 = 0;
        flag_3 = 0;
        flag_4 = 0;
    }

    else if (flag_1 == 1){  

        menu[0].style.backgroundColor="#353535";
        sub[0].style.height="0px";
        down[0].style.display="block";
        up[0].style.display="none";

        flag_1 = 0;
    }
}

function menu_script_2(){
    if (flag_2 == 0){  

        menu[1].style.backgroundColor="#01b9ff";
        sub[1].style.height="170px";
        down[1].style.display="none";
        up[1].style.display="block";
        

        menu[0].style.backgroundColor="#353535";
        sub[0].style.height="0px";
        down[0].style.display="block";
        up[0].style.display="none";

        menu[2].style.backgroundColor="#353535";
        sub[2].style.height="0px";
        down[2].style.display="block";
        up[2].style.display="none";

        menu[3].style.backgroundColor="#353535";
        sub[3].style.height="0px";
        down[3].style.display="block";
        up[3].style.display="none";

        flag_1 = 0; 
        flag_2 = 1;
        flag_3 = 0;
        flag_4 = 0;
    }

    else if (flag_2 == 1){

        menu[1].style.backgroundColor="#353535";
        sub[1].style.height="0px";
        down[1].style.display="block";
        up[1].style.display="none";

        flag_2 = 0;
    }
}

function menu_script_3(){
    if (flag_3 == 0){  

        menu[2].style.backgroundColor="#01b9ff";
        sub[2].style.height="170px";
        down[2].style.display="none";
        up[2].style.display="block"

        menu[0].style.backgroundColor="#353535";
        sub[0].style.height="0px";
        down[0].style.display="block";
        up[0].style.display="none";

        menu[1].style.backgroundColor="#353535";
        sub[1].style.height="0px";
        down[1].style.display="block";
        up[1].style.display="none";

        menu[3].style.backgroundColor="#353535";
        sub[3].style.height="0px";
        down[3].style.display="block";
        up[3].style.display="none";
        
        flag_1 = 0; 
        flag_2 = 0;
        flag_3 = 1;
        flag_4 = 0; 
    }

    else if (flag_3 == 1){

        menu[2].style.backgroundColor="#353535";
        sub[2].style.height="0px";
        down[2].style.display="inline-block";
        up[2].style.display="none";

        flag_3 = 0;
    }
}

function menu_script_4(){
    if (flag_4 == 0){  

        menu[3].style.backgroundColor="#01b9ff";
        sub[3].style.height="170px";
        down[3].style.display="none";
        up[3].style.display="inline-block"

        menu[0].style.backgroundColor="#353535";
        sub[0].style.height="0px";
        down[0].style.display="inline-block";
        up[0].style.display="none";

        menu[1].style.backgroundColor="#353535";
        sub[1].style.height="0px";
        down[1].style.display="inline-block";
        up[1].style.display="none";

        menu[2].style.backgroundColor="#353535";
        sub[2].style.height="0px";
        down[2].style.display="inline-block";
        up[2].style.display="none";


        
        flag_1 = 0; 
        flag_2 = 0;
        flag_3 = 0;
        flag_4 = 1; 
    }

    else if (flag_4 == 1){

        menu[3].style.backgroundColor="#353535";
        sub[3].style.height="0px";
        down[3].style.display="inline-block";
        up[3].style.display="none";

        flag_4 = 0;
    }
}


//메인화면 교체
let main = document.getElementsByClassName("main");
//  let main = document.querySelectorAll(".main");

//함수를 여러개 만들지않고 div아이디의 오른쪽 세문자만 추출해 case로 바꿀지 고민중
function main1_1(){
    [...main].forEach(e=>e.style.display="none");
    document.getElementById("main1_1").style.display="block";
}
function main1_2(){
    [...main].forEach(e=>e.style.display="none");
    document.getElementById("main1_2").style.display="block";
}
function main1_3(){
    [...main].forEach(e=>e.style.display="none");
    document.getElementById("main1_3").style.display="block";
}
function main1_4(){
    [...main].forEach(e=>e.style.display="none");
    document.getElementById("main1_4").style.display="block";
}

