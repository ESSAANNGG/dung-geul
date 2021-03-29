package com.dung.geul.repository;

import com.dung.geul.entity.Enterprise;
import com.dung.geul.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnterpriseRepository extends JpaRepository<Enterprise, String> {

}
