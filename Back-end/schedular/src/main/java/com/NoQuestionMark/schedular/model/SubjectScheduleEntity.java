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
    @Enumerated(EnumType.STRING)
    private SubjectScheduleType subjectScheduleType;
    @Enumerated(EnumType.STRING)
    private ScheduleType scheduleType;
    @Enumerated(EnumType.STRING)
    private Importance importance;
    @Enumerated(EnumType.STRING)
    private Complete complete;


    @Builder
    private SubjectScheduleEntity(SubjectScheduleRequestDto requestDto, UserEntity user, SubjectEntity subject, String complete){
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
        this.complete = Complete.returnType(complete);
    }

    public static SubjectScheduleEntity fromSubjectScheduleDto(SubjectScheduleRequestDto requestDto, UserEntity user, SubjectEntity subject, String complete){
        return new SubjectScheduleEntity(requestDto, user, subject, complete);
    }

    public void modifySchedule(SubjectScheduleRequestDto requestDto, SubjectEntity subject, String complete) {
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
        this.complete = Complete.returnType(complete);
    }

    public void updateSubjectComplete() {
        if(this.getComplete().name().equals("FALSE")) {
            this.complete = Complete.TRUE;
            return;
        }
        if(this.getComplete().name().equals("TRUE")) this.complete = Complete.FALSE;
    }
}

