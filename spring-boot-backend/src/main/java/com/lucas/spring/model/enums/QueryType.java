package com.lucas.spring.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Defines the different query types of the query builder.
 */
@Getter
@AllArgsConstructor
public enum QueryType {
    QUERY_BUILDER(true),
    QUERY_GROUP(false),
    QUERY_COMPONENT(null);
    public final Boolean id;
}
