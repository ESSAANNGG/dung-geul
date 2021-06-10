function submit(){
    $.ajax({
        url: "/job-information/job-dictionary",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(),
    })
}