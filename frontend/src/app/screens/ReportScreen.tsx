import { sendReportEmail } from "@api/command/smtpEmailCommands";
import StyledBackdrop from "@components/StyledBackdrop";
import StyledButton from "@components/StyledButton";
import StyledSelectComponent from "@components/StyledSelectComponent";
import StyledTextFieldComponent from "@components/StyledTextFieldComponent";
import { StyledInputHolder } from "@dialogs/filteringDialog/FilteringMenu";
import { StyledComponentGap } from "@global/globalStyles";
import { ConversionUtils } from "@helper/conversionUtils";
import { NotificationSeverity, throwNotification } from "@helper/notificationUtil";
import i18n from "@i18n/i18nHandler";
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
    if (title.length > titleCharacterLimit) {
      // TODO: Should error be thrown to the user about reached character title limit?
      return;
    }

    setRequest({ ...request, title });
    setRequestError({ ...requestError, title: undefined });
  };

  const handleReportMessageChange = (message: string) => {
    if (message.length > messageCharacterLimit) {
      // TODO: Should error be thrown to the user about reached character title limit?
      return;
    }

    setRequest({ ...request, message });
    setRequestError({ ...requestError, message: undefined });
  };

  const handleReportTypeSelection = (reportType: ReportTypes) => {
    setRequest({ ...request, reportType });
    setRequestError({ ...requestError, reportType: undefined });
  };

  const getReportTypesNames = (value: unknown) => {
    const getType = reportTypes.find((type) => i18n.t(type) === value);

    if (!getType) {
      return;
    }

    handleReportTypeSelection(ConversionUtils.ReportTypesNamesToReportTypes(getType));
  };

  const getReportTypes = ConversionUtils.ReportTypesToReportTypeNames(request?.reportType) ?? "";

  const submitReport = () => {
    setDisabled(true);
    const tmpError: SmtpEmailRequestError = {
      title: !!request.title ? undefined : i18n.t("validators.field-is-required"),
      reportType: !!request.reportType ? undefined : i18n.t("validators.field-is-required"),
      message: !!request.message ? undefined : i18n.t("validators.field-is-required"),
    };
    const isErrorNotFound = Object.values(tmpError).every((error) => !error);
    if (isErrorNotFound) {
      sendReportEmail(request)
        .then((response) => {
          if (response) {
            setRequest(new SmtpEmailRequest());
            throwNotification(
              NotificationSeverity.Success,
              i18n.t("screens.reporting.notifications.report-sent-out"),
            );
          }
          setDisabled(false);
        })
        .catch((_) =>
          throwNotification(
            NotificationSeverity.Error,
            i18n.t("screens.reporting.notifications.report-cannot-be-sent-out"),
          ),
        );
    } else {
      setDisabled(false);
    }
    setRequestError(tmpError);
  };

  const reportTypes = Object.values(ReportTypesNames);

  const getReportTypeOptions = Object.values(ReportTypesNames).map((option) => i18n.t(option));

  const getReportTypeInputValue = getReportTypes ? i18n.t(getReportTypes) : "";

  return (
    <StyledComponentGap display={"grid"} gap={"32px"}>
      <StyledInputHolder>
        <StyledSelectComponent
          inputTitle={i18n.t("screens.reporting.form.report-type")}
          options={getReportTypeOptions}
          inputValue={getReportTypeInputValue}
          setValue={getReportTypesNames}
          errorMessage={requestError.reportType}
        />
      </StyledInputHolder>
      <StyledInputHolder>
        <StyledTextFieldComponent
          inputTitle={i18n.t("screens.reporting.form.report-title")}
          inputValue={request?.title ?? ""}
          setValue={handleReportTitleChange}
          errorMessage={requestError.title}
          helperText={`${request?.title?.length ?? 0}/${titleCharacterLimit}`}
        />
      </StyledInputHolder>
      <StyledInputHolder>
        <StyledTextFieldComponent
          inputTitle={i18n.t("screens.reporting.form.report-content")}
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
        buttonText={i18n.t("components.button.submit")}
        buttonType={"submit"}
        onClick={submitReport}
        isDisabled={isDisabled}
      />
      <StyledBackdrop isBackdropOpen={isDisabled} />
    </StyledComponentGap>
  );
};

export default ReportScreen;
