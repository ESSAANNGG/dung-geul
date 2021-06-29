let menubox_li=document.getElementsByClassName("menubox_li");
let menuLength=menubox_li.length;
let parameter;           //주소값
let menu_name;           //userManage,consult등 이 문자형 변수를 이용해 각menu.js파일의 함수를 호출
let select_detail_menu;  //몇번쨰 상세메뉴인지 저장된 값(회원관리 > 회원관리 == 0)
window.onload = function () {

    //세션값을 가져옴
    select_detail_menu = (sessionStorage.getItem("select_detail_menu"));             //몇번쨰 상세메뉴인지 저장된 값(회원관리 > 회원관리 == 0)
    menu_index = (sessionStorage.getItem("menu_index"));                             //몇번쨰 메뉴인지 저장된 값(dashboard == 0)
    menu_name = (sessionStorage.getItem("menu_name"));                               //userManage,consult등 이 문자형 변수를 이용해 각menu.js파일의 함수를 호출
    parameter = (sessionStorage.getItem("parameter"));                               //현재 주소를 저장

    if(menu_index==undefined){
        menu_index==0;                                                                   //초기화면은 첫번쨰 메뉴선택
        menu_name=="dashboard";
        parameter="/admin/admin_dashboard";
    }
    $(menubox_li).eq(menu_index).css("backgroundColor","#30384b");                        //선택한 메뉴의 색상 변경
    $('.guide_select option:eq(' +select_detail_menu + ')').attr("selected","selected");  //해당 메뉴의 선택한 상세메뉴(가이드)대로 상세메뉴 선택값 변경
    MenuOff(); //전체 상세메뉴 닫기 + 선택 상세메뉴 열기

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
$(menubox_li).click(function(){
    menu_index=$(this).index();    //몇번째 menu인지 받아오기
    //주소 파라미터 넘기기
    switch(menu_index){
        case 0: menu_name="dashboard";
            break;
        case 1: menu_name="userManage";
            break;
        case 2: menu_name="employ";
            break;
        case 3: menu_name="application";
            break;
        case 4: menu_name="board";
            break;
        case 5: menu_name="consult";
            break;
        case 6: menu_name="supportProgram";
    }
    //세션 스토리지에 css를 저장
    window.sessionStorage.setItem('menu_name', menu_name);
    window.sessionStorage.setItem('menu_index', menu_index);
    window.sessionStorage.setItem('select_detail_menu',Number(0)); //상세메뉴가 아닌 좌측메뉴클릭을 했을시엔 첫번째 상세메뉴를 보여줌

    //각 메뉴에 맞는 파라미터를 가져오기 위해 menu_name을 이용해 각menu.js파일에 존재하는 함수를 호출, 각 파라미터를 받아옴
    window[menu_name]();

    //파라미터를 받아온 후 새로고침하는 함수 호출
    submit_param();
});

let guide_val; //어느 상세메뉴를 골랐는지 메뉴이름 그대로 저장
//menu_guide 변경할시 상세 메뉴 변경
$('.guide_select').change(function(){
    select_detail_menu=document.getElementsByClassName('guide_select')[0].selectedIndex;   //상세메뉴중 뭐를 클릭했는지 가져오기
    window.sessionStorage.setItem('select_detail_menu',select_detail_menu);                          //세션 스토리지에 css를 저장 , 이를 이용해 새로고침후에 각 상세메뉴를 보여줌(display=block)

    //각 메뉴의 js파일의 함수호출
    guide_val=$('.guide_select').val();
    window[String(menu_name)+"_guide"]();

    //파라미터 바꿔서 새로고침하는 함수 호출
    submit_param();
})

let search_parameter; //parameter+search될시 사용하는 파라미터를 이용할 시에 search를 연속할 시 여러번 눌러짐 그래서 search할 시 사용되는 parameter는 따로 저장
function submit_param(){  //메뉴클릭,가이드메뉴 선택시 파라미터를 받은 후, 새로고침
        window.sessionStorage.setItem('parameter',parameter);
        
        if(search_parameter==undefined) {
            location.href = parameter;
        }
        else{
            location.href = parameter+search_parameter;
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

//검색 값이 들어갔을시 css변경
$('.search select').change(function(){    //검색창의 select에 값을 넣을시
    search_color(this);
});
$('.search input').keyup(function (){     //검색창의 input에 값을 넣을시
    search_color(this);
})
$('.search input').change(function (){    //검색창의 input에 값을 넣을시
    search_color(this);
})

function search_color(t){
    if(t.value!=""){
        t.style.backgroundColor="#ffffff";
    }
    else{
        t.style.backgroundColor="#c2c9db";
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

//ajax로 데이터전송(리스트부분)
let dataList=[];    //AJAX로 전달할값을 담아넣는 배열
let List;           //어느메뉴를 선택하였는지
let ListNum;        //선택한 메뉴의 리스트중 몇번째 리스트인지 인덱스값 가져옴
let ListId;         //선택한 리스트가 어느 상세메뉴에 있는지 id를 가져옴 (ex:main2_perlist / main2_list)
let check_name;     //선택한 리스트메뉴에 있는 check들의 name 값
let checkLength;    //체크된 체크박스들의 수(이만큼 반복을 하여서 체크를 하나하나 처리하면서 없애나감)
let checked;        //체크된 체크박스들의 인덱스
let p;              //승인,거절,삭제 중 무엇인지 html으로부터 받아옴

$('.list_submit').click(function(){

    conF = confirm('정보를 변경하시겠습니까?');
    if (conF == false) {
        return;
    }

    List = $(this).parents('.list');                                          //해당하는 리스트를 가져옴
    ListNum = $('.list').index(List);                                         //해당하는 리스트의 인덱스num
    ListId = $(List).parent("div").parent("div").attr('id');                  //선택한 리스트가 어느상세메뉴에 있는지 가져옴(회원관리,기업관리)
    check_name = $(List).find('input[type=checkbox]').eq(1).attr('name');     //해당리스트의 checkname을 가져옴
    checkLength = $('input[name=' + check_name + ']:checked').length;         //체크 수만큼 반복
    dataList = [];                                                            //배열이 계속 쌓이는걸 방지 (초기화) , 체크한 목록을 가져와 List에 담음

    //유저관리를 위한 부분 공용으로 혹시 쓸수 있나 해서 공용js에 임시로 둠
    p = $(this).text();  //승인/거절/삭제인지 구분
    switch (p) {
        case '승인' :
            p = "ok";
            break;
        case '거절' :
        case '삭제' :
            p = "no";
            break;
    }
    alertShape = 0;
    //유저관리를 위한 부분

    for (j = 0; j < checkLength; j++) {
        checked = ($('input[name=' + check_name + ']').index($('input[name=' + check_name + ']:checked')));             //전체 체크중 체크된것들의 인덱스를 가져옴
        ($('input[name=' + check_name + ']').eq(checked)).prop("checked", false);                                       //해당하는 인덱스의 체크 해제 < 이걸 해야 바로 위 문장의 인덱스가 1씩 늘어나서 다음 체크된 것들에 대해 수행할 수 있음
        window[String(menu_name)+"_list"]();                                                                                  //data를 담는 함수 호출
    }

    if(dataList.length!=0){                                 //넘어온 값이 없을 시 수행하지 않음

        window[String(menu_name)+"_list_send"]();           //list를 담았고 data보내는 함수 호출
    }
})

//검색을 위한 파라미터값 변경
let select_search;        //검색하는 검색창의 위치가 어디인지
let search_data_length;   //검색할 수 있는 data 입력칸이 몇개가있는지
let search_val;           //각 input칸의 data
$('.search_submit').click(function(){
    select_search = $(this).parent("div").parent("div").parent("div").attr('id');                //해당 search 클래스를 저장
    search_data_length=$('#'+select_search).find(".search_data").length;    //검색할 수 있는 data 입력칸이 몇개가있는지

    for (i=0; i<search_data_length; i++) {                              //input칸들의 값들을 확인
        search_val=$('#'+select_search).find(".search_data").eq(i).val();   //각 input들의 data를 받아옴(for문 돌리는중)
        window[String(menu_name) + "_search"](i);
    }
    submit_param();
})
//검색을 위해 search_data를 참조하는데 checkbox의 value를 가져오기위해 더미 input에 search_data 클래스를 주어 검색한다
$('li input[type=checkbox]').change(function (){
    if($(this).attr('class')=="radio"){             //라디오 타입이면 다른 체크를 해제한 후 체크 한것만 체크적용
        this_name=$(this).attr('name');
        $('input[name='+this_name+']').prop("checked", false);
        $(this).prop("checked",true);
    }
    $(this).parent('li').children('input[type=text]').val($(this).val());   //더미에 value저장
})


//ajax로 데이터전송(등록부분)
let select_register;        //등록창의 위치가 어디인지
let register_data_length;   //등록할때 사용하는 data 입력칸이 몇개가있는지
let register_val;           //각 input칸의 data
let register_list;          //전송하는 데이터를 담는 변수
$('.register_submit').click(function(){
    select_register = $(this).parent("div").parent("div");                      //해당 search 클래스를 저장
    register_data_length = $(select_register).find(".register_data").length;    //검색할 수 있는 data 입력칸이 몇개가있는지

    for (i=0; i<register_data_length; i++) {                                    //input칸들의 값들을 확인
        register_val=$(select_register).find(".register_data").eq(i).val();     //각 input들의 data를 받아옴(for문 돌리는중)
        window[String(menu_name) + "_register"](i);                             //data를 리스트에 담음
    }
    window[String(menu_name) + "_register_submit"](i);                          //data를 전송
})





//모달창
// 모달창
let non_detail=0;       //.list_body안에 있는 체크박스나 select(기업형태)등 a링크를 클릭했을시 모달창을 띄우지 않게하기위한 참조변수
let detail_state=0;     //상세정보페이지가 켜져있는지 꺼져있는지 확인하기 위한 참조변수;
$('.list_body :checkbox, select[class=shapeSelect]').click(function(){
    non_detail=1;
})
$('.link').click(function(){
    non_detail=1;
})
//체크박스나 select를 클릭하였다면 상세정보를 띄우지않는다.
//non_detail=0이면 상세정보를 띄워줌
function detail(t) {
    if (non_detail == 1) {
        non_detail = 0;
        return;
    } else if (non_detail == 0) {
        switch (menu_name){
            case "userManage": //회원관리메뉴에서의 모달창
                users_roll=$(t).children('span.role').text();                 //role을 읽어옴
                if(users_roll==""){                                           //기업관리 화면은 .role이 없고 대신 기업형태가있음 그래서 enterprise를 직접 설정해 넘겨준다.
                    users_roll="ENTERPRISE";
                }
                users_id=$(t).children('span.username').text();
                setTimeout("window['detail_on_'+menu_name](users_id,users_roll)", 100);          //settimeout을 하지않으면 detail_state=1이되어 바로 상세정보를 닫아버림
                break;

            case "employ": //채용공고메뉴에서의 모달창
                employ_num=$(t).children('span.number').text();
                setTimeout("window['detail_on_'+menu_name](employ_num)", 100);          //settimeout을 하지않으면 detail_state=1이되어 바로 상세정보를 닫아버림
                break;

            case "application": //지원관리메뉴에서의 모달창
                employ_num=$(t).children('span.employ_num').text();
                setTimeout("window['detail_on_'+menu_name](employ_num)", 100);          //settimeout을 하지않으면 detail_state=1이되어 바로 상세정보를 닫아버림
                break;

            case "board": //게시판메뉴에서의 모달창
                board_num=undefined;
                if($(t).attr("class")=="list_submit direct"){
                    setTimeout("window['detail_on_'+menu_name]()", 100);          //settimeout을 하지않으면 detail_state=1이되어 바로 상세정보를 닫아버림
                }
                else{
                    board_num=$(t).children('span.number').text();
                    setTimeout("window['detail_on_'+menu_name](board_num)", 100);          //settimeout을 하지않으면 detail_state=1이되어 바로 상세정보를 닫아버림
                }
                break;

            case "consult": //상담관리메뉴에서의 모달창
                consult_num=$(t).children('span.number').text();                 //번호를 읽어옴
                setTimeout("window['detail_on_'+menu_name](consult_num)", 100);          //settimeout을 하지않으면 detail_state=1이되어 바로 상세정보를 닫아버림
                break;
        }
    }
}
//상세정보를 닫음
$('#shadow_box').click(function(e){
    if(detail_state==1) {
        $('.detailBox').css({"visibility": "hidden", "opacity": "0"});
        $('#wrap,#admin_header').css("opacity", "1");
        detail_state = 0;
    }
})

//상세정보 중 버튼
$('.d_button').click(function(e){
    select_modal=$(this).parent("div").parent("div").attr('id');
    window[String(menu_name) + "_detail_submit"](select_modal,this);
    //submit_param()는 sucess에서 실행
})

let pagenation_check=0;
function pagenation(t) {
    link=(window.location.href);
    page_text=$(t).text();
    first_page=$(t).parents('ul').find('.now_page').eq(0).text();
    first_page=Number(first_page);
    if(page_text=='다음'){
        page_text=first_page+10;
    }
    else if(page_text=='이전') {
        page_text=first_page-1;
    }

    sub_menu_title=$(t).parents(".list").parent().find('.sub_menu_title').text();
    list=$(t).parents(".list").parent().attr('id');//해당리스트를 검색

    switch (menu_name) {
        case "userManage":
            if(list=="main2_list"||list=="main2_corp_list") {
                link = link.replace('page2=', 'page2=' + page_text);
            }
            else if(list=="main2_perList"||list=="main2_corp_perList"){
                link = link.replace('page1=', 'page1=' + page_text);
            }
            break;
        case "employ":
        case "application":
        case "board":
            link=link.replace('?','?page='+page_text);
            break;
    }
    $('#'+list).load(link +" #"+list +" > .list",function (){//띄어쓰기 잘해야함
        $('#'+list).prepend("<div class="+'"sub_menu_title"'+"><h3>"+sub_menu_title+"</h3></div>"); //load로 교체시 안의 내용이 모두 교체되어 title을 추가해야함
    });                                                                                             //append는 뒤에, prepend는 앞에
}