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

let counsult_type;
let counsult_name;
function consult_register(i){
    register_val=$(select_register).find(".register_data").eq(i).val();           //각 input들의 data를 받아옴(for문 돌리는중)

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
            url: "/rest/conReg",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(register_list)
        })
    }
}