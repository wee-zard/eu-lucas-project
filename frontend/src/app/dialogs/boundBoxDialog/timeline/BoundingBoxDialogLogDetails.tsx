import { emptyCharacterPlaceholder } from "@global/globalConsts";
import DateHelper from "@helper/dateHelper";
import i18n from "@i18n/i18nHandler";
import BoundingBoxDto from "@model/dto/BoundingBoxDto";
import ProcedureLogDto from "@model/dto/ProcedureLogDto";
import { TooltipDataViewProperty } from "@model/enum";
import { styled } from "@mui/material";

type Props = {
  log: ProcedureLogDto;
  box?: BoundingBoxDto;
};

const BoundingBoxDialogLogDetails = ({ log, box }: Props) => {
  const commonProperties = [TooltipDataViewProperty.Procedure, TooltipDataViewProperty.Params];
  const properties = !box
    ? [TooltipDataViewProperty.Plants, TooltipDataViewProperty.Box]
    : [
        TooltipDataViewProperty.PlantName,
        TooltipDataViewProperty.PlantFamily,
        TooltipDataViewProperty.IsInvasive,
        TooltipDataViewProperty.BoundingBox,
        TooltipDataViewProperty.DetectionProbability,
      ];
  const propertyMap = [
    ...commonProperties,
    ...properties,
    TooltipDataViewProperty.User,
    TooltipDataViewProperty.CreationDate,
  ];

  const getProcedureProperties = (log: ProcedureLogDto, properties: TooltipDataViewProperty) => {
    const handler = Object.freeze({
      [TooltipDataViewProperty.Procedure]: () => log.procedure,
      [TooltipDataViewProperty.Plants]: () =>
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
      [TooltipDataViewProperty.Params]: () => log.params.join(", "),
      [TooltipDataViewProperty.CreationDate]: () =>
        DateHelper.convertISOStringToDateTimeFormat(log.createdAt),
      [TooltipDataViewProperty.User]: () => log.user,
      [TooltipDataViewProperty.Box]: () => log.boundingBoxes.length,
      [TooltipDataViewProperty.PlantName]: () => box?.plant.plantScientificName,
      [TooltipDataViewProperty.PlantFamily]: () => box?.plant.plantSpeciesName,
      [TooltipDataViewProperty.BoundingBox]: () =>
        `(${box?.minCoordinateX}, ${box?.minCoordinateY}) (${box?.maxCoordinateX}, ${box?.maxCoordinateY})`,
      [TooltipDataViewProperty.IsInvasive]: () =>
        `${box?.plant.isPlantInvasive ? i18n.t("components.button.yes") : i18n.t("components.button.no")}`,
      [TooltipDataViewProperty.DetectionProbability]: () =>
        box?.probabilityOfDetection ? `${box?.probabilityOfDetection}%` : undefined,
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
      <StyledTooltipDataWrapper>
        {propertyMap.map((property) => (
          <StyledProcedurePropertyHolder className="tooltipDataRow" key={`${log.id}-${property}`}>
            <StyledProcedurePropertyTitleHolder>
              {i18n.t(property)}:
            </StyledProcedurePropertyTitleHolder>
            <StyledProcedurePropertyValueHolder>
              {getProcedureProperties(log, property)}
            </StyledProcedurePropertyValueHolder>
          </StyledProcedurePropertyHolder>
        ))}
      </StyledTooltipDataWrapper>
    </>
  );
};

export default BoundingBoxDialogLogDetails;

const StyledTooltipDataWrapper = styled("div")({
  display: "grid",
  gap: 8,

  "& .tooltipDataRow:nth-child(odd)": {
    backgroundColor: "#777777bf",
  },
});

export const StyledProcedurePropertyHolder = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  gap: 4,
});

export const StyledProcedurePropertyTitleHolder = styled("div")({
  fontSize: 14,
  width: "40%",
});

export const StyledProcedurePropertyValueHolder = styled("div")({
  fontSize: 14,
  width: "60%",
  color: "gold",
  display: "fley",
  alignItems: "center",
});
