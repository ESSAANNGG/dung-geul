package com.dung.geul.repository;

import com.dung.geul.entity.Introduce;
import com.dung.geul.repository.search.SearchIntroRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface IntroduceRepository extends JpaRepository<Introduce, Long>, QuerydslPredicateExecutor<Introduce>, SearchIntroRepository {
    @Query("select e, w from Introduce e left join e.writer w where e.num =:num")
    Object getIntroduceList(@Param("num") Long num);


    //    @Query(value = "SELECT e, w FROM Employ e LEFT JOIN e.enterprise w GROUP BY e")
    @Query(value = "SELECT e, m FROM Introduce e LEFT OUTER JOIN Member m ON e.writer = m.user_id")
    Page<Object[]> getIntroduceWithEnterprise(Pageable pageable);
}
