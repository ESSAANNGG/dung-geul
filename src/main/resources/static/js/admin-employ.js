//채용공고 전용 js파일

function employ(){
    parameter="/admin/admin_employ";
}

function employ_guide(){
    switch (guide_val) {
        case "공고조회" : parameter="/admin/admin_employ";
            break;
        case "공고관리" : parameter="/admin/admin_employ1";
            break;
        case "미구현" : parameter="/admin/admin_employ";
    }
}