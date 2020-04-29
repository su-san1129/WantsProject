package jp.co.wants.wants.service;

import jp.co.wants.wants.IdGenerator;
import jp.co.wants.wants.domain.User;
import jp.co.wants.wants.form.RegisterForm;
import jp.co.wants.wants.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    public void save(RegisterForm registerForm){
        System.out.println("IdGenerator.setPrimaryKey() = " + IdGenerator.setPrimaryKey());
        User user = User.builder()
                .userId(IdGenerator.setPrimaryKey())
                .name(registerForm.getName())
                .mailAddress(registerForm.getMailAddress())
                .password(passwordEncoder.encode(registerForm.getPassword()))
                .role("MEMBER")
                .build();
        userRepository.save(user);
    }


}
