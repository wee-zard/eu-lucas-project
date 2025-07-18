package com.lucas.spring.components.email.service.impl;

import com.lucas.spring.components.email.enums.EmailExceptionEnum;
import com.lucas.spring.components.email.exception.EmailException;
import com.lucas.spring.components.email.model.request.ReportEmailRequest;
import com.lucas.spring.components.email.service.SmtpEmailService;
import com.lucas.spring.components.user.model.entity.UserEntity;
import com.lucas.spring.components.user.model.request.UserCreationRequest;
import com.lucas.spring.components.user.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

/**
 * TODO: This service should be a facade instead,
 * TODO: because I do not like that a service contains an another service inside of it.
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

  /**
   * {@inheritDoc}
   */
  @Override
  public void buildEmail(final ReportEmailRequest request, final Long userId) {
    try {
      // Displaying the information of user who posted the report
      final UserEntity userEntity = userService.getUserById(userId);

      // content is the variable defined in our HTML template within the div tag
      Context context = new Context();
      context.setVariable("name", "Attila");
      context.setVariable("type", request.getReportType().getName());
      context.setVariable("title", request.getTitle());
      context.setVariable("username", userEntity.getUserName());
      context.setVariable("userid", userEntity.getId());
      context.setVariable("message", request.getMessage());

      // Send out the email.
      sendEmail(
              context,
              "report-template.html",
              "[Lucas Képelemző Szoftver - Report]"
      );
    } catch (Exception e) {
      throw new EmailException(EmailExceptionEnum.EMAIL_REPORTING,
              userId, request.getReportType(), request.getMessage());
    }
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void buildEmail(final UserCreationRequest request) {
    try {
      // content is the variable defined in our HTML template within the div tag
      // TODO: Be kell fejezni az email template létrehozását.
      // TODO: Be kell állítani a szükséges paramétereket itt.
      Context context = new Context();

      // Send out the email.
      sendEmail(
              context,
              "user-creation-template.html",
              "[Lucas Képelemző Szoftver - Meghívó]"
      );
    } catch (Exception e) {
      throw new EmailException(EmailExceptionEnum.EMAIL_USER_CREATION, request.getEmailAddress());
    }
  }

  /**
   * Send out the email.
   *
   * @param context a variable defined in our HTML template within the div tag.
   * @param templateName the name of the email file that defines the body of the email.
   **/
  private void sendEmail(
          final Context context,
          final String templateName,
          final String emailSubject
  ) throws MessagingException {
    // Creating a simple mail message.
    MimeMessage message = mailSender.createMimeMessage();

    // use the true flag to indicate you need a multipart message.
    MimeMessageHelper helper = new MimeMessageHelper(message, true);

    // Set the properties of the message.
    helper.setFrom(sender);
    helper.setTo(recipient);
    helper.setSubject(emailSubject);

    // The processes text to send out.
    String processedString = templateEngine.process(templateName, context);

    // Set the body of the email.
    helper.setText(processedString, true);

    // Sending the email to the address.
    mailSender.send(message);
  }
}
