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
let alert_check=0; //컨트롤러가 한개씩만 삭제되게 개발되어있어 for문으로 ajax를 돌림 alert를 한번만 띄어주기 위해 체크
function consult_list() {
    consult_num = $('.list:eq(' + ListNum + ') .list_body:eq(' + checked + ') .number').text();//목록번호를 읽어옴
    
    $.ajax({
        url: '/admin/remove/' + consult_num ,
        method: 'delete',
        success: function (result) {
            if(alert_check==0) {
                alert("상담목록 삭제완료");
                alert_check+=1;
            }
            submit_param();
        },
        error: function (err) {
            alert("삭제 실패");
        }
    })
}

function consult_list_send(){
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

    $.ajax({
        url: "/admin/admin_consult_Reg",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType:"JSON",
        data: JSON.stringify(register_list),
        success : function(data) {
            alert('상담목록이 등록되었습니다.');
            submit_param();
        },
        error : function() {
            alert('등록에 실패하였습니다.');
        }
    })
    //상담관리메뉴는 상담등록만 따로빼놨음
    //나중에 합찬다면 이 밑의 세 문장,consult_guide의 주소값,html파일 삭제만 하면됨

    parameter="/admin/admin_consult";
    select_detail_menu=0;   //상세메뉴중 뭐를 클릭했는지 가져오기
    window.sessionStorage.setItem('select_detail_menu',select_detail_menu);
}


function detail_on_consult(consult_num){
    detail_state=1;


    $('#wrap,#admin_header').css("opacity","0.4");

    $('#detail_consult').css({"visibility":"visible","opacity":"1"});
    $.ajax({
        url: "/admin/admin_consult/detail?consult_num="+consult_num,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success : function (consultDTO) {
            $('input[name=번호]').val(consultDTO.cno);
            $('select[name=종류]').val(consultDTO.type);
            $('input[name=제목]').val(consultDTO.name);
            $('input[name=등록일]').val(consultDTO.consult_regdate.substring(0,10));
            $('input[name=수정일]').val(consultDTO.consult_moddate.substring(0,10));
            },
        error : function (error){
            alert("상담정보 로딩에 실패했습니다");
            console.log(error);
        }
    })

}


function consult_detail_submit(select_modal,t){
    consult_num=$('input[name=번호]').val();
    btn_text=$(t)   .text();
    switch (btn_text) {
        case "수정" :
            conF = confirm('해당 목록을 수정하시겠습니까?');
            if (conF == true) {
                let data = {
                    num : $('input[name=번호]').val(),
                    type : $('select[name=종류]').val(),
                    name : $('input[name=제목]').val(),
                }
                console.log(data);
                $.ajax({
                    url: "/modify/consave",
                    method: 'put',
                    data: JSON.stringify(data),
                    contentType: 'application/json; charset=utf-8,'
                }).done(function () {
                    submit_param();
                }).fail(function (error) {
                    alert("수정에 실패했습니다.");
                })
            }
            break;
        case "삭제" :
            conF = confirm('해당 목록를 삭제하시겠습니까?');
            if (conF == true) {
                $.ajax({
                    url: '/admin/remove/' + consult_num,
                    method: 'delete',
                    success: function (result) {
                        alert("목록 삭제 완료");
                        submit_param();
                    },
                    error: function (err) {
                        alert("삭제 실패");
                    }
                })
            }
            break;
    }
}
