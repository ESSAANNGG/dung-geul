check=false;
function selectAll()  {
    // alert(check);

        if(check==false){
            $(".allcheck").prop("checked",true);

            check=true;
        }
        else{
            $(".allcheck").prop("checked",false);
            check=false;
        }
}
let check;
function checkAll(checkI) {
    let checkName=(checkI.name);                                      //체크한 부모체크박스의 이름을 가져옴 ex)2_1_checkH
    check=(checkName.substr(0,9));                        //부모체크박스의 name중 h를 떼어 자식name으로 변경
    if($('input[name='+checkName+']').is(':checked')==true){          //자식 checkBox에 check적용
        $('input[name='+check+']').prop("checked",true);
    }
    else if($('input[name='+checkName+']').is(':checked')==false) {
        $('input[name=' + check + ']').prop("checked", false);
    }
}

$(document).ready(function(){
    $("#delete").click(function() {
        alert('신청 내역이 삭제되었습니다.');
    })
    $("#coun-delete").click(function() {
        alert('신청 내역이 삭제되었습니다.');
    })
    $("#okay").click(function() {
        alert('신청 내역이 승인되었습니다.');
    })
    $("#nope").click(function() {
        alert('신청 내역이 거절되었습니다.')
    })
    $("#success").click(function() {
        $('.allcheck').checked
        $("#success-on").show();
        $(".none").hide();
    })
    $("#refuse").click(function() {
        $(".none").show();
        $("#success-on").hide();
    })
    $(".me-ok").click(function(){
        $(".window").fadeIn(700);
        $(".window-content").show();
        // 윈도우 창 띄우기
        // 윈도우 컨텐츠 띄우u
        // 닫기 버튼 클릭시 역순(윈도우닫기,윈도우컨텐츠닫기)
    })
    $(".coun-close").click(function(){
        $(".window").fadeOut(700);
        $(".window-content").hide();
    })
})
