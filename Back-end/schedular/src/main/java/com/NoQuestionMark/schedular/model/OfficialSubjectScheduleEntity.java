package com.NoQuestionMark.schedular.model;

import com.NoQuestionMark.schedular.controller.request.OfficialScheduleRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@DiscriminatorValue("OFFICIAL_SUBJECT")
@Table(name = "\"official_subject_schedule\"")
public class OfficialSubjectScheduleEntity extends ScheduleEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    private SubjectEntity subject;
    @Enumerated(EnumType.STRING)
    private SubjectScheduleType subjectScheduleType;


    @Builder
    private OfficialSubjectScheduleEntity (OfficialScheduleRequestDto requestDto, SubjectEntity subject, UserEntity user){
        this.subject = subject;
        this.title = requestDto.getTitle();
        this.contents = requestDto.getContents();
        this.startDate = requestDto.getStartDate();
        this.endDate = requestDto.getEndDate();
        this.startMonth = requestDto.getStartDate().getMonth();
        this.user = user;
        this.endMonth = requestDto.getEndDate().getMonth();
        this.startYear = requestDto.getStartDate().getYear();
        this.endYear = requestDto.getEndDate().getYear();
        this.subjectScheduleType = SubjectScheduleType.returnType(requestDto.getSubjectScheduleType());
    }
    public static OfficialSubjectScheduleEntity fromOfficialScheduleDto(OfficialScheduleRequestDto requestDto, SubjectEntity subject, UserEntity user) {
        return new OfficialSubjectScheduleEntity(requestDto, subject, user);
    }

    public void scheduleFix(OfficialScheduleRequestDto requestDto){
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
}
