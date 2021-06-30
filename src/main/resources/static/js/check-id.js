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


$(".ph_num").on("keyup", function() {
    $(this).val($(this).val().replace(/[^0-9]/g,""));
    if($(this).val().length==4){
        this_index=$(".ph_num").index(this);
        next_index=this_index+1;
        if(next_index!=2) {
            $(".ph_num").eq(next_index).focus();
        }
    }
});


check.init();
