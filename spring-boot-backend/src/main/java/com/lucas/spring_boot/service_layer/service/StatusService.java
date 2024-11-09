package com.lucas.spring_boot.service_layer.service;

import com.lucas.spring_boot.model_layer.entity.StatusEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public interface StatusService {
    /**
     * @return Returns the list of status entities from the db.
     */
    ArrayList<StatusEntity> getStatuses();

    /**
     * ...
     * @param statusId .
     * @return .
     */
    StatusEntity getStatusById(Long statusId);
}
