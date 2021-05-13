//유저관리 전용 js파일

//검색 값이 들어갔을시 css
$('.search select').change(function(){    //검색창의 select에 값을 넣을시
    search_color(this);
});
$('.search input').keyup(function (){     //검색창의 input에 값을 넣을시
    search_color(this);
})
$('.search input').change(function (){    //검색창의 input에 값을 넣을시
    search_color(this);
})

function search_color(a){
    if(a.value!=""){
        a.style.backgroundColor="#ffffff";
    }
    else{
        a.style.backgroundColor="#c2c9db";
    }
}


// 회원 상세정보
let non_detail=0;       //.user_list_body안에 있는 체크박스나 select(기업형태)를 클릭했을시 상세정보를 띄우지 않게하기위한 참조변수
let detail_state=0;     //상세정보페이지가 켜져있는지 꺼져있는지 확인하기 위한 참조변수;
let detail_per;         //어떤 권한의 사용자인지 확인하는 변수 0=학생 1=교직원 2=상담사 3=기업
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



//회원가입승인 허가,거절 회원삭제

//쓸일생길까봐 주석처리
// $('input[name="2_2_checkH"]').prop("checked",false);                                          //헤드checkBox 체크 해제

let p; //승인,거절,삭제 중 무엇인지 html으로부터 받아옴
let userList=[]; //userid값을 담아넣는 배열
let userid; //userid값을 하나하나 담음
let userLength;
let userChecked;
let userListBody;
let check_name;  //check들의 name
//기업회원에 추가로 필요한 변수
let userShape; //기업형태
let alertIndex;  //기업형태를 입력하였는지에 대한 참조변수

function permission_ajax(user,p){
    userList=[]; //배열이 계속 쌓이는걸 방지 (초기화) , 체크한 유저목록을 가져와 userList에 담음
    alertIndex=0;

    if(user=="회원") {
        if (p == '승인') {
            p = "ok";
            userListBody = 1;
            check_name = '2_2_check';
        } else if (p == '거절') {
            p = "no";
            userListBody = 1;
            check_name = '2_2_check';
        } else if (p == '삭제') {
            p = "no";
            userListBody = 0;
            check_name = '2_1_check';
        }
    }
    else if(user=="기업"){
        if (p == '승인') {
            p = "ok";
            userListBody = 3;
            check_name = '2_4_check';
        } else if (p == '거절') {
            p = "no";
            userListBody = 3;
            check_name = '2_4_check';
        } else if (p == '삭제') {
            p = "no";
            userListBody = 2;
            check_name = '2_3_check';
        }
    }

    userLength=$('input[name=' + check_name + ']:checked').length;    //체크 수만큼 반복

    for(j=0; j<userLength; j++){
        userChecked=($('input[name=' + check_name + ']').index($('input[name=' + check_name + ']:checked')));           //회원가입승인 전체 체크중 체크된것들의 인덱스를 가져옴
        ($('input[name=' + check_name + ']').eq(userChecked)).prop("checked",false);                                    //해당하는 인덱스의 체크 해제 < 이걸 해야 바로 위 문장의 인덱스가 1씩 늘어나서 다음 체크된 것들에 대해 수행할 수 있음
        userid=$('.user_list:eq(' + userListBody + ') .user_list_body:eq(' + userChecked + ') .username').text();       //아이디값을 읽어옴

        //회원이면
        if(user=="회원"){
            userList.push(userid);                                                                                      //전달할 배열에 값 삽입
        }

        //기업이면
        else if(user=="기업"){
            if(p=="ok") {           //승인일때만 기업형태가 필요
                userShape = $('.shapeSelect:eq(' + userChecked + ')').val();                                            //기업형태를 읽어옴
                if (userShape == "") {                                                                                  //기업형태를 선택하지 않았다면 알림,리스트에 추가하지않음
                    if (alertIndex == 0) {
                        alert("기업형태를 선택해주세요");                                                                   //알림을 띄워주지않았다면 띄워주고 띄워줬다면 더 띄우지 않음
                        alertIndex = 1;
                    }
                }
                else{                                                                                                   //기업형태를 선택하였다면 리스트에 추가
                    userList.push("{user_Id:" + userid + ", shape:" + userShape + "}");                                 //전달할 배열에 값 삽입
                }
            }
            else{
                userList.push(userid);
            }
        }
    }

    if(userid!=undefined) { //아무 체크박스도 체크되지 않았을땐 전송하지않음
        if (user == "회원") {
            $.ajax({
                url: "/allow/member/read?result=" + p,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(userList),
            })
        } else if (user == "기업") {
            $.ajax({
                url: "/allow/member/read?result="+p,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(userList),
            })
        }

        alert(userList)
        submit_param();
    }
}



let datea=[];

let ran;
$(document).ready(function(){
    for (i = 0; i < 12; i++) {
        ran = Math.floor(Math.random() * 100) + 1;
        datea.push(ran);
    }

    Highcharts.chart('container', {
        chart: {
            type: 'line'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
        },
        yAxis: {
            title: {
                text: '가입자 수(명)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: '2021년',
            data: datea
        }, {
            name: '2020년',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }, {
            name: '2019년',
            data: [10,20,30,40,50,60,70,80,90,100,11,16]
        }
        ]
    });
})