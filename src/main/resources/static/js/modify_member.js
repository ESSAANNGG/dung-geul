let modify = {
    init: function () {
        $("#modifyMember").on("click", (event) => {
            event.preventDefault();
            alert("modifyMember 실행");
            this.modifyMemberFn();
        });
    },

    modifyMemberFn: function () {
        let userData = {
            user_id: $("#user_id").val(),
            user_name: $("#user_name").val(),
            user_email: $("#user_email").val(),
            user_emailDomain: $("#user_emailDomain").val(),
            user_ph: $("#user_ph").val(),
            user_ph2: $("#user_ph2").val(),
            user_ph3: $("#user_ph3").val(),
            user_postcode: $("#user_postcode").val(),
            user_addr: $("#user_addr").val(),
            user_addr_details: $("#user_addr_details").val(),
            user_dept: $("#user_dept").val(), //계열
            user_grade: $("#user_grade").val(), //학년
            user_class: $("#user_class").val(), //반
        };

        console.log(JSON.stringify(userData));
        alert(JSON.stringify(userData));

        $.ajax({
            type: "post",
            url: "/mypage/member/modify",
            data: JSON.stringify(userData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success : function (result) {

                console.log(result);

                if(result == 1){
                    alert("수정 성공");
                    location.href = "/mypage/member/read";
                }
            }

        })
    }
}

modify.init();
