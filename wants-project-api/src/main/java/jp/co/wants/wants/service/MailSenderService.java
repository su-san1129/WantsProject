package jp.co.wants.wants.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service
public class MailSenderService {
    @Autowired
    private MailSender mailSender;

    @Value("${spring.mail.username}")
    private String setToMailAddress;

    public void send() {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(this.setToMailAddress);
        msg.setFrom(this.setToMailAddress);
        msg.setSubject("サンプル");
        msg.setText("サンプルテキストを送信します。");
        mailSender.send(msg);
    }
}
