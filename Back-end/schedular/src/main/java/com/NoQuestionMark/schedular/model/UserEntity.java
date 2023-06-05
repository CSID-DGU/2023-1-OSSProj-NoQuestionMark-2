package com.NoQuestionMark.schedular.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.Instant;

@Entity
@Getter
@Table(name = "\"users\"")
@NoArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String schoolNumber;
    private String name;
    private String password;
    @Enumerated(EnumType.STRING)
    private UserType userType;
    private String email;

    private Timestamp createdAt;

    private Timestamp updatedAt;

    private Timestamp deletedAt;
    @Builder
    public UserEntity(String schoolNumber, String name, String password, UserType userType, String email) {
        this.schoolNumber = schoolNumber;
        this.name = name;
        this.password = password;
        this.userType = userType;
        this.email = email;
    }

    public static UserEntity save(String schoolNumber, String name, String password, UserType userType, String email) {
        return new UserEntity(schoolNumber, name, password, userType, email);
    }

    @PrePersist
    void registeredAt(){
        this.createdAt = Timestamp.from(Instant.now());
    }
    @PreUpdate
    void updatedAt(){
        this.updatedAt = Timestamp.from(Instant.now());
    }

}
