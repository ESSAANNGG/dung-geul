var date = new Date();
date.setDate(0);
date.setMonth(-1);
var year = date.getFullYear();
year=year+1; //2020년으로 출력되어 일단 +1
var month = ("0" + (1 + date.getMonth())).slice(-2);
var day = ("0" + date.getDate()).slice(-2);

var ran = 0;    // 무작위 값 저장
var getToday;   // date, price 저장 객체

var b = 90; //분기만큼 날짜를 입력해주기 위한 변수
var quarter; //함수간의 변수 이동을 위해 전역변수 선택
//달력에서 숫자를 바꿀시 연도를 viewsChartSelsect 로 전해주는 함수
function viewsChartYearSelect(count){

    var date = new Date();
    if(count==0){
        year=year-1
    }
    else if(count==1){
        year=year+1;
    }

    date.setDate(0);
    date.setMonth(quarter); //viewsChartSelect 함수의 month값을 quarter로 받아옴    (var quarter=str;)
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    if(quarter==-1){ //1분기 선택시 총89일출력(1~3월)
    var b = 90;
    }
    else if(quarter==2){ //2분기 선택시 총91일출력(4~6월)
        var b = 91;
    }
    else if(quarter==5){ //3분기 선택시 총93일출력(7~9월)
        day=day-1; //이유는 모르겠지만 2일부터 출력되어 다시설정
        var b = 92;
    }
    else if(quarter==8){
        var b = 92;
        day=day-1; //이유는 모르겠지만 2일부터 출력되어 다시설정
    }


    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("viewsChartDiv", am4charts.XYChart);

    //31 28 31 30 31 30 31 31 30 31 30 31
    // 객체에 값 입력
    for(let i = 0 ; i < b ; i++) {    // chart.date[0] ~ chart.date[364] 
        console.log(i);

        if((month % 2 == 1 || month == 8 || month == 10 || month == 12)&&(month != 9 && month != 11)) {    // 31일 까지 있는 달
            if(day < 31) {  // 1달 = 31일
               day = parseInt(day) + 1;
            } else {            
                month = parseInt(month) + 1;    // month 변수가 string형이므로 int로 변경 후 +1
                // int형 month변수를 string으로 변경 후 0 으로 
                if (month < 10) { month = 0 + String(month) }            
                day = 1;
            }
        } else if(month == 4 || month == 6 || month == 9 || month == 11) {    // 30일 까지 있는 달
            if(day < 30) {  // 1달 = 30일
                day = parseInt(day) + 1;         
            } else {
                month = parseInt(month) + 1;    // month 변수가 string형이므로 int로 변경 후 +1          
                // int형 month변수를 string으로 변경 후 0 으로 
                if (month < 10) {month = 0 + String(month)}          
                day = 1;
            }
        } else if(month == 2){       
            if(day < 28){ // 1달 = 28일
                day = parseInt(day) + 1;
            } else {             
                month = parseInt(month) +1;
                month = 0 + String(month);
                day = 1;
            }
        }

        if(month > 12) {    // 12월 -> 1월
            month = 1;
        }
        if (day < 10) { day = 0 + String(day) } 
        getToday = year + "-" + month + "-" + day;
        ran = Math.floor(Math.random() * 100) + 1;
        data = {"date" : getToday, "price" : ran };
     
        // 출력 ---------------------------------------------------
        console.log(data)
        chart.data[i] = data;
    }


    
    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 35;
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.logarithmic = true;
    valueAxis.renderer.minGridDistance = 20;
    
    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "price";
    series.dataFields.dateX = "date";
    series.tensionX = 0.8;
    series.strokeWidth = 2;
    
    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.fill = am4core.color("#fff");
    bullet.circle.strokeWidth = 2;
    
    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.fullWidthLineX = true;
    chart.cursor.xAxis = dateAxis;
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineX.fill = am4core.color("#000");
    chart.cursor.lineX.fillOpacity = 0.1;
    
    // Add scrollbar
    chart.scrollbarX = new am4core.Scrollbar();
    
    // Add a guide
    let range = valueAxis.axisRanges.create();
    range.value = 90.4;
    range.grid.stroke = am4core.color("#396478");
    range.grid.strokeWidth = 1;
    range.grid.strokeOpacity = 1;
    range.grid.strokeDasharray = "3,3";
    range.label.inside = true;
    range.label.text = "Average";
    range.label.fill = range.grid.stroke;
    range.label.verticalCenter = "bottom";
}



