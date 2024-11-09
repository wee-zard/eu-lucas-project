package com.lucas.spring.services.service.impl;

import com.lucas.spring.services.service.SchedulerService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class SchedulerServiceImpl implements SchedulerService {
    /**
     * {@inheritDoc}
     */
    @Override
    public String getSchedulerProperties() {
        return null;
    }
}
