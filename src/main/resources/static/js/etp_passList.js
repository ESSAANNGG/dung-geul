let Pass = {
  init: function () {
    // 회원가입
    $('#Pass').on('click', event => {
      event.preventDefault();
      this.save();
    });
  },

  save: function () {
    // 회원별 값 다르게 받기

    // 기본적으로 모든 회원이 다 받는 데이터
    let obj = $('[name=APY_CHK]');
    let data1 = new Array();

    $('input:checkbox[name=APY_CHK]:checked').each(function () {
      // 체크된 체크박스의 value 값을 가지고 온다.
      data1.push(this.value);
    });

    // 데이터 전송 ajax
    $.ajax({
      type: 'POST',
      url: '/application/apply?pass=합격',
      data: JSON.stringify(data1),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (result) {
        alert('합격');
        console.log(data1);
      },
      error: function (error) {
        alert('합격실패');
        console.log(data1);
      },
    });
  }, // save() end
};

Pass.init();


let Fail = {
  init: function () {
    // 회원가입
    $('#Fail').on('click', event => {
      event.preventDefault();
      this.save();
    });
  },

  save: function () {
    // 회원별 값 다르게 받기

    // 기본적으로 모든 회원이 다 받는 데이터
    let obj = $('[name=APY_CHK]');
    let data2 = new Array();

    $('input:checkbox[name=APY_CHK]:checked').each(function () {
      // 체크된 체크박스의 value 값을 가지고 온다.
      data2.push(this.value);
    });

    // 데이터 전송 ajax
    $.ajax({
      type: 'POST',
      url: '/application/apply?pass=불합격',
      data: JSON.stringify(data2),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (result) {
        alert('불합격');
        console.log(data2);
      },
      error: function (error) {
        alert('불합격실패');
        console.log(data2);
      },
    });
  }, // save() end
};

Fail.init();