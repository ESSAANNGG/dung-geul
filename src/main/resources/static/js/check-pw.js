function check_pw() {
  //비밀번호 확인
  var p = document.getElementById("user_pw").value;
  var p_cf = document.getElementById("checkPw").value;

  if (p != p_cf) {
    document.getElementById("checkPwResult").style = "color: red;";
    document.getElementById("checkPwResult").innerHTML =
      "비밀번호가 다릅니다. 다시 확인해 주세요.";
  } else if ((p = p_cf)) {
    document.getElementById("checkPwResult").style = "color: black;";
    document.getElementById("checkPwResult").innerHTML = "비밀번호가 같습니다.";
  } 
}

$(function () {
  $("#user_pw").on('input', function () {
    if ($("#user_pw").val() == '')
      $("#checkPw").attr("disabled", true);
    else {
      $("#checkPw").attr("disabled", false);
    }
  })
})
