package jp.co.wants.wants.domain;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Builder
@Data
@Table("pre_users")
public class PreUser {
    @Id
    private Integer id;
    private String userId;
    private String mailAddress;
}
