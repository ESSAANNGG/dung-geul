package com.dung.geul.repository;

import com.dung.geul.entity.CV;
import com.dung.geul.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CvRepository extends JpaRepository<CV, Long> {

    @Query("select c from CV c where c.user_id = :user_id")
    Optional<CV> findByUser_id(@Param("user_id") Member user_id);


}
