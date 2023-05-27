package com.NoQuestionMark.schedular.repository;

import com.NoQuestionMark.schedular.model.entity.OfficialSubjectScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfficialSubjectRepository extends JpaRepository<OfficialSubjectScheduleEntity, Long> {

}
