//채용공고 전용 js파일

function employ(){
    parameter="/admin/admin_employ?";
}

function employ_guide(){
    switch (guide_val) {
        case "공고조회" : parameter="/admin/admin_employ?";
            break;
        case "공고등록" : parameter="/admin/admin_employ";
                         window.open("/Employ/list");
            break;
    }
}

let employ_num; //공고번호
function employ_list(){
    employ_num = $('.list:eq(' + ListNum + ') .list_body:eq(' + checked + ') .number').text();                        //아이디값을 읽어옴
    dataList.push(num);                                                                                        //dataList가 빈 배열일시 다음 함수를 수행하지 않음
    $.ajax({
        url: '/rest/' + employ_num ,
        method: 'delete',
        success : function (result){
            console.log(dataList);
        },
        error : function (err) {
            alert('삭제실패');
            return;
        }
    })
}

function employ_list_send(){
    alert("삭제 성공");
    submit_param();
}

let keywords=[];
for(j=0; j<9; j++){
    keywords[j]="&keywords="
}
function employ_search(i) {

    if(search_val!=""&&search_val!="시/도 선택"&&search_val!="구/군 선택"){                                                 //input값이 있다면 파라미터를 설정
        switch (i){
            case 0: search_parameter=parameter+keywords[0]+search_val+"&type=t";
                break;
            case 1: search_parameter+=keywords[1]+search_val+"&type=w";
                break;
            case 2: search_parameter+=keywords[2]+keywords[3]+keywords[4]+search_val+"&type=shape";
                break;
            case 3: search_parameter+=keywords[5]+search_val+"&type=sido";
                break;
            case 4: search_parameter+=keywords[6]+search_val+"&type=gugun";
                break;
            case 5: search_parameter+=keywords[7]+search_val+"&type=date";
                break;
            case 6: search_parameter+=keywords[8]+search_val+"&type=date";
                search_parameter=search_parameter.replace("/admin/admin_employ?","");
                break;
        }
    }
    else if(search_val==""||search_val=="시/도 선택"||search_val=="구/군 선택"){
        switch (i){
            case 0: search_parameter=parameter+"&keywords=";
                break;
            case 1: search_parameter+="&keywords=";
                break;
            case 2: search_parameter+="&keywords=&keywords=&keywords=";
                break;
            case 3: search_parameter+="&keywords=";
                break;
            case 4:
                search_parameter+="&keywords=&sido=";
                break;
            case 5: search_parameter+="&keywords=";
                break;
            case 6: search_parameter+="&keywords=";
                search_parameter=search_parameter.replace("/admin/admin_employ?","");
                break;
        }
    }
}



