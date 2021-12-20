package com.nahalit.nahalapimanager.controller;

import com.nahalit.nahalapimanager.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/rest/email")
public class EmailController {
  private final EmailService emailService;

  private Logger logger = LoggerFactory.getLogger(EmailController.class);

  public EmailController(EmailService emailService) {
    this.emailService = emailService;
  }

  @PostMapping("/send-mail")
  public void sendEMail(@Valid @RequestParam(value = "sendTo") String[] sendTo, @RequestParam(required = false) String[] sendCC, @RequestParam(required = false) String[] sendBcc, @RequestParam String mailSubject, @RequestParam String messageBody, @RequestParam(required = false) boolean isHTML) {
    try {
      emailService.sendEmail(sendTo, sendCC, sendBcc, mailSubject, messageBody, isHTML);
    } catch (MailException | MessagingException e) {
      logger.info("Error sending email: " + e.getMessage());
    }
  }
}