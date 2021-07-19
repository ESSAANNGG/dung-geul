let signUp = {
  init: function () {
    $("#submit").on("click", event => {
      event.preventDefault();
      this.save();
    });
  },

  save: function () {
    let userData = {
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
      user_dept: $('#user_org').val(), //소속 기관
      user_grade: $('#user_pdept').val(), //소속 부서
      user_class: $('#user_team').val(), //소속 팀
      role: $('#role').val(),
    };


    console.log(JSON.stringify(userData));

    if (!userData.user_id) {
      alert('아이디를 입력해주세요');
      $('#user_id').focus();
    } else if (!userData.user_pw) {
      alert('비밀번호를 입력해주세요');
      $('#user_pw').focus();
    } else if (!userData.user_name) {
      alert('이름을 입력해주세요');
      $('#user_name').focus();
    } else if (!(userData.user_email && userData.user_emailDomain)) {
      alert('이메일을 입력해주세요');
      $('#user_email').focus();
    } else if (!(userData.user_ph2 && userData.user_ph3)) {
      alert('휴대폰 번호를 입력해주세요');
      $('#user_ph2').focus();
    } else if (!userData.user_postcode) {
      alert('주소를 입력해주세요');
      $('#user_postcode').focus();
    } else if (!userData.user_org) {
      alert('소속기관을 입력해주세요');
      $('#user_org').focus();
    } else {
      $.ajax({
      type: "POST",
      url: "/sigUp/member",
      data: JSON.stringify(userData),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (result) {
        if (result == 1) {
          alert("회원가입이 완료되었습니다");
          location.href = "/login";
        } else {
          alert("회원가입에 실패했습니다");
          location.href = "/student_sign-up";
        }
      },
      error: function (error) {
        alert("회원가입에 실패했습니다");
        console.log(error);
        location.href = "/mypage/member/read";
      },
    });
    }
  },
};

signUp.init();
