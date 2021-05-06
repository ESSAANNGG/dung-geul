package com.dung.geul.repository;

import com.dung.geul.entity.Consult;
import com.dung.geul.entity.Employ;
import lombok.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

public interface ConsultRepository extends JpaRepository<Consult, Long>, QuerydslPredicateExecutor<Consult> {

//    @Query("select c, a from Consult c left join c.user_id a where c.cno_num =:cno_num")
//    Object[] getConsultBycno(Long cno_num);
}
