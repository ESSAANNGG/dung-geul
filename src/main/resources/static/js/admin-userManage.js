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

//삭제,승인,거절시 ajax로 데이터 전달

let userid; //userid값을 하나하나 담음
let userShape; //기업형태
let alertShape;  //기업형태를 입력하였는지에 대한 참조변수

    function userManage_list() {
        userid = $('.list:eq(' + ListNum + ') .list_body:eq(' + checked + ') .username').text();                        //아이디값을 읽어옴

        if (ListId == "main2_user" || p=="no") {                                                             //일반회원이거나 기업형태가 필요없는 기업리스트의 삭제는 바로 값을 담음
            dataList.push(userid);
        } else if (ListId == "main2_corp" && p=="ok") {                                                      //기업회원중 기업인증할때만 shape가 필요 LISTNUM 2는 기업회원 리스트 3은 기업회원 인증리스트
            userShape = $('.shapeSelect:eq(' + checked + ')').val();                                            //기업형태를 읽어옴
            if (userShape == "") {                                                                              //기업형태를 선택하지 않았다면 알림,리스트에 추가하지않음
                if (alertShape == 0) {
                    alert("기업형태를 선택해주세요");                                                               //알림을 띄워주지않았다면 띄워주고 띄워줬다면 더 띄우지 않음
                    alertShape = 1;
                }
            } else {                                                                                            //기업형태를 선택하였다면 리스트에 추가
                let obj=new Object();
                obj.user_id=userid;
                obj.shape=userShape;
                dataList.push(obj);                             //전달할 배열에 값 삽입
            }
        }
}

function userManage_list_send(){

    if(ListId == "main2_user"){
        A_url="/allow/member/read?result=" + p;
    }
    else if(ListId == "main2_corp" &&p=="no"){
        A_url="/allow/etp/delete?result=" + p;
    }
    else if(ListId == "main2_corp" && p == "ok"){
        A_url="/allow/etp/read?result=" + p;
    }

    $.ajax({
        url: A_url,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(dataList),
        success : function (result){
            alert("회원정보 변경 성공");
            submit_param();
        },
        error : function (err) {
            alert("err : " + err);
        }
    })
}

function userManage_search(i){

        if(search_val!=""){                                                 //input값이 있다면 파라미터를 설정

            if(select_search=="main2_search") {
                switch (i) {
                    case 0: //권한은 타입이 기본적으로 type=UNIV로 설정되어있음 그래서 문자열함수로 기존파라미터에서 변경
                        parameter = parameter.replace("&type=UNIV", "");
                        search_val = "&type=" + search_val;
                        break;
                    case 1:
                        search_val = "&name=" + search_val;
                        break;
                    case 2:
                        search_val = "&id=" + search_val;
                        break;
                    case 3:
                        search_val = "&startDate=" + search_val;
                        break;
                    case 4:
                        search_val = "&endDate=" + search_val;
                        break;
                }
            }
            else if(select_search=="main2_corp_search"){
                switch (i) {
                    case 0: //권한은 타입이 기본적으로 type=UNIV로 설정되어있음 그래서 문자열함수로 기존파라미터에서 변경
                        search_val = "&name=" + search_val;
                        break;
                    case 1:
                        search_val = "&id=" + search_val;
                        break;
                    case 2:
                        search_val = "&shape=" + search_val;
                        break;
                    case 3:
                        search_val = "&startDate=" + search_val;
                        break;
                    case 4:
                        search_val = "&endDate=" + search_val;
                        break;
                }
            }

            if(search_parameter==undefined){
                search_parameter=search_val;
            }
            else {
                search_parameter = search_parameter + search_val;
            }
        }
}

