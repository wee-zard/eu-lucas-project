package com.lucas.spring.commons.utils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import java.util.Objects;
import lombok.experimental.UtilityClass;
import org.hibernate.query.sqm.internal.QuerySqmImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.support.PageableExecutionUtils;

/**
 * Utility class for the criteria builder.
 */
@UtilityClass
public class CriteriaBuilderUtil {

  /**
   * Get the maximum number of records in the query.
   *
   * @param query The query to check.
   * @return Returns the maximum number of records what the query would execute
   *     without a limit modifier.
   */
  public <T> int getQueryMaxResult(final TypedQuery<T> query) {
    return Math.toIntExact(((QuerySqmImpl<T>) query).getResultCount());
  }

  /**
   * Wraps the query into a pageable request by adding maximum result and
   * first results.
   *
   * @param query The query to check.
   */
  public <T> TypedQuery<T> applyPageable(final TypedQuery<T> query, final Pageable pageable) {
    query.setFirstResult((int) pageable.getOffset());
    query.setMaxResults(pageable.getPageSize());
    return query;
  }

  /**
   * Sorts the query.
   *
   * @param criteriaQuery The query.
   */
  public <T> CriteriaQuery<T> applySortable(
          final CriteriaQuery<T> criteriaQuery,
          final CriteriaBuilder criteriaBuilder,
          final Root<T> root,
          final Pageable pageable
  ) {
    if (pageable.getSort().isEmpty()) {
      return criteriaQuery;
    }

    if (Objects.equals(PageablePropertiesUtil.getSortDirection(pageable), Sort.Direction.ASC)) {
      return criteriaQuery.orderBy(criteriaBuilder.asc(root.get(PageablePropertiesUtil.getSortColumn(pageable))));
    } else {
      return criteriaQuery.orderBy(criteriaBuilder.desc(root.get(PageablePropertiesUtil.getSortColumn(pageable))));
    }
  }

  /**
   * Get the paged result of the query.
   *
   * @return Returns a {@link Page} request based on the given query.
   */
  public <T> Page<T> getPagedResult(
          final CriteriaQuery<T> criteriaQuery,
          final CriteriaBuilder cb,
          final Root<T> root,
          final Pageable pageable,
          final EntityManager entityManager
  ) {
    // Apply sort to the query by the pageable properties.
    final CriteriaQuery<T> sortedCriteriaQuery =
            CriteriaBuilderUtil.applySortable(criteriaQuery, cb, root, pageable);

    // Creates a query
    final TypedQuery<T> query = entityManager.createQuery(sortedCriteriaQuery);

    // Creates a pageable query
    final TypedQuery<T> pageableQuery = CriteriaBuilderUtil.applyPageable(query, pageable);

    return PageableExecutionUtils.getPage(
            pageableQuery.getResultList(),
            pageable, () -> CriteriaBuilderUtil.getQueryMaxResult(query));
  }
}
