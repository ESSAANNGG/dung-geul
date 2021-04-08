//package com.dung.geul.repository;
//
//import com.dung.geul.entity.Consult;
//import lombok.Value;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//public interface ConsultRepository extends JpaRepository<Consult, Long> {
//
//    @Query("select c, a from Consult c left join c.user_id a where c.cno_num =:cno_num")
//    Object getConsultWithApply(@Param("cno_num") Long cno_num);
//
//    Page<Object[]> getConsultWithApplyUser(Pageable cno_num);
//
////    Object[] getConsultBycno(Long cno_num);
//}
