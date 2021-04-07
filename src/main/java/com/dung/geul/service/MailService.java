package com.dung.geul.service;

import com.dung.geul.dto.MailDTO;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MailService {

    private JavaMailSender mailSender;
    private static final String FROM_ADDRESS = "cos850@g.yju.ac.kr";

    public void mailSend(MailDTO mailDTO) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailDTO.getAddress());
        message.setFrom(MailService.FROM_ADDRESS);
        message.setSubject(mailDTO.getTitle());
        message.setText(mailDTO.getMessage());

        mailSender.send(message);
    }
}
