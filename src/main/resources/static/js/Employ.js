$(document).ready(function () {
    //채용 글등록
    $('#emReg').on('click', function () {
        let ap = '';
        $('input[type="checkbox"]:checked').each(function(index){
            if(index != 0){
                ap += ',';
            }
            ap += $(this).val();
        })

        let data = {
            title: $('#em_title').val(),
            content : $('#em_content').val(),
            ot : $('#em_ot').val(),
            ep : $('input[name="고용형태"]:checked').val(),
            start_date : $('#em_start_date').val(),
            end_date : $('#em_end_date').val(),
            people: $('#em_people').val(),
            career : $('input[name="career"]:checked').val(),
            education : ed,
            area : $('#em_sido').val()+'/'+$('#em_gugun').val(),
            salary : $('#em_salary').val(),
            apply :   ap,
            file : $('#em_file').val(),
            etp_id : $("#em_id").val()
        }
        console.log(data);
        $.ajax({
            data : JSON.stringify(data), //서버로 보낼 데이터입니다. HTTP 메소드가 GET과 같은 엔티티 본문을 가질 수없는 메소드 인 경우 데이터가 URL에 추가됩니다.
            method: 'POST', // method (default: 'GET'), 요청에 사용할 HTTP 메소드 (예 : "POST", "GET", "PUT").
            //type : 'POST' 메서드의 별칭입니다. 1.9.0 이전의 jQuery 버전을 사용하는 경우 type을 사용해야합니다.
            url : '/rest/emReg',  //url: 요청이 전송되는 URL이 포함 된 문자열입니다.
            contentType: 'application/json; charset=utf-8',
            // dataType (default: Intelligent Guess (xml, json, script, or html))  // JSON : 응답을 JSON으로 평가하고 JavaScript 객체를 반환합니다
        }).done(function () {
            location.href = '/Employ/list';
        }).fail(function (error) {
            alert(JSON.stringify(error));
        })
    });

    //채용 글 삭제
    $('#emRemove').on('click', function () {

        let num = $('#em_num').val();
        console.log(num);
        $.ajax({
            url: '/rest/' + num ,
            method: 'delete'
        }).done(function () {
            location.href = '/Employ/list';
        }).fail(function (error) {
            console.log(error);
            alert(JSON.stringify(error));
        })
    });

    $('#emModify').on('click', function () {
        $('#title').attr('readonly',false);
    });

    // 채용 글 수정
    $('#emSave').on('click', function() {



        let data = {
            num : $('#em_num').val(),
            title: $('#em_title').val(),
            content : $('#em_content').val(),
            ot : $('#em_ot').val(),
            etp_id : $("#em_id").val()
        }

        console.log(data);
        $.ajax({
            url : "/rest/emSave",
            method: 'put',
            data : JSON.stringify(data),
            contentType: 'application/json; charset=utf-8,'
        }).done(function () {
            location.href = '/Employ/list';
        }).fail(function (error) {
            alert(JSON.stringify(error));
        })
    });

    let search_val;
    let keywords=[];
    let parameter="/Employ/list?page=1";
    $('.btn-search').click(function(e){
        for(j=0; j<9; j++){
            keywords[j]="&keywords="
        }
            for (i=0; i<7; i++) {
                search_val=$(".search").eq(i).val();
                // alert(search_val);
                search_valF(i);
            }
        location.href = search_parameter;
    });
    function search_valF(i){
        if(search_val==""||search_val=="시/도 선택"||search_val=="구/군 선택"||search_val=="직종"||search_val=="고용구분"||search_val=="기업구분"){
            switch (i){
                case 0: search_parameter=parameter+"&keywords=";
                    break;
                case 1: search_parameter+="&keywords=";
                    break;
                case 2: search_parameter+="&keywords=";
                    break;
                case 3: search_parameter+="&keywords=";
                    break;
                case 4: search_parameter+="&keywords=";
                    break;
                case 5: search_parameter+="&keywords=&sido=";
                    break;
                case 6: search_parameter+="&keywords=&keywords=";
                    break;
            }
        }
        else{
            switch (i){
                case 0: search_parameter=parameter+keywords[0]+search_val+"&type=t";
                    break;
                case 1: search_parameter+=keywords[1]+search_val+"&type=w";
                    break;
                case 2: search_parameter+=keywords[2]+search_val+"&type=ot";
                    break;
                case 3: search_parameter+=keywords[3]+search_val+"&type=ep";
                    break;
                case 4: search_parameter+=keywords[4]+search_val+"&type=shape";
                    break;
                case 5: search_parameter+=keywords[5]+search_val+"&type=sido";
                    break;
                case 6: search_parameter+=keywords[6]+search_val+"&type=gugun&keywords=&keywords=";
                    break;
            }
        }

    }

    $('.btn-clear').click(function(e){

        location.replace('/Employ/list');
    })

    $('#s_area').on("change", function() {
        $("#sido_keywords").val($(this).val());
    });

    $('#s_detailArea').on("change", function() {
        $("#gugun_keywords").val($(this).val());
    });

});


