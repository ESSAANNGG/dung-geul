package com.dung.geul.repository;

import com.dung.geul.entity.CV;
import com.dung.geul.entity.Consult;
import com.dung.geul.entity.Consulting;
import com.dung.geul.entity.Member;
import com.querydsl.core.BooleanBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ConsultingRepository extends JpaRepository<Consulting,Long>, QuerydslPredicateExecutor<Consulting> {

//    @Query(value = "select c, a from Consult c , Consulting a where a.cno = c and c.consultings = :consultings")
//    Object findByCno(@Param("cno") String cno);

}
