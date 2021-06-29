let modify = {
    init: function () {
        $("#submit").on("click", (event) => {
            event.preventDefault();
            this.modifyBtnPwFn();
        });
    },

    modifyBtnPwFn: function () {
        let userData = {
            user_id: $("#user_id").val(),
            user_pw_old: $("#user_pw_old").val(),
            user_pw_new: $("#user_pw_new").val()
        };

        console.log(JSON.stringify(userData));

        $.ajax({
            type: "post",
            url: "/mypage/member/modifyPw",
            data: JSON.stringify(userData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result){
                console.log(result);

                // result - 현재 비밀번호 다름 : 0,  성공 : 1

                if (result == 0) {
                    alert("현재 비밀번호를 확인해주세요");
                    location.replace("/mypage/before/modify");
                } else {
                    alert("비밀번호가 변경되었습니다");
                    location.replace("/mypage/before/modify");
                }
            }
        })


    }
}

modify.init();