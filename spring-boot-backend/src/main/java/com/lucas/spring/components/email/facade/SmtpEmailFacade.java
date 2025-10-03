package com.lucas.spring.components.email.facade;

import com.lucas.spring.components.email.model.entity.EmailEntity;

/**
 * An interface service where we store methods
 * related to the email sender service.
 */
public interface SmtpEmailFacade {

  /**
   * Builds an email based on the provided entity and send it out
   * to a specific user.
   *
   * @param email The email entity to use for creating the email template and
   *              sending out the new email.
   * @return Returns true if the whole email sending process finished successfully, else false.
   */
  boolean buildEmail(EmailEntity email);
}
