//package com.dung.geul.repository;
//
//import com.dung.geul.entity.Consult;
//import com.dung.geul.entity.Consulting;
//import com.dung.geul.entity.Member;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//@SpringBootTest
//public class ConsultingRepositoryTest {
//    @Autowired
//    private ConsultingRepository consultingRepository;
//
//    @Test
//    public void insertstu(){
//        // 상담번호
//        Long cno = 1L;
////        String user_id;
//        Member member = Member.builder().user_id("student2").build();
//
//        Consulting consulting = Consulting.builder()
//                .member(member)
//                .consult(Consult.builder().cno(cno).build())
//                .consult_approve("0")
//                .consult_complete("1")
//                .build();
//        consultingRepository.save(consulting);
//    }
//}
