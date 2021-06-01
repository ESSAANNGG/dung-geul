//상담관리 전용 js파일

function consult(){
    parameter="/admin/admin_consult";
}

function consult_guide(){
    switch (guide_val) {
        case "상담관리" : parameter="/admin/admin_consult";
            break;
        case "상담사" : parameter="/admin/admin_consult";
            break;
        case "상담등록" : parameter="/admin/admin_consult_Reg";
            break;
    }
}

let consult_num;
function consult_list() {
    consult_num = $('.list:eq(' + ListNum + ') .list_body:eq(' + checked + ') .number').text();                        //목록번호를 읽어옴
    dataList.push(consult_num);
}

function consult_list_send(){

    // $.ajax({
    //     url: "",
    //     type: "POST",
    //     contentType: "application/json; charset=utf-8",
    //     dataType: "json",
    //     data: JSON.stringify(dataList),
    // })
    

    alert(dataList) //디버깅용
    submit_param();
}





let counsult_type;
let counsult_name;
function consult_register(i){

    if(register_val!="") {
        switch (i) {
            case 0:
                consult_type = register_val;
                break;
            case 1:
                consult_name = register_val;
                break;
        }
    }

    function consult_register_submit() {
        register_list="{type:" + counsult_type + ", name:" + counsult_name + "}";
        $.ajax({
            url: "/admin/admin_consult_Regda",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(register_list)
        }).done(function (){
            location.href = "/admin/admin_consult";
        })
    }
}

function detail_on_consult(num){
    detail_state=1;
    alert(num);//id를 읽어 해당 상담목록 전달
    $.ajax({
        url: "",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify('num: '+num),
    })

    $('#detail_consult').css({"visibility":"visible","opacity":"1"});
    $('#wrap,#admin_header').css("opacity","0.4");
}