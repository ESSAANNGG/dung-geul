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
      url: '#',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (result) {
        if (result == 1) {
          alert('성공');
          location.href = '#';
        } else {
          alert('실패');
          location.href = '#';
        }
      },
      error: function (error) {
        alert('테스트');
        console.log(error);
        location.href = '#';
      },
    });
  }, // save() end
};

register.init();
