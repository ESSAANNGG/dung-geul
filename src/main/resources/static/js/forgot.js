$(document).ready(function() {

    $(".find_id_email").click(function() {
        $("#find_id_email_wrap").show();
        $("#find_id_mobile_wrap").hide();
    })
    $(".find_id_phone").click(function() {
        $("#find_id_email_wrap").hide();
        $("#find_id_mobile_wrap").show();
    })

    $(".find_email").click(function() {
        $("#find_pw_email_wrap").show();
        $("#find_pw_mobile_wrap").hide();
    })
    $(".find_phone").click(function() {
        $("#find_pw_email_wrap").hide();
        $("#find_pw_mobile_wrap").show();
    })
})