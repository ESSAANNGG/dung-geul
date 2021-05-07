package com.dung.geul.repository;

import com.dung.geul.entity.Employ;
import com.dung.geul.entity.Enterprise;
import com.dung.geul.entity.Member;
import com.dung.geul.entity.MemberRole;
import net.bytebuddy.asm.Advice;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;

import java.util.stream.IntStream;


@SpringBootTest
public class EnterpriseRepositoryTest {

    @Autowired
    EnterpriseRepository enterpriseRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    BCryptPasswordEncoder encoder;


        @Test
        public void insertEtp(){

            String pw = encoder.encode("123");


            for (int i = 0; i<15; i++) {

                Member m = Member.builder()
                        .user_id("etpmember" + i)
                        .user_pw(pw)
                        .user_ph("010")
                        .user_ph2("2063")
                        .user_ph3("5065")
                        .user_name("기업담당자" + i)
                        .user_type("ENTERPRISE")
                        .user_allow(0)
                        .user_postcode("45645")
                        .user_addr("대구시 북구 복현동 424-1")
                        .user_addr_details("초코쿠키2 203호")
                        .user_email("etpmember" + i)
                        .user_emailDomain("naver.com")
                        .build();

                m.addMemberRole(MemberRole.USER);

                memberRepository.save(m);

                try{

                    Enterprise e = Enterprise.builder()
                            .user_id(m)
                            .etp_name("기업이름" + i)
                            .etp_num("11111" + i)
                            .etp_ceo_name("대표" + i)
                            .etp_ph("010")
                            .etp_ph2("2033")
                            .etp_ph3("4055")
                            .etp_fx("11112222")
                            .etp_home("http:www.기업" + i + ".com")
                            .etp_contents("기업 주요 설명 기업 주요 설명 기업 주요 설명")
                            .etp_year(LocalDate.of(1998, 05, 21))
                            .etp_member(21 + i)
                            .etp_sector("IT")
                            .build();

                    enterpriseRepository.save(e);

                }catch (Exception e){
                    memberRepository.delete(m);
                    System.out.println("에러발생 : " + e);
                    return;
                }

            }

        }



}
