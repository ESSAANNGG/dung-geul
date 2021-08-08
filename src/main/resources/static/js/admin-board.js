//게시판관리 전용 js파일

function board(){
    parameter="/admin/admin_board?";
}

function board_guide(){
    switch (guide_val) {
        case "미구현" : parameter="/admin/admin_board?";
            break;
    }
}

//삭제,승인,거절시 ajax로 데이터 전달

let num; //글번호를 담음
function board_list() {
    num = $('.list:eq(' + ListNum + ') .list_body:eq(' + checked + ') .number').text();                        //글번호값을 읽어옴
    dataList.push(num);                                                                                        //dataList가 빈 배열일시 다음 함수를 수행하지 않음
    $.ajax({
        url: "/center-information/remove_admin?num=" + num,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success : function (result){
            console.log(dataList);
        },
        error : function (err) {
            alert('삭제실패');
            return;
        }
    })
}

function board_list_send(){
    alert("삭제 성공");
    submit_param();
}

function board_search(i){
    if(search_val!=""){                                                 //input값이 있다면 파라미터를 설정

        switch (i) {
            case 0:
                search_val = "&type=t&keyword=" + search_val;
                break;
            case 1:
                // search_val = "&name=" + search_val;
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

function detail_on_board(board_num){
    detail_state=1;


    $('#wrap,#admin_header').css("opacity","0.4");


    if(board_num!=undefined){
        $('#detail_board_read').css({"visibility":"visible","opacity":"1"});
        $.ajax({
            url: "/center-information/detail/read?board_num="+board_num,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success : function (boardDTO) {
                // console.log(gFilePath)
                $('input[name=num]').val(boardDTO.num);
                $('input[name=title]').val(boardDTO.title);
                $('textarea[name=content]').val(boardDTO.content);
                $('input[name=board_file]').val(boardDTO.board_file);
                $('input[name=file_name]').val(boardDTO.file_name);
                $('input[name=type]').val(boardDTO.type);

                if($('input[name=board_file]').val()==""){
                    $('#download').css("display","none");
                }
                else{
                    $('#download').css("display","initial");
                }
                fileLink=boardDTO.board_file;
                fileLink=fileLink.split("C:")[1];
                console.log(fileLink);
                $("#download").attr("href",fileLink);
                $("#download").attr("download",boardDTO.file_name);
                // $("#download").attr("href", "/upload/986c3da1-bf5c-4fe4-b300-b9bf4d4f6994_1.IDE.pdf");

            },
            error : function (error){
                alert("게시판 로딩에 실패했습니다");
                console.log(error);
            }
        })
    }
    else if(board_num==undefined){
        $('#detail_board_register').css({"visibility":"visible","opacity":"1"});
        $('input[name=title]').val("");
        $('textarea[name=content]').val("");
        $('input[name=board_file]').val("");
        $('input[name=file_name]').val("");
        $('input[name=type]').val("");
    }
}
function board_detail_submit(select_modal,t) {
    if ($(t).text() != "Download") {
        conF = confirm('게시글을 ' + $(t).text() + '하시겠습니까?');
        if (conF == true) {
            switch ($(t).text()) {
                case "삭제":
                    modal_val = [];
                    link_val = $('#' + select_modal).find('input[name="num"]').val();
                    modal_val.push(link_val);
                    $.ajax({
                        url: "/center-information/remove_admin?num=" + link_val,
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            alert("게시글 삭제완료");
                            submit_param();
                        },
                        error: function (err) {
                            alert("삭제실패");
                        }
                    })
                    break;
                case "수정":
                    $("button")
                        .attr("type", "submit") //confirm에서 취소 할시에 버튼을 기본 submit형식으로 해놓으면 원치 않은 새로고침이 됨 그래서 수정 할시에만 submit type을 주어 제대로 전송
                    $("form")
                        .attr("action", "/center-information/admin_board_modify")
                        .attr("method", "post")
                        .submit();
                    submit_param();
                    break;
            }
        }
    }
}