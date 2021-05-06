$(document).ready(function (){
    $('#conReg').on('click', function (){
        let ap = '';
        $('input[type="checkbox"]:checked').each(function(index){
            if(index != 0){
                ap += ',';
            }
            ap += $(this).val();
        })
        let data = {
            consult_field : $('#Consult_field').val(),
            consult_detail_field: $('#Consult_detail_field').val(),
        }
        console.log(data);

        $.ajax({
            data : JSON.stringify(data),
            method: 'GET',

            url: 'rest/conReg',
            contentType: 'application/json; charset=utf-8',
        }).done(function () {
            location.href= '/counseling/counseling';
        }).fail(function (error){
            console.log(error);
            alert(JSON.stringify(error));
        })
    })
})