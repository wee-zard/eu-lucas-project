package com.lucas.spring.components.folder.model.dto;

import com.lucas.spring.commons.model.dto.RootDto;
import com.lucas.spring.components.image.model.dto.ImageDto;
import com.lucas.spring.components.procedure.model.model.ProcedureLogModel;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * A dto made out of the contents of a specific folder, detailing the images
 * inside the folder, and the bounding boxes attached to the images.
 */
@ToString
@Builder
@Getter
@AllArgsConstructor
public class FolderContentDto implements RootDto {
  private ImageDto image;
  private List<ProcedureLogModel> logs;
}
