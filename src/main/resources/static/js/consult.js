function consult_apply() {
    type=$("select[name=select-field]").val();
    d_type=$("select[name=employ-field]").val();
    consult_date=$("input[name=couns-date]").val();
    consult_time=$("select[name=couns-time]").val();
    consult_data="{상담분야:" + type + ", 세부분야:" + d_type + ", 상담날짜:" + consult_date + ", 상담시간:" + consult_time+ "}";
    alert(consult_data);

    if(type==""||d_type==""||consult_date==""||consult_time==""){
        alert("값을 제대로 선택해주세요");
    }
    else{
        alert("신청완료되었습니다");
    }
    // $.ajax({
    //     url: "" ,
    //     type: "POST",
    //     contentType: "application/json; charset=utf-8",
    //     dataType: "json",
    //     data: JSON.stringify(consult_data),
    // })

}