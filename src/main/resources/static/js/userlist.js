let listNum = new Array(); 

for(let i=0;i<30;i++){
    listNum[i]=i;
}

function testInnerHTML(){

    var str = "";
    
    str +=  "<table>";
    
    str +=  "<tr>";
    
    str +=  "<td>";
    
    str +=  "HTML 태그를 삽입할 수 있습니다.";
    
    str +=  "</td>";
    
    str +=  "</tr>";
    
    str +=  "</table>";
    
    document.getElementById("inHere").innerHTML = str;
}