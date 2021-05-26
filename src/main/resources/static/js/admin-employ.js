//채용공고 전용 js파일

function employ(){
    parameter="/admin/admin_employ";
}

function employ_guide(){
    switch (guide_val) {
        case "공고조회" : parameter="/admin/admin_employ";
            break;
        case "공고등록" : parameter="/admin/admin_employ";
                         window.open("/Employ/list");
            break;
        case "미구현" : parameter="/admin/admin_employ";
    }
}

    let employ_num; //공고번호
function employ_list(){
    employ_num = $('.list:eq(' + ListNum + ') .list_body:eq(' + checked + ') .number').text();                        //아이디값을 읽어옴
    dataList.push(employ_num);
}

function employ_list_send(){

    $.ajax({
        url: "/allow/member/read?result=" + p,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(dataList),
    })

    alert(dataList) //디버깅용
    submit_param();
}
