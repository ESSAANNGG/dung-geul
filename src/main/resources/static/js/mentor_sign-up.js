let signUp = {
  init: function () {
    $("#submit").on("click", () => {
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
      user_postcode: $("#postcode").val(),
      user_addr: $("#user_addr").val(),
      user_addr_details: $("#user_addr_details").val(),
      user_job: $("user_job").val(),
      role: $("#role").val(),
    };

    alert("userdate 전송 ! " + JSON.stringify(userData));
    console.log(JSON.stringify(userData));
    alert(JSON.stringify(userData));

    $.ajax({
      type: "POST",
      url: "/sigUp/mentor",
      data: JSON.stringify(userData),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    })
      .done(function (response) {
        alert("회원가입이 완료되었습니다");

        location.href = "/";
      })
      .fail(function (err) {
        alert("회원가입을 실패하였습니다.");
        console.log(JSON.stringify(err));
      });
  },
};

signUp.init();
