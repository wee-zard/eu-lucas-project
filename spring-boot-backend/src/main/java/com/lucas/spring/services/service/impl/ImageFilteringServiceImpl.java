package com.lucas.spring.services.service.impl;

import com.lucas.spring.helper.helpers.BuildEntityUtil;
import com.lucas.spring.model.entity.CreationYearEntity;
import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.entity.abstraction.BaseComparatorEntity;
import com.lucas.spring.model.enums.FilterOption;
import com.lucas.spring.model.enums.ImageFilteringEnum;
import com.lucas.spring.model.enums.OperatorOption;
import com.lucas.spring.model.enums.QueryElementRelations;
import com.lucas.spring.model.enums.QueryType;
import com.lucas.spring.model.expection.ImageFilteringException;
import com.lucas.spring.model.models.PageableProperties;
import com.lucas.spring.model.request.filtering.FilteringQueryRequest;
import com.lucas.spring.model.request.filtering.QueryComponent;
import com.lucas.spring.model.request.filtering.QueryMultiType;
import com.lucas.spring.services.service.ImageFilterService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;

/**
 * Defines methods related to the image filtering.
 */
@Service
@AllArgsConstructor
public class ImageFilteringServiceImpl implements ImageFilterService {
  private final EntityManager entityManager;

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
//  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Page<ImageEntity> filterImages(
          final FilteringQueryRequest request,
          final PageableProperties pageableProperties
  ) {
    if (request.getQueryBuilder().getListOfQueries().isEmpty()) {
      // TODO: Throw a better error message.
      throw new RuntimeException("List of queries are empty!");
    }
    if (pageableProperties == null) {
      // TODO: Throw a better error message.
      throw new RuntimeException("Pageable Properties are not provided!");
    }

    // Setting up the objects for the query builder.
    CriteriaBuilder cb = entityManager.getCriteriaBuilder();
    CriteriaQuery<ImageEntity> criteriaQuery = cb.createQuery(ImageEntity.class);

    // TODO: If we want to select from procedures or plants, we needs to extend the FROM section.
    Root<ImageEntity> root = criteriaQuery.from(ImageEntity.class);

    // Get the merged predicates.
    final Predicate predicate = getSubBranchOfComponent(cb, root, request.getQueryBuilder());

    // Add the merged predicates to the query.
    criteriaQuery.select(root).where(predicate);
    TypedQuery<ImageEntity> query = entityManager.createQuery(criteriaQuery);

    // Wrap these values into a Pageable Request.
    query.setFirstResult(pageableProperties.getPageNo());
    query.setMaxResults(pageableProperties.getPageSize());
    List<ImageEntity> filteredImages = query.getResultList();
    return new PageImpl<>(filteredImages);
  }

  private Predicate getSubBranchOfComponent(
          CriteriaBuilder cb,
          Root<ImageEntity> root,
          QueryMultiType query
  ) {
    final List<Predicate> listOfPredicates = getListOfPredicates(cb, root, query);
    return applyRelationOnPredicates(cb, query.getQueryElementRelation(), listOfPredicates);
  }

  private List<Predicate> getListOfPredicates(
          CriteriaBuilder cb,
          Root<ImageEntity> root,
          QueryMultiType query
  ) {
    if (query.getListOfQueries() != null) {
      return query.getListOfQueries()
              .stream()
              .map(queryGroup -> getSubBranchOfComponent(cb, root, queryGroup))
              .toList();
    } else if (query.getListOfComponents() != null) {
      return query.getListOfComponents()
              .stream()
              .map(queryComponent -> getPredicateOfQueryComponent(cb, root, queryComponent))
              .toList();
      //return getListOfPredicatesFromQueryGroup(cb, root, query);
    } else {
      // TODO: Throw a better error message.
      throw new RuntimeException("No component or group provided!");
    }
  }

  private Predicate applyRelationOnPredicates(
      CriteriaBuilder criteriaBuilder,
      QueryElementRelations relations,
      List<Predicate> predicates
  ) {
    final Predicate[] arrayOfPredicates = predicates.toArray(Predicate[]::new);
    if (relations == null || relations == QueryElementRelations.AND) {
      return criteriaBuilder.and(arrayOfPredicates);
    } else if (relations == QueryElementRelations.OR) {
      return criteriaBuilder.or(arrayOfPredicates);
    } else {
      throw new ImageFilteringException(
          ImageFilteringEnum.UNKNOWN_OR_NO_LOGICAL_EXPRESSION_PROVIDED
      );
    }
  }

  private Predicate getPredicateOfQueryComponent(
          CriteriaBuilder cb,
          Root<ImageEntity> root,
          QueryComponent component
  ) {
    final OperatorOption operatorInput = component.getOperatorInput();
    switch (component.getSelectedFilterTab()) {
      case YEAR -> {
        return applyOperatorOnComponents(cb, operatorInput,
                root.get(FilterOption.YEAR.getTableColumn()),
                BuildEntityUtil.buildCreationYearEntity(component));
      }
      case COUNTRY -> {
        return applyOperatorOnComponents(cb, operatorInput,
                root.get(FilterOption.COUNTRY.getTableColumn()),
                BuildEntityUtil.buildCreationCountryEntity(component));
      }
      case X_COORDINATE -> {
        return applyOperatorOnComponents(cb, operatorInput,
                root.get(FilterOption.X_COORDINATE.getTableColumn()),
                BuildEntityUtil.buildCoordinateX(component));
      }
      case Y_COORDINATE -> {
        return applyOperatorOnComponents(cb, operatorInput,
                root.get(FilterOption.Y_COORDINATE.getTableColumn()),
                BuildEntityUtil.buildByCoordinateY(component));
      }
      case DIRECTION -> {
        return applyOperatorOnComponents(cb, operatorInput,
                root.get(FilterOption.DIRECTION.getTableColumn()),
                BuildEntityUtil.buildDirectionName(component));
      }
      default -> throw new ImageFilteringException(
        ImageFilteringEnum.UNKNOWN_OR_NO_FILTER_TAB_PROVIDED
      );
    }
  }

  private Predicate applyOperatorOnComponents(
          CriteriaBuilder cb,
          OperatorOption operatorOption,
          Path<BaseComparatorEntity> path,
          BaseComparatorEntity entity
  ) {
    switch (operatorOption) {
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
}
