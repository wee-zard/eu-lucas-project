package com.lucas.spring.services.service.impl;

import com.lucas.spring.model.entity.UserEntity;
import com.lucas.spring.model.request.SmtpEmailRequest;
import com.lucas.spring.services.service.SmtpEmailService;
import com.lucas.spring.services.service.UserService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

/**
 * An interface service where we store methods
 * related to the email sender service.
 */
@RequiredArgsConstructor
@Service
public class SmtpEmailServiceImpl implements SmtpEmailService {
  private final JavaMailSender mailSender;
  private final TemplateEngine templateEngine;
  private final UserService userService;
  @Value("${spring.mail.username}") private String sender;
  @Value("${spring.mail.recipient}") private String recipient;

  private static final String RECIPIENT_NAME = "Attila";
  private static final String EMAIL_TEMPLATE_NAME = "smtpEmailSent.html";
  private static final String EMAIL_SUBJECT_NAME = "[Lucas EU Project - Report]";

  /**
   * {@inheritDoc}
   */
  @Override
  public String sendSimpleMail(
          final SmtpEmailRequest details,
          final Long userId
  ) {
    // Try block to check for exceptions
    try {
      // Creating a simple mail message
      MimeMessage message = mailSender.createMimeMessage();

      // use the true flag to indicate you need a multipart message
      MimeMessageHelper helper = new MimeMessageHelper(message, true);

      // Set the properties of the message
      helper.setFrom(sender);
      helper.setTo(recipient);
      helper.setSubject(EMAIL_SUBJECT_NAME);

      // Displaying the information of user who posted the report
      final UserEntity userEntity = userService.getUserById(userId);

      // content is the variable defined in our HTML template within the div tag
      Context context = new Context();
      context.setVariable("name", RECIPIENT_NAME);
      context.setVariable("type", details.getReportType().getName());
      context.setVariable("title", details.getTitle());
      context.setVariable("username", userEntity.getUserName());
      context.setVariable("userid", userEntity.getId());
      context.setVariable("message", details.getMessage());
      String processedString = templateEngine.process(EMAIL_TEMPLATE_NAME, context);

      // Set the body of the email
      helper.setText(processedString, true);

      // Sending the email to the address
      mailSender.send(message);
      return "Mail Sent Successfully...";
    } catch (Exception e) {
      throw new RuntimeException("Error occurred while sent out the email");
    }
  }
}
