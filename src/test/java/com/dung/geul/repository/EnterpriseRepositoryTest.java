package com.dung.geul.repository;

import com.dung.geul.entity.Enterprise;
import com.dung.geul.entity.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class EnterpriseRepositoryTest {

    @Autowired
    EnterpriseRepository enterpriseRepository;

    @Autowired
    MemberRepository memberRepository;

    @Test
    public void findEnterpriseByMember(){

        Member member = memberRepository.findById("123").get();

        Enterprise enterprise = enterpriseRepository.findByUser_id(member);

        System.out.println(enterprise.toString());

    }
}
