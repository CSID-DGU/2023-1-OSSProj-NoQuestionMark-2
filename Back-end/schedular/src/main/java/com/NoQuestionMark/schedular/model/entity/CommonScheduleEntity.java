package com.NoQuestionMark.schedular.model.entity;

import com.NoQuestionMark.schedular.controller.request.CommonScheduleRequestDto;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.criteria.From;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "\"common_schedule\"")
@NoArgsConstructor
public class CommonScheduleEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;
    private String contents;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;
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
        this.contents = requestDto.getContents();
        this.startDate = requestDto.getStartDate();
        this.endDate = requestDto.getEndDate();
        this.startTime = requestDto.getStartTime();
        this.endTime = requestDto.getEndTime();
    }

    public static CommonScheduleEntity fromCommonScheduleDto(CommonScheduleRequestDto requestDto, UserEntity user){
        return new CommonScheduleEntity(requestDto, user);
    }
}
