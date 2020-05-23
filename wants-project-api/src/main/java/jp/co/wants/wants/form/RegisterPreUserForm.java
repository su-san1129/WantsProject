package jp.co.wants.wants.form;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class RegisterPreUserForm {
    private String userId;
    private String name;
    private String mailAddress;
    private String password;
}
