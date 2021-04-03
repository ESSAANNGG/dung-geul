package com.dung.geul.repository;

import com.dung.geul.entity.Member;
import com.dung.geul.entity.MemberRole;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
public class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

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
    public void memberInsertTest(){

        Member member = Member.builder()
                .user_id("userID")
                .user_pw("1111")
                .user_name("userName")
                .user_ph("01011112222")
                .user_email("user@email")
                .user_addr("userAddress")
                .user_dept("컴퓨터정보계열")
                .user_class("WD-A")
                .build();

        member.addMemberRole(MemberRole.USER);
        member.addMemberRole(MemberRole.STUDENT);

        memberRepository.save(member);

        System.out.println("회원 한명 추가 id : userID, pw : 1111");
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
                .build();

        member.addMemberRole(MemberRole.USER);
        member.addMemberRole(MemberRole.COUNSELOR);

        memberRepository.save(member);

        System.out.println("회원 한명 추가 id : userID, pw : 1111");
    }

    @Test
    public void insertAdmin(){

        Member member = Member.builder()
                .user_id("admin1")
                .user_pw("1111")
                .user_name("관리자")
                .user_ph("01011112222")
                .user_email("admin@email")
                .user_postcode("41521")
                .user_addr("대구광역시 북구 복현로36길 32-13")
                .user_addr_details("상세주소입니다아아")
                .build();

        member.addMemberRole(MemberRole.USER);
        member.addMemberRole(MemberRole.ADMIN);

        memberRepository.save(member);

        System.out.println("회원 한명 추가 id : admin1, pw : 1111");
    }

    @Test
    public void memberSelectTest(){

        System.out.println(memberRepository.findByIdWidthRole("member1ID"));
    }

}
