package com.NoQuestionMark.schedular.repository;


import com.NoQuestionMark.schedular.model.Complete;
import com.NoQuestionMark.schedular.model.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompleteRepository extends JpaRepository<Complete, Long> {
    Optional<Complete> findBySchedule(ScheduleEntity schedule);
}
