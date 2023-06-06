package com.NoQuestionMark.schedular.repository;

import com.NoQuestionMark.schedular.model.CommonScheduleEntity;
import com.NoQuestionMark.schedular.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface CommonScheduleRepository extends JpaRepository<CommonScheduleEntity, Long> {
    @Query(value = "select e from CommonScheduleEntity e where e.user = :user and e.startDate > :now order by e.startDate asc")
    List<CommonScheduleEntity> findAllByUserAndStartDateGreaterThanOrderByStartDateAsc(@Param("user") UserEntity user, @Param("now") LocalDateTime now);

    @Query(value = "select e from CommonScheduleEntity e where e.user = :user and e.startDate > :now and e.scheduleType = 'TASK' order by e.startDate asc")
    List<CommonScheduleEntity> findCommonToDoList(@Param("user") UserEntity user, @Param("now") LocalDateTime now);

    Optional<CommonScheduleEntity> findByIdAndUser(Long id, UserEntity user);
}
