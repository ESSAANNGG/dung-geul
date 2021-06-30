$(document).ready(function () {
  //자격증 등록
  $('#licenseReg').on('click', function () {
    if($('select[name=lic_type]').val()==""||)
          $('#licenseName').val()
          $('#licenseDate').val()
          $('#licenseEndDate').val()
    let data = {
      user_id: $('#member_id').val(),
      licenseName: $('#licenseName').val(),
      licenseDate: $('#licenseDate').val(),
      licenseEndDate: $('#licenseEndDate').val(),
    };
    console.log(data);
    $.ajax({
      data: JSON.stringify(data), //서버로 보낼 데이터입니다. HTTP 메소드가 GET과 같은 엔티티 본문을 가질 수없는 메소드 인 경우 데이터가 URL에 추가됩니다.
      method: 'POST', // method (default: 'GET'), 요청에 사용할 HTTP 메소드 (예 : "POST", "GET", "PUT").
      //type : 'POST' 메서드의 별칭입니다. 1.9.0 이전의 jQuery 버전을 사용하는 경우 type을 사용해야합니다.
      url: '/license/list', //url: 요청이 전송되는 URL이 포함 된 문자열입니다.
      contentType: 'application/json; charset=utf-8',
      // dataType (default: Intelligent Guess (xml, json, script, or html))  // JSON : 응답을 JSON으로 평가하고 JavaScript 객체를 반환합니다
    })
      .done(function () {
        location.href = '/license/list';
      })
      .fail(function (error) {
        alert(JSON.stringify(error));
      });
  });


  // 자격증 수정
  $('#licenseSave').on('click', function () {
    let data = {
      num: $('#Intro_num').val(),
      user_id: $('#member_id').val(),
      licenseName: $('#licenseName').val(),
      licenseDate: $('#licenseDate').val(),
      licenseEndDate: $('#licenseEndDate').val(),
    };

    console.log(data);
    $.ajax({
      url: '/lic/licSave',
      method: 'put',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8,',
    })
      .done(function () {
        location.href = '/license/list';
      })
      .fail(function (error) {
        alert(JSON.stringify(error));
      });
  });
});
