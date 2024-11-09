package com.lucas.spring.services.service;

import org.springframework.stereotype.Service;

/**
 * An interface service where we store methods
 * related to the Scheduler.
 */
@Service
public interface SchedulerService {
  /**
   * Fetched the Scheduler properties from the db.
   *
   * @return The property of the Scheduler.
   */
  String getSchedulerProperties();
}
