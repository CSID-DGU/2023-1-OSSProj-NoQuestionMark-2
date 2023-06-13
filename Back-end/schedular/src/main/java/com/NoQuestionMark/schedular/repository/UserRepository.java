package com.NoQuestionMark.schedular.repository;

import com.NoQuestionMark.schedular.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findBySchoolNumber(String schoolNumber);

    Optional<UserEntity> findByName(String name);
}