//차트 select시  값을 바꿔주는 함수
function viewsChartSelect(str){ //admin파일에서 매개변수 가져옴
    var date = new Date();
    date.setDate(0);
    date.setMonth(str); //select의 value를 이용해 분기(월)를 설정
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    quarter=str; //달력수정시에 달 정보를 가져가서 쓰기위해 전역변수quarter에 업로딩해줌

    if(str==-1){ //1분기 선택시 총89일출력(1~3월)
    var b = 90;
    }
    else if(str==2){ //2분기 선택시 총91일출력(4~6월)
        var b = 91;
    }
    else if(str==5){ //3분기 선택시 총93일출력(7~9월)
        day=day-1; //이유는 모르겠지만 2일부터 출력되어 다시설정
        var b = 92;
    }
    else if(str==8){
        var b = 92;
        day=day-1; //이유는 모르겠지만 2일부터 출력되어 다시설정
    }




    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("viewsChartDiv", am4charts.XYChart);

    //31 28 31 30 31 30 31 31 30 31 30 31
    // 객체에 값 입력
    for(let i = 0 ; i < b ; i++) {    // chart.date[0] ~ chart.date[364] 
        console.log(i);

        if((month % 2 == 1 || month == 8 || month == 10 || month == 12)&&(month != 9 && month != 11)) {    // 31일 까지 있는 달
            if(day < 31) {  // 1달 = 31일
               day = parseInt(day) + 1;
            } else {     
                month = parseInt(month) + 1;    // month 변수가 string형이므로 int로 변경 후 +1
                // int형 month변수를 string으로 변경 후 0 으로 
                if (month < 10) { month = 0 + String(month) }
                day = 1;
            }
        } else if(month == 4 || month == 6 || month == 9 || month == 11) {    // 30일 까지 있는 달
            if(day < 30) {  // 1달 = 30일
                day = parseInt(day) + 1;   
            } else {
                month = parseInt(month) + 1;    // month 변수가 string형이므로 int로 변경 후 +1   
                // int형 month변수를 string으로 변경 후 0 으로 
                if (month < 10) {month = 0 + String(month)}  
                day = 1;
            }
        } else if(month == 2){
            if(day < 28){ // 1달 = 28일
                day = parseInt(day) + 1;
            } else {     
                month = parseInt(month) +1;
                month = 0 + String(month);
                day = 1;
            }
        }

        if(month > 12) {    // 12월 -> 1월
            month = 1;
        }
        if (day < 10) { day = 0 + String(day) }
        getToday = year + "-" + month + "-" + day;
        ran = Math.floor(Math.random() * 100) + 1;
        data = {"date" : getToday, "price" : ran };
 
        // 출력 ---------------------------------------------------
        console.log(data)
        chart.data[i] = data;
    }


    
    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 35;
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.logarithmic = true;
    valueAxis.renderer.minGridDistance = 20;
    
    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "price";
    series.dataFields.dateX = "date";
    series.tensionX = 0.8;
    series.strokeWidth = 2;
    
    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.fill = am4core.color("#fff");
    bullet.circle.strokeWidth = 2;
    
    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.fullWidthLineX = true;
    chart.cursor.xAxis = dateAxis;
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineX.fill = am4core.color("#000");
    chart.cursor.lineX.fillOpacity = 0.1;
    
    // Add scrollbar
    chart.scrollbarX = new am4core.Scrollbar();
    
    // Add a guide
    let range = valueAxis.axisRanges.create();
    range.value = 90.4;
    range.grid.stroke = am4core.color("#396478");
    range.grid.strokeWidth = 1;
    range.grid.strokeOpacity = 1;
    range.grid.strokeDasharray = "3,3";
    range.label.inside = true;
    range.label.text = "Average";
    range.label.fill = range.grid.stroke;
    range.label.verticalCenter = "bottom";
}





//기본으로 선택되어 있는 차트 분기는1분기 년도는 2021이 기본값
am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("viewsChartDiv", am4charts.XYChart);
    
    quarter=-1;

    function viewsChartSelect(value){
        alert("asd");
    }
    //31 28 31 30 31 30 31 31 30 31 30 31
    // 객체에 값 입력
    for(let i = 0 ; i < b ; i++) {    // chart.date[0] ~ chart.date[364] 
        console.log(i);

        if((month % 2 == 1 || month == 8 || month == 10 || month == 12)&&(month != 9 && month != 11)) {    // 31일 까지 있는 달


            if(day < 31) {  // 1달 = 31일

               day = parseInt(day) + 1;


            } else {
                
                month = parseInt(month) + 1;    // month 변수가 string형이므로 int로 변경 후 +1

                // int형 month변수를 string으로 변경 후 0 으로 
                if (month < 10) { month = 0 + String(month) }
                
                day = 1;
            }

        } else if(month == 4 || month == 6 || month == 9 || month == 11) {    // 30일 까지 있는 달

            if(day < 30) {  // 1달 = 30일

                day = parseInt(day) + 1;
                
            } else {

                month = parseInt(month) + 1;    // month 변수가 string형이므로 int로 변경 후 +1
                
                // int형 month변수를 string으로 변경 후 0 으로 
                if (month < 10) {month = 0 + String(month)}
                
                day = 1;
            }

        } else if(month == 2){
            
            if(day < 28){ // 1달 = 28일

                day = parseInt(day) + 1;

            } else {
                
                month = parseInt(month) +1;

                month = 0 + String(month);

                day = 1;
            }
        }

        


        if(month > 12) {    // 12월 -> 1월
            month = 1;
        }

        if (day < 10) { day = 0 + String(day) }
        
        getToday = year + "-" + month + "-" + day;
    
        ran = Math.floor(Math.random() * 100) + 1;
    
        data = {"date" : getToday, "price" : ran };
 

        
        // 출력 ---------------------------------------------------
        console.log(data)



        chart.data[i] = data;
    }


    
    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 35;
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.logarithmic = true;
    valueAxis.renderer.minGridDistance = 20;
    
    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "price";
    series.dataFields.dateX = "date";
    series.tensionX = 0.8;
    series.strokeWidth = 2;
    
    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.fill = am4core.color("#fff");
    bullet.circle.strokeWidth = 2;
    
    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.fullWidthLineX = true;
    chart.cursor.xAxis = dateAxis;
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineX.fill = am4core.color("#000");
    chart.cursor.lineX.fillOpacity = 0.1;
    
    // Add scrollbar
    chart.scrollbarX = new am4core.Scrollbar();
    
    // Add a guide
    let range = valueAxis.axisRanges.create();
    range.value = 90.4;
    range.grid.stroke = am4core.color("#396478");
    range.grid.strokeWidth = 1;
    range.grid.strokeOpacity = 1;
    range.grid.strokeDasharray = "3,3";
    range.label.inside = true;
    range.label.text = "Average";
    range.label.fill = range.grid.stroke;
    range.label.verticalCenter = "bottom";
    
    }); // end am4core.ready()