package a203.findit.model.entity;

import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long id;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "create_time", updatable = false)
    @CreatedDate
    private LocalDateTime createTime;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(255) default 'ROLE_GUEST'")
    private UserRole role;


    public void deleteUser(){
        this.username = String.valueOf(this.id);
        this.nickname = "deleteuser" + this.id;
        this.password = null;
    }


    // 외부로부터 접근권한 최소화.
    // 프록시 생성위해 생성자 사용
    protected User() {
    }

    private User(Builder builder) {
        this.username = builder.username;
        this.nickname = builder.nickname;
        this.password = builder.password;
    }

    public static User.Builder builder() {
        return new User.Builder();
    }

    // Builder 패턴 ( Not Lombok )
    public static class Builder {

        private String username;
        private String nickname;
        private String password;

        // Because of MapStruct
        public Builder() {}

        // Required Parameter
        public Builder(String username, String nickname, String password) {
            this.username = username;
            this.nickname = nickname;
            this.password = password;
        }

        public Builder username(String username){
            this.username = username;
            return this;
        }

        public Builder nickname(String nickname){
            this.nickname = nickname;
            return this;
        }

        public Builder password(String password){
            this.password = password;
            return this;
        }

        public User build() {
            return new User(this);
        }
    }


    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getNickname() {
        return nickname;
    }

    public UserRole getRole() {
        return role;
    }
}
