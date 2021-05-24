for (var i = 2; i < 6; i++) {
  eval('var carrerNameInline' + i + "= document.querySelector('.carrerName" + i + "').innerHTML");
  eval('var carrer' + i + "= document.querySelector('.carrer" + i + "')");
  eval('var schoolNameInline' + i + "= document.querySelector('.schoolName" + i + "').innerHTML");
  eval('var school' + i + "= document.querySelector('.school" + i + "')");
  eval('var awardNameInline' + i + "= document.querySelector('.awardName" + i + "').innerHTML");
  eval('var award' + i + "= document.querySelector('.award" + i + "')");
  eval('var familyNameInline' + i + "= document.querySelector('.familyName" + i + "').innerHTML");
  eval('var family' + i + "= document.querySelector('.family" + i + "')");
  eval(
    'var certificateNameInline' +
      i +
      "= document.querySelector('.certificateName" +
      i +
      "').innerHTML"
  );
  eval('var certificate' + i + "= document.querySelector('.certificate" + i + "')");
  eval(
    'var languageNameInline' + i + "= document.querySelector('.languageName" + i + "').innerHTML"
  );
  eval('var language' + i + "= document.querySelector('.language" + i + "')");
}

console.log(carrerNameInline2);

function test(inner, className) {
  if (inner == false) {
    className.style.display = 'none';
  }
}

test(carrerNameInline2, carrer2);
test(carrerNameInline3, carrer3);
test(carrerNameInline4, carrer4);
test(carrerNameInline5, carrer5);

test(schoolNameInline2, school2);
test(schoolNameInline3, school3);
test(schoolNameInline4, school4);
test(schoolNameInline5, school5);

test(awardNameInline2, award2);
test(awardNameInline3, award3);
test(awardNameInline4, award4);
test(awardNameInline5, award5);

test(familyNameInline2, family2);
test(familyNameInline3, family3);
test(familyNameInline4, family4);
test(familyNameInline5, family5);

test(certificateNameInline2, certificate2);
test(certificateNameInline3, certificate3);
test(certificateNameInline4, certificate4);
test(certificateNameInline5, certificate5);

test(languageNameInline2, language2);
test(languageNameInline3, language3);
test(languageNameInline4, language4);
test(languageNameInline5, language5);
