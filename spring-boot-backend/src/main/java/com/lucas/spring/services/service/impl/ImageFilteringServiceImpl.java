package com.lucas.spring.services.service.impl;

import com.lucas.spring.helper.helpers.BuildEntityUtil;
import com.lucas.spring.model.entity.CoordinateXEntity;
import com.lucas.spring.model.entity.CoordinateYEntity;
import com.lucas.spring.model.entity.CreationCountryEntity;
import com.lucas.spring.model.entity.CreationDirectionEntity;
import com.lucas.spring.model.entity.CreationYearEntity;
import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.entity.abstraction.BaseComparatorEntity;
import com.lucas.spring.model.enums.FilterOption;
import com.lucas.spring.model.enums.ImageFilteringEnum;
import com.lucas.spring.model.enums.QueryElementRelations;
import com.lucas.spring.model.expection.ImageFilteringException;
import com.lucas.spring.model.request.filtering.FilteringQueryRequest;
import com.lucas.spring.model.request.filtering.QueryBuilder;
import com.lucas.spring.model.request.filtering.QueryComponent;
import com.lucas.spring.model.request.filtering.QueryGroup;
import com.lucas.spring.model.models.PageableProperties;
import com.lucas.spring.services.service.ImageFilterService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
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

  /* ================================================================================ */

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

  /* ================================================================================ */

  @Override
  public Page<ImageEntity> filterImages(
          final FilteringQueryRequest filteringQueryRequest,
          final PageableProperties pageableProperties
  ) {
    if (filteringQueryRequest.getQueryBuilder().getListOfQueries().isEmpty()) {
      // TODO: Throw an error stating that the init list cannot be empty.
      throw new RuntimeException("List of queries are empty!");
    }
    if (pageableProperties == null) {
      // TODO: Throw an error stating that the init list cannot be empty.
      throw new RuntimeException("Pageable Properties are not provided!");
    }

    // Setting up the objects for the query builder.
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    CriteriaQuery<ImageEntity> criteriaQuery = criteriaBuilder.createQuery(ImageEntity.class);
    Root<ImageEntity> root = criteriaQuery.from(ImageEntity.class);

    // Get the merged predicates.
    final Predicate allMergedPredicate = getSubBranchOfComponent(
            criteriaBuilder,
            root,
            filteringQueryRequest.getQueryBuilder()
    );

    // Add the merged predicates to the query.
    criteriaQuery.select(root).where(allMergedPredicate);
    TypedQuery<ImageEntity> query = entityManager.createQuery(criteriaQuery);

    // Wrap these values into a Pageable Request.
    query.setFirstResult(pageableProperties.getPageSize());
    query.setMaxResults(pageableProperties.getPageNo());
    List<ImageEntity> filteredImages = query.getResultList();
    return new PageImpl<>(filteredImages);
  }

  private Predicate getSubBranchOfComponent(
          final CriteriaBuilder criteriaBuilder,
          final Root<ImageEntity> root,
          final QueryBuilder queryBuilder
  ) {
    final List<Predicate> queryBuilderPredicates = queryBuilder
            .getListOfQueries()
            .stream()
            .map(queryMultiType -> {
              if (queryMultiType instanceof QueryBuilder) {
                return getSubBranchOfQueryBuilder(
                    criteriaBuilder,
                    root,
                    (QueryBuilder) queryMultiType
                );
              } else if (queryMultiType instanceof QueryGroup) {
                return getSubBranchOfComponent(
                    criteriaBuilder,
                    root,
                    (QueryGroup) queryMultiType
                );
              } else {
                // TODO: Throw new error, as the instance of the object in unknown.
                throw new RuntimeException("Unknown instance of object is detected"
                        + " in the getSubBranchOfComponent method");
              }
            })
            .toList();

    // Merge these predicates into one by their common expression, that could be AND/OR.
    return applyRelationOnPredicates(
            criteriaBuilder,
            queryBuilder.getQueryElementRelation(),
            queryBuilderPredicates
    );
  }

  private Predicate getSubBranchOfComponent(
          final CriteriaBuilder criteriaBuilder,
          final Root<ImageEntity> root,
          final QueryGroup queryGroup
  ) {
    // Get the list of predicates one by one.
    final List<Predicate> queryComponentPredicates = getPredicatesOfQueryComponents(
            criteriaBuilder,
            root,
            queryGroup.getListOfQueries()
    );

    // Merge these predicates into one by their common expression, that could be AND/OR.
    return applyRelationOnPredicates(
            criteriaBuilder,
            queryGroup.getQueryElementRelation(),
            queryComponentPredicates
    );
  }

  private Predicate getSubBranchOfQueryBuilder(
          final CriteriaBuilder criteriaBuilder,
          final Root<ImageEntity> root,
          final QueryBuilder queryBuilder
  ) {
    final List<Predicate> queryBuilderPredicates = queryBuilder
            .getListOfQueries()
            .stream()
            .map(queryMultiType -> getSubBranchOfComponent(criteriaBuilder, root, queryBuilder))
            .toList();

    // Merge these predicates into one by their common expression, that could be AND/OR.
    return applyRelationOnPredicates(
            criteriaBuilder,
            queryBuilder.getQueryElementRelation(),
            queryBuilderPredicates
    );
  }

  private Predicate applyRelationOnPredicates(
      final CriteriaBuilder criteriaBuilder,
      final QueryElementRelations relations,
      final List<Predicate> predicates
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

  private List<Predicate> getPredicatesOfQueryComponents(
          final CriteriaBuilder cb,
          final Root<ImageEntity> root,
          final List<QueryComponent> filterComponents
  ) {
    // Result list that contains the predicates of the filter query.
    List<Predicate> predicates = new ArrayList<>();

    // Fill up the predicate list with values based on the active filters in the list.
    filterComponents.forEach(component -> {
      switch (component.getSelectedFilterTab()) {
        case YEAR -> predicates.add(filterByCreationYears(cb, root, component));
        case COUNTRY -> predicates.add(filterByCreationCountry(cb, root, component));
        case X_COORDINATE -> predicates.add(filterByCoordinateX(cb, root, component));
        case Y_COORDINATE -> predicates.add(filterByCoordinateY(cb, root, component));
        case DIRECTION -> predicates.add(filterByDirectionName(cb, root, component));
        // TODO: Plants and ExifData should be listed here in the future.
        default -> throw new ImageFilteringException(
                ImageFilteringEnum.UNKNOWN_OR_NO_FILTER_TAB_PROVIDED
        );
      }
    });
    return predicates;
  }

  private Predicate filterByCreationYears(
          final CriteriaBuilder cb,
          final Root<ImageEntity> root,
          final QueryComponent component
  ) {
    CreationYearEntity entity = BuildEntityUtil.buildCreationYearEntity(component);
    Path<BaseComparatorEntity> path = root.get(FilterOption.YEAR.getTableColumn());
    return applyOperatorOnComponents(cb, component, path, entity);
  }

  private Predicate filterByCreationCountry(
          final CriteriaBuilder cb,
          final Root<ImageEntity> root,
          final QueryComponent component
  ) {
    CreationCountryEntity entity = BuildEntityUtil.buildCreationCountryEntity(component);
    Path<BaseComparatorEntity> path = root.get(FilterOption.COUNTRY.getTableColumn());
    return applyOperatorOnComponents(cb, component, path, entity);
  }

  private Predicate filterByCoordinateX(
          final CriteriaBuilder cb,
          final Root<ImageEntity> root,
          final QueryComponent component
  ) {
    CoordinateXEntity entity = BuildEntityUtil.buildCoordinateX(component);
    Path<BaseComparatorEntity> path = root.get(FilterOption.X_COORDINATE.getTableColumn());
    return applyOperatorOnComponents(cb, component, path, entity);
  }

  private Predicate filterByCoordinateY(
          final CriteriaBuilder cb,
          final Root<ImageEntity> root,
          final QueryComponent component
  ) {
    CoordinateYEntity entity = BuildEntityUtil.buildByCoordinateY(component);
    Path<BaseComparatorEntity> path = root.get(FilterOption.Y_COORDINATE.getTableColumn());
    return applyOperatorOnComponents(cb, component, path, entity);
  }

  private Predicate filterByDirectionName(
          final CriteriaBuilder cb,
          final Root<ImageEntity> root,
          final QueryComponent component
  ) {
    CreationDirectionEntity entity = BuildEntityUtil.buildDirectionName(component);
    Path<BaseComparatorEntity> path = root.get(FilterOption.DIRECTION.getTableColumn());
    return applyOperatorOnComponents(cb, component, path, entity);
  }

  private Predicate applyOperatorOnComponents(
          final CriteriaBuilder cb,
          final QueryComponent component,
          final Path<BaseComparatorEntity> path,
          final BaseComparatorEntity entity
  ) {
    switch (component.getOperatorInput()) {
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
            ImageFilteringEnum.UNKNOWN_OR_NO_OPERATOR_PROVIDED,
            component.toString()
      );
    }
  }
}