//채용리스트 > 채용공고즐겨찾기 (임시용)
// function employ_marking(this){
//     this.color:"red";
// }
//채용리스트 > 해시태그 선택
function h_tag_js(tag_num) {
    let search=document.getElementsByClassName("search");
    $(".search").css("display","none");
    switch (tag_num){
        case 1:
            search[0].style.display="inline-block"; //#제목
            $("#head_tag h2").text("제목");
            break;
        case 2:
            search[1].style.display="inline-block"; //#기업
            $("#head_tag h2").text("기업");
            break;
        case 3:
            search[2].style.display="inline-block"; //#직종
            $("#head_tag h2").text("직종");
            break;
        case 4:
            search[3].style.display="inline-block"; //#고용구분
            $("#head_tag h2").text("고용구분");
            break;
        case 5:
            search[4].style.display="inline-block"; //#기업구분
            $("#head_tag h2").text("기업구분");
            break;
        case 6:
            search[5].style.display="inline-block"; //#근무지역
            search[6].style.display="inline-block"; //#근무지역
            $("#head_tag h2").text("근무지역");
            break;
    }
}

//채용리스트 > 해시태그 값 보내기
$(document).ready(function(){
    $("#s_title").on("keyup", function() {
        searchVal("title");
    });
    $("#s_corp").on("keyup", function() {
        searchVal("corp");
    });
});


//채용리스트 > 해시태그 값 보내기
let sel;
let val;
function searchVal(sel){
    let search=document.getElementsByClassName("search");
    switch (sel){
        case 'title':
            val=(search[0].value);
            $("#h_title").text("#"+val);
            $("#dummy_title").prop("checked",true); //안보이는 체크박스에 체크를 하여 백에서 검색타입을 정하기 쉽게 하기 위함
            if(val==""){
                $("#h_title").text("#제목");
                $("#h_title").css("color","#000000");
                $("#dummy_title").prop("checked",false);
            }
            else{
                $("#h_title").css("color","#3498db");
            }
            break;
        case 'corp':
            val=(search[1].value);
            $("#h_corp").text("#"+val);
            $("#dummy_corp").prop("checked",true); //안보이는 체크박스에 체크를 하여 백에서 검색타입을 정하기 쉽게 하기 위함
            if(val==""){
                $("#h_corp").text("#기업");
                $("#h_corp").css("color","#000000");
                $("#dummy_corp").prop("checked",false)
            }
            else{
                $("#h_corp").css("color","#3498db");
            }
            break;
        case 'ot':
            val=(search[2].value);
            $("#h_ot").text("#"+val);
            if(val!="직종") {
                $("#dummy_ot").prop("checked", true); //안보이는 체크박스에 체크를 하여 백에서 검색타입을 정하기 쉽게 하기 위함
                $("#h_ot").css("color","#3498db");
            }
            else if(val=="직종"){
                $("#dummy_ot").prop("checked", false); //안보이는 체크박스에 체크를 하여 백에서 검색타입을 정하기 쉽게 하기 위함
                $("#h_ot").css("color","#000000");

            }
            break;
        case 'ep':
            val=(search[3].value);
            $("#h_ep").text("#"+val);
            if(val!="고용구분") {
                $("#dummy_ep").prop("checked", true); //안보이는 체크박스에 체크를 하여 백에서 검색타입을 정하기 쉽게 하기 위함
                $("#h_ep").css("color","#3498db");
            }
            else if(val=="고용구분"){
                $("#dummy_ep").prop("checked", false); //안보이는 체크박스에 체크를 하여 백에서 검색타입을 정하기 쉽게 하기 위함
                $("#h_ep").css("color","#000000");
            }
            break;
        case 'shape':
            val=(search[4].value);
            $("#h_shape").text("#"+val);
            if(val!="기업구분") {
                $("#dummy_shape").prop("checked", true); //안보이는 체크박스에 체크를 하여 백에서 검색타입을 정하기 쉽게 하기 위함
                $("#h_shape").css("color","#3498db");
            }
            else if(val=="기업구분"){
                $("#dummy_shape").prop("checked", false); //안보이는 체크박스에 체크를 하여 백에서 검색타입을 정하기 쉽게 하기 위함
                $("#h_shape").css("color","#000000");
            }
            break;
        case 'area':
            setTimeout(function() {
                val=(search[5].value)+" ";

                if(val!="시/도 선택 ") {
                    $("#dummy_area").prop("checked", true); //안보이는 체크박스에 체크를 하여 백에서 검색타입을 정하기 쉽게 하기 위함
                    $("#h_area").css("color","#3498db");
                }
                else if(val=="시/도 선택 "){
                    $("#dummy_area").prop("checked", false); //안보이는 체크박스에 체크를 하여 백에서 검색타입을 정하기 쉽게 하기 위함
                    $("#h_area").css("color","#000000");
                }

                if((search[6].value)=="구/군 선택"){
                    $("#dummy_detailArea").prop("checked", false); //안보이는 체크박스에 체크를 하여 백에서 검색타입을 정하기 쉽게 하기 위함
                }
                else{
                    val=val+(search[6].value);
                    $("#dummy_detailArea").prop("checked", true); //안보이는 체크박스에 체크를 하여 백에서 검색타입을 정하기 쉽게 하기 위함
                }
                $("#h_area").text("#"+val);

            }, 100);
            break;
    }
}

