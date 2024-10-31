package com.lucas.spring_boot.api_layer.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/scheduler")
@AllArgsConstructor
public class SchedulerController {
    @GetMapping("/get-scheduler-properties")
    public String getSchedulerProperties() {
        return "";
    }
}
