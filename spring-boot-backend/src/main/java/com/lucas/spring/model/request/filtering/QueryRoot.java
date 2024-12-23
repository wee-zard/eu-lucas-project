package com.lucas.spring.model.request.filtering;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class QueryRoot {
    private Number id;
    private Number parentId;
}
