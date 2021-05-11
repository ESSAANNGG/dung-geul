package com.dung.geul.repository;

import com.dung.geul.entity.Board_file;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<Board_file, Long> {
}
