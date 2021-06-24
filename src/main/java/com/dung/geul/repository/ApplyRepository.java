package com.dung.geul.repository;

import com.dung.geul.entity.Apply;
import com.dung.geul.entity.CV;
import com.dung.geul.entity.Employ;
import com.dung.geul.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ApplyRepository extends JpaRepository<Apply, Long> {

    // 학생회원 본인의 지원 리스트 페이지 보여주기
    @Query(value = "select a, em, etp from Apply a, Employ em, Enterprise etp where a.employ = em and em.etpId = etp and a.cv.user_id = :member ",
    countQuery = "select count(a) from Apply a where a.cv.user_id = :member")
    Page<Object[]> findByMember(Pageable pageable, @Param("member") Member member);

    // 해당 채용 공고의 지원자 리스트 보여주기
    @Query(value = "select a, c from Apply a, CV c where a.cv = c")
    Page<Object[]> findByEmploy(Pageable pageable, Employ employ);

    // 해당 학생회원이 이 공고에 지원 했는지 확인
    Boolean existsByCvAndEmploy(CV cv, Employ employ);
}
