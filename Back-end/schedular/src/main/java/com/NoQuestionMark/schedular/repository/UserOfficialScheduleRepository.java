package com.NoQuestionMark.schedular.repository;

import com.NoQuestionMark.schedular.model.OfficialSubjectScheduleEntity;
import com.NoQuestionMark.schedular.model.UserOfficialScheduleEntity;
import com.NoQuestionMark.schedular.model.ScheduleEntity;
import com.NoQuestionMark.schedular.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserOfficialScheduleRepository extends JpaRepository<UserOfficialScheduleEntity, Long> {
    Optional<UserOfficialScheduleEntity> findByScheduleAndUser(OfficialSubjectScheduleEntity schedule, UserEntity user);
    void deleteAllBySchedule(ScheduleEntity schedule);

}
