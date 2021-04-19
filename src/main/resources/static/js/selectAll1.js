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
})