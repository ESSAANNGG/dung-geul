let signUp = {
  init: function () {
    $("#submit").on("click", () => {
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
      etp_name: $("#etp_name").val(),
      etp_num: $("#etp_num").val(),
      etp_ceo_name: $("#etp_ceo_name").val(),
      etp_ph: $("#etp_ph").var(),
      etp_fx: $("#etp_px").val(),
      etp_post: $("#postcode").val(),
      etp_addr: $("#etp_addr").val(),
      etp_detail_addr: $("#etp_detail_addr").val(),
      etp_home: $("#etp_home").val(),
      etp_contents: $("#etp_contents").val(),
      etp_year: $("#etp_year").val(),
      etp_member: $("#etp_member").val(),
      etp_Sector: $("#etp_Sector").val(),
      role: $("#role").val()
    };

    console.log(userData);

    $.ajax({
      type: "POST",
      url: "/sigUp/enterprise",
      data: JSON.stringify(userData),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    })
      .done(function (response) {
        alert("승인 요청 되었습니다.");

        location.href = "/index";
      })
      .fail(function (err) {
        alert("회원가입을 실패하였습니다.");
        console.log(JSON.stringify(err));
      });
  },
};

index.init();
