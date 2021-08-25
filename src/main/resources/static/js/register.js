let register = {
  init: function () {
    $('#submit').on('click', event => {
      event.preventDefault();
      // alert('register실행');

      let a = document.querySelectorAll('input');
      for (let i = 0; i < a.length; i++) {
        if (a[i].value == '') {
          a[i].disabled = true;
        }
      }

      let b = document.querySelectorAll('select');
      for (let i = 0; i < b.length; i++) {
        if (b[i].value == '') {
          b[i].disabled = true;
        }
      }

      let c = document.querySelectorAll('textarea');
      for (let i = 0; i < c.length; i++) {
        if (c[i].value == '') {
          c[i].disabled = true;
        }
      }

      this.save();

      for (let i = 0; i < a.length; i++) {
        if (a[i].value == '') {
          a[i].disabled = false;
        }
      }

      for (let i = 0; i < b.length; i++) {
        if (b[i].value == '') {
          b[i].disabled = false;
        }
      }

      for (let i = 0; i < c.length; i++) {
        if (c[i].value == '') {
          c[i].disabled = false;
        }
      }
    });
  },

  save: function () {
    let data = $('form#cvForm').serializeObject();

    // 값 확인
    // https: alert('userdate 전송 ! ' + JSON.stringify(data));
    console.log(JSON.stringify(data));
    chkValue();

    function chkValue() {
      const schoolFieldset_main = document.querySelector('#schoolFieldset_main');
      const hobbyFieldset_main = document.querySelector('#hobbyFieldset_main');
      const awardFieldset_main = document.querySelector('#awardFieldset_main');
      const famFieldset_main = document.querySelector('#famFieldset_main');
      const licFieldset_main = document.querySelector('#licFieldset_main');
      const flFieldset_main = document.querySelector('#flFieldset_main');
      if (!$('#user_name').val()) {
        alert('이름을 입력해주세요');
        setTimeout(function () {
          $('#user_name').focus();
        }, 1);
        return;
      } else if (!$('#age').val()) {
        alert('연령을 입력해주세요');
        setTimeout(function () {
          $('#age').focus();
        }, 1);
        return;
      } else if (!$('#user_email').val()) {
        alert('이메일을 입력해주세요');
        setTimeout(function () {
          $('#user_email').focus();
        }, 1);
        return;
      } else if (!$('#birth').val()) {
        alert('생년월일을 입력해주세요');
        setTimeout(function () {
          $('#birth').focus();
        }, 1);
        return;
      } else if (!$('#user_hp').val()) {
        alert('전화번호를 입력해주세요');
        setTimeout(function () {
          $('#user_hp').focus();
        }, 1);
        return;
      } else if (!$('#user_addr').val()) {
        alert('주소를 입력해주세요');
        setTimeout(function () {
          $('#user_addr').focus();
        }, 1);
        return;
      }

      if ($('input[name="user_employment"]:checked').val() === '1') {
        const etp_name = document.querySelectorAll('.etp_name');
        const employment = document.querySelectorAll('.employment');
        const resignation = document.querySelectorAll('.resignation');
        const position = document.querySelectorAll('.position');
        for (let i = 0; i < etp_name.length; i++) {
          if (!etp_name[i].value) {
            alert('회사명을 입력해주세요');
            setTimeout(function () {
              etp_name[i].focus();
            }, 1);
            return;
          } else if (!employment[i].value) {
            alert('입사일자를 입력해주세요');
            setTimeout(function () {
              employment[i].focus();
            }, 1);
            return;
          } else if (!resignation[i].value) {
            alert('퇴사일자를 입력해주세요');
            setTimeout(function () {
              resignation[i].focus();
            }, 1);
            return;
          } else if (!position[i].value) {
            alert('직위를 입력해주세요');
            setTimeout(function () {
              position[i].focus();
            }, 1);
            return;
          }
        }
        console.log('carrer');
      }

      if (schoolFieldset_main.style.display == 'block') {
        // 공통
        const SchoolTypeSelect = document.querySelectorAll('.SchoolTypeSelect');
        const edc_school = document.querySelectorAll('.edc_school');
        // 고등학교
        const highschool_edc_date = document.querySelectorAll('.highschool_edc_date');
        const highschool_edc_graduated = document.querySelectorAll('.highschool_edc_graduated');
        // 전문대
        const college_edc_date_start = document.querySelectorAll('.college_edc_date_start');
        const college_edc_date_end = document.querySelectorAll('.college_edc_date_end');
        const college_edc_graduated = document.querySelectorAll('.college_edc_graduated');
        const college_edc_dept = document.querySelectorAll('.college_edc_dept');
        // 대학교
        const university_edc_date_start = document.querySelectorAll('.university_edc_date_start');
        const university_edc_date_end = document.querySelectorAll('.university_edc_date_end');
        const university_edc_graduated = document.querySelectorAll('.university_edc_graduated');
        const university_edc_dept = document.querySelectorAll('.university_edc_dept');
        // 대학원
        const graduate_edc_graduated = document.querySelectorAll('.graduate-edc_graduated');
        const graduate_edc_date_start = document.querySelectorAll('.graduate_edc_date_start');
        const graduate_edc_date_end = document.querySelectorAll('.graduate_edc_date_end');
        const graduate_edc_graduated2 = document.querySelectorAll('.graduate_edc_graduated');
        const graduate_edc_dept = document.querySelectorAll('.graduate_edc_dept');
        for (let i = 0; i < SchoolTypeSelect.length; i++) {
          if (SchoolTypeSelect[i].value == '') {
            alert('학교구분을 입력해주세요');
            setTimeout(function () {
              SchoolTypeSelect[i].focus();
            }, 1);
            return;
          } else if (SchoolTypeSelect[i].value == '고등학교') {
            if (!edc_school[i].value) {
              alert('학교이름을 입력해주세요');
              setTimeout(function () {
                edc_school[i].focus();
              }, 1);
              return;
            } else if (!highschool_edc_date[i].value) {
              alert('졸업년도를 입력해주세요');
              setTimeout(function () {
                highschool_edc_date[i].focus();
              }, 1);
              return;
            } else if (!highschool_edc_graduated[i].value) {
              alert('졸업상태를 입력해주세요');
              setTimeout(function () {
                highschool_edc_graduated[i].focus();
              }, 1);
              return;
            }
          } else if (SchoolTypeSelect[i].value == '전문대') {
            if (!edc_school[i].value) {
              alert('학교이름을 입력해주세요');
              setTimeout(function () {
                edc_school[i].focus();
              }, 1);
              return;
            } else if (!college_edc_date_start[i].value) {
              alert('입학년월을 입력해주세요');
              setTimeout(function () {
                college_edc_date_start[i].focus();
              }, 1);
              return;
            } else if (!college_edc_date_end[i].value) {
              alert('졸업년월을 입력해주세요');
              setTimeout(function () {
                college_edc_date_end[i].focus();
              }, 1);
              return;
            } else if (!college_edc_graduated[i].value) {
              alert('졸업상태를 입력해주세요');
              setTimeout(function () {
                college_edc_graduated[i].focus();
              }, 1);
              return;
            } else if (!college_edc_dept[i].value) {
              alert('전공을 입력해주세요');
              setTimeout(function () {
                college_edc_dept[i].focus();
              }, 1);
              return;
            }
          } else if (SchoolTypeSelect[i].value == '대학교') {
            if (!edc_school[i].value) {
              alert('학교이름을 입력해주세요');
              setTimeout(function () {
                edc_school[i].focus();
              }, 1);
              return;
            } else if (!university_edc_date_start[i].value) {
              alert('입학년월을 입력해주세요');
              setTimeout(function () {
                university_edc_date_start[i].focus();
              }, 1);
              return;
            } else if (!university_edc_date_end[i].value) {
              alert('졸업년월을 입력해주세요');
              setTimeout(function () {
                university_edc_date_end[i].focus();
              }, 1);
              return;
            } else if (!university_edc_graduated[i].value) {
              alert('졸업상태를 입력해주세요');
              setTimeout(function () {
                university_edc_graduated[i].focus();
              }, 1);
              return;
            } else if (!university_edc_dept[i].value) {
              alert('전공을 입력해주세요');
              setTimeout(function () {
                university_edc_dept[i].focus();
              }, 1);
              return;
            }
          } else if (SchoolTypeSelect[i].value == '대학원') {
            if (!edc_school[i].value) {
              alert('학교이름을 입력해주세요');
              setTimeout(function () {
                edc_school[i].focus();
              }, 1);
              return;
            } else if (!graduate_edc_graduated[i].value) {
              alert('학위를 입력해주세요');
              setTimeout(function () {
                graduate_edc_graduated[i].focus();
              }, 1);
              return;
            } else if (!graduate_edc_date_start[i].value) {
              alert('입학년월을 입력해주세요');
              setTimeout(function () {
                graduate_edc_date_start[i].focus();
              }, 1);
              return;
            } else if (!graduate_edc_date_end[i].value) {
              alert('졸업년월을 입력해주세요');
              setTimeout(function () {
                graduate_edc_date_end[i].focus();
              }, 1);
              return;
            } else if (!graduate_edc_graduated2[i].value) {
              alert('졸업상태를 입력해주세요');
              setTimeout(function () {
                graduate_edc_graduated2[i].focus();
              }, 1);
              return;
            } else if (!graduate_edc_dept[i].value) {
              alert('전공을 입력해주세요');
              setTimeout(function () {
                graduate_edc_dept[i].focus();
              }, 1);
              return;
            }
          }
        }

        console.log('school');
      }

      if (hobbyFieldset_main.style.display == 'block') {
        const cv_hobby = document.querySelector('#cv_hobby');
        const cv_specialty = document.querySelector('#cv_specialty');
        if (!cv_hobby.value) {
          alert('취미를 입력해주세요');
          setTimeout(function () {
            cv_hobby.focus();
          }, 1);
          return;
        } else if (!cv_specialty.value) {
          alert('특기를 입력해주세요');
          setTimeout(function () {
            cv_specialty.focus();
          }, 1);
          return;
        }
      }

      if (awardFieldset_main.style.display == 'block') {
        const awards_des = document.querySelectorAll('.awards_des');
        const awards_agency = document.querySelectorAll('.awards_agency');
        const awards_date = document.querySelectorAll('.awards_date');
        for (let i = 0; i < awards_des.length; i++) {
          if (!awards_des[i].value) {
            alert('수상명을 입력해주세요');
            setTimeout(function () {
              awards_des[i].focus();
            }, 1);
            return;
          } else if (!awards_agency[i].value) {
            alert('수여기관을 입력해주세요');
            setTimeout(function () {
              awards_agency[i].focus();
            }, 1);
            return;
          } else if (!awards_date[i].value) {
            alert('수상연도를 입력해주세요');
            setTimeout(function () {
              awards_date[i].focus();
            }, 1);
            return;
          }
        }
      }

      if (famFieldset_main.style.display == 'block') {
        const fam_relation = document.querySelectorAll('.fam_relation');
        const fam_name = document.querySelectorAll('.fam_name');
        const fam_age = document.querySelectorAll('.fam_age');
        for (let i = 0; i < fam_relation.length; i++) {
          if (!fam_relation[i].value) {
            alert('가족관계를 입력해주세요');
            setTimeout(function () {
              fam_relation[i].focus();
            }, 1);
            return;
          } else if (!fam_name[i].value) {
            alert('이름을 입력해주세요');
            setTimeout(function () {
              fam_name[i].focus();
            }, 1);
            return;
          } else if (!fam_age) {
            alert('나이를 입력해주세요');
            setTimeout(function () {
              fam_age[i].focus();
            }, 1);
            return;
          }
        }
      }

      if (licFieldset_main.style.display == 'block') {
        const lic_type = document.querySelectorAll('.lic_type');
        const lic_name = document.querySelectorAll('.lic_name');
        const lic_num = document.querySelectorAll('.lic_num');
        const lic_agency = document.querySelectorAll('.lic_agency');
        const lic_date = document.querySelectorAll('.lic_date');
        for (let i = 0; i < lic_type.length; i++) {
          if (!lic_type[i].value) {
            alert('자격종류를 입력해주세요');
            setTimeout(function () {
              lic_type[i].focus();
            }, 1);
            return;
          } else if (!lic_name[i].value) {
            alert('자격증명을 입력해주세요');
            setTimeout(function () {
              lic_name[i].focus();
            }, 1);
            return;
          } else if (!lic_num[i].value) {
            alert('자격번호를 입력해주세요');
            setTimeout(function () {
              lic_num[i].focus();
            }, 1);
            return;
          } else if (!lic_agency[i].value) {
            alert('발급기관을 입력해주세요');
            setTimeout(function () {
              lic_agency[i].focus();
            }, 1);
            return;
          } else if (!lic_date[i].value) {
            alert('취득일을 입력해주세요');
            setTimeout(function () {
              lic_date[i].focus();
            }, 1);
            return;
          }
        }
      }

      if (flFieldset_main.style.display == 'block') {
        const fl_language = document.querySelectorAll('.fl_language');
        const fl_conversation = document.querySelectorAll('.fl_conversation');
        const fl_reading = document.querySelectorAll('.fl_reading');
        const fl_writing = document.querySelectorAll('.fl_writing');
        const fl_name = document.querySelectorAll('.fl_name');
        const fl_date = document.querySelectorAll('.fl_date');
        for (let i = 0; i < fl_language.length; i++) {
          if (!fl_language[i].value) {
            alert('외국어명을 입력해주세요');
            setTimeout(function () {
              fl_language[i].focus();
            }, 1);
            return;
          } else if (!fl_conversation[i].value) {
            alert('회화능력을 입력해주세요');
            setTimeout(function () {
              fl_conversation[i].focus();
            }, 1);
            return;
          } else if (!fl_reading[i].value) {
            alert('독해능력을 입력해주세요');
            setTimeout(function () {
              fl_reading[i].focus();
            }, 1);
            return;
          } else if (!fl_writing[i].value) {
            alert('작문능력을 입력해주세요');
            setTimeout(function () {
              fl_writing[i].focus();
            }, 1);
            return;
          } else if (!fl_name[i].value) {
            alert('시험종류를 입력해주세요');
            setTimeout(function () {
              fl_name[i].focus();
            }, 1);
            return;
          } else if (!fl_date[i].value) {
            alert('취득일을 입력해주세요');
            setTimeout(function () {
              fl_date[i].focus();
            }, 1);
            return;
          }
        }
      }

      // if (!$('.sec_of_exam').val()) {
      //   alert('응시부문을 입력해주세요');
      //   setTimeout(function () {
      //     $('.sec_of_exam').focus();
      //   }, 1);
      //   console.log('여기까지 도달못함');
      // } else {
        // 데이터 전송 ajax
        $.ajax({
          type: 'POST',
          url: '/application/cv/register',
          data: JSON.stringify(data),
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          success: function (result) {
            alert('이력서 등록이 완료되었습니다.');
            location.href = '/application/cv/read';
          },
          error: function (error) {
            alert('실패, 이력서를 다시 작성해주세요');
            console.log(error);
            // alert(error);
            location.href = '#';
          },
        });
      // }
    }
  }, // save() end
};

register.init();
