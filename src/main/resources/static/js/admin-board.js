//게시판관리 전용 js파일

function board(){
    parameter="/admin/admin_board";
}

function board_guide(){
    switch (guide_val) {
        case "미구현" : parameter="/admin/admin_board";
            break;
    }
}

function board_search(i){
    alert("board");
}

function detail_on_board(board_num){
    detail_state=1;

    if(board_num!=undefined){
        $('#detail_board_read').css({"visibility":"visible","opacity":"1"});
        $('#wrap,#admin_header').css("opacity","0.4");
        //값 넣는 코드
    }
    else if(board_num==undefined){
        $('#detail_board_register').css({"visibility":"visible","opacity":"1"});
        $('#wrap,#admin_header').css("opacity","0.4");
    }

    //값 초기화 코드
}