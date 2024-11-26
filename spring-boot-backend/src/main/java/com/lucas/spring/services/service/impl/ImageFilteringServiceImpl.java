package com.lucas.spring.services.service.impl;

import com.lucas.spring.model.entity.CreationYearEntity;
import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.enums.FormLogicalExpression;
import com.lucas.spring.model.request.filtering.FilterFormGroup;
import com.lucas.spring.model.request.filtering.FormRelation;
import com.lucas.spring.model.request.filtering.ImageFilteringRequest;
import com.lucas.spring.services.service.ImageFilterService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
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
  public void filterImage(final ImageFilteringRequest imageFilteringRequest) {

    // Give back all of existing groups from the filtering request.
    Set<Number> groups = imageFilteringRequest
            .getFilterFormGroups()
            .stream()
            .map(FilterFormGroup::getGroupFormId)
            .collect(Collectors.toSet());

    // Stores the applied predicates of the different groups and stored them in a map.
    Map<Number, Predicate> groupPredicatesMap = new HashMap<>();

    groups.forEach(groupId -> {
      // Give back all of those components that are related to the actual groupId.
      ArrayList<FilterFormGroup> filterFormGroups = imageFilteringRequest.getFilterFormGroups()
            .stream()
            .filter(filterFormGroup -> Objects.equals(
                filterFormGroup.getGroupFormId(),
                groupId)
            )
            .collect(Collectors.toCollection(ArrayList::new));

      // Give back the relation between the group component of the actual groupId.
      Optional<FormRelation> relationInGroup = imageFilteringRequest.getRelations()
            .getInputRelations()
            .stream()
            .filter(formRelation ->
                Objects.equals(
                    formRelation.getInputComponentId(),
                    formRelation.getOutputComponentId())
                    && Objects.equals(
                    formRelation.getInputComponentId(),
                    groupId)
            )
            .findFirst();

      if (relationInGroup.isPresent()) {
        Predicate appliedPredicateOfTheGroup = getPredicateOfTheGroup(
                filterFormGroups,
                relationInGroup.get().getLogicalExpression()
        );

        groupPredicatesMap.put(groupId, appliedPredicateOfTheGroup);
      } else {
        // TODO: Throw better exception.
        throw new EntityNotFoundException();
      }
    });

    // ============================================
    // Apply expression between the group entities.

    groupPredicatesMap.forEach((groupIdOuter, predicateOuter) -> {

    });

  }



  private Predicate getPredicateOfTheGroup(
            final ArrayList<FilterFormGroup> filterFormGroups,
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
    filterFormGroups.forEach(filterFormGroup -> {

      switch (filterFormGroup.getSelectedFilterTab()) {
        case YEAR -> {

          // Select only images which based on their "year" attribute are equal to x.
          Predicate predicate = criteriaBuilder.equal(
                imageEntityRoot
                    .get("year"), CreationYearEntity.builder()
                    .year(Integer.parseInt(filterFormGroup.getSelectInput()))
                    .build()
          );

          // Add the new predicate to the map, indexed by the group id.
          predicates.add(predicate);
        }
        case COUNTRY -> {
                //return "country";
        }
        default -> throw new EntityNotFoundException();
      }
    });



    // ---------------------------------------
    // Connect with each other the predicates.

    // Select from the image table.
    //criteriaQuery.select(imageEntityRoot);

    return applyExpressionOnPredicates(criteriaBuilder, expression, predicates);
  }

  private Predicate applyExpressionOnPredicates(
            final CriteriaBuilder criteriaBuilder,
            final FormLogicalExpression expression,
            final List<Predicate> predicates
  ) {
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
      default -> {
        // TODO: Throw better exception.
        throw new EntityNotFoundException();
      }
    }
  }
}
