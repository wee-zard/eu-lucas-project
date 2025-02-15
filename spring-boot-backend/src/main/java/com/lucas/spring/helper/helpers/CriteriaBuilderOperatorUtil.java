package com.lucas.spring.helper.helpers;

import com.lucas.spring.model.entity.abstraction.BaseComparatorEntity;
import com.lucas.spring.model.enums.ImageFilteringEnum;
import com.lucas.spring.model.enums.OperatorOption;
import com.lucas.spring.model.expection.ImageFilteringException;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import lombok.experimental.UtilityClass;

/**
 * Based on the provided operator, call the corresponding
 * criteria builder operator to produce {@link Predicate}.
 */
@UtilityClass
public class CriteriaBuilderOperatorUtil {

  public Predicate operatorDispatcher(
          final CriteriaBuilder cb,
          final OperatorOption operatorOption,
          final Path<BaseComparatorEntity<Object>> path,
          final Comparable entity
  ) {
    switch (operatorOption) {
      case BOOLEAN_EQUAL, BOOLEAN_NOT_EQUAL -> {
        return cb.equal(path, operatorOption.equals(OperatorOption.BOOLEAN_EQUAL));
      }
      case EQUALS -> {
        return cb.equal(path, entity);
      }
      case DOES_NOT_EQUALS -> {
        return cb.notEqual(path, entity);
      }
      case LESS -> {
        return cb.lessThan(path, entity);
      }
      case LESS_OR_EQUAL -> {
        return cb.lessThanOrEqualTo(path, entity);
      }
      case GREATER -> {
        return cb.greaterThan(path, entity);
      }
      case GREATER_OR_EQUAL -> {
        return cb.greaterThanOrEqualTo(path, entity);
      }
      default -> throw new ImageFilteringException(
              ImageFilteringEnum.UNKNOWN_OR_NO_OPERATOR_PROVIDED
      );
    }
  }

  //  private Predicate applyExpressionsOnTextBasedFilters(
  //          final CriteriaBuilder cb,
  //          final FilterComponents component,
  //          final Path<String> path,
  //          final String entity
  //  ) {
  //    Predicate predicate = null;
  //    switch (component.getOperatorInput()) {
  //      case CONTAINS -> predicate = cb.like(path, "%" + entity + "%");
  //      case DOES_NOT_CONTAIN -> predicate = cb.notLike(path, "%" + entity + "%");
  //      case STARTS_WITH -> predicate = cb.like(path, entity + "%");
  //      case ENDS_WITH -> predicate = cb.like(path, "%" + entity);
  //      default -> throw new ImageFilteringException(
  //              ImageFilteringEnum.UNKNOWN_OR_NO_OPERATOR_PROVIDED,
  //              component.toString()
  //      );
  //    }
  //    return predicate;
  //
}
