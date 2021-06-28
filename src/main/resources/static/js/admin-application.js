//채용공고 전용 js파일

function application(){
    parameter="/admin/admin_application?";
}

function application_guide(){
    switch (guide_val) {
        case "지원현황" : parameter="/admin/admin_application?";
            break;
    }
}

function application_search(i){

    if(search_val!=""){                                                 //input값이 있다면 파라미터를 설정
            switch (i) {
                case 0: //권한은 타입이 기본적으로 type=UNIV로 설정되어있음 그래서 문자열함수로 기존파라미터에서 변경
                    search_val = "&title=" + search_val;
                    break;
                case 1:
                    search_val = "&name=" + search_val;
                    break;
                case 2:
                    search_val = "&shape=" + search_val;
                    break;
                case 3:
                    search_val = "&id=" + search_val;
                    break;
                case 4:
                    search_val = "&pass=" + search_val;
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


function detail_on_application(employ_num){
    detail_state=1;

    alert("통계띄워야함");
    $('#wrap,#admin_header').css("opacity","0.4");

        $('#detail_application').css({"visibility":"visible","opacity":"1"});
}