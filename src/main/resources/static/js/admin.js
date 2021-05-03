//메뉴 클릭시
let menubox_li=document.getElementsByClassName("menubox_li");

//처음은 맨 윗메뉴를 보여준다
window.onload = function () {
    menubox_li[0].style.backgroundColor="#30384b";
}
//메뉴 클릭시 색상변경
$('.menubox_li').click(function(){
    let menubox_li_index=$(this).index();                           //클래스 순번 받아오기
    $('.menubox_li').attr('style','backgroundColor: #5978b9');      //전체색상 기본색으로 변경
    menubox_li[menubox_li_index].style.backgroundColor="#30384b";   //클릭한 메뉴 색상변경
     
    //menu_title 변경
    let menu_title=document.getElementById("menu_title");
    menu_title.innerHTML=("<h3>"+menubox_li[menubox_li_index].innerText+"</h3>");        //h3태그는 사라져서 innerhtml을 하니 아이콘까지 같이 가져옴 그래서 text+h3태그를 innerhtml로 저장
});




//main2_1&&main2_2 date
//search_date_num가 1==오늘 2==이번주 3==이번달 4==전체
let s_date=document.getElementsByClassName('user_search_date');
let search_date_num;
function search_date(search_date_num){
    let now=new Date();
    let week=new Date();
    let month=new Date();
    let enter=new Date(1);  //파라미터를 한개만 전송하면 1970년도로 자동설정
    week.setDate(now.getDate()-7);
    month.setMonth(now.getMonth()-1);

    switch(search_date_num){
        case 1:
            s_date[0].value = now.toISOString().substring(0, 10);
            s_date[1].value = now.toISOString().substring(0, 10);
            break;
        case 2:
            s_date[0].value = week.toISOString().substring(0, 10);
            s_date[1].value = now.toISOString().substring(0, 10);
            break;

        case 3:    
            s_date[0].value = month.toISOString().substring(0, 10);
            s_date[1].value = now.toISOString().substring(0, 10);
            break;

        case 4:
            s_date[0].value = enter.toISOString().substring(0, 10);
            s_date[1].value = now.toISOString().substring(0, 10);
    }
}



//게시판 전체 체크하기
function checkAll(checkI) {
    let checkName=(checkI.name);                                      //체크한 부모체크박스의 이름을 가져옴 ex)2_1_checkH
    let check=(checkName.substr(0,9));                                //부모체크박스의 h를 떼어 자식name으로 변경
    if($('input[name='+checkName+']').is(':checked')==true){          //자식 checkBox에 check적용
        $('input[name='+check+']').prop("checked",true);
    }
    else if($('input[name='+checkName+']').is(':checked')==false){
        $('input[name='+check+']').prop("checked",false);
    }
}