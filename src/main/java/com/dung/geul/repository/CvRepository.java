package com.dung.geul.repository;

import com.dung.geul.entity.CV;
import com.dung.geul.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CvRepository extends JpaRepository<CV, String> {
}