//공고등록 > 지역선택
$(window).load(function(){
    var area0 = ["시/도 선택","서울특별시","인천광역시","대전광역시","광주광역시","대구광역시","울산광역시","부산광역시","경기도","강원도","충청북도","충청남도","전라북도","전라남도","경상북도","경상남도","제주도"];
    var area1 = ["구/군 선택","강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"];
    var area2 = ["구/군 선택","계양구","남구","남동구","동구","부평구","서구","연수구","중구","강화군","옹진군"];
    var area3 = ["구/군 선택","대덕구","동구","서구","유성구","중구"];
    var area4 = ["구/군 선택","광산구","남구","동구",     "북구","서구"];
    var area5 = ["구/군 선택","남구","달서구","동구","북구","서구","수성구","중구","달성군"];
    var area6 = ["구/군 선택","남구","동구","북구","중구","울주군"];
    var area7 = ["구/군 선택","강서구","금정구","남구","동구","동래구","부산진구","북구","사상구","사하구","서구","수영구","연제구","영도구","중구","해운대구","기장군"];
    var area8 = ["구/군 선택","고양시","과천시","광명시","광주시","구리시","군포시","김포시","남양주시","동두천시","부천시","성남시","수원시","시흥시","안산시","안성시","안양시","양주시","오산시","용인시","의왕시","의정부시","이천시","파주시","평택시","포천시","하남시","화성시","가평군","양평군","여주군","연천군"];
    var area9 = ["구/군 선택","강릉시","동해시","삼척시","속초시","원주시","춘천시","태백시","고성군","양구군","양양군","영월군","인제군","정선군","철원군","평창군","홍천군","화천군","횡성군"];
    var area10 = ["구/군 선택","제천시","청주시","충주시","괴산군","단양군","보은군","영동군","옥천군","음성군","증평군","진천군","청원군"];
    var area11 = ["구/군 선택","계룡시","공주시","논산시","보령시","서산시","아산시","천안시","금산군","당진군","부여군","서천군","연기군","예산군","청양군","태안군","홍성군"];
    var area12 = ["구/군 선택","군산시","김제시","남원시","익산시","전주시","정읍시","고창군","무주군","부안군","순창군","완주군","임실군","장수군","진안군"];
    var area13 = ["구/군 선택","광양시","나주시","목포시","순천시","여수시","강진군","고흥군","곡성군","구례군","담양군","무안군","보성군","신안군","영광군","영암군","완도군","장성군","장흥군","진도군","함평군","해남군","화순군"];
    var area14 = ["구/군 선택","경산시","경주시","구미시","김천시","문경시","상주시","안동시","영주시","영천시","포항시","고령군","군위군","봉화군","성주군","영덕군","영양군","예천군","울릉군","울진군","의성군","청도군","청송군","칠곡군"];
    var area15 = ["구/군 선택","거제시","김해시","마산시","밀양시","사천시","양산시","진주시","진해시","창원시","통영시","거창군","고성군","남해군","산청군","의령군","창녕군","하동군","함안군","함양군","합천군"];
    var area16 = ["구/군 선택","서귀포시","제주시","남제주군","북제주군"];



    // 시/도 선택 박스 초기화
    $("select[name^=sido]").each(function() {
        $selsido = $(this);
        $.each(eval(area0), function() {
            $selsido.append("<option value='"+this+"'>"+this+"</option>");
        });
        $selsido.next().append("<option value=''>구/군 선택</option>");
    });

    // 시/도 선택시 구/군 설정
    $("select[name^=sido]").change(function() {
        var area = "area"+$("option",$(this)).index($("option:selected",$(this))); // 선택지역의 구군 Array
        var $gugun = $(this).next(); // 선택영역 군구 객체
        $gugun.append("<option value='"+"구/군선택"+"'>구/군 선택</option>");
        $("option",$gugun).remove(); // 구군 초기화

        if(area == "area0")
            $gugun.append("<option value=''>구/군 선택</option>");
        else {
            $.each(eval(area), function() {
                $gugun.append("<option value='"+this+"'>"+this+"</option>");
            });
        }
    });
});


function detail_on_employ(employ_num){
    detail_state=1;

    $.ajax({
        url: "/admin/admin_employ/detail?employ_num="+employ_num,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success : function (EmployDTO) {
            E=EmployDTO;
            $('input[name=번호]').val(E.num);
            $('input[name=기업명]').val(E.etp_name);
            $('input[name=제목]').val(E.title);
            $('input[name=코멘트]').val(E.content);
            $('input[name=직종]').val(E.ot);
            $('input[name=고용형태]').val(E.ep);
            $('input[name=경력]').val(E.career);
            $('input[name=학력]').val(E.education);
            $('input[name=근무지역]').val(E.area);
            $('input[name=급여]').val(E.salary+'만원');
            $('input[name=모집인원]').val(E.people+'명');
            $('input[name=지원방법]').val(E.apply);
            // start_date=String(E.start_date);
            // end_date=String(E.end_date);
            // $('input[name=모집일]').val(start_date.substring(0,10));
            // $('input[name=마감일]').val(end_date.substring(0,10));
            $('input[name=모집일]').val(E.start_date);
            $('input[name=마감일]').val(E.end_date);
            $('input[name=본문이미지]').val(E.file);
            $('input[name=업종]').val(E.etp_sector);
            $('input[name=기업형태]').val(E.etp_shape);
            $('input[name=홈페이지]').val(E.etp_home);
            $('input[name=대표번호]').val(E.etp_ph+"-"+E.etp_ph2+"-"+E.etp_ph3);
            $('input[name=대표자명]').val(E.etp_ceo_name);
            $('input[name=팩스]').val(E.etp_fx);
            $('input[name=기업아이디]').val(E.etp_id);
            $('input[name=첨부파일]').val(E.file);
        },
        error : function (error){
            alert("상세정보 로딩에 실패했습니다");
            console.log(error);
        }
    })

    $('#detail_employ').css({"visibility":"visible","opacity":"1"});
    $('#wrap,#admin_header').css("opacity","0.4");
}

