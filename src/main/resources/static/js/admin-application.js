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
                    search_val = "&startDate=" + search_val;
                    break;
                case 5:
                    search_val = "&endDate=" + search_val;
                    break;
                case 6:
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


function detail_on_application(employ_title){
    detail_state=1;

    result=confirm("해당 공고로 검색하시겠습니까?");
    if (result==true){
        parameter="/admin/admin_application?&title="+employ_title;
        submit_param();
    }
}