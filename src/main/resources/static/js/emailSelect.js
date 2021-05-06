$(function () {
  $(document).ready(function () {
    $("select[name=user_emailDomainSelect]").change(function () {
      if ($(this).val() == "1") {
        $("#user_emailDomain").val("");
      } else {
        $("#user_emailDomain").val($(this).val());

        $("#user_emailDomain").attr("readonly", true);
      }
    });
  });
});
