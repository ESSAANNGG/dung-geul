package com.dung.geul.repository;

import com.dung.geul.entity.Carrer;
import com.dung.geul.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarrerRepository extends JpaRepository<Carrer, Long> {

    List<Carrer> findByMember(Member member);
}
