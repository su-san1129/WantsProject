package jp.co.wants.wants.form;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserGroupForm {
    private Integer id;
    private String name;
    private List<String> mailList;
}
