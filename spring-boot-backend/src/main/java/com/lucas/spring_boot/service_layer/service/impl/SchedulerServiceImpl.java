package com.lucas.spring_boot.service_layer.service.impl;

import com.lucas.spring_boot.service_layer.service.SchedulerService;
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
