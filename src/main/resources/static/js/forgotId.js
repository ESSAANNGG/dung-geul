let findID = {
    init: function () {
        console.log("로드 성공");
        $("#findIdBtn").on("click", () => {
            console.log("findId() 실행");
            this.findId(1);
        });
        $("#findphoneBtn").on("click", () => {
            console.log("findId() 실행");
            this.findId(2);
        });
    },

    findId: function (num) {
        if (num == 1) {
            let userData = {
                user_name: $('#find_id_name').val(),
                user_email: $('#find_id_email').val()
            };

            console.log(JSON.stringify(userData));

            $.ajax({
                type: "post",
                url: "/forgot/id",
                data: JSON.stringify(userData),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {

                    console.log('result : ' + result.user_id);
                    // alert(result);
                    if (result == '0') {
                        alert("회원정보 찾기에 실패했습니다.\n이름과 이메일을 다시 확인해주세요.");
                    } else {
                        alert("당신의 아이디는" + result.user_id);
                        location.href = "/login";
                    }
                },
                error: function (err) {
                    console.log(err);
                    // alert(err);
                    alert("오류 발생.\n이름과 이메일을 다시 확인해주세요.");
                }
            })
        }
        else if (num == 2) {
            let userData = {
                user_name: $('#find_phone_id').val(),
                user_phone: $('#find_phone').val()
            };

            console.log(JSON.stringify(userData));

            // $.ajax({
            //     type: "post",
            //     url: "/forgot/id",
            //     data: JSON.stringify(userData),
            //     contentType: "application/json; charset=utf-8",
            //     dataType: "json",
            //     success: function (result) {
            //
            //         console.log('result : ' + result.user_id);
            //         alert(result);
            //         if (result == '0') {
            //             alert("회원정보 찾기에 실패했습니다.\n이름과 이메일을 다시 확인해주세요.");
            //         } else {
            //             alert("당신의 아이디는" + result.user_id);
            //             location.href = "/login";
            //         }
            //     },
            //     error: function (err) {
            //         console.log(err);
            //         alert(err);
            //         alert("오류 발생.\n이름과 이메일을 다시 확인해주세요.");
            //     }
            // })
        }
    }
}

findID.init();


function one_on(){
    $('.one_box').css('display','block');
    $('.two_box').css('display','none');
    $('.o_tag').css('color','#21209c');
    $('.t_tag').css('color','#000');
    $('.o_tag').css('border-bottom','1px solid #21209c');
    $('.t_tag').css('border-bottom','1px solid #dddddd');
}
function two_on(){
    $('.one_box').css('display','none');
    $('.two_box').css('display','block');
    $('.o_tag').css('color','#000');
    $('.t_tag').css('color','#21209c');
    $('.t_tag').css('border-bottom','1px solid #21209c');
    $('.o_tag').css('border-bottom','1px solid #dddddd');

}

window.onload = function () {
    $('.two_box').css('display','none');
    $('.o_tag').css('color','#21209c');
    $('.o_tag').css('border-bottom','1px solid #21209c');
}