let signUp = {
  init: function () {
    // 회원가입
    $('#submit').on('click', event => {
      event.preventDefault();
      this.save();
    });
  },

  save: function () {
    // 회원별 값 다르게 받기
    // 기본적으로 모든 회원이 다 받는 데이터
    let data = {
      user_id: $('#user_id').val(),
      user_pw: $('#user_pw').val(),
      user_name: $('#user_name').val(),
      user_email: $('#user_email').val(),
      user_emailDomain: $('#user_emailDomain').val(),
      user_ph: $('#user_ph').val(),
      user_ph2: $('#user_ph2').val(),
      user_ph3: $('#user_ph3').val(),
      user_postcode: $('#user_postcode').val(),
      user_addr: $('#user_addr').val(),
      user_addr_details: $('#user_addr_details').val(),
      role: $('#role').val(),
    };

    if ($('#role').val() == 'STUDENT' || $('#role').val() == 'STAFF') {
      // 학생이나 교사면 값 추가함 !
      console.log('student or staff');

      data.user_dept = $('#user_dept').val(); //계열
      data.user_grade = $('#user_grade').val(); //계열
      data.user_class = $('#user_class').val(); //계열
    }

    // 값 확인
    console.log(JSON.stringify(data));

    // 데이터 전송 ajax
    if (!data.user_id) {
      alert('아이디를 입력해주세요');
      $('#user_id').focus();
    } else if (!data.user_pw) {
      alert('비밀번호를 입력해주세요');
      $('#user_pw').focus();
    } else if (!data.user_name) {
      alert('이름을 입력해주세요');
      $('#user_name').focus();
    } else if (!(data.user_email && data.user_emailDomain)) {
      alert('이메일을 입력해주세요');
      $('#user_email').focus();
    } else if (!(data.user_ph2 && data.user_ph3)) {
      alert('휴대폰 번호를 입력해주세요');
      $('#user_ph2').focus();
    } else if (!data.user_postcode) {
      alert('주소를 입력해주세요');
      $('#user_postcode').focus();
    } else if (!) {
      alert('계열을 입력해주세요');
      $('#user_dept').focus();
    } else if (!data.user_dept) {
      alert('계열을 입력해주세요');
      $('#user_dept').focus();
    } else {
      $.ajax({
        type: 'POST',
        url: '/sigUp/member',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result) {
          if (result == 1) {
            alert('회원가입이 완료되었습니다');
            location.href = '/login';
          } else {
            alert('회원가입에 실패했습니다');
            location.href = '/';
          }
        },
        error: function (error) {
          alert('회원가입에 실패했습니다');
          console.log(error);
          location.href = '/mypage/member/read';
        },
      });
    }
  }, // save() end
};

signUp.init();
