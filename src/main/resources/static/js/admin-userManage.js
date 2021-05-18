//유저관리 전용 js파일



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



// let datea=[];
// let ran;
// $(document).ready(function(){
//     for (i = 0; i < 12; i++) {
//         ran = Math.floor(Math.random() * 100) + 1;
//         datea.push(ran);
//     }
//
//     Highcharts.chart('container', {
//         chart: {
//             type: 'line'
//         },
//         title: {
//             text: ''
//         },
//         subtitle: {
//             text: ''
//         },
//         xAxis: {
//             categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
//         },
//         yAxis: {
//             title: {
//                 text: '가입자 수(명)'
//             }
//         },
//         plotOptions: {
//             line: {
//                 dataLabels: {
//                     enabled: true
//                 },
//                 enableMouseTracking: false
//             }
//         },
//         series: [{
//             name: '2021년',
//             data: datea
//         }, {
//             name: '2020년',
//             data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
//         }, {
//             name: '2019년',
//             data: [10,20,30,40,50,60,70,80,90,100,11,16]
//         }
//         ]
//     });
// })
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