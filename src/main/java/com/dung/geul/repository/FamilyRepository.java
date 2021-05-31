package com.dung.geul.repository;

import com.dung.geul.entity.Family;
import com.dung.geul.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FamilyRepository extends JpaRepository<Family, Long> {

    List<Family> findByMember(Member member);
}
