package com.dung.geul.repository;

import com.dung.geul.dto.*;
import com.dung.geul.entity.*;
import com.dung.geul.service.CVService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class CVRepositoryTest {

    @Autowired
    private CVService cvService;

    @Autowired
    private CvRepository cvRepository;

    @Autowired
    private AwardsRepository awardsRepository;

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private CarrerRepository carrerRepository;

    @Autowired
    private FamilyRepository familyRepository;

    @Autowired
    private LicenseRepository licenseRepository;

    @Autowired
    private LanguageRepository languageRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Test
    public void insertStudentAndCV(){
        String pw = encoder.encode("123");

        for (int i = 16; i<20; i++) {
            Member member = Member.builder()
                    .user_id("student" + i)
                    .user_pw(pw)
                    .user_name("홍길동")
                    .user_ph("010")
                    .user_ph2("1234")
                    .user_ph3("3333")
                    .user_postcode("23445")
                    .user_addr("복현동12길 12")
                    .user_addr_details("사랑채503호")
                    .user_email("cos850")
                    .user_emailDomain("naver.com")
                    .user_addr("userAddress")
                    .user_dept("컴퓨터정보계열")
                    .user_class("WD-A")
                    .user_type("STUDENT")
                    .user_allow(0)
                    .build();

            member.addMemberRole(MemberRole.USER);
            member.addMemberRole(MemberRole.STUDENT);

            memberRepository.save(member);

            System.out.println("회원 한명 추가 id : student" + i + " , pw : 123");

            insertCV(member);

        }
    }


    public void insertCV(Member member) {
        try {

            System.out.println("이력서 주인 : " + member);

            Optional<CV> cvOpt = cvRepository.findByUser_id(member);

            System.out.println("이력서 : " + cvOpt.toString());

            if (!cvOpt.isEmpty()) {
                throw new Exception();
            }

            CV cv = CV.builder()
                    // 기본정보
                    .user_id(member)
                    .user_name(member.getUser_name())
                    .name_china("郑惠利")
                    .birth(LocalDate.now())
                    .user_age(21)
                    .user_hp("010-2063-5065")
                    .user_email(member.getUser_email() + "@" + member.getUser_emailDomain())
                    .addr(member.getUser_addr())
                    // 우대사항/병역
                    .cv_verteran(0)
                    .cv_disability(0)
                    .cv_military(0)
                    //희망조건
                    .sec_of_exam("개발직")
                    .desired_salary("3000")
                    //취미 특기
                    .cv_hobby("독서")
                    .cv_specialty("등산")
                    .build();

            System.out.println("이력서 엔티티 : " + cv.toString());

            cvRepository.save(cv);

//         수상경력 등록
            Awards awards = Awards.builder()
                    .member(member)
                    .awards_des("자바프로그래밍 대회")
                    .awards_agency("영진전문대학교")
                    .awards_date("2020")
                    .award_contents("자바로 게임을 만들어 은상을 수상함")
                    .build();

                    awardsRepository.save(awards);



            // 학력 등록
            Education education = Education.builder()
                    .member(member)
                    .schoolType("고등학교")
                    .edc_school("영진고등학교")
                    .edc_date_start("2015")
                    .edc_date_end("2018")
                    .edc_graduated("졸업")
                    .build();

            educationRepository.save(education);

            Education education2 = Education.builder()
                    .member(member)
                    .schoolType("대학교")
                    .edc_school("영진전문대학교")
                    .edc_date_start("2018")
                    .edc_date_end("2021")
                    .edc_graduated("졸업")
                    .edc_dept("웹데이터베이스")
                    .edc_gpa(3.6)
                    .edc_ps(4.5)
                    .build();

            educationRepository.save(education2);

            //경력 등록
            Carrer carrer = Carrer.builder()
                    .member(member)
                    .cr_etp_name("영진기업")
                    .cr_employment(LocalDate.of(2017, 05,21))
                    .cr_position("사원")
                    .cr_resignation(LocalDate.of(2020, 05, 21))
                    .reason_resign("저와 맞지 않아서")
                    .cr_task("개발업무 담당")
                    .Salary(3000)
                    .build();

            carrerRepository.save(carrer);


            // 가족사항 등록
            Family family = Family.builder()
                    .member(member)
                    .fam_relation("부")
                    .fam_name("송중기")
                    .fam_age(54)
                    .fam_birth(LocalDate.of(1967,07,11))
                    .fam_living("대구")
                    .build();

            familyRepository.save(family);

            Family family2 = Family.builder()
                    .member(member)
                    .fam_relation("모")
                    .fam_name("배수지")
                    .fam_age(54)
                    .fam_birth(LocalDate.of(1967,11,21))
                    .fam_living("대구")
                    .build();

            familyRepository.save(family2);


            License license = License.builder()
                    .licName("정보처리산업기사")
                    .licDate(LocalDate.of(2020, 04,21))
                    .licDueDate(LocalDate.of(2030, 04, 11))
                    .member(member)
                    .build();

            licenseRepository.save(license);


            Language language = Language.builder()
                    .member(member)
                    .fl_language("영어")
                    .fl_name("TOEIC")
                    .fl_conversation("상")
                    .fl_date(LocalDate.of(2019, 03, 11))
                    .fl_reading("중")
                    .fl_writing("하")
                    .fl_score(780)
                    .build();

            languageRepository.save(language);

            System.out.println("이력서 등록 완료 ! ");

        } catch (Exception e){

            System.out.println("error 발생 : " + e);

            return;
        }

    }
}
