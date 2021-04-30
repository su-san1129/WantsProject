package jp.co.wants.wants.form;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginForm {
    private String email;
    private String password;
}
