package com.NoQuestionMark.schedular.model;

import com.NoQuestionMark.schedular.controller.request.SubjectScheduleRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "\"subject_schedule\"")
@NoArgsConstructor
@Getter
@DiscriminatorValue("SUBJECT")
public class SubjectScheduleEntity extends ScheduleEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    private SubjectEntity subject;
    private SubjectScheduleType subjectScheduleType;
    private ScheduleType scheduleType;
    private Importance importance;


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
        this.importance = Importance.returnType(requestDto.getImportance());
        this.scheduleType = ScheduleType.returnType(requestDto.getScheduleType());
        this.subjectScheduleType = SubjectScheduleType.returnType(requestDto.getSubjectScheduleType());
        this.startYear = requestDto.getStartDate().getYear();
        this.endYear = requestDto.getEndDate().getYear();
    }

    public static SubjectScheduleEntity fromSubjectScheduleDto(SubjectScheduleRequestDto requestDto, UserEntity user, SubjectEntity subject){
        return new SubjectScheduleEntity(requestDto, user, subject);
    }

    public void modifySchedule(SubjectScheduleRequestDto requestDto, SubjectEntity subject) {
        this.title = requestDto.getTitle();
        this.subject = subject;
        this.startMonth = requestDto.getStartDate().getMonth();
        this.endMonth = requestDto.getEndDate().getMonth();
        this.contents = requestDto.getContents();
        this.startDate = requestDto.getStartDate();
        this.endDate = requestDto.getEndDate();
        this.importance = Importance.returnType(requestDto.getImportance());
        this.scheduleType = ScheduleType.returnType(requestDto.getScheduleType());
        this.subjectScheduleType = SubjectScheduleType.returnType(requestDto.getSubjectScheduleType());
        this.startYear = requestDto.getStartDate().getYear();
        this.endYear = requestDto.getEndDate().getYear();
    }
}

