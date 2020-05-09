package jp.co.wants.wants.domain;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
@Builder
public class UserGroupJoinUser {
    private Integer id;
    private String name;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private List<User> belongsToGroupUsersList;
}
