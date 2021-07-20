let modify = {
  init: function () {
    $('#submit').on('click', event => {
      event.preventDefault();
      // alert('modify실행');
      let a = document.querySelectorAll('input');
      for (let i = 0; i < a.length; i++) {
        if (a[i].value == '') {
          a[i].disabled = true;
        }
      }

      let b = document.querySelectorAll('select');
      for (let i = 0; i < b.length; i++) {
        if (b[i].value == '') {
          b[i].disabled = true;
        }
      }

      let c = document.querySelectorAll('textarea');
      for (let i = 0; i < c.length; i++) {
        if (c[i].value == '') {
          c[i].disabled = true;
        }
      }
      this.save();
    });
  },

  save: function () {
    let data = $('form#cvForm').serializeObject();

    // 값 확인
    // alert('userdate 전송 ! ' + JSON.stringify(data));
    console.log(JSON.stringify(data));

    // 데이터 전송 ajax
    $.ajax({
      type: 'POST',
      url: '/application/cv/modify',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (result) {
        if (result == 1) {
          alert('이력서 수정이 완료되었습니다.');
          location.href = '/application/cv/read';
        } else {
          alert('이력서 수정을 실패했습니다. 다시 작성해주세요.');
        }
      },
      error: function (error) {
        alert('오류 발생, 이력서를 다시 작성해주세요');
        console.log(error);
        // alert(error);
        location.href = '#';
      },
    });
  }, // save() end
};

modify.init();