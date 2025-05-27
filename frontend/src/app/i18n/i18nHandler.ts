import { I18n } from "i18n-js";
import enTrans from "@i18n/lang/en.json";
import huTrans from "@i18n/lang/hu.json";
import { LocalTranslationTypes } from "@model/types/LocalTranslationTypes";

/**
 * Inits the translation root by importing the different translation
 * JSON files from the application.
 */
export const initI18NTranslations = () => {
  const i18n = new I18n({
    hu: { ...huTrans },
    en: { ...enTrans },
  });
  i18n.defaultLocale = "hu";
  i18n.locale = "hu";

  return i18n;
};

/**
 * Changes the translations of the i18n to the desired translation.
 *
 * @param locale The translation we want to change into. The allowed inputs are
 * described in the following type: {@link LocalTranslationTypes}.
 */
export const changeI18NTranslations = async (locale: LocalTranslationTypes) => {
  const response = await fetch(`./${locale}.json`);
  const translations = await response.json();
  i18n.store(translations);
};

const i18n = initI18NTranslations();

export default i18n;
