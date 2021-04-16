package com.dung.geul.repository;

import com.dung.geul.entity.Enterprise;
import com.dung.geul.entity.Member;
import net.bytebuddy.asm.Advice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EnterpriseRepository extends JpaRepository<Enterprise, Long> {


    @Query("select e from Enterprise e where e.user_id = :user_id")
    Enterprise findByUser_id(@Param("user_id") Member user_id);


}