let detail_per;         //어떤 권한의 사용자인지 확인하는 변수 0=학생 1=교직원 2=상담사 3=기업
function detail_on_userManage(id,roll){
    detail_state=1;

    $.ajax({
        url: "/allow/detail/read?user_id="+id+"&type="+roll,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify('id: '+id),
        success : function (MemberDTO) {
            M=MemberDTO;
            $('input[name=이름]').val(M.user_name);
            $('input[name=아이디]').val(M.user_id);
            $('input[name=비밀번호]').val(M.user_pw);
            $('input[name=전화번호]').val(M.user_ph+"-"+M.user_ph2+"-"+M.user_ph3);
            $('input[name=우편번호]').val(M.user_postcode);
            $('input[name=주소]').val(M.user_addr+" "+M.user_addr_details);
            $('input[name=이메일]').val(M.user_email+"@"+M.user_emailDomain);
            $('input[name=가입일]').val(M.regDate);
            $('input[name=소속]').val(M.user_dept+" "+M.user_grade+M.user_class);

            //기업
            $('input[name=기업명]').val(M.etp_name);
            $('input[name=사업자번호]').val(M.etp_num);
            $('input[name=대표자명]').val(M.etp_ceo_name);
            $('input[name=대표번호]').val(M.etp_ph+"-"+M.etp_ph2+"-"+M.etp_ph3);
            $('input[name=팩스]').val(M.etp_fx);
            $('input[name=홈페이지]').val(M.etp_home);
            $('input[name=주요사업내용]').val(M.etp_contents);
            $('input[name=설립년도]').val(M.etp_year);
            $('input[name=직원수]').val(M.etp_member);
            $('input[name=업종]').val(M.etp_sector);
            $('input[name=기업형태]').val(M.etp_shape);
            $('input[name=담당자연락처]').val(M.user_ph+"-"+M.user_ph2+"-"+M.user_ph3);
            $('input[name=담당자이메일]').val(M.user_email+"@"+M.user_emailDomain);
        },
        error : function (error){
            alert("상세정보 로딩에 실패했습니다");
            console.log(error);
        }
    })

    switch (roll) {
        case 'STUDENT': detail_per="detail_student";
            break;
        case 'STAFF': detail_per="detail_staff";
            break;
        case 'COUNSELOR': detail_per="detail_counselor";
            break;
        case 'ENTERPRISE' : detail_per="detail_enterprise";
            break;
    }
    $('#'+detail_per).css({"visibility":"visible","opacity":"1"});
    $('#wrap,#admin_header').css("opacity","0.4");
}
function userManage_detail_submit(select_modal){
    conF=confirm('해당 회원을 삭제하시겠습니까?');
    if(conF==true) {
        modal_val = [];
        modal_val.push($('#' + select_modal).find('input[name="아이디"]').val());
        switch (select_modal) {
            case 'detail_student':
            case 'detail_counselor':
                A_url = "/allow/member/read?result=no";
                break;
            case 'detail_enterprise':
                A_url = "/allow/etp/delete?result=no";
                break;
        }
    }

    $.ajax({
        url: A_url,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(modal_val),
        success : function (result){
            alert("처리되었습니다.");
            submit_param();
        },
        error : function (err) {
            alert("처리에 실패했습니다.");
        }
    })
}

let datea=[];
let ran;
$(document).ready(function() {
    for (i = 0; i < 12; i++) {
        ran = Math.floor(Math.random() * 200) + 1;
        datea.push(ran);
    }

    Highcharts.chart('container', {
        title: {
            text: 'Combination chart'
        },
        xAxis: {
            categories: ['2021', '2020']
        },
        labels: {
            items: [{
                html: 'Total fruit consumption',
                style: {
                    left: '50px',
                    top: '18px',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'black'
                }
            }]
        },
        series: [{
            type: 'column',
            name: '컴퓨터정보계열',
            data: [211, 42]
        }, {
            type: 'column',
            name: '컴퓨터응용기계계열',
            data: [312, 600]
        }, {
            type: 'column',
            name: 'ICT반도체전자계열',
            data: [23, 43]
        },{
            type: 'column',
            name: '신재생에너지계열',
            data: [222, 322]
        },{
            type: 'column',
            name: '건축인테리어디자인계열',
            data: [200, 319]
        },{
            type: 'column',
            name: '부사관계열',
            data: [294, 102]
        },{
            type: 'column',
            name: '콘텐츠디자인과',
            data: [22, 33]
        },{
            type: 'column',
            name: '드론항공전자과',
            data: [24, 377]
        },{
            type: 'column',
            name: '경영회계서비스계열',
            data: [312, 702]
        },{
            type: 'column',
            name: '호텔항공관광계열',
            data: [44, 33]
        },{
            type: 'column',
            name: '사회복지과',
            data: [44, 33]
        },{
            type: 'column',
            name: '유아교육과',
            data: [44, 33]
        },{
            type: 'column',
            name: '보건의료행정과',
            data: [44, 33]
        },{
            type: 'column',
            name: '간호과',
            data: [44, 33]
        }, {
            type: 'spline',
            name: 'Average',
            data: [333, 255.4],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }
        }, {
            type: 'pie',
            name: 'Total consumption',
            data: [{
                name: '2021',
                y: 13,
                color: Highcharts.getOptions().colors[0] // Jane's color
            }, {
                name: '2020',
                y: 23,
                color: Highcharts.getOptions().colors[1] // John's color
            }],
            center: [100, 80],
            size: 100,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }]
    });
    // Highcharts.chart('container', {
    //
    //     xAxis: {
    //         accessibility: {
    //             rangeDescription: 'Range: 1 to 2'
    //         }
    //     },
    //
    //     legend: {
    //         layout: 'vertical',
    //         align: 'right',
    //         verticalAlign: 'middle'
    //     },
    //
    //     plotOptions: {
    //         series: {
    //             label: {
    //                 connectorAllowed: false
    //             },
    //             pointStart: 1
    //         }
    //     },
    //
    //     series: [{
    //         name: '2020',
    //         data: [datea[0],datea[1],datea[2],datea[3],datea[4],datea[5],datea[6],datea[7],datea[8],datea[9],datea[10],datea[11],datea[12],]
    //     }, {
    //         name: '2021',
    //         data: [122, 23, 55, 233, 22, 88, 112, 12,22,33,44,55]
    //     }],
    //
    //     responsive: {
    //         rules: [{
    //             condition: {
    //                 maxWidth: 500
    //             },
    //             chartOptions: {
    //                 legend: {
    //                     layout: 'horizontal',
    //                     align: 'center',
    //                     verticalAlign: 'bottom'
    //                 }
    //             }
    //         }]
    //     }
    // });
})