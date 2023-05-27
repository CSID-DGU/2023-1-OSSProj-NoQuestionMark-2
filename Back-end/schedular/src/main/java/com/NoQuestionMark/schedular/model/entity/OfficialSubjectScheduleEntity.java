package com.NoQuestionMark.schedular.model.entity;

import com.NoQuestionMark.schedular.controller.request.OfficialScheduleRequestDto;
import lombok.Builder;
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

    @Builder
    private OfficialSubjectScheduleEntity (OfficialScheduleRequestDto requestDto, SubjectEntity subject){
        this.subject = subject;
        this.title = requestDto.getTitle();
        this.contents = requestDto.getContents();
        this.startDate = requestDto.getStartDate();
        this.endDate = requestDto.getEndDate();
        this.startMonth = requestDto.getStartDate().getMonth();
        this.endMonth = requestDto.getEndDate().getMonth();
        this.startYear = requestDto.getStartDate().getYear();
        this.endYear = requestDto.getEndDate().getYear();
        this.subjectScheduleType = SubjectScheduleType.returnType(requestDto.getSubjectScheduleType());
    }
    public static OfficialSubjectScheduleEntity fromOfficialScheduleDto(OfficialScheduleRequestDto requestDto, SubjectEntity subject) {
        return new OfficialSubjectScheduleEntity(requestDto, subject);
    }


    @PrePersist
    void registeredAt(){
        this.createdAt = Timestamp.from(Instant.now());
    }
    @PreUpdate
    void updatedAt(){
        this.updatedAt = Timestamp.from(Instant.now());
    }

}
