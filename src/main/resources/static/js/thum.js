$(document).ready(function() {

    $("#inside").click(function() {
        $(".content").show();
        $(".content1").hide();
        document.getElementById("outside").style.color="black";
        document.getElementById("outside").style.borderBottom="3px solid #000";
        document.getElementById("inside").style.color="#1e3c72";
        document.getElementById("inside").style.borderBottom="3px solid #1e3c72";
    })
    $("#outside").click(function() {
        $(".content1").show();
        $(".content").hide();
        document.getElementById("inside").style.borderBottom="3px solid #000";
        document.getElementById("inside").style.color="black";
        document.getElementById("outside").style.color="#1e3c72";
        document.getElementById("outside").style.borderBottom="3px solid #1e3c72";
    })

})