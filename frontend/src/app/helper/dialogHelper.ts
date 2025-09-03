import i18n from "@i18n/i18nHandler";

export const getContentForDialogConfig = (numberOfContent: number, i18nKey: string) =>
  new Array(numberOfContent).fill(0).map((_, index) => i18n.t(`${i18nKey}${index}`));
