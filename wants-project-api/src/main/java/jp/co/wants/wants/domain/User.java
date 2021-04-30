package jp.co.wants.wants.domain;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Builder
@Table("users")
public class User {
    @Id
    private Integer id;
    private String userId;
    private String name;
    private String email;
    private String password;
    private String role;
    private boolean isMember;
}
