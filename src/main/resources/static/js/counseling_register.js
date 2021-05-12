function submit(){

let type = $('.consult_type_val').val();
let name = $('.consult_name_val').val();
alert(type);
alert(name);
let registerData;
registerData="{type:" + type + ", name:" + name + "}";
$.ajax({
         url: "dsadsadsadsadsa",
         type: "POST",
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         data: JSON.stringify(registerData),
            })
}