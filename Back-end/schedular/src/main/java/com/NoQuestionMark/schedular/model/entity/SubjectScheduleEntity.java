package com.NoQuestionMark.schedular.model.entity;

import com.NoQuestionMark.schedular.controller.request.CommonScheduleRequestDto;
import com.NoQuestionMark.schedular.controller.request.SubjectScheduleRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.Month;

@Entity
@Table(name = "\"subject_schedule\"")
@NoArgsConstructor
@Getter
public class SubjectScheduleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Builder
    private SubjectScheduleEntity(SubjectScheduleRequestDto requestDto, UserEntity user, SubjectEntity subject){
        this.title = requestDto.getTitle();
        this.user = user;
        this.startMonth = requestDto.getStartDate().getMonth();
        this.endMonth = requestDto.getEndDate().getMonth();
        this.subject = subject;
        this.contents = requestDto.getContents();
        this.startDate = requestDto.getStartDate();
        this.endDate = requestDto.getEndDate();
        this.subjectScheduleType = SubjectScheduleType.returnType(requestDto.getSubjectScheduleType());
        this.startYear = requestDto.getStartDate().getYear();
        this.endYear = requestDto.getEndDate().getYear();
    }

    public static SubjectScheduleEntity fromSubjectScheduleDto(SubjectScheduleRequestDto requestDto, UserEntity user, SubjectEntity subject){
        return new SubjectScheduleEntity(requestDto, user, subject);
    }
}

