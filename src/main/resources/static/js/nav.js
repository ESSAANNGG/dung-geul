var nav = document.getElementsByClassName("nav");
var nav2 = document.getElementsByClassName("nav2");
var dep2 = document.getElementsByClassName("dep2");
var intro = document.getElementsByClassName("intro");
var intro_center = document.getElementsByClassName("intro_center");

function nav_on() {
  nav[0].style.backgroundColor = "#ffffff";
  nav2[0].style.height = "180px";
  for (var i = 0; i < dep2.length; i++) {
    dep2[i].style.height = "180px";
  }

  // intro[0].style.height="200px";
  // intro_center[0].style.fontSize="50px"
}

function nav_off() {
  /*setTimeout(function() {
        nav[0].style.backgroundColor="transparent"; 
    }, 1000);             오류있음 이유모르겠*/
  // nav[0].style.backgroundColor = "initial"; /*transparent = 투명한*/
  nav2[0].style.height = "0px";
  for (var i = 0; i < dep2.length; i++) {
    dep2[i].style.height = "0px";
  }
}

function angle_up(){
  window.scrollTo({top:0, behavior:'smooth'});
}

function admin_session(){
  window.sessionStorage.setItem('menu_name', "userManage");
  window.sessionStorage.setItem('menu_index', 0);
  window.sessionStorage.setItem('select_detail_menu',Number(0));
  window.sessionStorage.setItem('parameter',"/admin/admin_userManage?page1=&page2=&type=UNIV");
  window.location.href="/admin/admin_userManage?page1=&page2=&type=UNIV";
}