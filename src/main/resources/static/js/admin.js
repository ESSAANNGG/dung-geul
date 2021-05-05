//메뉴 클릭시
let menubox_li=document.getElementsByClassName("menubox_li");

//처음은 맨 윗메뉴를 보여준다
window.onload = function () {
    menubox_li[0].style.backgroundColor="#30384b";
}
//메뉴 클릭시 색상변경
$('.menubox_li').click(function(){
    let menubox_li_index=$(this).index();                           //클래스 순번 받아오기
    $('.menubox_li').attr('style','backgroundColor: #5978b9');      //전체색상 기본색으로 변경
    menubox_li[menubox_li_index].style.backgroundColor="#30384b";   //클릭한 메뉴 색상변경
     
    //menu_title 변경
    let menu_title=document.getElementById("menu_title");
    menu_title.innerHTML=("<h3>"+menubox_li[menubox_li_index].innerText+"</h3>");        //h3태그는 사라져서 innerhtml을 하니 아이콘까지 같이 가져옴 그래서 text+h3태그를 innerhtml로 저장
});




//main2_1&&main2_2 date
//search_date_num가 1==오늘 2==이번주 3==이번달 4==전체
let date_range=document.getElementsByClassName('user_search_date');
function search_date(main_num,date_select){
    let now=new Date();
    let week=new Date();
    let month=new Date();
    let enter=new Date(1);  //파라미터를 한개만 전송하면 1970년도로 자동설정
    week.setDate(now.getDate()-7);
    month.setMonth(now.getMonth()-1);
    if(main_num=="main2_user") {
        switch (date_select) {
            case '오늘':
                date_range[0].value = now.toISOString().substring(0, 10);
                break;
            case '이번주':
                date_range[0].value = week.toISOString().substring(0, 10);
                break;
            case '이번달':
                date_range[0].value = month.toISOString().substring(0, 10);
                break;
            case '전체':
                date_range[0].value = enter.toISOString().substring(0, 10);
        }
        date_range[1].value = now.toISOString().substring(0, 10);
    }
    else if(main_num=="main2_corp"){
        switch (date_select) {
            case '오늘':
                date_range[2].value = now.toISOString().substring(0, 10);
                break;
            case '이번주':
                date_range[2].value = week.toISOString().substring(0, 10);
                break;
            case '이번달':
                date_range[2].value = month.toISOString().substring(0, 10);
                break;
            case '전체':
                date_range[2].value = enter.toISOString().substring(0, 10);
        }
        date_range[3].value = now.toISOString().substring(0, 10);
    }

}


// 회원 상세정보
let non_detail=0;
//.user_list_body안에 있는 체크박스나 select(기업형태)를 클릭했을시 상세정보를 띄우지 않게하기위한 참조변수
let detail_state=0;
//상세정보페이지가 켜져있는지 꺼져있는지 확인하기 위한 참조변수;

$('.user_list_body :checkbox, .shape').click(function(){
    non_detail=1;
})
//체크박스나 select를 클릭하였다면 상세정보를 띄우지않는다.
//non_detail=0이면 상세정보를 띄워줌
$('.user_list_body').click(function(e){
    if(non_detail==1){
        non_detail=0;
        return;
    }
    else if(non_detail==0){
        setTimeout("detail_on()",100);          //settimeout을 하지않으면 detail_state=1이되어 바로 상세정보를 닫아버림
    }
});

function detail_on(){
    $('.detailBox').css({"visibility":"visible","opacity":"1"});
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
        alert(perList);//디버깅 용도
        if(p==1){
            p="승인";
        }
        else if(p==2){
            p="거절";
        }
        $.ajax({
            url: "allow/member/read?user_id=user_id]&result=["+p+"]",
            type:"POST",
            data: {"user_Id" :perList}
    })
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
                        // alert(userShape);
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
                        p="승인";
                     }
                    else if(p==2){
                        p="거절";
                    }

                    $.ajax({
                        url: "allow/member/read?user_id=user_id]&result=["+p+"]",
                        type:"POST",
                        data: {"corp": E_perList}
                    })
                }