package com.lucas.spring.components.image.service.impl;

import com.lucas.spring.commons.helper.ConversionHelper;
import com.lucas.spring.commons.utils.CriteriaBuilderOperatorUtil;
import com.lucas.spring.commons.utils.FormatParseUtil;
import com.lucas.spring.components.coordinate.x.model.entity.CoordinateXthEntity;
import com.lucas.spring.components.coordinate.y.model.entity.CoordinateYthEntity;
import com.lucas.spring.components.direction.model.entity.CreationDirectionEntity;
import com.lucas.spring.components.folder.enums.QueryElementRelations;
import com.lucas.spring.components.image.enums.FilterOption;
import com.lucas.spring.components.image.enums.ImageFilteringEnum;
import com.lucas.spring.components.image.enums.OperatorOption;
import com.lucas.spring.components.image.exception.ImageFilteringException;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import com.lucas.spring.components.image.model.request.FilteringQueryRequest;
import com.lucas.spring.components.image.model.request.QueryComponent;
import com.lucas.spring.components.image.model.request.QueryMultiType;
import com.lucas.spring.components.image.service.ImageFilterService;
import com.lucas.spring.components.plant.model.entity.PlantEntity;
import com.lucas.spring.components.plant.model.entity.PlantSpeciesEntity;
import com.lucas.spring.components.procedure.model.entity.BoundingBoxEntity;
import com.lucas.spring.components.procedure.model.entity.ProcedureEntity;
import com.lucas.spring.components.procedure.model.entity.ProcedureLogEntity;
import com.lucas.spring.components.procedure.model.entity.ProcedureLogParamEntity;
import com.lucas.spring.components.year.model.entity.CreationYearEntity;
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
import org.hibernate.query.sqm.internal.QuerySqmImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;

/**
 * Defines methods related to the image filtering.
 */
@Service
@AllArgsConstructor
public class ImageFilteringServiceImpl implements ImageFilterService {
  private final EntityManager entityManager;
  private final ConversionHelper conversionHelper;

  /**
   * {@inheritDoc}
   */
  @Override
  public Page<ImageEntity> filterImages(
          final FilteringQueryRequest request,
          final Pageable pageable
  ) {
    if (request.getQueryBuilder().getListOfQueries().isEmpty()) {
      throw new ImageFilteringException(ImageFilteringEnum.LIST_OF_QUERIES_ARE_EMPTY);
    }

    if (pageable == null) {
      throw new ImageFilteringException(ImageFilteringEnum.PAGEABLE_PROPERTIES_ARE_NOT_PROVIDED);
    }

    // Setting up the objects for the query builder.
    final CriteriaBuilder cb = entityManager.getCriteriaBuilder();
    final CriteriaQuery<ImageEntity> criteriaQuery = cb.createQuery(ImageEntity.class);
    final Root<ImageEntity> root = criteriaQuery.from(ImageEntity.class);

    // Get the merged predicates.
    final Predicate predicate = getSubBranchOfComponent(cb, root, request.getQueryBuilder());

    // Add the merged predicates to the query.
    criteriaQuery.select(root).where(predicate);
    final TypedQuery<ImageEntity> query = entityManager.createQuery(criteriaQuery);
    final int maxResult = Math.toIntExact(((QuerySqmImpl<ImageEntity>) query).getResultCount());

    // Wrap these values into a Pageable Request.
    query.setFirstResult((int) pageable.getOffset());
    query.setMaxResults(pageable.getPageSize());

    return PageableExecutionUtils.getPage(query.getResultList(), pageable, () -> maxResult);
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
              ImageFilteringEnum.UNKNOWN_OR_NO_LOGICAL_EXPRESSION_PROVIDED,
              relations);
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
                conversionHelper.convert(component, CreationYearEntity.class));
      }
      case COUNTRY -> {
        return CriteriaBuilderOperatorUtil.operatorDispatcher(cb, operatorInput,
                root.get(FilterOption.COUNTRY.getTableColumn()),
                conversionHelper.convert(component, CreationDirectionEntity.class));
      }
      case X_COORDINATE -> {
        return CriteriaBuilderOperatorUtil.operatorDispatcher(cb, operatorInput,
                root.get(FilterOption.X_COORDINATE.getTableColumn()),
                conversionHelper.convert(component, CoordinateXthEntity.class));
      }
      case Y_COORDINATE -> {
        return CriteriaBuilderOperatorUtil.operatorDispatcher(cb, operatorInput,
                root.get(FilterOption.Y_COORDINATE.getTableColumn()),
                conversionHelper.convert(component, CoordinateYthEntity.class));
      }
      case DIRECTION -> {
        return CriteriaBuilderOperatorUtil.operatorDispatcher(cb, operatorInput,
                root.get(FilterOption.DIRECTION.getTableColumn()),
                conversionHelper.convert(component, CreationDirectionEntity.class));
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
                plplpJoin.get(FilterOption.PROCEDURE_PARAMS.getTableColumn())
                        .get("procedureParamName"),
                component.getSelectInput());
      }
      case IS_HOMOGENOUS -> {
        final Join<ImageEntity, PlantEntity> tableJoin =
                root.join("listOfBoundingBoxes", JoinType.LEFT);

        return CriteriaBuilderOperatorUtil.operatorDispatcher(cb, operatorInput,
                tableJoin.get(FilterOption.IS_HOMOGENOUS.getTableColumn()), null);
      }
      case PROBABILITY -> {
        final Join<ImageEntity, BoundingBoxEntity> tableJoin =
                root.join("listOfBoundingBoxes", JoinType.LEFT);

        final Integer probability = FormatParseUtil.parseToInteger(
                component.getSelectInput()
        );
        return CriteriaBuilderOperatorUtil.operatorDispatcher(cb, operatorInput,
                tableJoin.get(FilterOption.PROBABILITY.getTableColumn()),
                probability);
      }
      case PLANT_NAME -> {
        final Join<ImageEntity, PlantEntity> tableJoin = root.join("listOfPlants", JoinType.LEFT);

        return CriteriaBuilderOperatorUtil.operatorDispatcher(cb, operatorInput,
                tableJoin.get(FilterOption.PLANT_NAME.getTableColumn()),
                component.getSelectInput());
      }
      case PLANT_SPECIES -> {
        final Join<ImageEntity, PlantSpeciesEntity> tableJoin =
                root.join("listOfPlants", JoinType.LEFT)
                        .join("plantSpeciesName", JoinType.LEFT);

        return CriteriaBuilderOperatorUtil.operatorDispatcher(cb, operatorInput,
                tableJoin.get(FilterOption.PLANT_SPECIES.getTableColumn()),
                component.getSelectInput());
      }
      default -> throw new ImageFilteringException(
              ImageFilteringEnum.UNKNOWN_OR_NO_FILTER_TAB_PROVIDED,
              component.getSelectedFilterTab());
    }
  }
}
