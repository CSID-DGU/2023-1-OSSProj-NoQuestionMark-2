package com.NoQuestionMark.schedular.model;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "\"user_official_schedule\"")
@NoArgsConstructor
public class UserOfficialScheduleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id")
    private OfficialSubjectScheduleEntity schedule;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;
    @Enumerated(EnumType.STRING)
    private Complete complete;

    public UserOfficialScheduleEntity(UserEntity user, OfficialSubjectScheduleEntity schedule){
        this.user = user;
        this.schedule = schedule;
        this.complete = Complete.returnType(schedule.getSubjectScheduleType().name());
    }

    public UserOfficialScheduleEntity(OfficialSubjectScheduleEntity schedule){
        this.schedule = schedule;
        this.user = schedule.getUser();
        this.complete = Complete.returnType(schedule.getSubjectScheduleType().name());
    }

    public static UserOfficialScheduleEntity newAssignmentFromOfficial(UserEntity listener, OfficialSubjectScheduleEntity schedule) {
        return new UserOfficialScheduleEntity(listener, schedule);
    }


    public void updateCompleteStatus() {
        if(this.complete.name().equals("TRUE")) {
            this.complete = Complete.FALSE;
            return;
        }
        this.complete = Complete.TRUE;
    }
}
