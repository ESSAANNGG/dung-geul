//지원프로그램 전용 js파일

function supportProgram(){
    parameter="/admin/admin_supportProgram";
}

function supportProgram_guide(){
    switch (guide_val) {
        case "지원프로그램 목록" : parameter="/admin/admin_supportProgram";
            break;
        case "후기관리" : parameter="/admin/admin_supportProgram";
            break;
    }
}