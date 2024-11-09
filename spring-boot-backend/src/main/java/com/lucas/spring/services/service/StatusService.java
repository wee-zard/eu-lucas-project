package com.lucas.spring.services.service;

import com.lucas.spring.model.entity.StatusEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

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
