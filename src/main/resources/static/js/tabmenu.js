$(document).ready(function () {
    $(".tabmenu ul li").eq(0).addClass("on");
    $(".tabmenu .list").eq(0).show();
    $(".tabmenu .inside").click(function(){
        let i = $(this).index();
        $(".tabmenu ul li").removeClass("on").eq(i).addClass("on");
        $(".list2").hide();
        $(".list").show();
    })
    $(".tabmenu .outside").click(function(){
        let k = $(this).index();
        $(".tabmenu ul li").removeClass("on").eq(k).addClass("on");
        $(".list").hide();
        $(".list2").show();
    })
});