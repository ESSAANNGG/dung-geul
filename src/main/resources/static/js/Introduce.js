$(document).ready(function () {
  //자소서 글등록
  $('#IntroReg').on('click', function () {
    let data = {
      user_id: $('#member_id').val(),
      title: $('#Intro_title').val(),
      content1: $('#first_cont').val(),
      content2: $('#second_cont').val(),
      content3: $('#third_cont').val(),
      content4: $('#forth_cont').val(),
    };
    console.log(data);
    $.ajax({
      data: JSON.stringify(data), //서버로 보낼 데이터입니다. HTTP 메소드가 GET과 같은 엔티티 본문을 가질 수없는 메소드 인 경우 데이터가 URL에 추가됩니다.
      method: 'POST', // method (default: 'GET'), 요청에 사용할 HTTP 메소드 (예 : "POST", "GET", "PUT").
      //type : 'POST' 메서드의 별칭입니다. 1.9.0 이전의 jQuery 버전을 사용하는 경우 type을 사용해야합니다.
      url: '/application/intro/introReg', //url: 요청이 전송되는 URL이 포함 된 문자열입니다.
      contentType: 'application/json; charset=utf-8',
      // dataType (default: Intelligent Guess (xml, json, script, or html))  // JSON : 응답을 JSON으로 평가하고 JavaScript 객체를 반환합니다
    })
      .done(function () {
        location.href = '/application/introduce/list';
      })
      .fail(function (error) {
        alert(JSON.stringify(error));
      });
  });

  //자소서 글 삭제
  $('#IntroRemove').on('click', function () {
    let num = $('#Intro_num').val();
    console.log(num);
    $.ajax({
      url: '/intro/' + num,
      method: 'delete',
    })
      .done(function () {
        location.href = '/application/introduce/list';
      })
      .fail(function (error) {
        console.log(error);
        alert(JSON.stringify(error));
      });
  });

  // 채용 글 수정
  $('#IntroSave').on('click', function () {
    let data = {
      num: $('#Intro_num').val(),
      title: $('#Intro_title').val(),
      content1 : $('#first_cont').val(),
      content2 : $('#second_cont').val(),
      content3 : $('#third_cont').val(),
      content4 : $('#forth_cont').val(),
      user_id: $('#member_id').val(),
    };

    console.log(data);
    $.ajax({
      url: '/application/intro/introSave',
      method: 'put',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8,',
    })
      .done(function () {
        location.href = '/application/introduce/list';
      })
      .fail(function (error) {
        alert(JSON.stringify(error));
      });
  });

  let searchForm = $('#searchForm');

  $('.btn-search').click(function (e) {
    searchForm.submit();
  });

  $('.btn-clear').click(function (e) {
    location.replace('/application/introduce/list');
  });
});
