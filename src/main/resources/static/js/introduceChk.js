//textarea 동적 크기변경
function resize(obj) {
  obj.style.height = '1px';
  obj.style.height = 12 + obj.scrollHeight + 'px';
}

// 자소서 항목당 글자수 체크

$('.DOC_TEXT').keyup(function (e) {
  var content = $(this).val();
  $('#counter').html('(' + content.length + ' / 최대 1000자)'); //글자수 실시간 카운팅

  if (content.length > 999) {
    alert('최대 1000자까지 입력 가능합니다.');
    $(this).val(content.substring(0, 1000));
    $('#counter').html('(1000 / 최대 1000자)');
  }
});

$('.DOC_TEXT2').keyup(function (e) {
  var content = $(this).val();
  $('#counter2').html('(' + content.length + ' / 최대 1000자)'); //글자수 실시간 카운팅

  if (content.length > 999) {
    alert('최대 1000자까지 입력 가능합니다.');
    $(this).val(content.substring(0, 1000));
    $('#counter').html('(1000 / 최대 1000자)');
  }
});
$('.DOC_TEXT3').keyup(function (e) {
  var content = $(this).val();
  $('#counter3').html('(' + content.length + ' / 최대 1000자)'); //글자수 실시간 카운팅

  if (content.length > 999) {
    alert('최대 1000자까지 입력 가능합니다.');
    $(this).val(content.substring(0, 1000));
    $('#counter').html('(1000 / 최대 1000자)');
  }
});
$('.DOC_TEXT4').keyup(function (e) {
  var content = $(this).val();
  $('#counter4').html('(' + content.length + ' / 최대 1000자)'); //글자수 실시간 카운팅

  if (content.length > 999) {
    alert('최대 1000자까지 입력 가능합니다.');
    $(this).val(content.substring(0, 1000));
    $('#counter').html('(1000 / 최대 1000자)');
  }
});