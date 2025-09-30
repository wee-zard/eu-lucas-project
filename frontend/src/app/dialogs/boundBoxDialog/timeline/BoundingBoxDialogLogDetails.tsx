import { emptyPlaceholder } from "@global/globalConsts";
import { customScrollBar, StyledScrollBarHolder } from "@global/globalStyles";
import DateHelper from "@helper/dateHelper";
import i18n from "@i18n/i18nHandler";
import BoundingBoxDto from "@model/dto/BoundingBoxDto";
import ProcedureLogDto from "@model/dto/ProcedureLogDto";
import { TooltipDataViewProperty } from "@model/enum";
import { Divider, styled } from "@mui/material";

type Props = {
  log: ProcedureLogDto;
  box?: BoundingBoxDto;
  isEverythingDisplayed?: boolean;
};

const BoundingBoxDialogLogDetails = ({ log, box, isEverythingDisplayed }: Props) => {
  const commonPrefixProperties = [
    TooltipDataViewProperty.Procedure,
    TooltipDataViewProperty.Params,
  ];
  const commonPostfixProperties = [
    TooltipDataViewProperty.User,
    TooltipDataViewProperty.CreationDate,
  ];

  const getProperties = (isLogDisplayed: boolean = true) => {
    const logOnlyProperties = [TooltipDataViewProperty.Plants, TooltipDataViewProperty.Box];
    const boxOnlyProperties = [
      TooltipDataViewProperty.PlantName,
      TooltipDataViewProperty.PlantFamily,
      TooltipDataViewProperty.IsInvasive,
      TooltipDataViewProperty.BoundingBox,
      TooltipDataViewProperty.DetectionProbability,
    ];

    return isLogDisplayed ? logOnlyProperties : boxOnlyProperties;
  };

  const getProcedureProperties = (
    log: ProcedureLogDto,
    properties: TooltipDataViewProperty,
    box?: BoundingBoxDto,
  ) => {
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

    return handler[properties]() ?? emptyPlaceholder;
  };

  const renderContent = (property: TooltipDataViewProperty, box?: BoundingBoxDto) => {
    return (
      <StyledProcedurePropertyHolder
        className="tooltipDataRow"
        key={`${log.id}-${property}-${box?.id ?? 0}`}
      >
        <StyledProcedurePropertyTitleHolder>{i18n.t(property)}:</StyledProcedurePropertyTitleHolder>
        <StyledProcedurePropertyValueHolder>
          {getProcedureProperties(log, property, box)}
        </StyledProcedurePropertyValueHolder>
      </StyledProcedurePropertyHolder>
    );
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
        {commonPrefixProperties.map((property) => renderContent(property, box))}
        {!isEverythingDisplayed
          ? getProperties(!box).map((property) => renderContent(property, box))
          : log.boundingBoxes.map((boundingBox, index, array) => (
              <>
                {getProperties(false).map((property) => renderContent(property, boundingBox))}
                {index < array.length - 1 && <Divider />}
              </>
            ))}
        {commonPostfixProperties.map((property) => renderContent(property, box))}
      </StyledTooltipDataWrapper>
    </>
  );
};

export default BoundingBoxDialogLogDetails;

const StyledTooltipDataWrapper = styled(StyledScrollBarHolder)({
  display: "grid",
  gap: 8,
  minHeight: 200,
  maxHeight: 350,
  ...customScrollBar(),
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
