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
                .user_ph(01020635065)
                .user_pw("1234")
                .user_class("userClass")
                .user_dept("userDept")
                .build();

        member.addMemberRole(MemberRole.USER);
        member.addMemberRole(MemberRole.STUDENT);

        memberRepository.save(member);

        Optional<Member> result = memberRepository.findByEmail("user2Email");

        System.out.print("Member는     " + result.get());

        Optional<Member> result2 = memberRepository.findByIdWidthRole("user2ID");


    }
}
