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
    }
}

function submit(a){
    let counsult_type;
    let counsult_name;

    counsult_type=$(a).parent("div").parent("div").find("select").val();
    counsult_name=$(a).parent("div").parent("div").find("input[type=text]").val();
    alert(counsult_type);
    alert(counsult_name);
    let counsult_register;
    counsult_register="{type:" + counsult_type + ", name:" + counsult_name + "}";
    alert(counsult_register);
    $.ajax({
        url: "/rest/conReg",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(counsult_register)
    })
}