package com.dung.geul.repository;

import com.dung.geul.entity.Awards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AwardsRepository extends JpaRepository<Awards, Long> {
}
