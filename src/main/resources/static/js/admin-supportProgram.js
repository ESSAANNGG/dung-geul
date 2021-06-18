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

function division_select(){
    select_index = $("select[name=dept] option").index( $("select[name=dept] option:selected"));
    $("select[name=division]").css("display","none");
    if(select_index!=0) {
        $("select[name=division]").eq(select_index - 1).css("display", "inline-block");         //select_index가 0일때 -1을 해버리니 마지막 요소에 css가 적용됨
    }
}
$('select[name=dept]').change(function(){    //검색창의 select에 값을 넣을시

});