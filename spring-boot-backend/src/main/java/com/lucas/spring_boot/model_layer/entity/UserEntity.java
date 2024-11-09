package com.lucas.spring_boot.model_layer.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "User")
@Table(name = "tb_user_root")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    public Long id;
    @Column(name = "auth_token", length = 256)
    public String authToken;
    @Column(name = "email_address", length = 1155, nullable = false)
    public String emailAddress;
    @Column(name = "username", length = 100)
    public String userName;
    @CreationTimestamp
    public Instant creationTime;
    @ManyToOne
    @JoinColumn(name = "status_id", nullable = false)
    public StatusEntity status;

    @Override
    public String toString() {
        return "UserEntity{" +
                "id=" + id +
                ", authToken='" + authToken + '\'' +
                ", emailAddress='" + emailAddress + '\'' +
                ", userName='" + userName + '\'' +
                ", creationTime=" + creationTime +
                ", status=" + status +
                '}';
    }
}
