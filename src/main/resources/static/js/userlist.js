//체크박스
function selectAll(selectAll) {
    const checkboxes = document.getElementsByName('check');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAll.checked;
    })
}

//date 오늘 이번주 이번달
//search_date_num가 1==오늘 2==이번주 3==이번달 4==전체
let s_date=document.getElementsByClassName('search_date');
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
            s_date[2].value = now.toISOString().substring(0, 10);

            s_date[1].value = now.toISOString().substring(0, 10);
            s_date[3].value = now.toISOString().substring(0, 10);
            
            break;

        case 2:
            s_date[0].value = week.toISOString().substring(0, 10);
            s_date[1].value = now.toISOString().substring(0, 10);

            s_date[2].value = week.toISOString().substring(0, 10);
            s_date[3].value = now.toISOString().substring(0, 10);

            break;

        case 3:    
            s_date[0].value = month.toISOString().substring(0, 10);
            s_date[1].value = now.toISOString().substring(0, 10);

            s_date[2].value = month.toISOString().substring(0, 10);
            s_date[3].value = now.toISOString().substring(0, 10);

            break;

        case 4:
            s_date[0].value = enter.toISOString().substring(0, 10);
            s_date[1].value = now.toISOString().substring(0, 10);

            s_date[2].value = enter.toISOString().substring(0, 10);
            s_date[3].value = now.toISOString().substring(0, 10);
    }
}






//상세정보
//detailNum==1 main1_1 회원리스트 
//detailNum==2 main1_2 회원가입승인
let detailNum;
function detail(detailNum){
    if(detailNum==1){
        document.getElementsByClassName("d_button")[0].style.display="inline-block";
        document.getElementsByClassName("d_button")[1].style.display="none";
    }
    else if(detailNum==2){
        document.getElementsByClassName("d_button")[0].style.display="none";
        document.getElementsByClassName("d_button")[1].style.display="inline-block";
    }
    document.getElementById("detailBox").style.visibility="visible";
    document.getElementById("detailEnter").style.visibility="visible";

    document.getElementById("detailBox").style.opacity="1";
    document.getElementById("detailBox").style.boxShadow="0px 0px 5px 1px rgb(192, 192, 192)";
    document.getElementById("bodyWrap").style.opacity="0.3";
}


let index;
function detailClose(){
    document.getElementById("detailBox").addEventListener("click", function(e){
        index=1; 
    });
    if (index==0) { // close 가 true가 아니면 아래 코드 실행
      document.getElementById("detailBox").style.visibility="hidden";
      document.getElementById("detailEnter").style.visibility="hidden";
      document.getElementById("bodyWrap").style.opacity="1";
    }
    index=0;
}