let signUp = {
  init: function () {
    $("#submit").on("click", () => {
      this.save();
    });
  },

  save: function () {
    alert("호출");

    let userData = {
      user_id: $("#user_id").val(),
      user_pw: $("#user_pw").val(),
      user_name: $("#user_name").val(),
      user_email: $("#user_email").val(),
      user_ph: $("#user_ph").val(),
      user_postcode: $("#postcode").val(),
      user_addr: $("#user_addr").val(),
      details: $("#details").val(),
      extra_info: $("#extra_info").val(),
      user_department: $("#department").val(),
      user_grade: $("#grade").val(),
      user_class: $("#class").val(),
      user_job: $("#user_job").val(),
      role: $("#role").val(),
    };

    console.log(userData);

    $.ajax({
      type: "POST",
      url: "/signUp/member",
      data: JSON.stringify(userData),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    })
      .done(function (response) {
        alert("회원가입이 완료되었습니다");

        location.href = "/index";
      })
      .fail(function (err) {
        alert("회원가입을 실패하였습니다.");
        console.log(JSON.stringify(err));
      });
  },
};

index.init();
