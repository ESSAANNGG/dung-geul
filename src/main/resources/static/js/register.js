let register = {
  init: function () {
    $('#submit').on('click', event => {
      event.preventDefault();
      // alert('register실행');

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

      for (let i = 0; i < a.length; i++) {
        if (a[i].value == '') {
          a[i].disabled = false;
        }
      }

      for (let i = 0; i < b.length; i++) {
        if (b[i].value == '') {
          b[i].disabled = false;
        }
      }

      for (let i = 0; i < c.length; i++) {
        if (c[i].value == '') {
          c[i].disabled = false;
        }
      }
    });
  },

  save: function () {
    let data = $('form#cvForm').serializeObject();

    // 값 확인
    // https: alert('userdate 전송 ! ' + JSON.stringify(data));
    console.log(JSON.stringify(data));

    if (!$('#user_name').val()) {
      alert('이름을 입력해주세요');
      setTimeout(function () {
        $('#user_name').focus();
      }, 1);
    } else if (!$('#age').val()) {
      alert('연령을 입력해주세요');
      setTimeout(function () {
        $('#age').focus();
      }, 1);
    } else if (!$('#user_email').val()) {
      alert('이메일을 입력해주세요');
      setTimeout(function () {
        $('#user_email').focus();
      }, 1);
    } else if (!$('#birth').val()) {
      alert('생년월일을 입력해주세요');
      setTimeout(function () {
        $('#birth').focus();
      }, 1);
    } else if (!$('#user_hp').val()) {
      alert('전화번호를 입력해주세요');
      setTimeout(function () {
        $('#user_hp').focus();
      }, 1);
    } else if (!$('#user_addr').val()) {
      alert('주소를 입력해주세요');
      setTimeout(function () {
        $('#user_addr').focus();
      }, 1);
    } else if ($('input[name="user_employment"]:checked').val() === '1') {
      const etp_name = document.querySelectorAll('.etp_name');
      const employment = document.querySelectorAll('.employment');
      const resignation = document.querySelectorAll('.resignation');
      const position = document.querySelectorAll('.position');
      for (let i = 0; i < etp_name.length; i++) {
        if (!etp_name[i].value) {
          alert('회사명을 입력해주세요');
          setTimeout(function () {
            etp_name[i].focus();
          }, 1);
        }
      }
    } else {
      // 데이터 전송 ajax
      $.ajax({
        type: 'POST',
        url: '/application/cv/register',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result) {
          alert('이력서 등록이 완료되었습니다.');
          location.href = '/application/cv/read';
        },
        error: function (error) {
          alert('실패, 이력서를 다시 작성해주세요');
          console.log(error);
          // alert(error);
          location.href = '#';
        },
      });
    }
  }, // save() end
};

register.init();
