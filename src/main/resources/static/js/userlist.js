// $('input:checkbox[name="allcheck"]').is(":checked") == true{
//     $('input:checkbox[name="check"]').each(function(){
//         this.checked = true;
//     });
// }

// $('input:checkbox[name="check"]').each(function() {

//     this.checked = true; //checked 처리

//     if(this.checked){//checked 처리된 항목의 값

//           alert(this.value); 

//     }

// });

// $('input:checkbox[name="allcheck"]').attr("checked", true);
// $('input:checkbox[name="allcheck"]').prop('checked',true);
// $(document).ready(function () {
//     $('#allcheck').click(function(){
//         var checked = $('#check').is(':checked');
        
//         if(checked)
//             $('input:checkbox').prop('checked',true);
//     });
    
// })


// var allcheck = document.getElementById("allcheck");
// var check = document.getElementsByClassName("check");

// allcheck.addEventListener('click', function(){
//     //checked 제어
//      check[5].checked = true;
// });

function selectAll(selectAll) {
    const checkboxes = document.getElementsByName('check');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAll.checked;
    })
}