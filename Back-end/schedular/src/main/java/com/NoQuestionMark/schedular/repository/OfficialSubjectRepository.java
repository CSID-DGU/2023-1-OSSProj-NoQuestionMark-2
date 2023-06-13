package com.NoQuestionMark.schedular.repository;

import com.NoQuestionMark.schedular.model.OfficialSubjectScheduleEntity;
import com.NoQuestionMark.schedular.model.SubjectEntity;
import com.NoQuestionMark.schedular.model.UserEntity;
import com.NoQuestionMark.schedular.model.UserSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OfficialSubjectRepository extends JpaRepository<OfficialSubjectScheduleEntity, Long> {
    Optional<OfficialSubjectScheduleEntity> findByUserAndId(UserEntity user, Long id);

    List<OfficialSubjectScheduleEntity> findAllBySubject(SubjectEntity subject);
    @Query(value = "select e from OfficialSubjectScheduleEntity e where e.subject = :subject and e.startDate > :now order by e.startDate asc")
    List<OfficialSubjectScheduleEntity> findAllBySubjectAndStartDateGreaterThanOrderByStartDateAsc(@Param("subject") SubjectEntity subject, @Param("now") LocalDateTime now);

    @Query(value = "select e from OfficialSubjectScheduleEntity e where e.subject = :subject and e.startDate > :now and e.subjectScheduleType = 'ASSIGNMENT' order by e.startDate asc")
    List<OfficialSubjectScheduleEntity> findOfficialToDoList(SubjectEntity subject, LocalDateTime now);
}
