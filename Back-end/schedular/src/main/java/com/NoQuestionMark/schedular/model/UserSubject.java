package com.NoQuestionMark.schedular.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@Entity
@NoArgsConstructor
@Getter
@Table(name = "\"user_subject\"")
public class UserSubject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    private SubjectEntity subject;

    @Builder
    public UserSubject(UserEntity user, SubjectEntity subject){
        this.user = user;
        this.subject = subject;
    }
    public static UserSubject fromUserSubject(UserEntity user, SubjectEntity subject){
        return new UserSubject(user, subject);
    }
}
