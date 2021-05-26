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

    //자소서 Repository
    @Query(value = "SELECT i, m FROM Introduce i LEFT OUTER JOIN Member m ON i.writer = m.user_id where m.user_id = :user_id",
            countQuery = "select i, m FROM Introduce i left outer join Member m on i.writer = m.user_id where m.user_id = :user_id")
    Page<Object[]> getIntroduce(Pageable pageable, @Param("user_id")String user_id);
}
