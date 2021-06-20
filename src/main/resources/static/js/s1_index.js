// 자격증 한칸당 팝업뜨게
let bodyBlackout = document.querySelectorAll('.body-blackout');
let popupModal = document.querySelectorAll('.popup-modal');
let popupTrigger = document.querySelectorAll('.popup-trigger');
let popupModalClose = document.querySelectorAll('.popup-modal__close');

//input
let licName = document.querySelectorAll('.licName');
let licDate = document.querySelectorAll('.licDate');
let licDue = document.querySelectorAll('.licDue');
let licNum = document.querySelectorAll('.licNum');

//modal
let Lic_date = document.querySelectorAll('.Lic_date');
let Lic_name = document.querySelectorAll('.Lic_name');
let Lic_due_date = document.querySelectorAll('.Lic_due_date');
let Lic_num = document.querySelectorAll('.Lic_num');

//체크박스 선택값

let nameVal;
let dateVal;
let dueVal;
let numVal;

var obj = document.getElementsByName('import_check');

document.addEventListener('DOMContentLoaded', () => {
  const bodyBlackout = document.querySelector('.body-blackout');
  const popupModal = document.querySelector('.popup-modal');
  const btn_confirm = document.querySelector('.btn_confirm');
  const licName1 = document.querySelector('.licName');
  const licDate1 = document.querySelector('.licDate');
  const licDue1 = document.querySelector('.licDue');
  const licNum1 = document.querySelector('.licNum');

  document.querySelector('.popup-trigger').addEventListener('click', function () {
    $('.import_check').prop('checked', false);

    popupModal.classList.add('is--visible');
    bodyBlackout.classList.add('is-blacked-out');
  });

  popupModal.querySelector('.popup-modal__close').addEventListener('click', () => {
    popupModal.classList.remove('is--visible');
    bodyBlackout.classList.remove('is-blacked-out');
  });

  bodyBlackout.addEventListener('click', () => {
    popupModal.classList.remove('is--visible');
    bodyBlackout.classList.remove('is-blacked-out');
  });

  btn_confirm.addEventListener('click', () => {
    popupModal.classList.remove('is--visible');
    bodyBlackout.classList.remove('is-blacked-out');
    licName1.value = nameVal;
    licDate1.value = dateVal;
    licDue1.value = dueVal;
    licNum1.value = numVal;

    
  });
});

/* document.querySelector('#add_lic').addEventListener('click', () => {
  setTimeout(function () {
    bodyBlackout = document.querySelectorAll('.body-blackout');
    popupModal = document.querySelectorAll('.popup-modal');
    popupTrigger = document.querySelectorAll('.popup-trigger');
    popupModalClose = document.querySelectorAll('.popup-modal__close');

    licName = document.querySelectorAll('.licName');
    licDate = document.querySelectorAll('.licDate');
    licDue = document.querySelectorAll('.licDue');
    licNum = document.querySelectorAll('.licNum');

    for (let i = 0; i < popupTrigger.length; i++) {
      popupTrigger[i].addEventListener('click', () => {
        popupModal[i].classList.add('is--visible');
        bodyBlackout[i].classList.add('is-blacked-out');
        for (let j = 0; j < Lic_date.length; j++) {}
      });

      popupModalClose[i].addEventListener('click', () => {
        popupModal[i].classList.remove('is--visible');
        bodyBlackout[i].classList.remove('is-blacked-out');
      });

      bodyBlackout[i].addEventListener('click', () => {
        popupModal[i].classList.remove('is--visible');
        bodyBlackout[i].classList.remove('is-blacked-out');
      });

      btn_confirm[i].addEventListener('click', () => {
        licName[i].value = nameVal;
        licDate[i].value = dateVal;
        licDue[i].value = dueVal;
        licNum[i].value = numVal;
      });
    }
  }, 100);
}); */

document.querySelector('#add_lic').addEventListener('click', () => {
  setTimeout(function () {
    popupTrigger = document.querySelectorAll('.popup-trigger');
    const bodyBlackout = document.querySelector('.body-blackout');
    const popupModal = document.querySelector('.popup-modal');
    const btn_confirm = document.querySelector('.btn_confirm');

    licName = document.querySelectorAll('.licName');
    licDate = document.querySelectorAll('.licDate');
    licDue = document.querySelectorAll('.licDue');
    licNum = document.querySelectorAll('.licNum');

    $('.popup-trigger').click(function () {
      $('.import_check').prop('checked', false);

      var index = $('.popup-trigger').index(this);
      console.log(index);
      popupModal.classList.add('is--visible');
      bodyBlackout.classList.add('is-blacked-out');

      btn_confirm.addEventListener('click', () => {
        licName[index].value = nameVal;
        licDate[index].value = dateVal;
        licDue[index].value = dueVal;
        licNum[index].value = numVal;
      });
    });
  });
});

// 체크박스 제한

function doOpenCheck(chk) {
  var obj = document.getElementsByName('import_check');
  for (var i = 0; i < obj.length; i++) {
    if (obj[i] == chk) {
      nameVal = Lic_name[i].innerHTML;
      dateVal = Lic_date[i].innerHTML;
      dueVal = Lic_due_date[i].innerHTML;
      numVal = Lic_num[i].innerHTML;
    } else if (obj[i] != chk) {
      obj[i].checked = false;
    }
  }
}
