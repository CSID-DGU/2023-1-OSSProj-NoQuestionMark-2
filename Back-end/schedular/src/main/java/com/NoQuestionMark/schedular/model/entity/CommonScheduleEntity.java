package com.NoQuestionMark.schedular.model.entity;

import com.NoQuestionMark.schedular.controller.request.CommonScheduleFixRequestDto;
import com.NoQuestionMark.schedular.controller.request.CommonScheduleRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.*;

@Entity
@Table(name = "\"common_schedule\"")
@NoArgsConstructor
@Getter
public class CommonScheduleEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;
    private String contents;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    @Enumerated(EnumType.STRING)
    private Importance importance;
    private Month startMonth;
    private Month endMonth;
    private int startYear;
    private int endYear;
    @Enumerated(EnumType.STRING)
    private ScheduleType scheduleType;
    private boolean complete;
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
    private CommonScheduleEntity(CommonScheduleRequestDto requestDto, UserEntity user){
        this.title = requestDto.getTitle();
        this.user = user;
        this.startMonth = requestDto.getStartDate().getMonth();
        this.endMonth = requestDto.getEndDate().getMonth();
        this.importance = Importance.returnType(requestDto.getImportance());
        this.contents = requestDto.getContents();
        this.startDate = requestDto.getStartDate();
        this.endDate = requestDto.getEndDate();
        this.complete = false;
        this.scheduleType = ScheduleType.returnType(requestDto.getCommonScheduleType());
        this.startYear = requestDto.getStartDate().getYear();
        this.endYear = requestDto.getEndDate().getYear();
    }

    public static CommonScheduleEntity fromCommonScheduleDto(CommonScheduleRequestDto requestDto, UserEntity user){
        return new CommonScheduleEntity(requestDto, user);
    }

    public void fixSchedule(CommonScheduleFixRequestDto requestDto){
        this.title = requestDto.getTitle();
        this.startMonth = requestDto.getStartDate().getMonth();
        this.endMonth = requestDto.getEndDate().getMonth();
        this.importance = Importance.returnType(requestDto.getImportance());
        this.contents = requestDto.getContents();
        this.startDate = requestDto.getStartDate();
        this.endDate = requestDto.getEndDate();
        this.scheduleType = ScheduleType.returnType(requestDto.getCommonScheduleType());
        this.startYear = requestDto.getStartDate().getYear();
        this.endYear = requestDto.getEndDate().getYear();
    }


}
