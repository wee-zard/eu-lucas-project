package com.lucas.spring.services.service.impl;

import com.lucas.spring.model.entity.CreationYearEntity;
import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.enums.FormLogicalExpression;
import com.lucas.spring.model.enums.ImageFilteringEnum;
import com.lucas.spring.model.expection.ImageFilteringException;
import com.lucas.spring.model.request.filtering.FilterComponents;
import com.lucas.spring.model.request.filtering.FormRelation;
import com.lucas.spring.model.request.filtering.ImageFilteringRequest;
import com.lucas.spring.services.service.ImageFilterService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
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
  public void filterImage(final ImageFilteringRequest request) {
    if (request.getFilterComponents().size() == 0) {
      throw new ImageFilteringException(ImageFilteringEnum.NO_FILTER_COMPONENT_PROVIDED);
    }
    if (request.getGroupRelations().size() == 0) {
      throw new ImageFilteringException(ImageFilteringEnum.NO_RECURSIVE_GROUP_RELATION_PROVIDED);
    }

    // Give back all of existing groupIds from the filtering request.
    Set<Number> groups = request
            .getFilterComponents()
            .stream()
            .map(FilterComponents::getGroupFormId)
            .collect(Collectors.toSet());

    // Stores the applied predicates of them, mapping them on the key of the groupIds.
    final Map<Number, Predicate> groupPredicatesMap = new HashMap<>();

    // Fill up the map with predicates.
    groups.forEach(groupId -> {
      // Give back the applied predicate of the filter components in the requested group id.
      Predicate appliedPredicateOfTheGroup = getAppliedPredicateByGroupId(request, groupId);

      // Add the applied predicate to the map.
      groupPredicatesMap.put(groupId, appliedPredicateOfTheGroup);
    });

    // Call predicate dispatcher and merge all the predicates into one.
    final Predicate allMergedPredicate = predicateDispatcher(
            groupPredicatesMap,
            request.getGroupRelations()
    );

    // TODO: Only one predicate remains. Add it to the query and send back the Page.
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    CriteriaQuery<ImageEntity> criteriaQuery = criteriaBuilder.createQuery(ImageEntity.class);
    Root<ImageEntity> imageEntityRoot = criteriaQuery.from(ImageEntity.class);
    criteriaQuery.select(imageEntityRoot).where(allMergedPredicate);
    TypedQuery<ImageEntity> query = entityManager.createQuery(criteriaQuery);

    // TODO: Wrap these values into an object (Pageable Request)
    final int pageNumber = 1;
    final int pageSize = 10;
    query.setFirstResult(pageNumber);
    query.setMaxResults(pageSize);
    List<ImageEntity> filteredImages = query.getResultList();
  }

  /**
   * Based on the provided groupId, fetch the filter components from the request,
   * and apply on those components a combined predicate and give that back.
   *
   * @param request the filters we want to use to fetch the images.
   * @param groupId The id of the filter group.
   * @return a combination of possible multiple predicates.
   */
  private Predicate getAppliedPredicateByGroupId(
          final ImageFilteringRequest request,
          final Number groupId
  ) {
    // Give back all of those components that are related to the actual group id.
    ArrayList<FilterComponents> filterComponents = request
            .getFilterComponents()
            .stream()
            .filter(component -> Objects.equals(component.getGroupFormId(), groupId))
            .collect(Collectors.toCollection(ArrayList::new));

    // Give back the recursive relations between the group components by the group id.
    FormLogicalExpression formLogicalExpression = request
            .getGroupRelations()
            .stream()
            .filter(formRelation ->
                    Objects.equals(
                            formRelation.getInputComponentId(),
                            formRelation.getOutputComponentId()
                    ) && Objects.equals(
                            formRelation.getInputComponentId(),
                            groupId
                    )
            )
            .findFirst()
            .map(FormRelation::getLogicalExpression)
            .orElseThrow(() -> new ImageFilteringException(
                    ImageFilteringEnum.NO_RECURSIVE_GROUP_RELATION_PROVIDED_BY_GROUP_ID,
                    groupId.toString())
            );

    // Give back the applied predicate of the filter components in the requested group id.
    return getPredicateOfTheGroup(filterComponents, formLogicalExpression);
  }

  private Predicate getPredicateOfTheGroup(
            final ArrayList<FilterComponents> filterComponents,
            final FormLogicalExpression expression
  ) {
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

    // Expected result
    CriteriaQuery<ImageEntity> criteriaQuery = criteriaBuilder.createQuery(ImageEntity.class);

    // -- select all users with role = 'User'
    // SELECT * FROM users WHERE role = 'User';
    // Select * FROM Image;
    Root<ImageEntity> imageEntityRoot = criteriaQuery.from(ImageEntity.class);

    // ------------------------------------------------------------------------
    // Result list that contains the predicates of the filter query.
    List<Predicate> predicates = new ArrayList<>();

    // Fill up the predicate list with values based on the active filters in the list.
    filterComponents.forEach(component -> {
      // TODO: ...
      switch (component.getSelectedFilterTab()) {
        case YEAR -> {

          // Select only images which based on their "year" attribute are equal to x.
          Predicate predicate = criteriaBuilder.equal(
                imageEntityRoot.get("year"),
                CreationYearEntity
                    .builder()
                    .year(Integer.parseInt(component.getSelectInput()))
                    .build()
          );

          // Add the new predicate to the map, indexed by the group id.
          predicates.add(predicate);
        }
        case COUNTRY -> {
                //return "country";
        }
        default -> throw new ImageFilteringException(
                ImageFilteringEnum.UNKNOWN_OR_NO_FILTER_TAB_PROVIDED
        );
      }
    });

    // ---------------------------------------
    // Connect with each other the predicates.

    // Select from the image table.
    //criteriaQuery.select(imageEntityRoot);

    return applyExpressionOnPredicates(expression, predicates);
  }

  /**
   * ...
   *
   * @param groupPredicatesMap Stores the applied predicates of them,
   *                            mapping them on the key of the groupIds.
   * @param request the filters we want to use to fetch the images.
   */
  private Predicate predicateDispatcher(
          final Map<Number, Predicate> groupPredicatesMap,
          final List<FormRelation> request
  ) {
    if (groupPredicatesMap.size() > 2) {
      // Apply expression between the group entities.
      return mergeGroupPredicates(groupPredicatesMap, request);
    } else if (groupPredicatesMap.size() == 1) {
      // Only one predicate is present in map. Give back that as a result.
      final List<Predicate> groupPredicates = new ArrayList<>();
      groupPredicatesMap.forEach((groupId, predicate) -> groupPredicates.add(predicate));
      return groupPredicates.getFirst();
    } else {
      // At least one predicate must be present in the map.
      throw new ImageFilteringException(ImageFilteringEnum.NO_PREDICATE_GENERATED_BY_FILTERS);
    }
  }

  /**
   * Merge the provided predicates into one, while adding them
   * into a dynamic query.
   *
   * @param request the filters we want to use to fetch the images.
   * @param groupPredicatesMap Stores the applied predicates of them,
   *                           mapping them on the key of the groupIds.
   */
  private Predicate mergeGroupPredicates(
          final Map<Number, Predicate> groupPredicatesMap,
          final List<FormRelation> request
  ) {
    final Map<Number, Predicate> resultGroupPredicatesMap = new HashMap<>(groupPredicatesMap);

    // The groups that are wrapping the predicates in the map.
    Set<Number> upperGroupIds = request
            .stream()
            .filter(formRelation -> !formRelation.getOutputComponentId().equals(
                    formRelation.getInputComponentId())
            )
            .map(FormRelation::getOutputComponentId)
            .collect(Collectors.toSet());

    upperGroupIds.forEach(groupId -> {
      // The list of relations filtered by group id (elements may not be present in the map).
      List<FormRelation> tmpRelations = request
              .stream()
              .filter(formRelation -> formRelation.getOutputComponentId().equals(groupId))
              .toList();

      // The list of relations filtered by group id while it's component must be present in the map.
      List<FormRelation> relations = tmpRelations
              .stream()
              .filter(formRelation -> groupPredicatesMap.containsKey(
                      formRelation.getInputComponentId())
              ).toList();

      if (relations.size() == tmpRelations.size() && relations.size() > 1) {
        // List of those predicates that are in the same group id.
        final List<Predicate> predicateList = new ArrayList<>();

        // Filter for the predicates that are in the current group id.
        relations.forEach(relation -> {
          if (groupPredicatesMap.containsKey(relation.getInputComponentId())) {
            predicateList.add(groupPredicatesMap.get(relation.getInputComponentId()));
          }
        });

        if (predicateList.size() >= 2) {
          // Combine the filtered predicates
          Predicate combinedPredicates = applyExpressionOnPredicates(
                  relations.getFirst().getLogicalExpression(),
                  predicateList
          );

          // Add the newly merged predicate to the map.
          resultGroupPredicatesMap.put(groupId, combinedPredicates);
          relations.forEach(formRelation -> resultGroupPredicatesMap.remove(
                  formRelation.getInputComponentId())
          );
        }
      }
    });

    return predicateDispatcher(resultGroupPredicatesMap, request);
  }

  private Predicate applyExpressionOnPredicates(
            final FormLogicalExpression expression,
            final List<Predicate> predicates
  ) {
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
    switch (expression) {
      case AND -> {
        return criteriaBuilder.and(predicates.toArray(Predicate[]::new));
      }
      case NOT -> {
        Predicate andPredicate = criteriaBuilder.and(predicates.toArray(Predicate[]::new));
        return criteriaBuilder.not(andPredicate);
      }
      case OR -> {
        return criteriaBuilder.or(predicates.toArray(Predicate[]::new));
      }
      default -> throw new ImageFilteringException(
              ImageFilteringEnum.UNKNOWN_OR_NO_LOGICAL_EXPRESSION_PROVIDED
      );
    }
  }
}
