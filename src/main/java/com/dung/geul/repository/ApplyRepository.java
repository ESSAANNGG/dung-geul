package com.dung.geul.repository;

import com.dung.geul.entity.Apply;
import com.dung.geul.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ApplyRepository extends JpaRepository<Apply, Long> {

    @Query(value = "select a, em, etp from Apply a, Employ em, Enterprise etp where a.em_num = em and em.etp_id = etp and a.cv.user_id = :member ",
    countQuery = "select count(a) from Apply a where a.cv.user_id = :member")
    Page<Object[]> findByMember(Pageable pageable, @Param("member") Member member);
}
