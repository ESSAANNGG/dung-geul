//체크박스
function selectAll(selectAll) {
    const checkboxes = document.getElementsByName('check');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAll.checked;
    })
}

// //구분해서 검색 ajax
// function select() {
//     var job = document.getElementsByName("job")[0].value;  //name은 중복될수 있어서[n] 추가
//     alert(job);

//     var i_n = document.getElementsByName("i_n")[0].value;
//     if(i_n=="아이디"){
//         var i_n_text = document.getElementsByName("i_n_text")[0].value;
//         alert(i_n_text);
//     }
//     else if(i_n=="이름"){
//         var i_n_text = document.getElementsByName("i_n_text")[0].value;
//         alert(i_n_text);
//     }

//     $.ajax({
//         url:"userSelectUrl.do",
//         type:'GET',
//         data: allData,
//         success:function(data){
//             alert("완료!");
//             window.opener.location.reload();
//             self.close();
//         },
//         error:function(jqXHR, textStatus, errorThrown){
//             alert("에러 발생~~ \n" + textStatus + " : " + errorThrown);
//             self.close();
//         }
//     });
// }


function detail(){
    document.getElementsByClassName("detailBox")[0].style.visibility="visible";
    document.getElementsByClassName("detailEnter")[0].style.visibility="visible";

    document.getElementsByClassName("detailBox")[0].style.opacity="1";
    document.getElementsByClassName("detailBox")[0].style.boxShadow="0px 0px 1px 1px rgb(192, 192, 192)";
    document.getElementsByClassName("bodyLap")[0].style.opacity="0.4";

}


let index;
function detailClose(){
    document.getElementsByClassName("detailBox")[0].addEventListener("click", function(e){
        index=1; 
    });
    if (index==0) { // close 가 true가 아니면 아래 코드 실행
      document.getElementsByClassName("detailBox")[0].style.visibility="hidden";
      document.getElementsByClassName("detailEnter")[0].style.visibility="hidden";
      document.getElementsByClassName("bodyLap")[0].style.opacity="1";
    }
    index=0;
}




//     window.onload = function(){
//     document.getElementsByClassName("detailEnter")[0].addEventListener("click", function(e){
//     document.getElementsByClassName("detailBox")[0].style.visibility="hidden";
//     document.getElementsByClassName("detailEnter")[0].style.visibility="hidden";

//     document.getElementsByClassName("bodyLap")[0].style.opacity="1";
//   });
// }





