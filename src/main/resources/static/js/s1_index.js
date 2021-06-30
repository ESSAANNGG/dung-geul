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
let licType = document.querySelectorAll('.licType');
let licAgency = document.querySelectorAll('.licAgency');

//modal
let Lic_date = document.querySelectorAll('.Lic_date');
let Lic_name = document.querySelectorAll('.Lic_name');
let Lic_due_date = document.querySelectorAll('.Lic_due_date');
let Lic_num = document.querySelectorAll('.Lic_num');
let Lic_type = document.querySelectorAll('.Lic_type');
let Lic_agency = document.querySelectorAll('.Lic_agency');

//체크박스 선택값

let nameVal;
let dateVal;
let dueVal;
let numVal;
let typeVal;
let agencyVal;

var obj = document.getElementsByName('import_check');

var index;
var indexTest;

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

	$('.popup-trigger').click(function () {
		$('.import_check').prop('checked', false);

		index = $('.popup-trigger').index(this);

		popupModal.classList.add('is--visible');
		bodyBlackout.classList.add('is-blacked-out');

		indexTest = index;
		console.log(indexTest);
		console.log(typeof indexTest);
	});

	btn_confirm.addEventListener('click', () => {
		popupModal.classList.remove('is--visible');
		bodyBlackout.classList.remove('is-blacked-out');
		licName[indexTest].value = nameVal;
		licDate[indexTest].value = dateVal;
		licDue[indexTest].value = dueVal;
		licNum[indexTest].value = numVal;
		licType[indexTest].value = typeVal;
		licAgency[indexTest].value = agencyVal;
	});
});

document.querySelector('#add_lic').addEventListener('click', () => {
	popupTrigger = document.querySelectorAll('.popup-trigger');
	const bodyBlackout = document.querySelector('.body-blackout');
	const popupModal = document.querySelector('.popup-modal');
	const btn_confirm = document.querySelector('.btn_confirm');

	setTimeout(function () {
		licName = document.querySelectorAll('.licName');
		licDate = document.querySelectorAll('.licDate');
		licDue = document.querySelectorAll('.licDue');
		licNum = document.querySelectorAll('.licNum');
		licType = document.querySelectorAll('.licType');
		licAgency = document.querySelectorAll('.licAgency');

		$('.popup-trigger').click(function () {
			$('.import_check').prop('checked', false);

			index = $('.popup-trigger').index(this);

			popupModal.classList.add('is--visible');
			bodyBlackout.classList.add('is-blacked-out');

			indexTest = index;
			console.log(indexTest);
			console.log(typeof indexTest);
		});
		btn_confirm.addEventListener('click', () => {});
	}, 100);
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
			typeVal = Lic_type[i].innerHTML;
			agencyVal = Lic_agency[i].innerHTML;
		} else if (obj[i] != chk) {
			obj[i].checked = false;
		}
	}
}
