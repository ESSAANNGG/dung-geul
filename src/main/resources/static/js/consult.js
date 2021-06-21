function consult_apply() {
    type=$("select[name=select-field]").val();
    cno=$("select[name=employ-field]").val();
    name=$("select[name=employ-field] option:checked").text();
    consult_date=$("input[name=couns-date]").val();
    consult_time=$("select[name=couns-time]").val()
    if(type==""||cno==""||consult_date==""||consult_time==""){
        alert("값을 제대로 선택해주세요");
    }
    else{

        console.log(consult_date);
        console.log(consult_time);
        console.log(name);
        console.log(a);
        console.log(b);

        consult_time1 = consult_time.substring(0,5);

        let data = {
            type:$("select[name=select-field]").val(),
            cno:$("select[name=employ-field]").val(),
            consult_date:$("input[name=couns-date]").val(),
            consult_time:$("select[name=couns-time]").val(),
            name:name,
            con_user_id:a,
            con_user_name:b
        }

        console.log(data);

        $.ajax({
            url: '/counseling/counseling',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(data),
            success : function(data) {
                let conF=confirm('신청 완료!\n마이페이지에서 바로 확인하시겠습니까?');
                if(conF==true){
                    location.href="/mypage/member/studentcoun";
                }
            },
            error : function() {
                alert('다시 시도해주세요');
            }
        })
    }
}

function division_select(){
    select_index = $("select[name=select-field] option").index( $("select[name=select-field] option:selected"));
    $("select[name=employ-field]").css("display","none");
    if(select_index!=0) {
        $("select[name=employ-field]").eq(select_index - 1).css("display", "inline-block");         //select_index가 0일때 -1을 해버리니 마지막 요소에 css가 적용됨
    }
}