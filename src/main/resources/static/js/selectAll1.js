function selectAll(selectAll)  {
    const checkboxes
        = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAll.checked
    })
}

$(document).ready(function(){
    $("#delete").click(function() {
        alert('신청 내역이 삭제되었습니다.');
    })
    $("#okay").click(function() {
        alert('신청 내역이 승인되었습니다.');
    })
    $("#nope").click(function() {
        alert('신청 내역이 거절되었습니다.')
    })
    $("#success").click(function() {
        $("#success-on").show();
        $("#refuse-on").hide();
    })
    $("#refuse").click(function() {
        $("#refuse-on").show();
        $("#success-on").hide();
    })
    $(".me-ok").click(function(){
        $(".window").fadeIn(700);
        $(".window").fadeTo(1000, 0.4);
        $(".window-content").show();
        // 윈도우 창 띄우기
        // 윈도우 컨텐츠 띄우기

        // 닫기 버튼 클릭시 역순(윈도우닫기,윈도우컨텐츠닫기)
    })
    $("#close").click(function(){
        $(".window").fadeOut(700);
        $(".window").fadeTo(10, 1);
        $(".window-content").hide(1000);
    })
})
