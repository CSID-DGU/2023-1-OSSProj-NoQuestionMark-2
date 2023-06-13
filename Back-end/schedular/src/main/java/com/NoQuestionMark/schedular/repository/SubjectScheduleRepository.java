package com.NoQuestionMark.schedular.repository;

import com.NoQuestionMark.schedular.model.SubjectScheduleEntity;
import com.NoQuestionMark.schedular.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SubjectScheduleRepository extends JpaRepository<SubjectScheduleEntity, Long> {
    List<SubjectScheduleEntity> findAllByUserAndStartDateGreaterThanOrderByStartDateAsc(UserEntity user, LocalDateTime standard);

    Optional<SubjectScheduleEntity> findByUserAndId(UserEntity user, Long scheduleId);

    @Query(value = "select e from SubjectScheduleEntity e where e.user = :user and e.startDate > :now and e.scheduleType = 'TASK' order by e.startDate asc")
    List<SubjectScheduleEntity> findSubjectToDoList(@Param("user") UserEntity user, @Param("now")LocalDateTime now);
}
