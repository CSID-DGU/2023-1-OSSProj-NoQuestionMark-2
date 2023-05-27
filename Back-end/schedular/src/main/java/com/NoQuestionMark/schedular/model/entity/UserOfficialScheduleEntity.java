package com.NoQuestionMark.schedular.model.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.Instant;

@Entity
@Getter
@Table(name = "\"user_official_schedule\"")
@NoArgsConstructor
@SQLDelete(sql = "update \"user_official_schedule\" set deleted_at = now() where id = ?")
@Where(clause = "deleted_at is null")
public class UserOfficialScheduleEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    private SubjectEntity subject;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;
    private int complete;

    @Column(name = "register_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "deleted_at")
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
    private UserOfficialScheduleEntity (UserEntity user, SubjectEntity subject){
        this.user = user;
        this.subject = subject;
        this.complete = 0;
    }
    public static UserOfficialScheduleEntity assignNew(UserEntity user, SubjectEntity subject){
        return new UserOfficialScheduleEntity(user, subject);
    }

}
