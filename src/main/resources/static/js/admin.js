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
    submit_param(parameter);

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
    submit_param(parameter);
})


function submit_param(){  //메뉴클릭,가이드메뉴 선택시
    location.href="/admin/admin?type=" + parameter + "&page1=1&page2=1";
}
function submit_data(){
    location.href="/admin/admin?type=" + parameter + "&page1=1&page2=1";
}

//파라미터 보내기
///////////////////////////////////////////////

//main2_1&&main2_2 date
//search_date_num가 1==오늘 2==이번주 3==이번달 4==전체
let date_range=document.getElementsByClassName('user_search_date');
function search_date(main_num,date_select){
    let now=new Date();
    let week=new Date();
    let month=new Date();
    let enter=new Date(1);  //파라미터를 한개만 전송하면 1970년도로 자동설정
    let dateVar;
    week.setDate(now.getDate()-7);
    month.setMonth(now.getMonth()-1);
    if(main_num=="main2_user") {
        switch (date_select) {
            case '오늘': dateVar=now;
                break;
            case '이번주': dateVar=week;
                break;
            case '이번달': dateVar=month;
                break;
            case '전체': dateVar=enter;
                break;
        }
        date_range[0].value = dateVar.toISOString().substring(0, 10);
        date_range[1].value = now.toISOString().substring(0, 10);
    }
    else if(main_num=="main2_corp"){
        switch (date_select) {
            case '오늘': dateVar=now;
                break;
            case '이번주': dateVar=week;
                break;
            case '이번달': dateVar=month;
                break;
            case '전체': dateVar=enter;
                break;
        }
        date_range[2].value = dateVar.toISOString().substring(0, 10);
        date_range[3].value = now.toISOString().substring(0, 10);
    }

}



// 회원 상세정보
let non_detail=0;       //.user_list_body안에 있는 체크박스나 select(기업형태)를 클릭했을시 상세정보를 띄우지 않게하기위한 참조변수
let detail_state=0;     //상세정보페이지가 켜져있는지 꺼져있는지 확인하기 위한 참조변수;
let detail_per;          //어떤 권한의 사용자인지 확인하는 변수 0=학생 1=교직원 2=상담사 3=기업
$('.user_list_body :checkbox, .shape').click(function(){
    non_detail=1;
})
//체크박스나 select를 클릭하였다면 상세정보를 띄우지않는다.
//non_detail=0이면 상세정보를 띄워줌
function detail(users) {
    if (non_detail == 1) {
        non_detail = 0;
        return;
    } else if (non_detail == 0) {
        users_roll=$(users).children('span.role').text();                 //role을 읽어옴
        setTimeout("detail_on(users_roll)", 100);          //settimeout을 하지않으면 detail_state=1이되어 바로 상세정보를 닫아버림
    }
}

function detail_on(users_roll){
    switch (users_roll) {
        case '학생': detail_per="detail_student";
            break;
        case '교직원': detail_per="detail_staff";
            break;
        case '상담사': detail_per="detail_counselor";
            break;
        case '기업': case '' : detail_per="detail_enterprise";
            break;
    }
    $('#'+detail_per).css({"visibility":"visible","opacity":"1"});
    $('#wrap,#admin_header').css("opacity","0.4");
    detail_state=1;
}

//상세정보를 닫음
$('#shadow_box').click(function(e){
    if(detail_state==1) {
        $('.detailBox').css({"visibility": "hidden", "opacity": "0"});
        $('#wrap,#admin_header').css("opacity", "1");
        detail_state = 0;
    }
})




//게시판 전체 체크하기
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




//회원가입승인 허가
let p; //승인인지 거절인지 html으로부터 받아옴
let perList=[]; //userid값을 담아넣는 배열
let userid //userid값을 하나하나 담음
let perLength;
function permission_ajax(p){
    perList=[]; //배열이 계속 쌓이는걸 방지 (초기화)
    //체크한 유저목록을 가져와 perList에 담음
    perLength=$('input[name="2_2_check"]:checked').length;    //체크 수만큼 반복
    for(j=0; j<perLength; j++){
        let perRemove=($("input[name='2_2_check']").index($('input[name="2_2_check"]:checked')));     //회원가입승인 전체 체크중 체크된것들의 인덱스를 가져옴

        userid=$('.user_list:eq(1) .user_list_body:eq(' + perRemove + ') .username').text();                    //아이디값을 읽어옴
        perList.push(userid);                                                                                    //전달할 배열에 값 삽입
        ($('input[name="2_2_check"]').eq(perRemove)).prop("checked",false);                           //해당하는 인덱스의 체크 해제
        $('input[name="2_2_checkH"]').prop("checked",false);                                          //헤드checkBox 체크 해제
    }

    if(p==1){
        p="ok";
    }
    else if(p==2){
        p="no";
    }
    else if(p==3){
        p="delete";
    }
    $.ajax({
        url: "/allow/member/read?result="+p,
        type:"POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(perList),
    })

    submit_data();
}

//기업회원가입 승인
let userShape;
let E_perList=[];
let E_perLength;
let alertIndex;
function E_permission_ajax(p){
    E_perList=[];           //배열이 계속 쌓이는걸 방지 (초기화)
                            //체크한 유저목록을 가져와 perList에 담음
    alertIndex=0;           //기업형태를 선택해주세요 알림을 한번 띄워줬다면 더 띄우지 않게하기 위한 참조변수
    E_perLength=$('input[name="2_4_check"]:checked').length;    //체크 수만큼 반복
    for(j=0; j<E_perLength; j++){
        let E_perRemove=($("input[name='2_4_check']").index($('input[name="2_4_check"]:checked')));            //회원가입승인 전체 체크중 체크된것들의 인덱스의 첫번째 가져옴
        userid=$('.user_list:eq(3) .user_list_body:eq(' + E_perRemove + ') .username').text();                 //아이디값을 읽어옴
        userShape=$('.shapeSelect:eq(' + E_perRemove + ')').val();                                             // 기업형태를 읽어옴
        if(userShape==""){                                                   //기업형태를 선택하지 않았다면 알림,리스트에 추가하지않음
            if(alertIndex==0) {
                alert("기업형태를 선택해주세요");                                                                  //알림을 띄워주지않았다면 띄워주고 띄워줬다면 더 띄우지 않음
                alertIndex = 1;
            }
        }
        else{                                                                                 //기업형태를 선택하였다면 리스트에 추가
            E_perList.push("{user_Id:" + userid + ", shape:" + userShape + "}");                                       //전달할 배열에 값 삽입
        }
        ($('input[name="2_4_check"]').eq(E_perRemove)).prop("checked",false);                                  //해당하는 인덱스의 체크 해제
        $('input[name="2_4_checkH"]').prop("checked",false);                                                   //헤드checkBox 체크 해제
    }

    if(p==1){
        p="ok";
    }
    else if(p==2){
        p="no";
    }
    else if(p==3){
        p="delete"
    }

    $.ajax({
        url: "/allow/member/read?result=["+p+"]",
        type:"POST",
        data: E_perList
    })

    submit_data();

}