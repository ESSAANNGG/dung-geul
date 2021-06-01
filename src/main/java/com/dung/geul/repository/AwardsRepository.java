package com.dung.geul.repository;

import com.dung.geul.entity.Awards;
import com.dung.geul.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AwardsRepository extends JpaRepository<Awards, Long> {

    List<Awards> findByMember(Member member);
}
