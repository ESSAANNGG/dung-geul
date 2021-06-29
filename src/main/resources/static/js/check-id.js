let check = {
    init: function () {
        // 아이디 중복 체크
        $("#checkId").on("click", (event) => {
            event.preventDefault();
            this.checkId();
        });
    },

    // 아이디 중복체크
    checkId: function () {


        $.ajax({
            type: "get",
            url: "/id-check?user_id=" + $("#user_id").val(),
            success : function (result) {
                let resultText;
                let color;

                if(result==0){
                    resultText = "사용가능한 아이디입니다.";
                    color = "green";
                }
                else{
                    resultText = "이미 시용중인 아이디입니다.";
                    color = "red";
                }

                $("#checkIdResult").text(resultText);
                $("#checkIdResult").css("color", color);
            },
            error : function (error){
                console.log(error);
            }

        })
    }
    // checkId() end
};

check.init();
