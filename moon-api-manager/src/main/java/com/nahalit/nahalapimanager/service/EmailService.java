package com.nahalit.nahalapimanager.service;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {

  private final JavaMailSender javaMailSender;

  public EmailService(JavaMailSender javaMailSender) {
    this.javaMailSender = javaMailSender;
  }

  public void sendEmail(String[] sendTo, String[] sendCC, String[] sendBcc, String mailSubject, String messageBody, boolean isHTML) throws MailException, MessagingException {

    MimeMessage mimeMessage = javaMailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

    helper.setTo(sendTo);
    helper.setFrom("badrul@nahalit.com");
    if (sendCC != null) {
      helper.setCc(sendCC);
    }
    if (sendBcc != null) {
      helper.setBcc(sendBcc);
    }
    helper.setSubject(mailSubject);
    helper.setText(messageBody, isHTML);
//    FileSystemResource file=new FileSystemResource(new File("upload-dir/05082019203234323455600000034.png"));
//    helper.addAttachment("BadrulImage.png", file);
    javaMailSender.send(mimeMessage);
  }
}
