check=false;
function selectAll()  {
    alert(check);

        if(check==false){
            $(".allcheck").prop("checked",true);

            check=true;
        }
        else{
            $(".allcheck").prop("checked",false);
            check=false;
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
