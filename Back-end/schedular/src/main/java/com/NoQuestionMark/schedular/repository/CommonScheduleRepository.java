package com.NoQuestionMark.schedular.repository;

import com.NoQuestionMark.schedular.model.entity.CommonScheduleEntity;
import com.NoQuestionMark.schedular.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommonScheduleRepository extends JpaRepository<CommonScheduleEntity, Long> {
    List<CommonScheduleEntity> findAllByUser(UserEntity user);
}
