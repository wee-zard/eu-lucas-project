package com.lucas.spring.components.folder.model.request;

import com.lucas.spring.components.folder.model.model.QueriedImages;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

/**
 * A model that describes a newly created folder of the user.
 */
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FolderCreationRequest {
  @NotNull(message = "A mappa nevének a megadása kötelező")
  @Length(max = 100, message = "A mappa neve csak 100 karakter hosszú lehet")
  private String title;

  @Length(max = 500, message = "A mappa leírása csak 500 karakter hosszú lehet")
  private String description;

  /**
   * The list of images that needs to be saved inside a folder.
   */
  private List<QueriedImages> queriedImages;
}
