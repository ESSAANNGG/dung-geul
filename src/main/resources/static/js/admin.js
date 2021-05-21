let menubox_li=document.getElementsByClassName("menubox_li");
let menuLength=menubox_li.length;
let parameter;
let select_detail_menu;
window.onload = function () {

    //세션값을 가져옴
    detail_menu = (sessionStorage.getItem("detail_menu"));
    select_detail_menu = (sessionStorage.getItem("select_detail_menu"));
    parameter = (sessionStorage.getItem("parameter"));

    menu_index = (sessionStorage.getItem("menu_index"));

    $('.guide_select option:eq(' +select_detail_menu + ')').attr("selected","selected");  //해당 메뉴의 선택한 상세메뉴(가이드)대로 상세메뉴 선택값 변경
    MenuOff(); //전체 상세메뉴 닫기

}

//선택한 상세메뉴 제외 닫기
function MenuOff() {

    for (i = 0; i < menuLength; i++) {
        menu = ("main" + String(i + 1));

        $('.' + menu).css("display", "none");
        if(select_detail_menu==undefined){
            $('.' + menu).eq(0).css("display", "block");
        }
        else if(select_detail_menu!=undefined){
            $('.' + menu).eq(select_detail_menu).css("display", "block");
        }
    }
}

//메뉴 클릭시
let menu_index;
let detail_menu;
$(menubox_li).click(function(){
    menu_index=$(this).index();                               //클래스 순번 받아오기

    //주소 파라미터 넘기기
    switch(menu_index){
        case 0: menu_index="dashboard";
            break;
        case 1: menu_index="userManage?type=UNIV&page1=1&page2=1";
            break;
        case 2: menu_index="employ";
            break;
        case 3: menu_index="board";
            break;
        case 4: menu_index="consult";
            break;
    }
    //세션 스토리지에 css를 저장
    window.sessionStorage.setItem('menu_index', menu_index);
    window.sessionStorage.setItem('menu',menu);
    window.sessionStorage.setItem('detail_menu',detail_menu);
    window.sessionStorage.setItem('select_detail_menu',Number(0)); //상세메뉴가 아닌 좌측메뉴클릭을 했을시엔 첫번째 상세메뉴를 보여줌

    //파라미터 바꿔서 새로고침하는 함수 호출
    submit_param();

});

//menu_guide 변경할시 상세 메뉴 변경
$('.guide_select').change(function(){
    select_detail_menu=document.getElementsByClassName('guide_select')[0].selectedIndex;   //상세메뉴중 뭐를 클릭했는지 가져오기

    //회원관리 메뉴
    if("회원관리"==this.value){
        parameter="UNIV";
    }
    else if("기업관리"==this.value){
        parameter="ENTERPRISE";
    }
    //상담관리 메뉴
    // else if("상담사")

    //세션 스토리지에 css를 저장
    window.sessionStorage.setItem('select_detail_menu',select_detail_menu);

    //파라미터 바꿔서 새로고침하는 함수 호출
    submit_param();
})


function submit_param(){  //메뉴클릭,가이드메뉴 선택시
    window.sessionStorage.setItem('parameter',parameter); //새로고침해도 파라미터가 남아있게

    alert(parameter);
    if(parameter!=undefined){
        location.href="/admin/admin_"+menu_index;
    }
    else if(parameter==undefined){
        location.href="/admin/admin_"+menu_index + "?type=" + parameter + "&page1=1&page2=1"
    }

}



//모든 메뉴 검색부분의 날짜선택
let date_range=document.getElementsByClassName('search_date');
let dateVar;
$('.search_date_button').click(function(){
    let now=new Date();
    let week=new Date();
    let month=new Date();
    let enter=new Date(1);  //파라미터를 한개만 전송하면 1970년도로 자동설정
    week.setDate(now.getDate()-7);
    month.setMonth(now.getMonth()-1);

    let date_select=$(this).text();

    switch (date_select) {
        case '오늘': dateVar=now;
            break;
        case '이번주': dateVar=week;
            break;
        case '이번달': dateVar=month;
            break;
        case '전체': dateVar=enter;
            break;
    }

    let searchIndex=$('.search').index($(this).parents('.search'));
    //해당버튼이 어느메뉴의 버튼들인지 ex)처음으로 검색이 나오는메뉴는 회원관리>회원관리니까 회원관리의 검색을 클릭시 0출력
    //어쩌피 redirect되는데 굳이 필요한가 생각중/ 허나 같은 페이지에 datetype이 두개 이상 나온다면 필요
    searchIndex=searchIndex*2;
    //클래스 참조를 위해 *2

    date_range[searchIndex].value = dateVar.toISOString().substring(0, 10);
    date_range[(searchIndex+1)].value = now.toISOString().substring(0, 10);
    date_range[searchIndex].style.backgroundColor="#ffffff";
    date_range[(searchIndex+1)].style.backgroundColor="#ffffff";
})

//검색 값이 들어갔을시 css
$('.search select').change(function(){    //검색창의 select에 값을 넣을시
    search_color(this);
});
$('.search input').keyup(function (){     //검색창의 input에 값을 넣을시
    search_color(this);
})
$('.search input').change(function (){    //검색창의 input에 값을 넣을시
    search_color(this);
})

function search_color(a){
    if(a.value!=""){
        a.style.backgroundColor="#ffffff";
    }
    else{
        a.style.backgroundColor="#c2c9db";
    }
}

//전체 게시판 각 리스트별로 체크,해제
let check;
function checkAll(checkI) {
    let checkName=(checkI.name);                                      //체크한 부모체크박스의 이름을 가져옴 ex)2_1_checkH
    check=(checkName.substr(0,9));                        //부모체크박스의 name중 h를 떼어 자식name으로 변경
    if($('input[name='+checkName+']').is(':checked')==true){          //자식 checkBox에 check적용
        $('input[name='+check+']').prop("checked",true);
    }
    else if($('input[name='+checkName+']').is(':checked')==false) {
        $('input[name=' + check + ']').prop("checked", false);
    }
}