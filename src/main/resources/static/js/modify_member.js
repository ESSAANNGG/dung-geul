let modify = {
    init: function () {
        $("#modifyPwBtn").on("click", () => {
            alert("modifyPwBtn 실행");
            this.modifyBtnPwFn();
        });

        $("#modifyMember").on("click", () => {
            alert("modifyMember 실행");
            this.modifyMemberFn();
        });
    },

    modifyBtnPwFn: function () {
        let userData = {
            user_id: $("#user_id").val(),
            user_pw: $("#user_pw").val()
        };

        console.log(JSON.stringify(userData));
        alert(JSON.stringify(userData));

        $.ajax({
            type: "POST",
            url: "/mypage/member/modifyPw",
            data: JSON.stringify(userData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        }).done(function (response) {
                alert("비밀번호가 변경되었습니다.");

                location.replace(`${response}`);
        }).error(function (err) {
            console.log(err);

            alert("변경 실패");

        })
    },

    modifyMemberFn: function () {
        let userData = {
            user_id: $("#user_id").val(),
            user_name: $("#user_name").val(),
            user_email: $("#user_email").val(),
            user_ph: $("#user_ph").val(),
            user_postcode: $("#postcode").val(),
            user_addr: $("#user_addr").val(),
            user_addr_details: $("#user_addr_details").val(),
            user_dept: $("#user_dept").val(), //계열
            user_grade: $("#user_grade").val(), //학년
            user_class: $("#user_class").val(), //반
        };

        console.log(JSON.stringify(userData));
        alert(JSON.stringify(userData));

        $.ajax({
            type: "POST",
            url: "/mypage/member/modify",
            data: JSON.stringify(userData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        })
            .done(function (response) {
                alert("회원정보 수정이 완료되었습니다");

                location.href = '"'+ response +'"';
            });
    },
};

modify.init();
