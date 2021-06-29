package com.dung.geul.repository;

import com.dung.geul.entity.License;
import com.dung.geul.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LicenseRepository extends JpaRepository<License, String> {

    List<License> findByMember(Member member);

    List<License> findByMemberAndInCv(Member member, int inCv);

    Page<License> findByMember(Member member, Pageable pageable);
}
