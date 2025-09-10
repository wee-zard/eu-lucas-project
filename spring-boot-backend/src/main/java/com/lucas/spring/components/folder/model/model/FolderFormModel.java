package com.lucas.spring.components.folder.model.model;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

/**
 * A model that describes a folder form.
 */
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FolderFormModel {
  @NotNull(message = "A mappa nevének a megadása kötelező")
  @Length(max = 100, message = "A mappa neve csak 100 karakter hosszú lehet")
  private String title;

  @Length(max = 500, message = "A mappa leírása csak 500 karakter hosszú lehet")
  private String description;
}
