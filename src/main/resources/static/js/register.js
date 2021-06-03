let register = {
  init: function () {
    $('#submit').on('click', event => {
      event.preventDefault();
      alert('register실행');
      this.save();
    });
  },

  save: function () {
    let data = $('form#cvForm').serializeObject();

    // 값 확인
    https: alert('userdate 전송 ! ' + JSON.stringify(data));
    console.log(JSON.stringify(data));

    // 데이터 전송 ajax
    $.ajax({
      type: 'POST',
      url: '/application/cv/register',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (result) {
       alert( "이력서 등록이 완료되었습니다.");
       location.href = "/application/cv/read";
      },
      error: function (error) {
        alert('실패, 이력서를 다시 작성해주세요');
        console.log(error);
        alert(error);
        location.href = '#';
      },
    });
  }, // save() end
};

register.init();
