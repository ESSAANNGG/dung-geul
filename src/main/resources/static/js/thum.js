$(document).ready(function() {

    $("#inside").click(function() {
        $(".content").show();
        $(".content1").hide();
    })
    $("#outside").click(function() {
        $(".content1").show();
        $(".content").hide();
    })

})