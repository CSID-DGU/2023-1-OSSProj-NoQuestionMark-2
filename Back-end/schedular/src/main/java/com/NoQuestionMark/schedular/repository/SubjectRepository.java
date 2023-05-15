package com.NoQuestionMark.schedular.repository;

import com.NoQuestionMark.schedular.model.entity.SubjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<SubjectEntity, Long> {
}
