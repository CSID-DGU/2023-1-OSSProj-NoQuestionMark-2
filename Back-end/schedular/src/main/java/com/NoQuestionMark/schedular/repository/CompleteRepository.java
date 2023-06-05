package com.NoQuestionMark.schedular.repository;


import com.NoQuestionMark.schedular.model.Complete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompleteRepository extends JpaRepository<Complete, Long> {
}
