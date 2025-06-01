import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import styled from "@emotion/styled";
import { StyledComponentGap } from "@global/globalStyles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectProcedureLogStorage } from "@redux/selectors/procedureLogSelector";
import { getProcedureLogByImageId } from "@api/command/procedureLogCommands";
import PageableProperties from "@model/PageableProperties";
import { useDispatch } from "react-redux";
import {
  setProcedureLogIsLogButtonDisabled,
  setProcedureLogListOfProcedureLogs,
  setProcedureLogSelectedProcedureLogs,
} from "@redux/actions/procedureLogActions";
import ProcedureLogDto from "@model/dto/ProcedureLogDto";
import {
  emptyCharacterPlaceholder,
  PROCEDURE_LOG_PAGE_SIZE,
  distinctColors,
} from "@global/globalConsts";
import SelectedProcedureLogModel from "@model/models/SelectedProcedureLogModel";
import { openSnackbar } from "@helper/notificationUtil";
import { ProcedureLogProperties } from "@model/enum";
import i18n from "@i18n/i18nHandler";
import StyledButton from "@components/StyledButton";
import { handleClickOnGlobalRippleEffect } from "app/scripts/rippleEffectOnClick";
import { IdUtils } from "@helper/idUtils";
import { selectSelectedImage } from "@redux/selectors/imageSelector";
import { SnackEnum } from "@model/enum/SnackEnum";

export const BoundingBoxDialogTimeline = () => {
  const { listOfProcedureLogs, selectedListOfProcedureLogs, isLogButtonDisabled } =
    useSelector(selectProcedureLogStorage);
  const [pageableProperties, setPageableProperties] = useState<PageableProperties>({
    pageNo: 0,
    pageSize: PROCEDURE_LOG_PAGE_SIZE,
  });
  const selectedImage = useSelector(selectSelectedImage);
  const IS_LOG_BUTTON_HIDDEN =
    listOfProcedureLogs.length >= (pageableProperties.pageNo + 1) * pageableProperties.pageSize;
  const dispatch = useDispatch();

  const transformISODateToDate = (isoDate: string) => {
    return isoDate.replace("T", " ");
  };

  const fetchListOfProcedureLogs = async () => {
    if (!isLogButtonDisabled || !selectedImage) {
      return;
    }

    getProcedureLogByImageId(selectedImage.id, pageableProperties).then((res) => {
      if (!res) {
        return;
      }

      dispatch(setProcedureLogIsLogButtonDisabled(false));
      dispatch(setProcedureLogListOfProcedureLogs([...listOfProcedureLogs, ...res.pageItems]));
    });
  };

  useEffect(
    () => {
      fetchListOfProcedureLogs();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listOfProcedureLogs, pageableProperties, isLogButtonDisabled, selectedImage],
  );

  const getProcedureProperties = (
    procedureLog: ProcedureLogDto,
    procedureLogProperties: ProcedureLogProperties,
  ) => {
    const handler = Object.freeze({
      [ProcedureLogProperties.Procedure]: () => procedureLog.procedure,
      [ProcedureLogProperties.Plants]: () =>
        procedureLog.boundingBoxes
          .map((box) => box.plant.plantScientificName)
          .filter((plant, index, listOfPlants) => plant !== listOfPlants[index + 1])
          .map(
            (uniquePlant) =>
              `${uniquePlant} (x${
                procedureLog.boundingBoxes.filter(
                  (box) => box.plant.plantScientificName === uniquePlant,
                ).length
              })`,
          )
          .join(", "),
      [ProcedureLogProperties.Params]: () => procedureLog.params.join(", "),
      [ProcedureLogProperties.CreationDate]: () => transformISODateToDate(procedureLog.createdAt),
      [ProcedureLogProperties.User]: () => procedureLog.user,
    });
    return handler[procedureLogProperties].call(() => null) ?? emptyCharacterPlaceholder;
  };

  const renderProcedureLogContent = (log: ProcedureLogDto): JSX.Element => {
    const ListOfProcedureLogProperties = Object.values(ProcedureLogProperties);
    const isDotSelected = !!selectedListOfProcedureLogs.find((model) => model.log.id === log.id);

    return (
      <StyledTimelineContent
        id={IdUtils.getTimelineContentById(log.id)}
        onClick={(event) => {
          handleTimelineDotClick(log.id, isDotSelected);
          handleClickOnGlobalRippleEffect(event, IdUtils.getTimelineContentById(log.id));
        }}
      >
        <div>{i18n.t("screens.bounding-box.timeline-menu.log-title", { logId: log.id })}</div>
        <br />
        <StyledComponentGap display="grid" gap="8px">
          {ListOfProcedureLogProperties.map((property) => (
            <StyledProcedurePropertyHolder key={`${log.id}-${property}`}>
              <StyledProcedurePropertyTitleHolder>
                {i18n.t(property)}
              </StyledProcedurePropertyTitleHolder>
              <StyledProcedurePropertyValueHolder>
                {getProcedureProperties(log, property)}
              </StyledProcedurePropertyValueHolder>
            </StyledProcedurePropertyHolder>
          ))}
        </StyledComponentGap>
      </StyledTimelineContent>
    );
  };

  const handleTimelineDotClick = (dotId: number, isDotSelected: boolean): void => {
    if (isDotSelected) {
      const filteredLogs = selectedListOfProcedureLogs.filter((model) => model.log.id !== dotId);
      dispatch(setProcedureLogSelectedProcedureLogs(filteredLogs));
    } else {
      const selectedProcedureLog = listOfProcedureLogs.find((log) => log.id === dotId);

      if (!selectedProcedureLog) {
        openSnackbar(SnackEnum.LOG_NOT_FOUND);
        return;
      }

      if (selectedListOfProcedureLogs.length + 1 > distinctColors.length) {
        openSnackbar(SnackEnum.CANNOT_SELECT_MORE_LOGS, { logCount: distinctColors.length });
        return;
      }

      // Get the list of colors that have been already assigned to logs.
      const usedUpColors = selectedListOfProcedureLogs.map((log) => log.strokeStyle);

      // Get the list of colors that have not been assigned to logs (so we could fetch an element from them).
      const filteredColors = distinctColors.filter(
        (color) => usedUpColors.length === 0 || usedUpColors.some((log) => log !== color.value),
      );

      const selectedProcedureLogModel: SelectedProcedureLogModel = {
        log: selectedProcedureLog,
        strokeStyle: filteredColors[0].value,
      };

      const selectedLogs = [...selectedListOfProcedureLogs, selectedProcedureLogModel];
      dispatch(setProcedureLogSelectedProcedureLogs(selectedLogs));
    }
  };

  const renderTimelineSeparator = (item: ProcedureLogDto): JSX.Element => {
    const isDotSelected = !!selectedListOfProcedureLogs.find((model) => model.log.id === item.id);

    return (
      <TimelineSeparator>
        <StyledTimelineDot
          variant={isDotSelected ? "filled" : "outlined"}
          color={isDotSelected ? "success" : "grey"}
        />
        <TimelineConnector />
      </TimelineSeparator>
    );
  };

  const renderTimelineItems = () => {
    return listOfProcedureLogs.map((item) => (
      <TimelineItem key={item.id}>
        {renderTimelineSeparator(item)}
        {renderProcedureLogContent(item)}
      </TimelineItem>
    ));
  };

  const handleClickOnMoreLogFetch = () => {
    dispatch(setProcedureLogIsLogButtonDisabled(true));
    setPageableProperties({
      ...pageableProperties,
      pageNo: pageableProperties.pageNo + PROCEDURE_LOG_PAGE_SIZE,
    });
  };

  return (
    <StyledBoundingBoxDialogTimelineHolder>
      <StyledTimeline>
        {listOfProcedureLogs.length > 0 ? (
          <StyledComponentGap display="grid" gap="8px">
            <div>{renderTimelineItems()}</div>
            {IS_LOG_BUTTON_HIDDEN ? (
              <StyledCenterComponent>
                <StyledButton
                  buttonText={i18n.t("screens.bounding-box.timeline-menu.load-more-log-button")}
                  buttonColor="primary"
                  buttonVariant="outlined"
                  onClick={handleClickOnMoreLogFetch}
                  isDisabled={isLogButtonDisabled}
                />
              </StyledCenterComponent>
            ) : null}
          </StyledComponentGap>
        ) : (
          <StyledCenterComponent>
            {i18n.t("screens.bounding-box.timeline-menu.no-procedure-log-fetched")}
          </StyledCenterComponent>
        )}
      </StyledTimeline>
    </StyledBoundingBoxDialogTimelineHolder>
  );
};

