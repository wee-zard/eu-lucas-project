package com.lucas.spring.components.email.facade.impl;

import com.lucas.spring.commons.utils.FormatParseUtil;
import com.lucas.spring.commons.utils.JsonUtil;
import com.lucas.spring.components.email.enums.EmailExceptionEnum;
import com.lucas.spring.components.email.enums.EmailReportKeyEnum;
import com.lucas.spring.components.email.enums.EmailTypeEnum;
import com.lucas.spring.components.email.facade.SmtpEmailFacade;
import com.lucas.spring.components.email.model.entity.EmailEntity;
import com.lucas.spring.components.user.model.entity.UserEntity;
import com.lucas.spring.components.user.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.Map;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
public class SmtpEmailFacadeImpl implements SmtpEmailFacade {
  private static final Logger logger = LoggerFactory.getLogger(SmtpEmailFacadeImpl.class);
  private static final String APPLICATION_TITLE = "Lucas Képelemző Szoftver";
  private final JavaMailSender mailSender;
  private final TemplateEngine templateEngine;
  private final UserService userService;
  @Value("${spring.mail.username}") private String sender;
  @Value("${spring.mail.recipient}") private String recipient;

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean buildEmail(final EmailEntity email) {
    final Long emailId = email.getType().getId();

    if (Objects.equals(emailId, EmailTypeEnum.REPORT_EMAIL.getId())) {
      return buildReportEmail(email);
    } else if (Objects.equals(emailId, EmailTypeEnum.USER_CREATION_EMAIL.getId())) {
      return buildUserCreationEmail(email);
    }

    logger.error(String.valueOf(EmailExceptionEnum.EMAIL_UNKNOWN_TYPE), email.getId());
    return false;
  }

  /**
   * Sends out report emails from the users.
   *
   * @param email the email to send out.
   * @return Returns true if the email has been sent out successfully, else false.
   */
  private boolean buildReportEmail(final EmailEntity email) {
    try {
      final Map<String, String> map = JsonUtil.parseJsonStringToMap(email.getContent());
      final Long id = FormatParseUtil.parseToLong(map.get(EmailReportKeyEnum.USER_ID.getName()));

      // Displaying the information of user who posted the report
      final UserEntity userEntity = userService.getUserById(id);

      // content is the variable defined in our HTML template within the div tag
      Context cx = new Context();
      cx.setVariable(EmailReportKeyEnum.NAME.getName(), "Admin");
      cx.setVariable(EmailReportKeyEnum.USERNAME.getName(), userEntity.getUserName());
      cx.setVariable(EmailReportKeyEnum.USER_ID.getName(), userEntity.getId());
      cx.setVariable(EmailReportKeyEnum.TYPE.getName(), map.get(EmailReportKeyEnum.TYPE.getName()));
      cx.setVariable(EmailReportKeyEnum.TITLE.getName(), map.get(EmailReportKeyEnum.TITLE.getName()));
      cx.setVariable(EmailReportKeyEnum.MESSAGE.getName(), map.get(EmailReportKeyEnum.MESSAGE.getName()));

      // Send out the email.
      final String emailSubject = String.format("[%s - Report]", APPLICATION_TITLE);
      final String templateName = "report-template.html";
      sendEmail(cx, templateName, emailSubject);

      return true;
    } catch (Exception e) {
      logger.error(String.valueOf(EmailExceptionEnum.EMAIL_REPORTING), email.getId());
      return false;
    }
  }

  /**
   * Send out user creation email.
   *
   * @param email the email to send out.
   * @return Returns true if the email has been sent out successfully, else false.
   */
  private boolean buildUserCreationEmail(final EmailEntity email) {
    try {
      // content is the variable defined in our HTML template within the div tag
      // TODO: Be kell fejezni az email template létrehozását.
      // TODO: Be kell állítani a szükséges paramétereket itt.
      Context cx = new Context();

      // Send out the email.
      final String emailSubject = String.format("[%s - Meghívó]", APPLICATION_TITLE);
      final String templateName = "user-creation-template.html";
      sendEmail(cx, templateName, emailSubject);

      return true;
    } catch (Exception e) {
      logger.error(String.valueOf(EmailExceptionEnum.EMAIL_USER_CREATION), email.getId());
      return false;
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
