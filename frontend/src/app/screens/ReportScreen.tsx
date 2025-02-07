import { sendReportEmail } from "@api/command/smtpEmailCommands";
import StyledBackdrop from "@components/StyledBackdrop";
import StyledButton from "@components/StyledButton";
import StyledSelectComponent from "@components/StyledSelectComponent";
import StyledTextFieldComponent from "@components/StyledTextFieldComponent";
import { StyledInputHolder } from "@dialogs/filteringDialog/FilteringMenu";
import { StyledComponentGap } from "@global/globalStyles";
import { ConversionUtils } from "@helper/conversionUtils";
import { NotificationSeverity, throwNotification } from "@helper/notificationUtil";
import { ReportTypes, ReportTypesNames } from "@model/enum";
import SmtpEmailRequest, { SmtpEmailRequestError } from "@model/request/SmtpEmailRequest";
import { useState } from "react";

const ReportScreen = () => {
  const titleCharacterLimit = 200;
  const messageCharacterLimit = 4000;
  const [request, setRequest] = useState(new SmtpEmailRequest());
  const [requestError, setRequestError] = useState(new SmtpEmailRequestError());
  const [isDisabled, setDisabled] = useState(false);

  const handleReportTitleChange = (title: string) => {
    if (title.length <= titleCharacterLimit) {
      setRequest({ ...request, title });
      setRequestError({ ...requestError, title: undefined });
    }
  };

  const handleReportMessageChange = (message: string) => {
    if (message.length <= messageCharacterLimit) {
      setRequest({
        ...request,
        message,
      });
      setRequestError({
        ...requestError,
        message: undefined,
      });
    }
  };

  const handleReportTypeSelection = (reportType: ReportTypes) => {
    setRequest({
      ...request,
      reportType,
    });
    setRequestError({
      ...requestError,
      reportType: undefined,
    });
  };

  const getReportTypesNames = (value: unknown) => {
    handleReportTypeSelection(
      ConversionUtils.ReportTypesNamesToReportTypes(value as ReportTypesNames),
    );
  };

  const getReportTypes = ConversionUtils.ReportTypesToReportTypeNames(request?.reportType) ?? "";

  const submitReport = () => {
    setDisabled(true);
    const tmpError: SmtpEmailRequestError = {
      title: !!request.title ? undefined : "A mező kitöltése kötelező",
      reportType: !!request.reportType ? undefined : "A mező kitöltése kötelező",
      message: !!request.message ? undefined : "A mező kitöltése kötelező",
    };
    const isErrorNotFound = Object.values(tmpError).every((error) => !error);
    if (isErrorNotFound) {
      sendReportEmail(request)
        .then((response) => {
          if (response) {
            setRequest(new SmtpEmailRequest());
            throwNotification(
              NotificationSeverity.Success,
              "A bejelentés sikeresen el lett küldve!",
            );
          }
          setDisabled(false);
        })
        .catch((_) =>
          throwNotification(NotificationSeverity.Error, "A bejelentést nem sikerült elküldeni!"),
        );
    } else {
      setDisabled(false);
    }
    setRequestError(tmpError);
  };

  return (
    <StyledComponentGap display={"grid"} gap={"32px"}>
      <StyledInputHolder>
        <StyledSelectComponent
          inputTitle={"Bejelentés típusa"}
          options={Object.values(ReportTypesNames)}
          inputValue={getReportTypes}
          setValue={getReportTypesNames}
          errorMessage={requestError.reportType}
        />
      </StyledInputHolder>
      <StyledInputHolder>
        <StyledTextFieldComponent
          inputTitle={"Bejelentés címe"}
          inputValue={request?.title ?? ""}
          setValue={handleReportTitleChange}
          errorMessage={requestError.title}
          helperText={`${request?.title?.length ?? 0}/${titleCharacterLimit}`}
        />
      </StyledInputHolder>
      <StyledInputHolder>
        <StyledTextFieldComponent
          inputTitle={"Bejelentés tartalma"}
          inputValue={request?.message ?? ""}
          setValue={handleReportMessageChange}
          errorMessage={requestError.message}
          helperText={`${request?.message?.length ?? 0}/${messageCharacterLimit}`}
          isMultilineActive
          multilineRows={8}
        />
      </StyledInputHolder>
      <StyledButton
        buttonVariant={"outlined"}
        buttonText={"Elküldés"}
        buttonType={"submit"}
        onClick={submitReport}
        isDisabled={isDisabled}
      />
      <StyledBackdrop isBackdropOpen={isDisabled} />
    </StyledComponentGap>
  );
};

export default ReportScreen;
