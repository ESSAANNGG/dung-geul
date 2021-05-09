//유저관리 전용 js파일

//검색 값이 들어갔을시 css
$('.user_search select').change(function(){     //검색창의 select에 값을 넣을시
    search_color(this);
});
$('.user_search input').keyup(function (){     //검색창의 input에 값을 넣을시
    search_color(this);
})
    // $('.user_search input').change(function (){     //검색창의 input에 값을 넣을시(날짜)
    //     search_color(this);
    // })
function search_color(a){
    if(a.value!=""){
        a.style.backgroundColor="#ffffff";
    }
    else{
        a.style.backgroundColor="#c2c9db";
    }
}

//가입/요청일자
let date_range=document.getElementsByClassName('user_search_date');
function search_date(main_num,date_select){
    let now=new Date();
    let week=new Date();
    let month=new Date();
    let enter=new Date(1);  //파라미터를 한개만 전송하면 1970년도로 자동설정
    let dateVar;
    week.setDate(now.getDate()-7);
    month.setMonth(now.getMonth()-1);

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
    if(main_num=="main2_user") {
        date_range[0].value = dateVar.toISOString().substring(0, 10);
        date_range[1].value = now.toISOString().substring(0, 10);
        date_range[0].style.backgroundColor="#ffffff";
        date_range[1].style.backgroundColor="#ffffff";
    }
    else if(main_num=="main2_corp"){
        date_range[2].value = dateVar.toISOString().substring(0, 10);
        date_range[3].value = now.toISOString().substring(0, 10);
        date_range[2].style.backgroundColor="#ffffff";
        date_range[3].style.backgroundColor="#ffffff";
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