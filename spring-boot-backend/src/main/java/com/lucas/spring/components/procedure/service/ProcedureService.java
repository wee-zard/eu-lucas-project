package com.lucas.spring.components.procedure.service;

import com.lucas.spring.components.procedure.model.entity.ProcedureEntity;
import com.lucas.spring.components.user.model.entity.UserEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

/**
 * Stores methods related to the Procedures.
 */
@Service
public interface ProcedureService {

  /**
   * Removes all existing procedure from the system.
   */
  void deleteAll();

  /**
   * Creates a new procedure.
   *
   * @param name The name of the procedure.
   * @param user The user who created the procedure.
   * @param author The author of the given procedure.
   * @return Returns the new Procedure object.
   */
  ProcedureEntity createProcedure(String name, UserEntity user, String author);

  /**
   * Fetch the list of procedures.
   *
   * @return The list of procedures.
   */
  List<ProcedureEntity> getProcedures();

  /**
   * Fetch the procedure from the db by the name of the procedure if its exists.
   *
   * @param name The name of the procedure.
   * @return Returns the procedure associated with the provided name if its exists.
   */
  Optional<ProcedureEntity> getProcedureByName(String name);

  /**
   * Fetch the procedure from the db by the name of the procedure.
   *
   * @param name The name of the procedure.
   * @param user The user who created the procedure.
   * @param author The author of the given procedure.
   * @return Returns the procedure associated with the provided name.
   */
  ProcedureEntity getProcedureByNameAndInitIfNotExists(String name, UserEntity user, String author);
}
