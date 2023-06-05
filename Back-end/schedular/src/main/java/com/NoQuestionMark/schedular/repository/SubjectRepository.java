package com.NoQuestionMark.schedular.repository;

import com.NoQuestionMark.schedular.model.SubjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubjectRepository extends JpaRepository<SubjectEntity, Long> {
    Optional<SubjectEntity> findBySubjectName(String subjectName);
}
