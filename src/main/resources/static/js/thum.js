$(document).ready(function() {

    $("#inside").click(function() {
        $(".content").show();
        $(".content1").hide();
        document.getElementById("outside").style.color="black";
        document.getElementById("outside").style.borderBottom="3px solid #000";
        document.getElementById("inside").style.color="#23689b";
        document.getElementById("inside").style.borderBottom="3px solid #23689b";
    })
    $("#outside").click(function() {
        $(".content1").show();
        $(".content").hide();
        document.getElementById("inside").style.borderBottom="3px solid #000";
        document.getElementById("inside").style.color="black";
        document.getElementById("outside").style.color="#23689b";
        document.getElementById("outside").style.borderBottom="3px solid #23689b";
    })

})