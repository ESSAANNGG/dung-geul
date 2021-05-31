package com.dung.geul.repository;

import com.dung.geul.entity.Education;
import com.dung.geul.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EducationRepository extends JpaRepository<Education, Long> {

    @Query("select e from Education e where e.member = :member")
    List<Education> findByMember(@Param("member")Member member);
}
