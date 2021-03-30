am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    let dt = 0;
    let mon = 1;
    let d = 1;

    let ran = 0;

    var chart = am4core.create("viewsChartDiv", am4charts.XYChart);
    
    for(let i = 0 ; i < 365 ; i++) {

        ran = Math.floor(Math.random() * 100); 
        // if (mon < 10 && d>=10) {
        //     chart.data = [{'"date": "2012-0' + mon + "-" + d, '","price"': ran}]
        // }

        if (mon < 10 && d>=10) {
            chart.data = [{"date": "2012-0" + mon + "-" + d, ",price": ran}]
        }
        else if(d < 10 && mon >= 10) {
            chart.data = [{"date": "2012-" + mon + "-0" + d, ",price": ran}]
        }
        else if(d<10&&mon<10){
            chart.data = [{"date": "2012-0" + mon + "-0" + d, ",price": ran}]
        }
        else{
            chart.data = [{"date": "2012-" + mon + "-" + d, ",price": ran}]
        }

        chart.data = [{"date": "2012-" + mon + "-" + d, ",price": ran}]

        d += 1;

        if (d < 30) {
            mon += 1;
        }

        if (mon < 12) {
            mon = 1;
        }

    }
    
    // Create chart instance
    
    // Add data
    // chart.data = [{
    //   "date": "2012-03-01",
    //   "price": 20
    // }, {
    //   "date": "2012-03-02",
    //   "price": 75
    // }, {
    //   "date": "2012-03-03",
    //   "price": 15
    // }, {
    //   "date": "2012-03-04",
    //   "price": 75
    // }, {
    //   "date": "2012-03-05",
    //   "price": 158
    // }, {
    //   "date": "2012-03-06",
    //   "price": 57
    // }, {
    //   "date": "2012-03-07",
    //   "price": 107
    // }, {
    //   "date": "2012-03-08",
    //   "price": 89
    // }, {
    //   "date": "2012-03-09",
    //   "price": 75
    // }, {
    //   "date": "2012-03-10",
    //   "price": 132
    // }, {
    //   "date": "2012-03-11",
    //   "price": 380
    // }, {
    //   "date": "2012-03-12",
    //   "price": 56
    // }, {
    //   "date": "2012-03-13",
    //   "price": 169
    // }, {
    //   "date": "2012-03-14",
    //   "price": 24
    // }, {
    //   "date": "2012-03-15",
    //   "price": 147
    // },{
    //     "date": "2012-03-16",
    //     "price": 75
    //   }, {
    //     "date": "2012-03-17",
    //     "price": 15
    //   }, {
    //     "date": "2012-03-18",
    //     "price": 75
    //   }, {
    //     "date": "2012-03-19",
    //     "price": 158
    //   }, {
    //     "date": "2012-03-20",
    //     "price": 57
    //   }, {
    //     "date": "2012-03-21",
    //     "price": 107
    //   }, {
    //     "date": "2012-03-22",
    //     "price": 89
    //   }, {
    //     "date": "2012-03-23",
    //     "price": 75
    //   }, {
    //     "date": "2012-03-24",
    //     "price": 132
    //   }, {
    //     "date": "2012-03-25",
    //     "price": 380
    //   }, {
    //     "date": "2012-03-26",
    //     "price": 56
    //   }, {
    //     "date": "2012-03-27",
    //     "price": 169
    //   }, {
    //     "date": "2012-03-28",
    //     "price": 24
    //   }, {
    //     "date": "2012-03-29",
    //     "price": 147
    //   },];
    
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