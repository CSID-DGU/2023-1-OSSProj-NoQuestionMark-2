package com.NoQuestionMark.schedular.model;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "\"complete\"")
@NoArgsConstructor
public class Complete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id")
    private ScheduleEntity schedule;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;
    private boolean complete;

    public Complete (UserEntity user, ScheduleEntity schedule){
        this.user = user;
        this.schedule = schedule;
        this.complete = false;
    }

    public Complete(ScheduleEntity schedule){
        this.schedule = schedule;
        this.user = schedule.getUser();
        this.complete = false;
    }

    public static Complete newAssignmentFromOfficial(UserEntity listener, ScheduleEntity schedule) {
        return new Complete(listener, schedule);
    }

    public static Complete fromPersonalSchedule(ScheduleEntity schedule){
        return new Complete(schedule);
    }

    public void updateCompleteStatus() {
        if(!this.complete) {
            this.complete = true;
            return;
        }
        this.complete = false;
    }
}
