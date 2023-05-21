package com.NoQuestionMark.schedular.repository;

import com.NoQuestionMark.schedular.model.entity.SubjectEntity;
import com.NoQuestionMark.schedular.model.entity.SubjectScheduleEntity;
import com.NoQuestionMark.schedular.model.entity.UserEntity;
import com.NoQuestionMark.schedular.model.entity.UserSubject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface SubjectScheduleRepository extends JpaRepository<SubjectScheduleEntity, Long> {
    List<SubjectScheduleEntity> findAllBySubjectAndStartDateGreaterThanOrderByStartDateAsc(SubjectEntity subject, LocalDateTime standard);
}
