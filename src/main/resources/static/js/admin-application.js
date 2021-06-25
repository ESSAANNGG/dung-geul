//채용공고 전용 js파일

function application(){
    parameter="/admin/admin_application";
}

function application_guide(){
    switch (guide_val) {
        case "지원현황" : parameter="/admin/admin_application";
            break;
        case "지원통계" : parameter="/admin/admin_application";
            break;
    }
}