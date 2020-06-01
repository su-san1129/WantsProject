package jp.co.wants.wants.service;

import jp.co.wants.wants.IdGenerator;
import jp.co.wants.wants.domain.PreUser;
import jp.co.wants.wants.domain.User;
import jp.co.wants.wants.domain.UserRole;
import jp.co.wants.wants.form.RegisterForm;
import jp.co.wants.wants.form.RegisterPreUserForm;
import jp.co.wants.wants.repository.PreUserRepository;
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
    private final PreUserRepository preUserRepository;
    private final MailSenderService mailSenderService;

    public void save(RegisterForm registerForm){
        User user = User.builder()
                .userId(IdGenerator.setPrimaryKey())
                .name(registerForm.getName())
                .mailAddress(registerForm.getMailAddress())
                .password(passwordEncoder.encode(registerForm.getPassword()))
                .role(UserRole.MEMBER.name())
                .isMember(false)
                .build();
        mailSenderService.send(user.getUserId());
        userRepository.save(user);
    }

    public void savePreUser(RegisterPreUserForm registerForm){
        User user = User.builder()
                .userId(registerForm.getUserId())
                .name(registerForm.getName())
                .mailAddress(registerForm.getMailAddress())
                .password(passwordEncoder.encode(registerForm.getPassword()))
                .role(UserRole.MEMBER.name())
                .isMember(true)
                .build();

        preUserRepository.deleteByUserId(registerForm.getUserId());
        userRepository.save(user);
    }

    public void checkUserId(String userId) {
        final User user = userRepository.findByUserId(userId).orElseThrow();
        user.setMember(true);
        userRepository.save(user);
    }


    public PreUser getPreUser(String id) {
        return preUserRepository.findByUserId(id).orElseThrow();
    }
}
