package com.lucas.spring.services.service.impl;

import com.lucas.spring.helper.utils.BuildEntityUtil;
import com.lucas.spring.helper.utils.CriteriaBuilderOperatorUtil;
import com.lucas.spring.model.entity.BoundingBoxEntity;
import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.entity.ProcedureEntity;
import com.lucas.spring.model.entity.ProcedureLogEntity;
import com.lucas.spring.model.entity.ProcedureLogParamEntity;
import com.lucas.spring.model.enums.FilterOption;
import com.lucas.spring.model.enums.ImageFilteringEnum;
import com.lucas.spring.model.enums.InputFormatErrors;
import com.lucas.spring.model.enums.OperatorOption;
import com.lucas.spring.model.enums.QueryElementRelations;
import com.lucas.spring.model.expection.ImageFilteringException;
import com.lucas.spring.model.expection.InputFormatException;
import com.lucas.spring.model.models.PageableProperties;
import com.lucas.spring.model.request.filtering.FilteringQueryRequest;
import com.lucas.spring.model.request.filtering.QueryComponent;
import com.lucas.spring.model.request.filtering.QueryMultiType;
import com.lucas.spring.services.service.ImageFilterService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
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

  /**
   * {@inheritDoc}
   */
  @Override
  public Page<ImageEntity> filterImages(
          final FilteringQueryRequest request,
          final PageableProperties pageableProperties
  ) {
    if (request.getQueryBuilder().getListOfQueries().isEmpty()) {
      throw new ImageFilteringException(ImageFilteringEnum.LIST_OF_QUERIES_ARE_EMPTY);
    }
    if (pageableProperties == null) {
      throw new ImageFilteringException(ImageFilteringEnum.PAGEABLE_PROPERTIES_ARE_NOT_PROVIDED);
    }

    // Setting up the objects for the query builder.
    CriteriaBuilder cb = entityManager.getCriteriaBuilder();
    CriteriaQuery<ImageEntity> criteriaQuery = cb.createQuery(ImageEntity.class);
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
          final CriteriaBuilder cb,
          final Root<ImageEntity> root,
          final QueryMultiType query
  ) {
    final List<Predicate> listOfPredicates = getListOfPredicates(cb, root, query);
    return applyRelationOnPredicates(cb, query.getQueryElementRelation(), listOfPredicates);
  }

  private List<Predicate> getListOfPredicates(
          final CriteriaBuilder cb,
          final Root<ImageEntity> root,
          final QueryMultiType query
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
    } else {
      throw new ImageFilteringException(ImageFilteringEnum.NO_COMPONENT_OR_GROUP_PROVIDED);
    }
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

  private Predicate getPredicateOfQueryComponent(
          CriteriaBuilder cb,
          Root<ImageEntity> root,
          QueryComponent component
  ) {
    final OperatorOption operatorInput = component.getOperatorInput();
    switch (component.getSelectedFilterTab()) {
      case YEAR -> {
        return CriteriaBuilderOperatorUtil.operatorDispatcher(cb, operatorInput,
                root.get(FilterOption.YEAR.getTableColumn()),
                BuildEntityUtil.buildCreationYearEntity(component));
      }
      case COUNTRY -> {
        return CriteriaBuilderOperatorUtil.operatorDispatcher(cb, operatorInput,
                root.get(FilterOption.COUNTRY.getTableColumn()),
                BuildEntityUtil.buildCreationCountryEntity(component));
      }
      case X_COORDINATE -> {
        return CriteriaBuilderOperatorUtil.operatorDispatcher(cb, operatorInput,
                root.get(FilterOption.X_COORDINATE.getTableColumn()),
                BuildEntityUtil.buildCoordinateX(component));
      }
      case Y_COORDINATE -> {
        return CriteriaBuilderOperatorUtil.operatorDispatcher(cb, operatorInput,
                root.get(FilterOption.Y_COORDINATE.getTableColumn()),
                BuildEntityUtil.buildByCoordinateY(component));
      }
      case DIRECTION -> {
        return CriteriaBuilderOperatorUtil.operatorDispatcher(cb, operatorInput,
                root.get(FilterOption.DIRECTION.getTableColumn()),
                BuildEntityUtil.buildDirectionName(component));
      }
      case PROCEDURE_NAME -> {
        final Join<ProcedureLogEntity, ProcedureEntity> pplJoin =
                root.join("listOfProcedureLogs", JoinType.LEFT)
                        .join("procedure", JoinType.LEFT);

        return CriteriaBuilderOperatorUtil.operatorDispatcher(cb, operatorInput,
                pplJoin.get(FilterOption.PROCEDURE_NAME.getTableColumn()),
                component.getSelectInput());
      }
      case PROCEDURE_PARAMS -> {
        final Join<ImageEntity, ProcedureLogParamEntity> plplpJoin =
                root.join("listOfProcedureLogs", JoinType.LEFT)
                        .join("procedureParams", JoinType.LEFT);

        return CriteriaBuilderOperatorUtil.operatorDispatcher(cb, operatorInput,
                plplpJoin.get(FilterOption.PROCEDURE_PARAMS.getTableColumn()).get("procedureParamName"),
                component.getSelectInput());
      }
      case IS_HOMOGENOUS -> {
        final Join<ImageEntity, BoundingBoxEntity> ibJoin = root.join("listOfBoundingBoxes", JoinType.LEFT);

        return CriteriaBuilderOperatorUtil.operatorDispatcher(cb, operatorInput,
                ibJoin.get(FilterOption.IS_HOMOGENOUS.getTableColumn()), null);
      }
      case PROBABILITY -> {
        final Join<ImageEntity, BoundingBoxEntity> ibJoin = root.join("listOfBoundingBoxes", JoinType.LEFT);
        try {
          final Integer probability = Integer.parseInt(component.getSelectInput());

          return CriteriaBuilderOperatorUtil.operatorDispatcher(cb, operatorInput,
                  ibJoin.get(FilterOption.PROBABILITY.getTableColumn()),
                  probability);
        } catch (final NumberFormatException error) {
          throw new InputFormatException(
                  InputFormatErrors.CASTING_STRING_TO_NUMBER_IS_INVALID,
                  component.toString()
          );
        }
      }
      default -> throw new ImageFilteringException(
        ImageFilteringEnum.UNKNOWN_OR_NO_FILTER_TAB_PROVIDED
      );
    }
  }
}
