    // Add data
    var monthArr = [12];
    monthArr[0] = "1월";
    monthArr[1] = "2월";
    monthArr[2] = "3월";
    monthArr[3] = "4월";
    monthArr[4] = "5월";
    monthArr[5] = "6월";
    monthArr[6] = "7월";
    monthArr[7] = "8월";
    monthArr[8] = "9월";
    monthArr[9] = "10월";
    monthArr[10] = "11월";
    monthArr[11] = "12월";

    var ran = 0;
    var visitsArr = [12];



am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("joinChartdiv", am4charts.XYChart);
    // Themes end

    for(let i=0; i<12; i++){
        ran = Math.floor(Math.random() * 1000);
        visitsArr[i] = ran;

        data = {"month": monthArr[i],
                "visits": visitsArr[i]}
        chart.data[i] = data;
    }


    // var visitsArr = [12];
    // visitsArr[0] = ran;
    // visitsArr[1] = ran;
    // visitsArr[2] = ran;
    // visitsArr[3] = 1;
    // visitsArr[4] = 1;
    // visitsArr[5] = 1;
    // visitsArr[6] = 1;
    // visitsArr[7] = 1;
    // visitsArr[8] = 1;
    // visitsArr[9] = 1;
    // visitsArr[10] = 1;
    // visitsArr[11] = 1;
    // chart.data = [{
    //     "month": monthArr[0],
    //     "visits": visitsArr[0]
    // }, {
    //     "month": monthArr[1],
    //     "visits": visitsArr[1]
    // }, {
    //     "month": monthArr[2],
    //     "visits": 400
    // }, {
    //     "month": monthArr[3],
    //     "visits": 250
    // }, {
    //     "month": monthArr[4],
    //     "visits": 220
    // }, {
    //     "month": monthArr[5],
    //     "visits": 109
    // }, {
    //     "month": monthArr[6],
    //     "visits": 99
    // }, {
    //     "month": monthArr[7],
    //     "visits": 55
    // }, {
    //     "month": monthArr[8],
    //     "visits": 55
    // }, {
    //     "month": monthArr[9],
    //     "visits": 44
    // }, {
    //     "month": monthArr[10],
    //     "visits": 33
    // }, {
    //     "month": monthArr[11],
    //     "visits": 22
    // }];
    
    // Create axes
    
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "month";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    
    // categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
    //   if (target.dataItem && target.dataItem.index & 2 == 2) {
    //     return dy + 25;
    //   }
    //   return dy;
    // });
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "month";
    series.name = "Visits";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;
    
    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

    
}); // end am4core.ready()





function joinChartYearSelect(count){

        // Themes begin
        am4core.useTheme(am4themes_material);
        am4core.useTheme(am4themes_animated);
        var chart = am4core.create("joinChartdiv", am4charts.XYChart);

    
    for(let i=0; i<12; i++){
        ran = Math.floor(Math.random() * 1000);
        visitsArr[i] = ran;

        data = {"month": monthArr[i],
                "visits": visitsArr[i]}
        chart.data[i] = data;
    }

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "month";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    
    // categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
    //   if (target.dataItem && target.dataItem.index & 2 == 2) {
    //     return dy + 25;
    //   }
    //   return dy;
    // });
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "month";
    series.name = "Visits";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;
    
    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

    }

