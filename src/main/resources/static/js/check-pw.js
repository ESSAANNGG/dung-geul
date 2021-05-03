// function check_pw() {
//     //비밀번호 확인
//     var p = document.getElementById("user_pw").value;
//     var p_cf = document.getElementById("checkPw").value;

//     if (p != p_cf) {
//         document.getElementById("checkPwResult").style = "color: red;";
//         document.getElementById("checkPwResult").innerHTML =
//             "비밀번호가 다릅니다. 다시 확인해 주세요.";
//     } else if ((p = p_cf)) {
//         document.getElementById("checkPwResult").style = "color: black;";
//         document.getElementById("checkPwResult").innerHTML = "비밀번호가 같습니다.";
//     }
// }

// $(function () {
//     $("#user_pw").on('input', function () {
//         if ($("#user_pw").val() == '')
//             $("#checkPw").attr("disabled", true);
//         else {
//             $("#checkPw").attr("disabled", false);
//         }
//     })
// })

function check_pw2() {
  var pw = document.getElementById("user_pw").value;
  var SC = ["!", "@", "#", "$", "%"];
  var check_SC = 0;

  if (pw.length < 6 || pw.length > 16) {
    window.alert("비밀번호는 6글자 이상, 16글자 이하만 이용 가능합니다.");
    document.getElementById("user_pw").value = "";
  }
  for (var i = 0; i < SC.length; i++) {
    if (pw.indexOf(SC[i]) != -1) {
      check_SC = 1;
    }
  }
  if (check_SC == 0) {
    window.alert("!,@,#,$,% 의 특수문자가 들어가 있지 않습니다.");
    document.getElementById("user_pw").value = "";
  }
  if (
    document.getElementById("user_pw").value != "" &&
    document.getElementById("checkPw").value != ""
  ) {
    if (
      document.getElementById("user_pw").value ==
      document.getElementById("checkPw").value
    ) {
      document.getElementById("check").innerHTML = "비밀번호가 일치합니다.";
      document.getElementById("check").style.color = "blue";
    } else {
      document.getElementById("check").innerHTML =
        "비밀번호가 일치하지 않습니다.";
      document.getElementById("check").style.color = "red";
    }
  }
}
