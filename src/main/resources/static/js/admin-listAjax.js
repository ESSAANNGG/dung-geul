//리스트들의 파라미터 전송 함수(승인,거절,삭제)

let p; //승인,거절,삭제 중 무엇인지 html으로부터 받아옴
let List=[]; //AJAX로 전달할값을 담아넣는 배열

let ListIndex; //어느메뉴를 선택하였는지
let ListIndexNum; //해당 메뉴의 index
let listIndexId; //선택한 리스트가 어느 상세메뉴에 있는지 id를 가져옴
let check_name;  //선택한 리스트메뉴에 있는 check들의 name 값
let checkLength; //체크된 체크박스들의 수(이만큼 반복을 하여서 체크를 하나하나 처리하면서 없애나감)
let checked;     //체크된 체크박스들의 인덱스

//회원관리에 필요한 변수
let userid; //userid값을 하나하나 담음
let userShape; //기업형태
let alertIndex;  //기업형태를 입력하였는지에 대한 참조변수

$('.parameter_request').click(function(){
    List=[]; //배열이 계속 쌓이는걸 방지 (초기화) , 체크한 목록을 가져와 List에 담음

    p=$(this).text();  //승인/거절/삭제인지 구분
    switch (p) {
        case '승인' :
            p = "ok";
            break;
        case '거절' :
            p = "no";
            break;
        case '삭제' :
            p = "no";
            break;
    }
    ListIndex=$(this).parents('.list');                                               //해당하는 리스트를 가져옴
    ListIndexNum=$('.list').index(ListIndex);                                         //해당하는 리스트의 인덱스num
    listIndexId=$(ListIndex).parent("div").parent("div").attr('id');                  //선택한 리스트가 어느상세메뉴에 있는지 가져옴(회원관리,기업관리)
    check_name=$(ListIndex).find('input[type=checkbox]').eq(1).attr('name');          //해당리스트의 checkname을 가져옴
    checkLength=$('input[name=' + check_name + ']:checked').length;                   //체크 수만큼 반복

    for(j=0; j<checkLength; j++){
        checked=($('input[name=' + check_name + ']').index($('input[name=' + check_name + ']:checked')));               //전체 체크중 체크된것들의 인덱스를 가져옴
        ($('input[name=' + check_name + ']').eq(checked)).prop("checked",false);                                        //해당하는 인덱스의 체크 해제 < 이걸 해야 바로 위 문장의 인덱스가 1씩 늘어나서 다음 체크된 것들에 대해 수행할 수 있음

        switch (listIndexId){                                                                                           //메뉴에 맞게 필요한 값을 읽어오는 switch문
            case "main2_user" :
            case "main2_corp" :
                userid=$('.list:eq(' + ListIndexNum + ') .list_body:eq(' + checked + ') .username').text();             //아이디값을 읽어옴

                if(listIndexId=="main2_user"){
                    List.push(userid);
                }
                else if(listIndexId=="main2_corp"){
                    alertIndex=0;
                    userShape = $('.shapeSelect:eq(' + checked + ')').val();                                            //기업형태를 읽어옴
                    if (userShape == "") {                                                                              //기업형태를 선택하지 않았다면 알림,리스트에 추가하지않음
                        if (alertIndex == 0) {
                            alert("기업형태를 선택해주세요");                                                               //알림을 띄워주지않았다면 띄워주고 띄워줬다면 더 띄우지 않음
                            alertIndex = 1;
                        }
                    }
                    else{                                                                                               //기업형태를 선택하였다면 리스트에 추가
                        List.push("{user_Id:" + userid + ", shape:" + userShape + "}");                                 //전달할 배열에 값 삽입
                    }
                }
                break;
        }
    }
    list_ajax();                                                                                                        //list를 담았고 ajax로 보내는 함수 호출
})


function list_ajax(){
    if(List.length==0){                                                                                                 //넘어온 값이 없을 시 알림과 함께 수행하지 않음
        alert("수행할 목록이 없습니다");
    }
    else{
        switch (listIndexId){
            case "main2_user" :
            case "main2_corp" :
                $.ajax({
                    url: "/allow/member/read?result=" + p,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(List),
                })
                break;
        }
    }
    alert(List) //디버깅용
    submit_param();
}
