package com.lucas.spring.components.scheduler;

import com.lucas.spring.commons.utils.PageablePropertiesUtil;
import com.lucas.spring.components.email.facade.SmtpEmailFacade;
import com.lucas.spring.components.email.model.entity.EmailEntity;
import com.lucas.spring.components.email.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * A scheduler class that will send out emails to users.
 */
@Component
@AllArgsConstructor
public class EmailScheduler {
  private final EmailService emailService;
  private final SmtpEmailFacade smtpEmailFacade;

  /**
   * A cron job that will run hourly to send out emails.
   */
  @Scheduled(cron = "0 0 * * * *")
  public void hourlyEmailSendOutTask() {
    final Page<EmailEntity> paged = emailService.findAll(PageablePropertiesUtil.create(0, 140));

    for (final var email : paged.getContent()) {
      final boolean isEmailSentOut = smtpEmailFacade.buildEmail(email);

      if (isEmailSentOut) {
        emailService.delete(email.getId());
      }
    }
  }
}
