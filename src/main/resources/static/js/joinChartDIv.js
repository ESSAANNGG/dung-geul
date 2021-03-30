am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("joinChartdiv", am4charts.XYChart);
    
    // Add data
    chart.data = [{
        "month": "1월",
        "visits": 105
    }, {
        "month": "2월",
        "visits": 105
    }, {
        "month": "3월",
        "visits": 400
    }, {
        "month": "4월",
        "visits": 250
    }, {
        "month": "5월",
        "visits": 220
    }, {
        "month": "6월",
        "visits": 109
    }, {
        "month": "7월",
        "visits": 99
    }, {
        "month": "8월",
        "visits": 55
    }, {
        "month": "9월",
        "visits": 55
    }, {
        "month": "10월",
        "visits": 44
    }, {
        "month": "11월",
        "visits": 33
    }, {
        "month": "12월",
        "visits": 22
    }];
    
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