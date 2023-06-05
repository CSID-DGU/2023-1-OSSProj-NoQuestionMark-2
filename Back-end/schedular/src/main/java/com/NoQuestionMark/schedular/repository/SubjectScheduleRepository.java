package com.NoQuestionMark.schedular.repository;

import com.NoQuestionMark.schedular.model.SubjectScheduleEntity;
import com.NoQuestionMark.schedular.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SubjectScheduleRepository extends JpaRepository<SubjectScheduleEntity, Long> {
    List<SubjectScheduleEntity> findAllByUserAndStartDateGreaterThanOrderByStartDateAsc(UserEntity user, LocalDateTime standard);

    Optional<SubjectScheduleEntity> findByUserAndId(UserEntity user, Long scheduleId);
}
