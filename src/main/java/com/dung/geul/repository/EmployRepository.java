package com.dung.geul.repository;


import com.dung.geul.entity.Employ;
import com.dung.geul.repository.search.SearchEmployRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

public interface EmployRepository extends JpaRepository<Employ, Long>, QuerydslPredicateExecutor<Employ>, SearchEmployRepository {
    @Query("select e, w from Employ e left join e.etp_id w where e.num =:num")
    Object getEmployList(@Param("num") Long num);


//    @Query(value = "SELECT e, w FROM Employ e LEFT JOIN e.enterprise w GROUP BY e")
    @Query(value = "SELECT e, m FROM Employ e LEFT OUTER JOIN Enterprise m ON e.etp_id = m.etp_id")
    Page<Object[]> getEmployWithEnterprise(Pageable pageable);


}
