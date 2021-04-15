$(document).ready(function () {


    //채용 글등록 
    $('#emReg').on('click', function () {
        let data = {
            title: $('#em_title').val(),
            content : $('#em_content').val(),
            file : $('#fileName)'.val()

        }
        console.log(data);
        $.ajax({
            data : JSON.stringify(data), //서버로 보낼 데이터입니다. HTTP 메소드가 GET과 같은 엔티티 본문을 가질 수없는 메소드 인 경우 데이터가 URL에 추가됩니다.
            method: 'POST', // method (default: 'GET'), 요청에 사용할 HTTP 메소드 (예 : "POST", "GET", "PUT").
            //type : 'POST' 메서드의 별칭입니다. 1.9.0 이전의 jQuery 버전을 사용하는 경우 type을 사용해야합니다.
            url : '/rest/emReg',  //url: 요청이 전송되는 URL이 포함 된 문자열입니다.
            contentType: 'application/json; charset=utf-8',
            enctype:'multipart/form-data'
            // dataType (default: Intelligent Guess (xml, json, script, or html))  // JSON : 응답을 JSON으로 평가하고 JavaScript 객체를 반환합니다
        }).done(function () {
           location.href = '/Employ/list';
        }).fail(function (error) {
            alert(JSON.stringify(error));
        })
    });
    
    //채용 글 삭제
    $('#emRemove').on('click', function () {

        let num = $('#num').val();
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
            num : $('#num').val(),
            name : $('#name').val(),
            title: $('#title').val(),
            content : $('#content').val()
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

    let searchForm = $("#searchForm");

    $('.btn-search').click(function(e){

        searchForm.submit();
    });

    $('.btn-clear').click(function(e){

        searchForm.empty().submit();
    })

});

let stateBtn = document.getElementsByClassName("state"); //0==구직중 1==마감
function underway(){
    stateBtn[0].style.border="2px solid #2062af";
    stateBtn[0].style.zIndex = 1;
    stateBtn[1].style.border="2px solid #c0c0c4";
    stateBtn[1].style.zIndex = 0;
}
function deadline(){
    stateBtn[1].style.border="2px solid #feb522";
    stateBtn[1].style.zIndex = 1;
    stateBtn[0].style.border="2px solid #c0c0c4";
    stateBtn[0].style.zIndex = 0;
}



//공고등록 > 페이지 이동하는 함수
p1=document.getElementById('employ_register1');
p2=document.getElementById('employ_register2');
p3=document.getElementById('employ_register3');
function pageMov(i){
    window.scrollTo(0,0);
    if (i==2){
        $('#employ_register2').show();//2페이지로 교체후
        $('.content').hide();//
        $('.content').slideDown('slow');
        p1.style.display="none"; //위처럼 jquery로 써도됨
        // p3.style.display="none";
    }
    else if(i==1){
        console.log("aa");
        $('#employ_register1').show();//1페이지로 교체후
        $('.content').hide();//
        $('.content').slideDown('slow');
        p2.style.display="none"; //위처럼 jquery로 써도됨
        // p3.style.display="none";
    }
}



let cont_func_index=0;
//본문 내용 자르는 함수
function post_cont_sub_func(){
    let post_cont = document.getElementsByClassName("post_cont")[cont_func_index];
    post_cont_txt=post_cont.innerText;                             //text값을 받아와서 txt에 담음
    if(post_cont_txt.length > 20){                                //내용이길다면 sub변수에 substr를 이용해 간추림
        var post_cont_sub=post_cont_txt.substr(0,20)+"...";
        post_cont.innerText=post_cont_sub;                                        //text 설정
    }

    cont_func_index=cont_func_index+1; //리스트가 있는 만큼 함수를 적용하기 위해 본문의 for문이 실행될때마다 클래스참조값+1
}


//모집인원 유효성검사
function checkNumber(event) {
    var key = event.key;
    var num = /^[0-9]*$/;

    if( key.check(num) ){
        return true;
    }
    else {
        return false;
    }
}

let f="addSub";
let length;
function Apply(f){
    var wrap = document.getElementsByClassName('register_file_wrap');
    var wrapH=wrap[0].offsetHeight;
    length=$('.register_file_ul').children().length;
    //length=$('.register_addApply_li').length; <<으로하니 계속 1,0 값만 생김
    if(f=='add'){
        if(length>4){
            alert("첨부파일은 최대5개까지 가능합니다")
            return;
        }
        wrap[0].style.height=wrapH+40+'px';                    /* 아이디와 함수로 전해줄 인덱스값 length를 이용해 만들어 구분*/
        $('.register_file_ul').append('<li><input type="text" id="fileName' + (length+1) + '" placeholder="추가로 기재할 이력서 양식 등 기타 첨부파일을 올려주세요" readonly><input type="file" onchange="fileChange(this.value,'+ (length+1) +')"></li>' );
    }
    else{
        if(length==1){
            return;
        }
        wrap[0].style.height=wrapH+(-40)+'px';
        $('.register_file_ul').children().last().remove();
    }
};


//첨부파일 값을 inputText 로 이동
function fileChange(value,b){
    let fileName=document.getElementById('fileName'+b);
    fileName.value=value;
}





//공고등록 > 지역선택
$('document').ready(function() {
    var area0 = ["시/도 선택","서울특별시","인천광역시","대전광역시","광주광역시","대구광역시","울산광역시","부산광역시","경기도","강원도","충청북도","충청남도","전라북도","전라남도","경상북도","경상남도","제주도"];
    var area1 = ["강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"];
    var area2 = ["계양구","남구","남동구","동구","부평구","서구","연수구","중구","강화군","옹진군"];
    var area3 = ["대덕구","동구","서구","유성구","중구"];
    var area4 = ["광산구","남구","동구",     "북구","서구"];
    var area5 = ["남구","달서구","동구","북구","서구","수성구","중구","달성군"];
    var area6 = ["남구","동구","북구","중구","울주군"];
    var area7 = ["강서구","금정구","남구","동구","동래구","부산진구","북구","사상구","사하구","서구","수영구","연제구","영도구","중구","해운대구","기장군"];
    var area8 = ["고양시","과천시","광명시","광주시","구리시","군포시","김포시","남양주시","동두천시","부천시","성남시","수원시","시흥시","안산시","안성시","안양시","양주시","오산시","용인시","의왕시","의정부시","이천시","파주시","평택시","포천시","하남시","화성시","가평군","양평군","여주군","연천군"];
    var area9 = ["강릉시","동해시","삼척시","속초시","원주시","춘천시","태백시","고성군","양구군","양양군","영월군","인제군","정선군","철원군","평창군","홍천군","화천군","횡성군"];
    var area10 = ["제천시","청주시","충주시","괴산군","단양군","보은군","영동군","옥천군","음성군","증평군","진천군","청원군"];
    var area11 = ["계룡시","공주시","논산시","보령시","서산시","아산시","천안시","금산군","당진군","부여군","서천군","연기군","예산군","청양군","태안군","홍성군"];
    var area12 = ["군산시","김제시","남원시","익산시","전주시","정읍시","고창군","무주군","부안군","순창군","완주군","임실군","장수군","진안군"];
    var area13 = ["광양시","나주시","목포시","순천시","여수시","강진군","고흥군","곡성군","구례군","담양군","무안군","보성군","신안군","영광군","영암군","완도군","장성군","장흥군","진도군","함평군","해남군","화순군"];
    var area14 = ["경산시","경주시","구미시","김천시","문경시","상주시","안동시","영주시","영천시","포항시","고령군","군위군","봉화군","성주군","영덕군","영양군","예천군","울릉군","울진군","의성군","청도군","청송군","칠곡군"];
    var area15 = ["거제시","김해시","마산시","밀양시","사천시","양산시","진주시","진해시","창원시","통영시","거창군","고성군","남해군","산청군","의령군","창녕군","하동군","함안군","함양군","합천군"];
    var area16 = ["서귀포시","제주시","남제주군","북제주군"];



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