let cont_func_index=0;
//채용리스트 > 본문 내용 자르는 함수
function post_cont_sub_func(){
    let post_cont = document.getElementsByClassName("post_cont")[cont_func_index];
    post_cont_txt=post_cont.innerText;                             //text값을 받아와서 txt에 담음
    if(post_cont_txt.length > 70){                                //내용이길다면 sub변수에 substr를 이용해 간추림
        var post_cont_sub=post_cont_txt.substr(0,70)+"...";
        post_cont.innerText=post_cont_sub;                                        //text 설정
    }

    cont_func_index=cont_func_index+1; //리스트가 있는 만큼 함수를 적용하기 위해 본문의 for문이 실행될때마다 클래스참조값+1
}



//공고등록 > 모집인원,급여 유효성검사
$(document).ready(function(){
    $("#em_people").on("keyup", function() {
        if(isNaN($(this).val())){
            let error = document.getElementsByClassName("register_TO_error")[0].style.display="inline-block"; //jquery로 안한 이유는 인라인블록을 안하니 망가져서
            $('.register_TO_error').fadeOut(3000);
        }
        $(this).val($(this).val().replace(/[^0-9]/g,""));
    });

    $("#em_salary").on("keyup", function() {
        if(isNaN($(this).val())){
            let error = document.getElementsByClassName("register_salary_error")[0].style.display="inline-block"; //jquery로 안한 이유는 인라인블록을 안하니 망가져서
            $('.register_salary_error').fadeOut(3000);
        }
        $(this).val($(this).val().replace(/[^0-9]/g,""));
    });
});

//공고등록 > 학력 변수
let ed;
//학력 input 제어
function eduFunc(){

    if($("#education").is(":checked")){
        $('#em_education').prop('disabled', 'true');
        ed = $('#education').val();
    }
    else{
        $('#em_education').removeAttr("disabled");
        ed = $('#em_education').val(); //select값 변경없이 체크 해제후 바로 사용할때 필요
    }
}
//값 선택할때마다 변수에 값이 들어가게
function selectValChange(){
    ed = $('#em_education').val();
}



//공고등록 > 첨부파일등록
// let f="addSub";
// let length;
// function Apply(f){
//     var wrap = document.getElementsByClassName('register_file_wrap');
//     var wrapH=wrap[0].offsetHeight;
//     length=$('.register_file_ul').children().length;
//     if(f=='add'){
//         if(length>4){
//             alert("첨부파일은 최대5개까지 가능합니다")
//             return;
//         }
//         wrap[0].style.height=wrapH+40+'px';                    /* 아이디와 함수로 전해줄 인덱스값 length를 이용해 만들어 구분*/
//         $('.register_file_ul').append('<li><input type="text" id="fileName' + (length+1) + '" placeholder="추가로 기재할 이력서 양식 등 기타 첨부파일을 올려주세요" readonly><input type="file" onchange="fileChange(this.value,'+ (length+1) +')"></li>' );
//     }
//     else{
//         if(length==1){
//             return;
//         }
//         wrap[0].style.height=wrapH+(-40)+'px';
//         $('.register_file_ul').children().last().remove();
//     }
// };

//공고등록 > 첨부파일 값을 inputText 로 이동
function fileChange(value,b){
    let fileName=document.getElementById('fileName'+b);
    fileName.value=value;
}




//공고등록 > 지역선택
$('document').ready(function() {
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


//채용공고 상세페이지 > 온라인지원 창
// let apply=document.getElementById("apply_submit");
function apply_open(){
    // $('#id').css("display", "none");
    $("#apply_submit").css("display", "block");

    $("#main").css("opacity","0.4");
}
function apply_close(){
    $("#apply_submit").css("display", "none");

    $("#main").css("opacity","1");
}


