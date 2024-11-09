package com.lucas.spring_boot.service_layer.service.impl;

import com.lucas.spring_boot.database_layer.repository.StatusRepository;
import com.lucas.spring_boot.model_layer.entity.StatusEntity;
import com.lucas.spring_boot.model_layer.enums.StatusEnum;
import com.lucas.spring_boot.model_layer.expection.StatusNotFoundException;
import com.lucas.spring_boot.service_layer.service.StatusService;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@AllArgsConstructor
@Service
public class StatusServiceImpl implements StatusService {
    private static final String SERVICE_CACHE_NAME = "CH_STATUS";
    private StatusRepository statusRepository;
    /**
     * {@inheritDoc}
     */
    @Cacheable(SERVICE_CACHE_NAME)
    @Override
    public ArrayList<StatusEntity> getStatuses() {
        return statusRepository.getStatuses();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public StatusEntity getStatusById(Long statusId) {
        Optional<StatusEntity> statusEntity = statusRepository.findById(statusId);
        if (statusEntity.isEmpty()) {
            throw new StatusNotFoundException();
        } else {
            return statusEntity.get();
        }
    }

}
