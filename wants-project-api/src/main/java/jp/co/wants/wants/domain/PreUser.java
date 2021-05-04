package jp.co.wants.wants.domain;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Timestamp;

@Builder
@Data
@Table("pre_users")
public class PreUser {
    @Id
    private Integer id;
    private String userId;
    private String name;
    private String email;
    private String password;
    private Timestamp createdAt;

    public User toUser() {
        return User.builder()
                .userId(this.userId)
                .name(this.name)
                .email(this.password)
                .password(this.password)
                .role(UserRole.PRE_MEMBER.name())
                .build();
    }
}
