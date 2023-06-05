package com.NoQuestionMark.schedular.model;

import lombok.Getter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.Month;

@Getter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "\"schedule\"")
@DiscriminatorColumn(name = "schedule")
public abstract class ScheduleEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    protected String title;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    protected UserEntity user;
    protected String contents;
    protected LocalDateTime startDate;
    protected LocalDateTime endDate;
    protected Month startMonth;
    protected Month endMonth;
    protected int startYear;
    protected int endYear;
    protected Timestamp createdAt;
    protected Timestamp updatedAt;
    protected Timestamp deletedAt;
}
