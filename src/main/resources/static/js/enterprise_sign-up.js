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
      user_postcode: $("#postcode").val(),
      user_addr: $("#user_addr").val(),
      user_addr-details: $("#user_addr-details").val(),
      user_addr-extra_info: $("#user_addr-extra_info").val(),
      corp_enterprise: $("#enterprise").val(),
      corp-num: $("#corp_num").val(),
      corp_rep: $("#corp_rep").val(),
      corp_fx: $("#corp_fx").val(),
      corp_home: $("#corp_home").val(),
      corp_contents: $("#corp_contents").val(),
      corp_year: $("#corp_year").val(),
      corp_member: $("#corp_member").val(),
      corp_Sector: $("#corp_Sector").val(),
      role: $("#role").val()
    };

    console.log(userData);

    $.ajax({
      type: "POST",
      url: "/sigUp/enterprise",
      data: JSON.stringify(userData),
      contentType: "application/json; charset=utf-8",
      dataType: "json"
    })
      .done(function (response) {
        alert("회원가입이 완료되었습니다");

        location.href = "/index";
      })
      .fail(function (err) {
        alert("회원가입을 실패하였습니다.");
        console.log(JSON.stringify(err));
      });
   }
}

index.init();
