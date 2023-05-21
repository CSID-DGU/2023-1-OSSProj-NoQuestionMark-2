package com.NoQuestionMark.schedular.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.Month;

@Entity
@Table(name = "\"official_subject_schedule\"")
@NoArgsConstructor
@Getter
public class OfficialSubjectScheduleEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;
    private String contents;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    private SubjectEntity subject;
    private SubjectScheduleType subjectScheduleType;
    private Month startMonth;
    private Month endMonth;
    private int startYear;
    private int endYear;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Timestamp deletedAt;


    @PrePersist
    void registeredAt(){
        this.createdAt = Timestamp.from(Instant.now());
    }
    @PreUpdate
    void updatedAt(){
        this.updatedAt = Timestamp.from(Instant.now());
    }

}
