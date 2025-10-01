import { sendReportEmail } from "@api/command/smtpEmailCommands";
import StyledButton from "@components/StyledButton";
import StyledSelectComponent from "@components/StyledSelectComponent";
import StyledTextFieldComponent from "@components/StyledTextFieldComponent";
import { StyledInputHolder } from "@dialogs/filteringDialog/FilteringMenu";
import { StyledComponentGap } from "@global/globalStyles";
import { ConversionUtils } from "@helper/conversionUtils";
import { openSnackbar } from "@helper/notificationUtil";
import { useEventListenerRender } from "@hooks/useEventListenerRender";
import { useFormGroupHelper } from "@hooks/useFormGroup";
import i18n from "@i18n/i18nHandler";
import { FormEnums, ReportTypesNames } from "@model/enum";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import { SnackEnum } from "@model/enum/SnackEnum";
import { ReportFormGroup, ReportFormGroupModel } from "@model/forms/ReportFormGroup";
import { setBackgroundBackdropConfig } from "@redux/actions/backgroundActions";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

const ReportScreen = () => {
  const helper = useFormGroupHelper<ReportFormGroup>(
    FormEnums.ReportCreationForm,
    EventListenerIdEnum.REPORT_FORM,
  );
  const getReportTypeOptions = useMemo(
    () => Object.values(ReportTypesNames).map((option) => i18n.t(option)),
    [],
  );
  const dispatch = useDispatch();

  const getSelectedReportTypeOption = (formGroup: ReportFormGroup) => {
    if (!formGroup.reportType.data) {
      return "";
    }

    const enumValue = ConversionUtils.EnumKeyToEnumValue(
      ReportTypesNames,
      formGroup.reportType.data,
    );

    if (!enumValue) {
      return "";
    }

    return i18n.t(enumValue);
  };

  const handleSubmit = async () => {
    dispatch(setBackgroundBackdropConfig({ isBackdropOpen: true }));

    try {
      if (helper.validate()) {
        return;
      }

      const res = helper.convert<ReportFormGroupModel>();
      const response = await sendReportEmail(res);

      if (!response) {
        return;
      }

      helper.construct();
      openSnackbar(SnackEnum.REPORT_SENT_OUT);
    } catch (error) {
      openSnackbar(SnackEnum.REPORT_NOT_SENT_OUT);
      helper.refresh();
    } finally {
      dispatch(setBackgroundBackdropConfig({ isBackdropOpen: false }));
    }
  };

  const renderComponent = (): JSX.Element => {
    const formGroup = helper.get();

    return (
      <StyledComponentGap display={"grid"} gap={"32px"}>
        <StyledInputHolder>
          <StyledSelectComponent
            inputTitle={i18n.t("screens.reporting.form.report-type")}
            options={getReportTypeOptions}
            inputValue={getSelectedReportTypeOption(formGroup)}
            setValue={(_, index) => helper.save(Object.keys(ReportTypesNames)[index], "reportType")}
            errorMessage={formGroup.reportType.error}
          />
        </StyledInputHolder>
        <StyledInputHolder>
          <StyledTextFieldComponent
            inputTitle={i18n.t("screens.reporting.form.report-title")}
            inputValue={formGroup.title.data ?? ""}
            setValue={(value) => helper.save(value, "title")}
            errorMessage={formGroup.title.error}
            htmlInputValidation={formGroup.title.validators}
            helperText={`${formGroup.title.data?.length ?? 0}/${formGroup.title.validators.maxLength}`}
          />
        </StyledInputHolder>
        <StyledInputHolder>
          <StyledTextFieldComponent
            inputTitle={i18n.t("screens.reporting.form.report-content")}
            inputValue={formGroup.message.data ?? ""}
            setValue={(value) => helper.save(value, "message")}
            errorMessage={formGroup.message.error}
            helperText={`${formGroup.message.data?.length ?? 0}/${formGroup.message.validators.maxLength}`}
            htmlInputValidation={formGroup.message.validators}
            isMultilineActive
            multilineRows={8}
          />
        </StyledInputHolder>
        <StyledButton
          buttonVariant={"outlined"}
          buttonText={i18n.t("components.button.submit")}
          buttonType={"submit"}
          onClick={handleSubmit}
        />
      </StyledComponentGap>
    );
  };

  return useEventListenerRender(helper.getRefreshKey(), renderComponent);
};

export default ReportScreen;
