let menubox_li=document.getElementsByClassName("menubox_li");
let main=document.getElementsByClassName("main");
let menuLength=menubox_li.length;
let menu;
let menu_title=document.getElementById("menu_title");
let parameter;
window.onload = function () {
    MenuOff(); //전체 상세메뉴 닫기 menu1 menu2이렇게 여러 클래스가 있어서 자바스크립트로 닫음

    menu_index = (sessionStorage.getItem("menu_index"));        //세션값을 가져옴
    menu = (sessionStorage.getItem("menu"));
    detail_menu = (sessionStorage.getItem("detail_menu"));
    select_detail_menu = (sessionStorage.getItem("select_detail_menu"));
    parameter = (sessionStorage.getItem("parameter"));          //메뉴나 가이드메뉴를 바꿔 파라미터를 받고 새로고침하고나면 파라미터가 주소창엔 있지만 변수는 초기화됨
                                                                    //그래서 ex)main2의 승인,거절,삭제등의 버튼을 누르고 주소를

    if(menu_index==undefined) { //저장된 세션이 없다면 1번메뉴를 출력해주기위해 참조변수값들을 재설정
        menu_index = 0;
        menu = "main1";
    }

    menubox_li[menu_index].style.backgroundColor = "#30384b";                   //좌측메뉴바 색
    main[menu_index].style.visibility="visible";                                //메뉴
    $('.'+menu).eq(select_detail_menu).css("display","block");                  //해당메뉴의 몇번쨰 상세메뉴를 보여줄것인지(수정해야함)
    menu_title.innerHTML=("<h3>"+menubox_li[menu_index].innerText+"</h3>");     //해당메뉴의 이름
    $('.guide:eq(' + menu_index + ')').css("display","inline-block");           //해당 메뉴의 상세메뉴가이드 띄움
    $('.guide:eq(' + menu_index + ') .guide_select option:eq(' +select_detail_menu + ')').attr("selected","selected");  //해당 메뉴의 선택한 상세메뉴(가이드)대로 상세메뉴 선택값 변경
}

//전체 상세메뉴 닫기
function MenuOff() {
    for (i = 0; i < menuLength; i++) {
        menu = ("main" + String(i + 1));
        $('.' + menu).css("display", "none");
    }
}
//메뉴 클릭시
let menu_index;
let select_detail_menu;
let detail_menu;
$('.menubox_li').click(function(){
    menu_index=$(this).index();                               //클래스 순번 받아오기
    menu=("main"+String((menu_index+1)));                     //상세메뉴클래스를참조하기 위해 변수를 만든다 ex)main1,main2

    //주소 파라미터 넘기기
    parameter=menu_index;
    switch(parameter){
        case 0: parameter="STAFF";
            break;
        case 1: parameter="UNIV";
            break;
        case 2: parameter="STAFF";
            break;
        case 3: parameter="STAFF";
            break;
        case 4: parameter="STAFF";
            break;
    }
    //세션 스토리지에 css를 저장
    window.sessionStorage.setItem('menu_index', menu_index);
    window.sessionStorage.setItem('menu',menu);
    window.sessionStorage.setItem('detail_menu',detail_menu);
    window.sessionStorage.setItem('select_detail_menu',Number(0)); //상세메뉴가 아닌 메뉴클릭을 했을시엔 첫번째 상세메뉴를 보여줌

    //파라미터 바꿔서 새로고침하는 함수 호출
    submit_param();

});

//menu_guide 변경할시 상세 메뉴 변경
$('.guide_select').change(function(){
    select_detail_menu=document.getElementsByClassName('guide_select')[menu_index].selectedIndex;   //상세메뉴중 뭐를 클릭했는지 가져오기

    if("회원관리"==this.value){
        parameter="UNIV";
    }
    else if("기업관리"==this.value){
        parameter="ENTERPRISE";
    }

    //세션 스토리지에 css를 저장
    window.sessionStorage.setItem('select_detail_menu',select_detail_menu);

    //파라미터 바꿔서 새로고침하는 함수 호출
    submit_param();
})


function submit_param(){  //메뉴클릭,가이드메뉴 선택시
    window.sessionStorage.setItem('parameter',parameter); //새로고침해도 파라미터가 남아있게
    location.href="/admin/admin?type=" + parameter + "&page1=1&page2=1";
}


//전체 게시판 각 리스트별로 체크,해제
let check;
function checkAll(checkI) {
    let checkName=(checkI.name);                                      //체크한 부모체크박스의 이름을 가져옴 ex)2_1_checkH
    check=(checkName.substr(0,9));                                //부모체크박스의 h를 떼어 자식name으로 변경
    if($('input[name='+checkName+']').is(':checked')==true){          //자식 checkBox에 check적용
        $('input[name='+check+']').prop("checked",true);
    }
    else if($('input[name='+checkName+']').is(':checked')==false) {
        $('input[name=' + check + ']').prop("checked", false);
    }
}