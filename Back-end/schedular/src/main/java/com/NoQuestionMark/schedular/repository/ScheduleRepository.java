package com.NoQuestionMark.schedular.repository;

import com.NoQuestionMark.schedular.model.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Long> {

    @Query(value = "select schedule from schedule where id = :scheduleId", nativeQuery = true)
    String findScheduleType(Long scheduleId);
}
