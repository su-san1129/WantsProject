package jp.co.wants.wants.form;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterForm {
    private String name;
    private String email;
    private String password;
}
