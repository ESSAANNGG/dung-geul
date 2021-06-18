package com.dung.geul.repository;

import com.dung.geul.entity.Member;
import com.dung.geul.entity.MemberRole;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@SpringBootTest
public class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Test
    public void studentInsertTest(){

        String pw = encoder.encode("123");

        String[] names = {"김경태", "김우진", "이상준", "서지현", "황하경",
                "정혜리", "지민우", "김도엽", "김수환", "신미란"};

        for (int i = 0; i<10; i++) {
            Member member = Member.builder()
                    .user_id("student" + i + ((i+1)/7))
                    .user_pw(pw)
                    .user_name(names[i])
                    .user_ph("010")
                    .user_ph2("123" + i)
                    .user_ph3("986"+ i)
                    .user_postcode("23445")
                    .user_addr("대구광역시 북구 경진로 12길 24")
                    .user_addr_details("E편한세상 " + i + "동 " + i + "01호")
                    .user_email("cos850")
                    .user_emailDomain("naver.com")
                    .user_dept("컴퓨터정보계열")
                    .user_class("WD-A")
                    .user_type("STUDENT")
                    .user_allow(0)
                    .build();

            member.addMemberRole(MemberRole.USER);

            memberRepository.save(member);

            System.out.println("회원 한명 추가 id : student" + i + " , pw : 123");
        }

    }

    @Test
    public void insertCounselor(){

        String pw = encoder.encode("123");

        Member member = Member.builder()
                .user_id("con1")
                .user_pw(pw)
                .user_name("박수진")
                .user_ph("010")
                .user_ph2("1119")
                .user_ph3("1112")
                .user_email("counselor")
                .user_emailDomain("naver.com")
                .user_postcode("41521")
                .user_addr("대구광역시 북구 복현로36길 32-13")
                .user_addr_details("505호")
                .user_type("COUNSELOR")
                .build();

        member.addMemberRole(MemberRole.USER);
        member.addMemberRole(MemberRole.COUNSELOR);

        memberRepository.save(member);

        System.out.println("회원 한명 추가 id : con1, pw : 123");
    }

    @Test
    public void insertAdmin(){

        Member member = Member.builder()

                .user_id("admin")
                .user_pw(encoder.encode("123"))
                .user_name("관리자")
                .user_ph("010")
                .user_ph2("2063")
                .user_ph3("5065")
                .user_email("admin")
                .user_emailDomain("email.com")

                .user_postcode("41521")
                .user_addr("대구광역시 북구 복현로36길 32-13")
                .user_addr_details("사랑채 302호")
                .user_type("ADMIN")
                .user_allow(1)
                .build();

        member.addMemberRole(MemberRole.USER);
        member.addMemberRole(MemberRole.ADMIN);

        memberRepository.save(member);


        System.out.println("회원 한명 추가 id : admin, pw : 123");

    }

    @Test
    public void memberSelectTest(){

        System.out.println(memberRepository.findByIdWidthRole("member1ID"));
    }

    @Test
    public void findEmail(){

    }

}