const StyledCenterComponent = styled.div({
  display: "flex",
  justifyContent: "center",
});

const StyledProcedurePropertyHolder = styled.div({
  display: "flex",
  justifyContent: "space-between",
});

const StyledProcedurePropertyTitleHolder = styled.div({
  fontSize: "14px",
  width: "40%",
});

const StyledProcedurePropertyValueHolder = styled.div({
  fontSize: "14px",
  width: "60%",
  color: "gold",
});

const StyledBoundingBoxDialogTimelineHolder = styled.div({
  height: "100%",
  padding: 8,
});

const StyledTimeline = styled(Timeline)({
  "& .MuiTimelineItem-root::before": {
    display: "none",
  },
  "&.MuiTimeline-root": {
    margin: 0,
  },
});

const StyledTimelineDot = styled(TimelineDot)({
  "&.MuiTimelineDot-root": {
    padding: 12,
    boxShadow: "2px 2px 2px black",
  },
});

const StyledTimelineContent = styled(TimelineContent)({
  "&.MuiTypography-root": {
    padding: "14px 16px",
    marginLeft: 8,
    borderRadius: 4,

    ":hover": {
      outline: "3px solid gold",
      transitionDuration: "150ms",
    },

    // Properties of the ripple.
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    span: {
      position: "absolute",
      borderRadius: "50%",
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      width: "100px",
      height: "100px",
      animation: "ripple 1s",
      opacity: "0",
    },
  },
});
