package jp.co.wants.wants.domain;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Timestamp;

@Data
@Builder
@Table("belongs_to_group_users")
public class BelongsToGroupUsers {
    @Id
    private Integer id;
    private Integer userGroupId;
    private String userId;
    private boolean isOwner;
    private boolean isApproved;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
