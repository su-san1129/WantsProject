package jp.co.wants.wants.domain;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.sql.Timestamp;

@Data
@Builder
public class BelongsToGroupUsers {
    @Id
    private Integer id;
    private Integer groupId;
    private String userId;
    private boolean isOwner;
    private boolean isApproved;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
