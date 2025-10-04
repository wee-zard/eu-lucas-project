package com.lucas.spring.components.email.service.impl;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.email.enums.EmailReportKeyEnum;
import com.lucas.spring.components.email.enums.EmailTypeEnum;
import com.lucas.spring.components.email.enums.EmailUserCreationKeyEnum;
import com.lucas.spring.components.email.model.entity.EmailEntity;
import com.lucas.spring.components.email.model.entity.EmailTypeEntity;
import com.lucas.spring.components.email.repository.EmailRepository;
import com.lucas.spring.components.email.service.EmailService;
import com.lucas.spring.components.report.model.request.ReportRequest;
import com.lucas.spring.components.user.model.entity.UserEntity;
import com.lucas.spring.components.user.model.request.UserCreationRequest;
import java.util.HashMap;
import java.util.Map;

import com.lucas.spring.components.user.service.UserService;
import lombok.AllArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service implementation of the emails.
 */
@Service
@AllArgsConstructor
public class EmailServiceImpl implements EmailService {
  private final EmailRepository repository;
  private final UserService userService;

  /**
   * {@inheritDoc}
   */
  @Override
  public Page<EmailEntity> findAll(final Pageable pageable) {
    return repository.findAll(pageable);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void delete(final EmailEntity entity) {
    repository.delete(entity);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void delete(final Long id) {
    repository.deleteById(id);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void save(final ReportRequest report, final AuthenticatedUser user) {
    final Map<String, String> content = new HashMap<>();
    content.put(EmailReportKeyEnum.USER_ID.getName(), user.getUserId().toString());
    content.put(EmailReportKeyEnum.MESSAGE.getName(), report.getMessage());
    content.put(EmailReportKeyEnum.TITLE.getName(), report.getTitle());
    content.put(EmailReportKeyEnum.TYPE.getName(), String.valueOf(report.getReportType()));

    this.save(EmailTypeEnum.REPORT_EMAIL, content);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void save(final UserCreationRequest createdUser, final AuthenticatedUser user) {
    final UserEntity userEntity = userService.getUserById(user.getUserId());

    final Map<String, String> content = new HashMap<>();
    content.put(EmailUserCreationKeyEnum.INVITED_USER_EMAIL.getName(), createdUser.getEmailAddress());
    content.put(EmailUserCreationKeyEnum.INVITER_USER.getName(), userEntity.getUserName());

    this.save(EmailTypeEnum.USER_CREATION_EMAIL, content);
  }

  private void save(final EmailTypeEnum type, final Map<String, String> content) {
    final EmailEntity entity = EmailEntity.builder()
            .type(new EmailTypeEntity(type.getId()))
            .content(new JSONObject(content).toJSONString())
            .build();

    repository.save(entity);
  }
}
