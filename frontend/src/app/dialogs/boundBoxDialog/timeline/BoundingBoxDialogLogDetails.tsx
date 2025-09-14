import { emptyCharacterPlaceholder } from "@global/globalConsts";
import { StyledComponentGap } from "@global/globalStyles";
import DateHelper from "@helper/dateHelper";
import i18n from "@i18n/i18nHandler";
import BoundingBoxDto from "@model/dto/BoundingBoxDto";
import ProcedureLogDto from "@model/dto/ProcedureLogDto";
import { ProcedureLogProperties } from "@model/enum";
import { styled } from "@mui/material";

type Props = {
  log: ProcedureLogDto;
  box?: BoundingBoxDto;
};

const BoundingBoxDialogLogDetails = ({ log, box }: Props) => {
  const commonProperties = [ProcedureLogProperties.Procedure, ProcedureLogProperties.Params];
  const properties = !box
    ? [ProcedureLogProperties.Plants, ProcedureLogProperties.Box]
    : [
        ProcedureLogProperties.PlantName,
        ProcedureLogProperties.PlantFamily,
        ProcedureLogProperties.IsInvasive,
        ProcedureLogProperties.BoundingBox,
      ];
  const propertyMap = [
    ...commonProperties,
    ...properties,
    ProcedureLogProperties.User,
    ProcedureLogProperties.CreationDate,
  ];

  const getProcedureProperties = (log: ProcedureLogDto, properties: ProcedureLogProperties) => {
    const handler = Object.freeze({
      [ProcedureLogProperties.Procedure]: () => log.procedure,
      [ProcedureLogProperties.Plants]: () =>
        log.boundingBoxes
          .map((box) => box.plant.plantScientificName)
          .filter((plant, index, listOfPlants) => plant !== listOfPlants[index + 1])
          .map(
            (uniquePlant) =>
              `${uniquePlant} (x${
                log.boundingBoxes.filter((box) => box.plant.plantScientificName === uniquePlant)
                  .length
              })`,
          )
          .join(", "),
      [ProcedureLogProperties.Params]: () => log.params.join(", "),
      [ProcedureLogProperties.CreationDate]: () =>
        DateHelper.convertISOStringToDateTimeFormat(log.createdAt),
      [ProcedureLogProperties.User]: () => log.user,
      [ProcedureLogProperties.Box]: () => log.boundingBoxes.length,
      [ProcedureLogProperties.PlantName]: () => box?.plant.plantScientificName,
      [ProcedureLogProperties.PlantFamily]: () => box?.plant.plantSpeciesName,
      [ProcedureLogProperties.BoundingBox]: () =>
        `(${box?.minCoordinateX}, ${box?.minCoordinateY}) (${box?.maxCoordinateX}, ${box?.maxCoordinateY})`,
      [ProcedureLogProperties.IsInvasive]: () =>
        `${box?.plant.isPlantInvasive ? i18n.t("components.button.yes") : i18n.t("components.button.no")}`,
    });

    return handler[properties]() ?? emptyCharacterPlaceholder;
  };

  return (
    <>
      <div>
        {i18n.t("screens.bounding-box.timelineMenu.logTitle", {
          filename: log.filename,
          logId: log.id,
        })}
      </div>
      <br />
      <StyledComponentGap display="grid" gap="8px">
        {propertyMap.map((property) => (
          <StyledProcedurePropertyHolder key={`${log.id}-${property}`}>
            <StyledProcedurePropertyTitleHolder>
              {i18n.t(property)}:
            </StyledProcedurePropertyTitleHolder>
            <StyledProcedurePropertyValueHolder>
              {getProcedureProperties(log, property)}
            </StyledProcedurePropertyValueHolder>
          </StyledProcedurePropertyHolder>
        ))}
      </StyledComponentGap>
    </>
  );
};

export default BoundingBoxDialogLogDetails;

const StyledProcedurePropertyHolder = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const StyledProcedurePropertyTitleHolder = styled("div")({
  fontSize: 14,
  width: "40%",
});

const StyledProcedurePropertyValueHolder = styled("div")({
  fontSize: 14,
  width: "60%",
  color: "gold",
  display: "fley",
  alignItems: "center",
});
