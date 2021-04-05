am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    var chart = am4core.create("grade_user_chartDiv", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    
    chart.data = [
      {
        country: "컴퓨터정보계열",
        litres: 200.9
      },
      {
        country: "컴퓨터응용기계계열",
        litres: 100
      },
      {
        country: "ICT반도체전자계열",
        litres: 201.1
      },
      {
        country: "신재생에너지전기계열",
        litres: 165.8
      },
      {
        country: "건축인테리어디자인계열",
        litres: 139.9
      },
      {
        country: "부사관계열",
        litres: 128.3
      },
      {
        country: "콘텐츠디자인과",
        litres: 128.3
      },
      {
        country: "드론항공전자과",
        litres: 128.3
      },
      {
        country: "경영회계서비스계열",
        litres: 128.3
      },
      {
        country: "호텔항공관광계열",
        litres: 128.3
      },
      {
        country: "사회복지과",
        litres: 128.3
      },
      {
        country: "유아교육과",
        litres: 128.3
      },
      {
        country: "보건의료행정과",
        litres: 128.3
      },
      {
        country: "간호학과",
        litres: 128.3
      }
    ];
    
    chart.innerRadius = am4core.percent(40);
    chart.depth = 60;
    
    chart.legend = new am4charts.Legend();
    
    var series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.depthValue = "litres";
    series.dataFields.category = "country";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;
    
    }); // end am4core.ready()










    // {
    //   country: "컴퓨터정보계열",
    //   litres: 200.9
    // },
    // {
    //   country: "컴퓨터응용기계계열",
    //   litres: 100
    // },
    // {
    //   country: "ICT반도체전자계열",
    //   litres: 201.1
    // },
    // {
    //   country: "신재생에너지전기계열",
    //   litres: 165.8
    // },
    // {
    //   country: "건축인테리어디자인계열",
    //   litres: 139.9
    // },
    // {
    //   country: "부사관계열",
    //   litres: 128.3
    // },
    // {
    //   country: "콘텐츠디자인과",
    //   litres: 128.3
    // },
    // {
    //   country: "드론항공전자과",
    //   litres: 128.3
    // },
    // {
    //   country: "경영회계서비스계열",
    //   litres: 128.3
    // },
    // {
    //   country: "호텔항공관광계열",
    //   litres: 128.3
    // },
    // {
    //   country: "사회복지과",
    //   litres: 128.3
    // },
    // {
    //   country: "유아교육과",
    //   litres: 128.3
    // },
    // {
    //   country: "보건의료행정과",
    //   litres: 128.3
    // },
    // {
    //   country: "간호학과",
    //   litres: 128.3
    // }