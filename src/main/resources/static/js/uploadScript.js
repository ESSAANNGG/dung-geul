$(document).ready(function (e) {

//var regex = new RegExp("(.*?)\.(exe|sh|zip|alz|tiff)$"); // 파일 업로드 시 이미지 파일만 업로드 할 수 있도록(차 후 필요시 수정 * 단 스크립트 파일 등은 막을 것 *)
var maxSize = 10485760; //10MB

function checkExtension(fileName, fileSize) {

    if (fileSize >= maxSize) {
    alert("파일 사이즈 초과");
    return false;
    }

    // if (regex.test(fileName)) { // 파일 확장자 검사
    //     alert("해당 종류의 파일은 업로드할 수 없습니다.");
    //     return false;
    // }
    return true;
}

$(".custom-file-input").on("change", function () {

    console.log("파일 업로드 함수 동작")  // 테스트용 (나중에 지울 것)

    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);

    var formData = new FormData();

    var inputFile = $(this);

    var files = inputFile[0].files;

    var appended = false;

    for (var i = 0; i < files.length; i++) {

    if (!checkExtension(files[i].name, files[i].size)) {
        return false;
    }

    console.log(files[i]);
    formData.append("uploadFiles", files[i]);
    appended = true;
    }

    //upload를 하지 않는다.
    if (!appended) {
    return;
    }

    for (var value of formData.values()) {
    console.log(value);
    }

    //실제 업로드 부분
    //upload ajax
    $.ajax({
    url: '/uploadAjax',
    processData: false,
    contentType: false,
    data: formData,
    type: 'POST',
    dataType: 'json',
    success: function (result) {
        // 파일 경로(result) -> entity
        // result : string
        var gFilePath = result; //  
        $('input[name=board_file]').val(gFilePath);   // 파일 경로를 input 태그의 name=board_file에 저장

        // var gFilePath = result;
        console.log("result : " +  typeof result);
        console.log("file path : " + result)



        showResult(result);
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
    }
    }); //$.ajax
}); //end change event




    $("#em_file").on("change", function () {

        console.log("파일 업로드 함수 동작")  // 테스트용 (나중에 지울 것)

        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);

        var formData = new FormData();

        var inputFile = $(this);

        var files = inputFile[0].files;

        var appended = false;

        for (var i = 0; i < files.length; i++) {

            if (!checkExtension(files[i].name, files[i].size)) {
                return false;
            }

            console.log(files[i]);
            formData.append("uploadFiles", files[i]);
            appended = true;
        }

        //upload를 하지 않는다.
        if (!appended) {
            return;
        }

        for (var value of formData.values()) {
            console.log(value);
        }

        //실제 업로드 부분
        //upload ajax
        $.ajax({
            url: '/uploadAjax',
            processData: false,
            contentType: false,
            data: formData,
            type: 'POST',
            dataType: 'json',
            success: function (result) {

                // 파일 경로(result) -> entity
                // result : string
                var gFilePath = result; //
                $('#fileName1').val(gFilePath);   // 파일 경로를 input 태그의 name=board_file에 저장

                // var gFilePath = result;
                console.log("result : " +  typeof result);
                console.log("file path : " + result)



                showResult(result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        }); //$.ajax
    }); //end change event


// function showResult(uploadResultArr) {
//
//     var uploadUL = $(".uploadResult ul");
//
//     var str = "";
//
//     $(uploadResultArr).each(function (i, obj) {
//
//         str += "<li data-name='" + obj.fileName + "' data-path='" + obj.folderPath +
//             "' data-uuid='" + obj.uuid + "'>";
//         str + " <div>";
//         str += "<button type='button' data-file=\'" + obj.imageURL + "\' "
//         str += "class='btn-warning btn-sm'>X</button><br>";
//         str += "<img src='/display?fileName=" + obj.thumbnailURL + "'>";
//         str += "</div>";
//         str + "</li>";
//     });
//
//     uploadUL.append(str);
// }

// $(".uploadResult ").on("click", "li button", function (e) {
//
//     console.log("delete file");
//
//     var targetFile = $(this).data("file");
//
//     var targetLi = $(this).closest("li");
//
//     $.ajax({    // 파일 삭제
//         url: '/removeFile',
//         data: {
//             fileName: targetFile
//         },
//         dataType: 'text',
//         type: 'POST',
//         success: function (result) {
//             alert(result);
//
//             targetLi.remove();
//         }
//     }); //$.ajax
// });


//prevent submit
// $(".btn-primary").on("click", function (e) {
//     e.preventDefault();
//
//     var str = "";
//
//     $(".uploadResult li").each(function (i, obj) {
//         var target = $(obj);
//
//         str += "<input type='hidden' name='imageDTOList[" + i +
//             "].imgName' value='" + target.data('name') + "'>";
//
//         str += "<input type='hidden' name='imageDTOList[" + i +
//             "].path' value='" + target.data('path') + "'>";
//
//         str += "<input type='hidden' name='imageDTOList[" + i +
//             "].uuid' value='" + target.data('uuid') + "'>";
//
//     });
//
//     //태그들이 추가된 것을 확인한 후에 comment를 제거
//     $(".box").html(str);
//
//     $("form").submit();
//
// });


}); //document ready
