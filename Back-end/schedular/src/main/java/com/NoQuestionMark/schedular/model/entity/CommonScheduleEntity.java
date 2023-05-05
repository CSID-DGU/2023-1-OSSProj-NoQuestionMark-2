package com.NoQuestionMark.schedular.model.entity;

import com.NoQuestionMark.schedular.controller.request.CommonScheduleRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

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
    }

    public static CommonScheduleEntity fromCommonScheduleDto(CommonScheduleRequestDto requestDto, UserEntity user){
        return new CommonScheduleEntity(requestDto, user);
    }
}
