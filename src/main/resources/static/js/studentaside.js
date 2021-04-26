$(document).ready(function () {
  var url = location.href;
  var getAr0 = url.indexOf("/mypage/member/read");
  var getAr1 = url.indexOf("/mypage/member/modify");
  var getAr2 = url.indexOf("contact");
  if (getAr0 != -1) {
    $("#one").addClass("active");
  }
  if (getAr1 != -1) {
    $("#three").addClass("active");
    $("#one").removeClass("active");
  }
  if (getAr2 != -1) {
    $("#contact").addClass("active");
  }
});
