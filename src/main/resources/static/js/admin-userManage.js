//회원관리 전용 js파일

function userManage(){
    parameter="/admin/admin_userManage?page1=1&page2=1&type=UNIV";
}

function userManage_guide(){
    switch (guide_val) {
        case "회원관리" : parameter="/admin/admin_userManage?page1=1&page2=1&type=UNIV";
            break;
        case "기업관리" : parameter="/admin/admin_userManage?page1=1&page2=1&type=ENTERPRISE";
            break;
        case "가입현황" : parameter="/admin/admin_userManage?page1=1&page2=1&type=UNIV";
    }
}

// 회원 상세정보
let non_detail=0;       //.list_body안에 있는 체크박스나 select(기업형태)를 클릭했을시 상세정보를 띄우지 않게하기위한 참조변수
let detail_state=0;     //상세정보페이지가 켜져있는지 꺼져있는지 확인하기 위한 참조변수;
let detail_per;         //어떤 권한의 사용자인지 확인하는 변수 0=학생 1=교직원 2=상담사 3=기업
$('.list_body :checkbox, select[class=shapeSelect]').click(function(){
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

//삭제,승인,거절시 ajax로 데이터 전달

//회원관리에 필요한 변수
let userid; //userid값을 하나하나 담음
let userShape; //기업형태
let alertShape;  //기업형태를 입력하였는지에 대한 참조변수

    function userManage_list() {

        userid = $('.list:eq(' + ListNum + ') .list_body:eq(' + checked + ') .username').text();                        //아이디값을 읽어옴

        if (ListId == "main2_user") {
            dataList.push(userid);
        } else if (ListId == "main2_corp") {
            alertShape = 0;
            userShape = $('.shapeSelect:eq(' + checked + ')').val();                                            //기업형태를 읽어옴
            if (userShape == "") {                                                                              //기업형태를 선택하지 않았다면 알림,리스트에 추가하지않음
                if (alertShape == 0 && p == "ok") {
                    alert("기업형태를 선택해주세요");                                                               //알림을 띄워주지않았다면 띄워주고 띄워줬다면 더 띄우지 않음
                    alertShape = 1;
                }
            } else {                                                                                            //기업형태를 선택하였다면 리스트에 추가
                dataList.push("{user_Id:" + userid + ", shape:" + userShape + "}");                             //전달할 배열에 값 삽입
            }
        }
}

function userManage_list_send(){

        $.ajax({
            url: "/allow/member/read?result=" + p,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(dataList),
        })

    alert(dataList) //디버깅용
    submit_param();
}

function userManage_search(i){
    search_val=$(select_search).find(".search_data").eq(i).val();           //각 input들의 data를 받아옴(for문 돌리는중)
        if(search_val!=""){                                                 //input값이 있다면 파라미터를 설정
            switch (i){
                case 0: //권한은 타입이 기본적으로 type=UNIV로 설정되어있음 그래서 문자열함수로 기존파라미터에서 변경
                    parameter=parameter.replace("&type=UNIV","");
                    search_val="&type="+search_val;
                    break;
                case 1: search_val="&name="+search_val;
                    break;
                case 2: search_val="&id="+search_val;
                    break;
                case 3: search_val="&startDate="+search_val;
                    break;
                case 4: search_val="&endDate="+search_val;
                    break;
            }

            if(search_parameter==undefined){
                search_parameter=search_val;
            }
            else {
                search_parameter = search_parameter + search_val;
            }
        }
}

let datea=[];
let ran;
$(document).ready(function() {
    for (i = 0; i < 12; i++) {
        ran = Math.floor(Math.random() * 200) + 1;
        datea.push(ran);
    }
    Highcharts.chart('container', {

        xAxis: {
            accessibility: {
                rangeDescription: 'Range: 1 to 2'
            }
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 1
            }
        },

        series: [{
            name: '2020',
            data: [datea[0],datea[1],datea[2],datea[3],datea[4],datea[5],datea[6],datea[7],datea[8],datea[9],datea[10],datea[11],datea[12],]
        }, {
            name: '2021',
            data: [122, 23, 55, 233, 22, 88, 112, 12,22,33,44,55]
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
})