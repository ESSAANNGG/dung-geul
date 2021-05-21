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
    public void memberRoleRead(){
        Member member = Member.builder()
                .user_id("user2ID")
                .user_addr("user1Address")
                .user_email("user2Email")
                .user_name("user1Name")
                .user_ph("01020635065")
                .user_pw("1234")
                .user_class("userClass")
                .user_dept("userDept")
                .build();

        member.addMemberRole(MemberRole.USER);
        member.addMemberRole(MemberRole.STUDENT);

        memberRepository.save(member);

        Optional<Member> result = memberRepository.findByUser_email("user2Email");

        System.out.print("Member는     " + result.get());

        Optional<Member> result2 = memberRepository.findByIdWidthRole("user2ID");


    }

    @Test
    public void studentInsertTest(){

        String pw = encoder.encode("123");

        for (int i = 0; i<15; i++) {
            Member member = Member.builder()
                    .user_id("student" + i)
                    .user_pw(pw)
                    .user_name("123")
                    .user_ph("010")
                    .user_ph2("1234")
                    .user_ph3("3333")
                    .user_postcode("23445")
                    .user_addr("복현동123 주소주")
                    .user_addr_details("상세주소 상세주소")
                    .user_email("123")
                    .user_emailDomain("naver.com")
                    .user_addr("userAddress")
//                    .user_dept("컴퓨터정보계열")
//                    .user_class("WD-A")
                    .user_type("COUNSELOR")
                    .user_allow(0)
                    .build();

            member.addMemberRole(MemberRole.USER);

            memberRepository.save(member);

            System.out.println("회원 한명 추가 id : userID" + i + " , pw : 123");
        }

    }

    @Test
    public void insertCounselor(){

        Member member = Member.builder()
                .user_id("counselor1")
                .user_pw("1111")
                .user_name("상담사1")
                .user_ph("01011112222")
                .user_email("counselor@email")
                .user_postcode("41521")
                .user_addr("대구광역시 북구 복현로36길 32-13")
                .user_addr_details("상세주소입니다아아")
                .user_type("COUNSELOR")
                .build();

        member.addMemberRole(MemberRole.USER);
        member.addMemberRole(MemberRole.COUNSELOR);

        memberRepository.save(member);

        System.out.println("회원 한명 추가 id : userID, pw : 1111");
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
                .user_email("admin@email")
                .user_emailDomain("com")

                .user_postcode("41521")
                .user_addr("대구광역시 북구 복현로36길 32-13")
                .user_addr_details("상세주소입니다아아")
                .user_type("ADMIN")
                .user_allow(1)
                .build();

        member.addMemberRole(MemberRole.USER);
        member.addMemberRole(MemberRole.ADMIN);

        memberRepository.save(member);


        System.out.println("회원 한명 추가 id : admin1, pw : 123");

    }

    @Test
    public void memberSelectTest(){

        System.out.println(memberRepository.findByIdWidthRole("member1ID"));
    }

//    @Test
//    public void findNameAndEmail(){
//
//        String member = memberRepository.findByUser_emailAndUser_name("123@aaa.bbb", "123");
//
//        System.out.println(member);
//
//        System.out.println();
//
//    }

    @Test
    public void findEmail(){

    }

}
