package com.lucas.spring.components.report.repository;

import com.lucas.spring.components.report.model.entity.ReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the reports.
 */
@Repository
public interface ReportRepository extends JpaRepository<ReportEntity, Long>  {
}
