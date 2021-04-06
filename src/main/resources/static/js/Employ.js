$(document).ready(function (){

    $('#emReg').on('click',function() {
       let data = {
           title : $('#em_title').val()
       }
       console.log(data);
       $.ajax({
           url: '/rest/emReg', //url: 요청이 전송되는 URL이 포함 된 문자열입니다.
           method : 'post', // method (default: 'GET'), 요청에 사용할 HTTP 메소드 (예 : "POST", "GET", "PUT").
           data: data, //서버로 보낼 데이터입니다. HTTP 메소드가 GET과 같은 엔티티 본문을 가질 수없는 메소드 인 경우 데이터가 URL에 추가됩니다.
           contentType: 'application/json; charset=utf-8',
           dataType: 'json',
           success: function () {
             alert('등록하였습니다.')
               window.location.href='/';
           },
           error: function(error) {
               alert(JSON.stringify(error));
           }
        })
    })

});