import { sendReportEmail } from "@api/command/smtpEmailCommands";
import StyledButton from "@components/StyledButton";
import StyledSelectComponent from "@components/StyledSelectComponent";
import StyledTextFieldComponent from "@components/StyledTextFieldComponent";
import { StyledInputHolder } from "@dialogs/filteringDialog/FilteringMenu";
import { StyledComponentGap } from "@global/globalStyles";
import { ConversionUtils } from "@helper/conversionUtils";
import { FormGroupHelper } from "@helper/formGroupHelper";
import { openSnackbar } from "@helper/notificationUtil";
import i18n from "@i18n/i18nHandler";
import { FormEnums, ReportTypesNames } from "@model/enum";
import { SnackEnum } from "@model/enum/SnackEnum";
import { ReportFormGroup, ReportFormGroupModel } from "@model/forms/ReportFormGroup";
import { setSettingBackdropOpen } from "@redux/actions/settingActions";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

const ReportScreen = () => {
  const helper = new FormGroupHelper<ReportFormGroup>(FormEnums.ReportCreationForm);
  const [formGroup, setFormGroup] = useState(helper.construct());
  const getReportTypeOptions = useMemo(
    () => Object.values(ReportTypesNames).map((option) => i18n.t(option)),
    [],
  );
  const dispatch = useDispatch();

  const getSelectedReportTypeOption = () => {
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

  /**
   * When the form input entires are changes then they will
   * call this method that will actualize the form based on the updated form entry's value.
   *
   * @param value The new value from the input.
   * @param enumKey The name of the form input property that has been changed.
   */
  const handleFormUpdate = (value: string, enumKey: keyof ReportFormGroup): void => {
    setFormGroup(helper.save(formGroup, value, enumKey));
  };

  const handleSubmit = (): void => {
    dispatch(setSettingBackdropOpen(true));

    const errorCandidateFormGroup = helper.validate(formGroup);

    if (errorCandidateFormGroup) {
      setFormGroup(errorCandidateFormGroup);
      dispatch(setSettingBackdropOpen(false));
      return;
    }

    const res = helper.convert<ReportFormGroupModel>(formGroup);
    dispatch(setSettingBackdropOpen(false));

    sendReportEmail(res)
      .then((response) => {
        if (response) {
          setFormGroup(helper.construct());
          openSnackbar(SnackEnum.REPORT_SENT_OUT);
        }
      })
      .catch(() => openSnackbar(SnackEnum.REPORT_NOT_SENT_OUT))
      .finally(() => dispatch(setSettingBackdropOpen(false)));
  };

  return (
    <StyledComponentGap display={"grid"} gap={"32px"}>
      <StyledInputHolder>
        <StyledSelectComponent
          inputTitle={i18n.t("screens.reporting.form.report-type")}
          options={getReportTypeOptions}
          inputValue={getSelectedReportTypeOption()}
          setValue={(_, index) =>
            handleFormUpdate(Object.keys(ReportTypesNames)[index], "reportType")
          }
          errorMessage={formGroup.reportType.error}
        />
      </StyledInputHolder>
      <StyledInputHolder>
        <StyledTextFieldComponent
          inputTitle={i18n.t("screens.reporting.form.report-title")}
          inputValue={formGroup.title.data ?? ""}
          setValue={(value) => handleFormUpdate(value, "title")}
          errorMessage={formGroup.title.error}
          htmlInputValidation={formGroup.title.validators}
          helperText={`${formGroup.title.data?.length ?? 0}/${formGroup.title.validators.maxLength}`}
        />
      </StyledInputHolder>
      <StyledInputHolder>
        <StyledTextFieldComponent
          inputTitle={i18n.t("screens.reporting.form.report-content")}
          inputValue={formGroup.message.data ?? ""}
          setValue={(value) => handleFormUpdate(value, "message")}
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

export default ReportScreen;
