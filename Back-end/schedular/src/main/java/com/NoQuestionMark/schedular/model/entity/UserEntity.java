package com.NoQuestionMark.schedular.model.entity;

import lombok.AllArgsConstructor;
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
@Table(name = "\"user\"")
@NoArgsConstructor
@SQLDelete(sql = "update \"user\" set deleted_at = now() where id = ?")
@Where(clause = "deleted_at is null")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "school_number")
    private String schoolNumber;
    @Column(name = "name")
    private String name;
    @Column(name = "password")
    private String password;
    @Column(name = "user_role")
    @Enumerated(EnumType.STRING)
    private UserType userType;
    @Column(name = "email")
    private String email;

    @Column(name = "register_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "deleted_at")
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
