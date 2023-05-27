package com.NoQuestionMark.schedular.repository;

import com.NoQuestionMark.schedular.model.entity.UserOfficialScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserOfficialScheduleRepository extends JpaRepository<UserOfficialScheduleEntity, Long> {
}
