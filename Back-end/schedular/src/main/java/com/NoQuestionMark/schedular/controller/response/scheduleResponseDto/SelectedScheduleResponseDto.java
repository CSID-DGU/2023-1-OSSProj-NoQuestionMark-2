package com.NoQuestionMark.schedular.controller.response.scheduleResponseDto;

import com.NoQuestionMark.schedular.model.CommonScheduleEntity;
import com.NoQuestionMark.schedular.model.OfficialSubjectScheduleEntity;
import com.NoQuestionMark.schedular.model.SubjectScheduleEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class SelectedScheduleResponseDto {
    private Long scheduleId;
    private String title;
    private String className;
    private String contents;
    private String schedule;
    private String subjectScheduleType;
    private String scheduleType;
    private String importance;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int dDay;
    private String complete;

    @Builder
    private SelectedScheduleResponseDto(CommonScheduleEntity schedule){
        this.scheduleId = schedule.getId();
        this.title = schedule.getTitle();
        this.contents = schedule.getContents();
        this.importance = schedule.getImportance().name();
        this.schedule = CommonScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value();
        this.scheduleType = schedule.getScheduleType().name();
        this.startDate = schedule.getStartDate();
        this.endDate = schedule.getEndDate();
        this.complete = schedule.getComplete().name();
        this.dDay = LocalDateTime.now().getDayOfYear() - schedule.getEndDate().getDayOfYear();
    }
    public static SelectedScheduleResponseDto fromCommonSchedule(CommonScheduleEntity schedule) {
        return new SelectedScheduleResponseDto(schedule);
    }

    @Builder
    private SelectedScheduleResponseDto(SubjectScheduleEntity schedule){
        this.scheduleId = schedule.getId();
        this.title = schedule.getTitle();
        this.contents = schedule.getContents();
        this.importance = schedule.getImportance().name();
        this.schedule = SubjectScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value();
        this.scheduleType = schedule.getScheduleType().name();
        this.startDate = schedule.getStartDate();
        this.subjectScheduleType = schedule.getSubjectScheduleType().name();
        this.className = schedule.getSubject().getSubjectName();
        this.endDate = schedule.getEndDate();
        this.complete = schedule.getComplete().name();
        this.dDay = LocalDateTime.now().getDayOfYear() - schedule.getEndDate().getDayOfYear();
    }

    public static SelectedScheduleResponseDto fromSubjectSchedule(SubjectScheduleEntity schedule){
        return new SelectedScheduleResponseDto(schedule);
    }

    @Builder
    private SelectedScheduleResponseDto(OfficialSubjectScheduleEntity schedule, String complete){
        this.scheduleId = schedule.getId();
        this.title = schedule.getTitle();
        this.contents = schedule.getContents();
        this.className = schedule.getSubject().getSubjectName();
        this.schedule = OfficialSubjectScheduleEntity.class.getAnnotation(DiscriminatorValue.class).value();
        this.subjectScheduleType = schedule.getSubjectScheduleType().name();
        this.startDate = schedule.getStartDate();
        this.endDate = schedule.getEndDate();
        this.dDay = LocalDateTime.now().getDayOfYear() - schedule.getEndDate().getDayOfYear();
        this.complete = complete;
    }

    public static SelectedScheduleResponseDto fromOfficialSchedule(OfficialSubjectScheduleEntity schedule, String complete){
        return new SelectedScheduleResponseDto(schedule, complete);
    }
}
