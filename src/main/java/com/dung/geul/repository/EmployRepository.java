package com.dung.geul.repository;


import com.dung.geul.entity.Employ;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

public interface EmployRepository extends JpaRepository<Employ, Long>, QuerydslPredicateExecutor<Employ> {
    @Query("select e, w from Employ e left join e.etp_id w where e.num =:num")
    Object getEmployWithEnterprise(@Param("num") Long num);


//    @Query(value = "SELECT e, w FROM Employ e LEFT JOIN e.enterprise w GROUP BY e")
    @Query(value = "select m,  e\n" +
            "from Employ m left outer join Enterprise e on m.etp_id = e.etp_id\n")
    Page<Object[]> getEmployWithEnterprise(Pageable pageable);


}
