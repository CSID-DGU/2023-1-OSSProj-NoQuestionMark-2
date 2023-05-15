package com.NoQuestionMark.schedular.repository;

import com.NoQuestionMark.schedular.model.entity.SubjectScheduleEntity;
import com.NoQuestionMark.schedular.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface SubjectScheduleRepository extends JpaRepository<SubjectScheduleEntity, Long> {
    List<SubjectScheduleEntity> findAllByUserAndStartDateGreaterThanOrderByStartDateAsc(UserEntity user, LocalDateTime standard);
}
