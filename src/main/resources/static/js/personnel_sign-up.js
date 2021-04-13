let signUp = {
  init: function () {
    $("#submit").on("click", event => {
      event.preventDefault();
      alert("sign-up.js실행");
      this.save();
    });
  },

  save: function () {
    let userData = {
      user_id: $("#user_id").val(),
      user_pw: $("#user_pw").val(),
      user_name: $("#user_name").val(),
      user_email: $("#user_email").val(),
      user_ph: $("#user_ph").val(),
      user_postcode: $("#user_postcode").val(),
      user_addr: $("#user_addr").val(),
      user_addr_details: $("#user_addr_details").val(),
      user_dept: $("#user_org").val(), //소속 기관
      user_grade: $("#user_pdept").val(), //소속 부서
      user_class: $("#user_team").val(), //소속 팀
      role: $("#role").val(),
    };

    alert("userdate 전송 ! " + JSON.stringify(userData));
    console.log(JSON.stringify(userData));
    alert(JSON.stringify(userData));

    $.ajax({
      type: "POST",
      url: "/sigUp/student",
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
        alert("수정 실패");
        console.log(error);
        location.href = "/mypage/member/read";
      },
    });
  },
};

signUp.init();
