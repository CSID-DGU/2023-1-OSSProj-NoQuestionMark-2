package com.NoQuestionMark.schedular.repository;

import com.NoQuestionMark.schedular.model.entity.OfficialSubjectScheduleEntity;
import com.NoQuestionMark.schedular.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OfficialSubjectRepository extends JpaRepository<OfficialSubjectScheduleEntity, Long> {
    Optional<OfficialSubjectScheduleEntity> findByUserAndId(UserEntity user, Long id);
}
