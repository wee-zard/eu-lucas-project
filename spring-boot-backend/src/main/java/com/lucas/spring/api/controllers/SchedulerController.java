package com.lucas.spring.api.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the scheduler.
 */
@RestController
@RequestMapping(path = "api/scheduler")
@AllArgsConstructor
public final class SchedulerController {
  @GetMapping("/get-scheduler-properties")
  public String getSchedulerProperties() {
    return "";
  }
}
