import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { StyledComponentGap } from "@global/globalStyles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedListOfProcedureLogs } from "@redux/selectors/procedureLogSelector";
import { getProcedureLogByImageId } from "@api/command/procedureLogCommands";
import { useDispatch } from "react-redux";
import { setProcedureLogSelectedProcedureLogs } from "@redux/actions/procedureLogActions";
import ProcedureLogDto from "@model/dto/ProcedureLogDto";
import { distinctColors, getEmptyPageableResponse } from "@global/globalConsts";
import SelectedProcedureLogModel from "@model/models/SelectedProcedureLogModel";
import { openSnackbar } from "@helper/notificationUtil";
import i18n from "@i18n/i18nHandler";
import { handleClickOnGlobalRippleEffect } from "app/scripts/rippleEffectOnClick";
import { IdUtils } from "@helper/idUtils";
import { selectSelectedImage } from "@redux/selectors/imageSelector";
import { SnackEnum } from "@model/enum/SnackEnum";
import { boundingBoxPageable } from "../helper/BoundingBoxDialogHelper";
import StyledCircularProgressOverlay from "@components/progressbar/StyledCircularProgressOverlay";
import PageableProperties from "@model/PageableProperties";
import StyledTablePagination from "@components/StyledTablePagination";
import { styled } from "@mui/material/styles";
import PageableResponse from "@model/response/PageableResponse";
import BoundingBoxDialogLogDetails from "./BoundingBoxDialogLogDetails";
import { Divider } from "@mui/material";

export const BoundingBoxDialogTimeline = () => {
  const selectedProcedureLogs = useSelector(selectSelectedListOfProcedureLogs);
  const selectedImage = useSelector(selectSelectedImage);
  const [pageable, setPageable] = useState<PageableProperties>(boundingBoxPageable);
  const [response, setResponse] = useState<PageableResponse<ProcedureLogDto>>();
  const dispatch = useDispatch();

  const handleEmptyInitOfResponse = () => {
    setResponse(getEmptyPageableResponse(pageable));
  };

  /**
   * Fetches the list of procedure logs under the specific image.
   */
  const fetchListOfProcedureLogs = async () => {
    // This will act as a signal to start the loading indicator.
    setResponse(undefined);

    try {
      if (!selectedImage) {
        handleEmptyInitOfResponse();
        return;
      }

      setResponse(await getProcedureLogByImageId(selectedImage.id, pageable));
    } catch (error) {
      handleEmptyInitOfResponse();
    }
  };

  useEffect(
    () => {
      fetchListOfProcedureLogs();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageable, selectedImage],
  );

  const renderProcedureLogContent = (log: ProcedureLogDto): JSX.Element => {
    const isDotSelected = !!selectedProcedureLogs.find((model) => model.log.id === log.id);

    return (
      <StyledTimelineContent
        id={IdUtils.getTimelineContentById(log.id)}
        onClick={(event) => {
          handleTimelineDotClick(log.id, isDotSelected);
          handleClickOnGlobalRippleEffect(event, IdUtils.getTimelineContentById(log.id));
        }}
      >
        <BoundingBoxDialogLogDetails log={log} />
      </StyledTimelineContent>
    );
  };

  const handleTimelineDotClick = (dotId: number, isDotSelected: boolean): void => {
    if (isDotSelected) {
      const filteredLogs = selectedProcedureLogs.filter((model) => model.log.id !== dotId);
      dispatch(setProcedureLogSelectedProcedureLogs(filteredLogs));
    } else {
      const selectedProcedureLog = response?.content?.find((log) => log.id === dotId);

      if (!selectedProcedureLog) {
        openSnackbar(SnackEnum.LOG_NOT_FOUND);
        return;
      }

      if (selectedProcedureLogs.length + 1 > distinctColors.length) {
        openSnackbar(SnackEnum.CANNOT_SELECT_MORE_LOGS, { logCount: distinctColors.length });
        return;
      }

      // Get the list of colors that have been already assigned to logs.
      const usedUpColors = selectedProcedureLogs.map((log) => log.properties.strokeStyle);

      // Get the list of colors that have not been assigned to logs (so we could fetch an element from them).
      const filteredColors = distinctColors.filter(
        (color) => usedUpColors.length === 0 || usedUpColors.some((log) => log !== color.value),
      );

      const selectedProcedureLogModel: SelectedProcedureLogModel = {
        log: selectedProcedureLog,
        properties: {
          /**
           * TODO: What would happen if we want to store more properties here?
           * In that case, we would override all of those previous changes and only this
           * "strokeStyle" would remain that is not a good practice.
           */
          strokeStyle: filteredColors[0].value,
        },
      };

      const selectedLogs = [...selectedProcedureLogs, selectedProcedureLogModel];
      dispatch(setProcedureLogSelectedProcedureLogs(selectedLogs));
    }
  };

  const renderTimelineSeparator = (item: ProcedureLogDto): JSX.Element => {
    const isDotSelected = !!selectedProcedureLogs.find((model) => model.log.id === item.id);

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
    return response?.content?.map((item) => (
      <TimelineItem key={item.id}>
        {renderTimelineSeparator(item)}
        {renderProcedureLogContent(item)}
      </TimelineItem>
    ));
  };

  return (
    <StyledBoundingBoxDialogTimelineHolder>
      <StyledTimeline>
        {response && response.content.length > 0 ? (
          <StyledComponentGap display="grid" gap="8px">
            <div>{renderTimelineItems()}</div>
            <Divider />
            <StyledTablePagination
              pageNo={pageable.pageNo}
              pageSize={pageable.pageSize}
              totalElements={response?.totalElements}
              setPageable={setPageable}
            />
          </StyledComponentGap>
        ) : response && response.content.length === 0 ? (
          <StyledCenterComponent>
            {i18n.t("screens.bounding-box.timelineMenu.noProcedureLogFetched")}
          </StyledCenterComponent>
        ) : (
          <div>
            <StyledCircularProgressOverlay
              variant={"indeterminate"}
              styles={{ isBackgroundHidden: true }}
            />
          </div>
        )}
      </StyledTimeline>
    </StyledBoundingBoxDialogTimelineHolder>
  );
};

const StyledCenterComponent = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const StyledBoundingBoxDialogTimelineHolder = styled("div")({
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
