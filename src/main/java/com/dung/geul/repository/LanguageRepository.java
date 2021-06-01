package com.dung.geul.repository;

import com.dung.geul.entity.Language;
import com.dung.geul.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LanguageRepository extends JpaRepository<Language, Long> {

    List<Language> findByMember(Member member);
}
