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
    consult_num = $('.list:eq(' + ListNum + ') .list_body:eq(' + checked + ') .number').text();//목록번호를 읽어옴

    $.ajax({
        url: '/admin/remove/' + consult_num ,
        method: 'delete'
    })
    dataList.push(consult_num);

}

function consult_list_send(){
    //
    // $.ajax({
    //     url: "/admin/remove",
    //     type: "delete",
    //     contentType: "application/json; charset=utf-8",
    //     dataType: "json",
    //     data: JSON.stringify(dataList),
    // })

    submit_param();
}





let consult_field;
let consult_detail_field;
function consult_register(i) {

    if (register_val != "") {
        switch (i) {
            case 0:
                consult_field = register_val;
                break;
            case 1:
                consult_detail_field = register_val;
                break;
        }
    }
}

function consult_register_submit() {

    register_list={
        type : consult_field,
        name : consult_detail_field
    };
    alert(JSON.stringify(register_list));
    $.ajax({
        url: "/admin/admin_consult_Reg",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType:"JSON",
        data: JSON.stringify(register_list),
        success : function(data) {
            alert('data 전송 성공'+data);
        },
        error : function() {
            alert('실패');
        }
    })
    alert("등록되었습니다");
    //상담관리메뉴는 상담등록만 따로빼놨음
    //나중에 합찬다면 이 밑의 세 문장,consult_guide의 주소값,html파일 삭제만 하면됨

    parameter="/admin/admin_consult";
    select_detail_menu=0;   //상세메뉴중 뭐를 클릭했는지 가져오기
    window.sessionStorage.setItem('select_detail_menu',select_detail_menu);
}


function detail_on_consult(num){
    detail_state=1;

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

