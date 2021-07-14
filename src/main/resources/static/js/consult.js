function consult_apply() {
    type=$("select[name=select-field]").val();
    cno=$("select[name=employ-field]").val();
    name=$("select[name=employ-field] option:selected").text();
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
    opt_length=$("select[name=dummy] option").length;
    $("select[name=employ-field] option").remove();
    $('select[name=employ-field]').append("<option>상세분야</option>");
    for (i=0; i<opt_length; i++){
        consult_type=$("select[name=dummy] option").eq(i).prop("class");
        consult_cno=$("select[name=dummy] option").eq(i).prop("value");
        consult_name=$("select[name=dummy] option").eq(i).text();
        if(consult_type=="진로 상담" && select_index==1){
            $('select[name=employ-field]').append("<option value='"+consult_cno+"' class='"+consult_type+"'>"+ consult_name +"</option>");
        }
        else if(consult_type=="취업상담" && select_index==2){
            $('select[name=employ-field]').append("<option value='"+consult_cno+"' class='"+consult_type+"'>"+ consult_name +"</option>");
        }
        else if(consult_type=="창업상담" && select_index==3){
            $('select[name=employ-field]').append("<option value='"+consult_cno+"' class='"+consult_type+"'>"+ consult_name +"</option>");
        }

    }
    // switch (select_index) {
    //     case 1:
    //         break;
    //     case 2:
    //         break;
    //     case 3:
    //         break;
    // }
    // consult_type=$("select[name=dummy] option:selected").prop("class");
    // switch (consult_type) {
    //     case "진로 상담": alert("진로");
    //         break;
    //     case "취업 상담": alert("취업");
    //         break;
    //     case "창업 상담": alert("창업");
    //         break;
    // }
    // select_index = $("select[name=select-field] option").index( $("select[name=select-field] option:selected"));
    // $("select[name=employ-field]").css("display","none");
    // if(select_index!=0) {
    //     $("select[name=employ-field]").eq(select_index - 1).css("display", "inline-block");         //select_index가 0일때 -1을 해버리니 마지막 요소에 css가 적용됨
    // }
}