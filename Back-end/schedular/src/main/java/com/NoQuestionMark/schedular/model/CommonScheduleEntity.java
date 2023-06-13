package com.NoQuestionMark.schedular.model;

import com.NoQuestionMark.schedular.controller.request.CommonScheduleFixRequestDto;
import com.NoQuestionMark.schedular.controller.request.CommonScheduleRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "\"common_schedule\"")
@NoArgsConstructor
@Getter
@DiscriminatorValue("COMMON")
public class CommonScheduleEntity extends ScheduleEntity{

    @Enumerated(EnumType.STRING)
    private ScheduleType scheduleType;

    @Enumerated(EnumType.STRING)
    private Importance importance;

    @Enumerated(EnumType.STRING)
    private Complete complete;

    @Builder
    private CommonScheduleEntity(CommonScheduleRequestDto requestDto, UserEntity user){
        super.title = requestDto.getTitle();
        this.user = user;
        this.startMonth = requestDto.getStartDate().getMonth();
        this.endMonth = requestDto.getEndDate().getMonth();
        this.importance = Importance.returnType(requestDto.getImportance());
        this.contents = requestDto.getContents();
        this.startDate = requestDto.getStartDate();
        this.endDate = requestDto.getEndDate();
        this.scheduleType = ScheduleType.returnType(requestDto.getScheduleType());
        this.startYear = requestDto.getStartDate().getYear();
        this.endYear = requestDto.getEndDate().getYear();
        this.complete = Complete.returnType(requestDto.getScheduleType());
    }

    public static CommonScheduleEntity fromCommonScheduleDto(CommonScheduleRequestDto requestDto, UserEntity user){
        return new CommonScheduleEntity(requestDto, user);
    }

    public void modifySchedule(CommonScheduleFixRequestDto requestDto, String scheduleType){
        this.title = requestDto.getTitle();
        this.startMonth = requestDto.getStartDate().getMonth();
        this.endMonth = requestDto.getEndDate().getMonth();
        this.importance = Importance.returnType(requestDto.getImportance());
        this.contents = requestDto.getContents();
        this.startDate = requestDto.getStartDate();
        this.endDate = requestDto.getEndDate();
        this.scheduleType = ScheduleType.returnType(requestDto.getScheduleType());
        this.startYear = requestDto.getStartDate().getYear();
        this.endYear = requestDto.getEndDate().getYear();
        this.complete = Complete.returnType(scheduleType);
    }

    public void updateCommonComplete() {
        if(this.getComplete().name().equals("FALSE")) {
            this.complete = Complete.TRUE;
            return;
        }
        if(this.getComplete().name().equals("TRUE")) this.complete = Complete.FALSE;
    }
}
