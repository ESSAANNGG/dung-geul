let modify = {
    init: function () {
        $("#modifyMember").on("click", (event) => {
            event.preventDefault();
            alert("modifyMember 실행");
            this.modifyEnterpriseFn();
        });
    },

    modifyEnterpriseFn: function () {
        let userData = {
            user_id: $("#user_id").val(),
            user_name: $("#user_name").val(),
            user_email: $("#user_email").val(),
            user_ph: $("#user_ph").val(),
            user_postcode: $("#user_postcode").val(),
            user_addr: $("#user_addr").val(),
            user_addr_details: $("#user_addr_details").val(),
            etp_num : $("#etp_num").val(),
            etp_name : $("#etp_name").val(),
            etp_ceo_name : $("#etp_ceo_name").val(),
            etp_member : $("#etp_member").val(),
            etp_home : $("#etp_home").val(),
            etp_sector : $("#etp_sector").val(),
            etp_shape : $("#etp_shape").val(),
            etp_contents : $("#etp_contents").val(),
            etp_fx : $("#etp_fx").val(),
            etp_year : $("#etp_year").val()

        };

        console.log(JSON.stringify(userData));
        alert(JSON.stringify(userData));

        $.ajax({
            type: "post",
            url: "/mypage/etp/modify",
            data: JSON.stringify(userData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success : function (result) {

                console.log(result);

                if(result == 1){
                    alert("수정 성공");
                    location.href = "/mypage/etp/read";
                }
            },
            error : function (){
                alert('정보수정 실패');
            }

        })
    }
}

modify.init();
