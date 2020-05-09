package jp.co.wants.wants.service;

import jp.co.wants.wants.domain.UserGroup;
import jp.co.wants.wants.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Base64;

@RequiredArgsConstructor
@Service
public class MailSenderService {
    @Autowired
    private MailSender mailSender;

    private final UserRepository userRepository;

    @Value("${spring.mail.username}")
    private String setToMailAddress;

    @Async
    public void send(final String id) {
        final String encodeBase64 = Base64.getUrlEncoder().encodeToString(id.getBytes());
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(this.setToMailAddress);
        msg.setFrom(this.setToMailAddress);
        msg.setSubject("登録ありがとうございます。");
        msg.setText("本アカウントを有効にするために、下記URLを確認してください\nhttp://localhost:4200/authenticate?validateId=" + encodeBase64);
        mailSender.send(msg);
    }

    @Async
    public void sendForUserGroup(final UserGroup userGroup, final String mailAddress, final String userName) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(mailAddress);
        msg.setFrom(this.setToMailAddress);
        msg.setSubject("グループへの招待");
        msg.setText(userName + "さんから「" + userGroup.getName() + "」のグループに招待されました\n" +
                    "下記URLを確認してください\nhttp://localhost:4200/user_group_confirm?id=" + userGroup.getId());
        mailSender.send(msg);
    }
}
