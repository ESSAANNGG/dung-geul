$(document).ready(function (e) {
    board_num=$('#num').text().split("_")[1];
    $.ajax({
        url: "/center-information/detail/read?board_num=" + board_num,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (boardDTO) {

            // console.log(gFilePath)
            $('input[name=board_file]').val(boardDTO.board_file);
            $('input[name=file_name]').val(boardDTO.file_name);
            // fileLink = boardDTO.board_file;
            // fileLink = fileLink.split("C:")[1];
            // console.log(fileLink);
            // $("#download").attr("href", fileLink);
            // $("#download").attr("href", "/upload/986c3da1-bf5c-4fe4-b300-b9bf4d4f6994_1.IDE.pdf");
            fileLink=boardDTO.board_file;
            fileLink=fileLink.split("C:")[1];
            $("#download").attr("href",fileLink);
        },
        error: function (error) {
            alert("게시판 로딩에 실패했습니다");
            console.log(error);
        }
    })
});