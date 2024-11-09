package com.lucas.spring_boot.model_layer.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StatusEnum {
    PENDING(1),
    BLOCKED(2),
    ACTIVATED(3);
    private final long statusId;
}
