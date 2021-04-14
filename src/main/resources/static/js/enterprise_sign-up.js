let signUp = {
  init: function () {
    $("#submit").on("click", (event) => {
      event.preventDefault();
      alert("signUp 실행");
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
      etp_ph: $("#etp_ph").val(),
      etp_fx: $("#etp_fx").val(),
      user_postcode: $("#user_postcode").val(),
      user_addr: $("#user_addr").val(),
      user_addr_details: $("#user_addr_details").val(),
      etp_home: $("#etp_home").val(),
      etp_contents: $("#etp_contents").val(),
      etp_year: $("#etp_year").val(),
      etp_member: parseInt($("#etp_member").val()),
      etp_sector: $("#etp_sector").val(),
      role: $("#role").val()  // ENTERPRISE
    };

    console.log(userData);
    alert(userData);

    $.ajax({
      type: "post",
      url: "/sigUp/enterprise",
      data: JSON.stringify(userData),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success : function (result) {
        if(result == 1){
          alert("회원가입 승인 요청 되었습니다.");

          location.href = "/login";
        } else {
          alert("회원가입 신청 실패했습니다");

          location.href = "/";
        }
      },
      error : function (error){
        alert("내부 오류");
        console.log(error);
        location.href = "/";
      }
    })
  },
};

signUp.init();
