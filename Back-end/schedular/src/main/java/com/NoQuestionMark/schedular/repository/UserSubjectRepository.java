package com.NoQuestionMark.schedular.repository;

import com.NoQuestionMark.schedular.model.entity.UserEntity;
import com.NoQuestionMark.schedular.model.entity.UserSubject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface UserSubjectRepository extends JpaRepository<UserSubject, Long> {
    List<UserSubject> findAllByUser(UserEntity user);
}
