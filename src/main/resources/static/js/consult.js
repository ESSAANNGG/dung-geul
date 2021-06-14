function consult_apply() {
    type=$("select[name=select-field]").val();
    cno=$("select[name=employ-field]").val();
    consult_date=$("input[name=couns-date]").val();
    consult_time=$("select[name=couns-time]").val()
alert(type+cno+consult_date+consult_time);
    if(type==""||cno==""||consult_date==""||consult_time==""){
        alert("값을 제대로 선택해주세요");
    }
    else{

        // alert("신청완료되었습니다");

        alert(consult_date);
        alert(consult_time);
        alert(a);
        consult_time1 = consult_time.substring(0,5);

        let data = {
            type:$("select[name=select-field]").val(),
            cno:$("select[name=employ-field]").val(),
            consult_date:$("input[name=couns-date]").val(),
            consult_time:$("select[name=couns-time]").val(),
            con_user_id:a,
        }
        // consult_time2 = consult_time.substring(6,11);
        // data=[];
        // data.push("{상담분야:" + type + ", 세부분야:" + d_type + ", 상담시간:" + consult_date + " " + consult_time1+ "}");
        // data.push("{상담분야:" + type + ", 세부분야:" + d_type + ", 상담시간:" + consult_date + " " + consult_time2+ "}");
        alert(data);

        $.ajax({
            url: '/counseling/counseling',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(data),
            success : function(data) {
                alert('data 전송 성공'+data);
            },
            error : function() {
                alert('실패');
            }
        })
    }
}