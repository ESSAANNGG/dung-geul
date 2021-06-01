package com.dung.geul.repository;

import com.dung.geul.entity.License;
import com.dung.geul.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LicenseRepository extends JpaRepository<License, Long> {

    List<License> findByMember(Member member);
}
