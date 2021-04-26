package com.dung.geul.repository;


import com.dung.geul.entity.Employ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface EmployRepository extends JpaRepository<Employ, Long>, QuerydslPredicateExecutor<Employ> {
}