function employ_detail_submit(select_modal,t){
    btn_text=$(t).text();
    let data;
    switch (btn_text) {
        case "수정" :

            conF = confirm('해당 공고를 수정하시겠습니까?');
            if (conF == true) {

                people_val = $('input[name=모집인원]').val().split('명')[0];
                salary_val = $('input[name=모집인원]').val().split('만원')[0];

                let data = {
                    etp_id: $('#etp_id').val(),
                    num: $('input[name=번호]').val(),
                    title: $('input[name=제목]').val(),
                    content: $('input[name=코멘트]').val(),
                    ot: $('input[name=직종]').val(),
                    ep: $('input[name=고용형태]').val(),
                    career: $('input[name=경력]').val(),
                    education: $('input[name=학력]').val(),
                    people: people_val,
                    start_date: $('input[name=모집일]').val(),
                    end_date: $('input[name=마감일]').val(),
                    salary: salary_val,
                    area: $('input[name=근무지역]').val(),
                    apply: $('input[name=지원방법]').val()
                }

                $.ajax({
                    url: "/rest/emSave",
                    method: 'put',
                    data: JSON.stringify(data),
                    contentType: 'application/json; charset=utf-8',
                    success: function (result) {
                        alert("수정되었습니다.");
                        submit_param();
                    },
                    error: function (err) {
                        alert("수정에 실패했습니다.");
                    }
                })
            }
            break;
        case "삭제" :
            conF = confirm('해당 공고를 삭제하시겠습니까?');
            if (conF == true) {
                num = $('#' + select_modal).find('input[name="번호"]').val();
                $.ajax({
                    url: '/rest/' + num,
                    method: 'delete',
                    success: function (result) {
                        alert("처리되었습니다.");
                        submit_param();
                    },
                    error: function (err) {
                        alert("처리에 실패했습니다.");
                    }
                })
            }
            break;
    }
}

function remote_on(t){
    $('#detail_remote').css('opacity','1');
    $('#detail_remote').css('visibility','visible');
    val_name=$(t).attr('name');
    $('#'+val_name+'_modal').css('display','block');

}
function remote_off(){
    $('#detail_remote').css('opacity','0');
    $('#detail_remote').css('visibility','hidden');
    $('.remote_modal').css('display','none');

    //값 초기화
    $('.remote_modal input').val('');
    $('.remote_modal select').val('').prop("selected", true);
    $(".remote_modal input[type=checkbox]").attr("checked", false);
    apply_index=0;
}
function modal_val(t){
    // ex) 직종_modal이 name인 것을 잘라 [직종]문자를 만들어 name이 [직종] input에 값 교체
    // 모집인원 급여 등 뒤에 [명,만원]을 덧붙이고 싶다면 추가적으로 if문 작성
    val_name=$(t).attr('name');
    val_name=val_name.split("_");
    val_name=val_name[0];
    val=$(t).val();
    $('input[name='+val_name+']').val(val);

    if(val_name=='모집인원'){
        $('input[name='+val_name+']').val(val+'명');
    }
    else if(val_name=='급여'){
        $('input[name='+val_name+']').val(val+'만원');
    }
}

//수정창 모집인원,급여 유효성검사(숫자를 쓰는것들)
$(".remote_modal input[type=text]").on("keyup", function() {
    $(this).val($(this).val().replace(/[^0-9]/g,""));
    modal_val(this);
});

//date타입 시작일,마감일
$(".remote_modal input[type=datetime-local]").change(function() {
    val_name=$(this).attr('name');
    val_name=val_name.split("_");
    val_name=val_name[0];
    val=$(this).val();
    // val=val.substring(0,10);
    $('input[name='+val_name+']').val(val);
});

//체크박스전용
let apply_index=0;
$("input[type=checkbox]").change(function() {
    val_name=$(this).attr('name');
    // alert($('input[name=지원방법_val]').index(this));  //인덱스는 제대로 잡힘
    val_name=val_name.split("_");
    val_name=val_name[0];
    val=$(this).attr('id');

    if(apply_index==0){
        $('input[name='+val_name+']').val("");
    }

    if($(this).is(":checked")==true){
        if($('input[name='+val_name+']').val()==""){
            $('input[name='+val_name+']').val(val);
        }
        else if($('input[name='+val_name+']').val()!=""){
            $('input[name='+val_name+']').val($('input[name='+val_name+']').val()+','+val);
        }
    }
    else{
        str_index=$('input[name='+val_name+']').val().eq(val);
        if(str_index==0){
            $('input[name='+val_name+']').val($('input[name='+val_name+']').val().replace(val,''));
        }
        else if(str_index>0){
            $('input[name='+val_name+']').val($('input[name='+val_name+']').val().replace(','+val,''));
        }
    }
    apply_index=1;
})