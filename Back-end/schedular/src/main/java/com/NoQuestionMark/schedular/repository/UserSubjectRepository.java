package com.NoQuestionMark.schedular.repository;

import com.NoQuestionMark.schedular.model.SubjectEntity;
import com.NoQuestionMark.schedular.model.UserEntity;
import com.NoQuestionMark.schedular.model.UserSubject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserSubjectRepository extends JpaRepository<UserSubject, Long> {
    List<UserSubject> findAllByUser(UserEntity user);
    Optional<UserSubject> findByUserAndSubject(UserEntity user, SubjectEntity subject);
    List<UserSubject> findAllBySubject(SubjectEntity subject);
}
