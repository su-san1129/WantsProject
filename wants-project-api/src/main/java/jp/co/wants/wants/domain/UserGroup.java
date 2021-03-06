package jp.co.wants.wants.domain;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Timestamp;

@Data
@Builder
@Table("user_groups")
public class UserGroup {
    @Id
    private Integer id;
    private String name;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
