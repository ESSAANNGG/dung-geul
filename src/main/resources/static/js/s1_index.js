// 자격증 한칸당 팝업뜨게

document.addEventListener('DOMContentLoaded', () => {
  const bodyBlackout = document.querySelector('.body-blackout');
  const popupModal = document.querySelector('.popup-modal');

  document.querySelector('.popup-trigger').addEventListener('click', function () {
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
});

let bodyBlackout = document.querySelectorAll('.body-blackout');
let popupModal = document.querySelectorAll('.popup-modal');
let popupTrigger = document.querySelectorAll('.popup-trigger');
let popupModalClose = document.querySelectorAll('.popup-modal__close');

document.querySelector('#add_lic').addEventListener('click', () => {
  setTimeout(function () {
    bodyBlackout = document.querySelectorAll('.body-blackout');
    popupModal = document.querySelectorAll('.popup-modal');
    popupTrigger = document.querySelectorAll('.popup-trigger');
    popupModalClose = document.querySelectorAll('.popup-modal__close');

    for (let i = 0; i < popupTrigger.length; i++) {
      popupTrigger[i].addEventListener('click', () => {
        popupModal[i].classList.add('is--visible');
        bodyBlackout[i].classList.add('is-blacked-out');
      });

      popupModalClose[i].addEventListener('click', () => {
        popupModal[i].classList.remove('is--visible');
        bodyBlackout[i].classList.remove('is-blacked-out');
      });

      bodyBlackout[i].addEventListener('click', () => {
        popupModal[i].classList.remove('is--visible');
        bodyBlackout[i].classList.remove('is-blacked-out');
      });
    }
  }, 100);
});

// 체크박스 제한

 function doOpenCheck(chk) {
   var obj = document.getElementsByName('import_check');
   for (var i = 0; i < obj.length; i++) {
     if (obj[i] != chk) {
       obj[i].checked = false;
     }
   }
 }