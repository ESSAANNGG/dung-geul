let findID = {
    init: function () {
        alert("로드 성공");
        $("#findIdBtn").on("click", () => {
            alert("findId() 실행");
            this.findId();
        });
    },

    findId: function () {
        let userData = {
            user_name : $('#find_id_name').val(),
            user_email : $('#find_id_email').val()
        };

        console.log(JSON.stringify(userData));
        alert(JSON.stringify(userData));

        $.ajax({
            type: "post",
            url: "/forgot/id",
            data: JSON.stringify(userData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success : function (result) {

                console.log(result);

                if(result =='0'){
                    alert("회원정보 찾기에 실패했습니다.\n이름과 이메일을 다시 확인해주세요.");
                } else{
                    alert("당신의 이메일은" + result);
                    location.href = "/login";
                }

            },
            error : function (err) {
                alert("회원정보 찾기에 실패했습니다.\n이름과 이메일을 다시 확인해주세요.");
            }
        })
    }
}

findID.init();