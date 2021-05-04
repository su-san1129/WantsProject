package jp.co.wants.wants.service;

import jp.co.wants.wants.IdGenerator;
import jp.co.wants.wants.ResourceNotFoundException;
import jp.co.wants.wants.domain.PreUser;
import jp.co.wants.wants.domain.User;
import jp.co.wants.wants.domain.UserRole;
import jp.co.wants.wants.form.RegisterForm;
import jp.co.wants.wants.form.RegisterPreUserForm;
import jp.co.wants.wants.repository.PreUserRepository;
import jp.co.wants.wants.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;
    private final PreUserRepository preUserRepository;
    private final MailSenderService mailSenderService;

    // 仮ユーザーテーブルに保存する
    public void save(RegisterForm registerForm) {
        PreUser user = PreUser.builder()
                .userId(IdGenerator.setPrimaryKey())
                .name(registerForm.getName())
                .email(registerForm.getEmail())
                .password(passwordEncoder.encode(registerForm.getPassword()))
                .createdAt(Timestamp.valueOf(LocalDateTime.now()))
                .build();
        if (preUserRepository.findByEmail(registerForm.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
        mailSenderService.send(user.getUserId());
        preUserRepository.save(user);
    }

    public void savePreUser(RegisterPreUserForm registerForm) {
        User user = User.builder()
                .userId(registerForm.getUserId())
                .name(registerForm.getName())
                .email(registerForm.getEmail())
                .password(passwordEncoder.encode(registerForm.getPassword()))
                .role(UserRole.MEMBER.name())
                .build();
        preUserRepository.deleteByUserId(registerForm.getUserId());
        userRepository.save(user);
    }

    public void checkUserId(String userId) throws ResourceNotFoundException {
        final PreUser preUser = preUserRepository.findByUserId(userId).orElseThrow();
        LocalDateTime createdAt = preUser.getCreatedAt().toLocalDateTime();
        // 作成から30分経過のユーザーは失敗
        if (LocalDateTime.now().isAfter(createdAt.plusMinutes(30))) {
            throw new ResourceNotFoundException("User is not found");
        }
        User user = preUser.toUser();
        user.setRole(UserRole.MEMBER.name());
        userRepository.save(user);

        // 保存後、仮ユーザーテーブルからは削除
        preUserRepository.deleteById(preUser.getId());
    }

    public PreUser getPreUser(String id) {
        return preUserRepository.findByUserId(id).orElseThrow();
    }
}
