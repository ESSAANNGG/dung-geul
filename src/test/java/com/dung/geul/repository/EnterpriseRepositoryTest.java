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
    public void insertEtp() {

        String pw = encoder.encode("123");


        for (int i = 15; i <25; i++) {

            Member m = Member.builder()
                    .user_id("enterprise" + i)
                    .user_pw(pw)
                    .user_ph("010")
                    .user_ph2("2063")
                    .user_ph3("5065")
                    .user_name("스토브 잡스" + i)
                    .user_type("ENTERPRISE")
                    .user_allow(0)
                    .user_postcode("45645")
                    .user_addr("대구시 북구 복현동 424-1")
                    .user_addr_details("초코쿠키2 203호")
                    .user_email("etp" + i)
                    .user_emailDomain("gmail.com")
                    .build();

            m.addMemberRole(MemberRole.USER);

            memberRepository.save(m);

            try {

                Enterprise e = Enterprise.builder()
                        .user_id(m)
                        .etp_name("(주)삼촌전자" + i)
                        .etp_num("11111" + i)
                        .etp_ceo_name("재.Dragon" + i)
                        .etp_ph("010")
                        .etp_ph2("1234")
                        .etp_ph3("5678")
                        .etp_fx("053-940-5117")
                        .etp_home("https:/www.apple" + i + ".com")
                        .etp_contents("가전제품 판매업")
                        .etp_year(LocalDate.of(1998, 05, 21))
                        .etp_member(21 + i)
                        .etp_sector("가전제품 판매업")
                        .build();

                enterpriseRepository.save(e);

            } catch (Exception e) {
                memberRepository.delete(m);
                System.out.println("에러발생 : " + e);
                return;
            }

        }

    }


}
