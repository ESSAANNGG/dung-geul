let signUp = {
  init: function () {
    $("#submit").on("click", () => {
      alert("saveStudent 실행");
      this.saveCounselor();
    });
  },

  saveCounselor: function () {
    let userData = {
      user_id: $('#user_id').val(),
      user_pw: $('#user_pw').val(),
      user_name: $('#user_name').val(),
      user_email: $('#user_email').val(),
      user_emailDomain: $('#user_emailDomain').val(),
      user_ph: $('#user_ph').val(),
      user_ph2: $('#user_ph2').val(),
      user_ph3: $('#user_ph3').val(),
      user_postcode: $('#postcode').val(),
      user_addr: $('#user_addr').val(),
      user_addr_details: $('#user_addr_details').val(),
      role: $('#role').val(),
    };

    alert("userdate 전송 ! " + JSON.stringify(userData));
    console.log(JSON.stringify(userData));
    alert(JSON.stringify(userData));

    $.ajax({
      type: "POST",
      url: "/sigUp/counselor",
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
