$(document).ready(function () {

    //채용 글등록 
    $('#emReg').on('click', function () {
        let data = {
            title: $('#em_title').val()
        }
        console.log(data);
        $.ajax({
            data : JSON.stringify(data), //서버로 보낼 데이터입니다. HTTP 메소드가 GET과 같은 엔티티 본문을 가질 수없는 메소드 인 경우 데이터가 URL에 추가됩니다.
            method: 'POST', // method (default: 'GET'), 요청에 사용할 HTTP 메소드 (예 : "POST", "GET", "PUT").
            //type : 'POST' 메서드의 별칭입니다. 1.9.0 이전의 jQuery 버전을 사용하는 경우 type을 사용해야합니다.
            url : '/rest/emReg',  //url: 요청이 전송되는 URL이 포함 된 문자열입니다.
            contentType: 'application/json; charset=utf-8',
            // dataType (default: Intelligent Guess (xml, json, script, or html))  // JSON : 응답을 JSON으로 평가하고 JavaScript 객체를 반환합니다
        }).done(function () {
           location.href = '/Employ/list';
        }).fail(function (error) {
            alert(JSON.stringify(error));
        })
    });
    
    //채용 글 삭제
    $('#emRemove').on('click', function () {

        let num = $('#num').val();
        console.log(num);
        $.ajax({
            url: '/rest/' + num ,
            method: 'delete'
        }).done(function () {
            location.href = '/Employ/list';
        }).fail(function (error) {
            console.log(error);
            alert(JSON.stringify(error));
        })
    });

    $('#emModify').on('click', function () {
        $('#title').attr('readonly',false);
    });

    // 채용 글 수정
    $('#emSave').on('click', function() {

        let data = {
            num : $('#num').val(),
            name : $('#name').val(),
            title: $('#title').val(),
            content : $('#content').val()
        }
        console.log(data);
        $.ajax({
            url : "/rest/emSave",
            method: 'put',
            data : JSON.stringify(data),
            contentType: 'application/json; charset=utf-8,'
        }).done(function () {
            location.href = '/Employ/list';
        }).fail(function (error) {
            alert(JSON.stringify(error));
        })
    });

});

   let stateBtn = document.getElementsByClassName("state"); //0==구직중 1==마감
    function underway(){
        stateBtn[0].style.border="2px solid #2062af";
        stateBtn[0].style.zIndex = 1;
        stateBtn[1].style.border="2px solid #c0c0c4";
        stateBtn[1].style.zIndex = 0;
    }
    function deadline(){
        stateBtn[1].style.border="2px solid #feb522";
        stateBtn[1].style.zIndex = 1;
        stateBtn[0].style.border="2px solid #c0c0c4";
        stateBtn[0].style.zIndex = 0;
    }





    // $('#underway').on('click', function () {
    //     stateBtn[0].style.border="2px solid #2062af";
    //     stateBtn[0].style.zIndex = 1;
    //     stateBtn[1].style.border="2px solid #c0c0c4";
    //     stateBtn[1].style.zIndex = 0;
    // });
    //
    // $('#deadline').on('click', function () {
    //     stateBtn[1].style.border="2px solid #feb522";
    //     stateBtn[1].style.zIndex = 1;
    //     stateBtn[0].style.border="2px solid #c0c0c4";
    //     stateBtn[0].style.zIndex = 0;
    // });
