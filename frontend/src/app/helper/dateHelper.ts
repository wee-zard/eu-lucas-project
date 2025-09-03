abstract class DateHelper {
  public static convertISOStringToDateTimeFormat = (isoString: string) => {
    return isoString.split(".")[0].replaceAll("-", ".").replace("T", ". ").replace("Z", "");
  };

  public static transformISODateToDate = (isoDate: string) => {
    return isoDate.replace("T", " ");
  };
}

export default DateHelper;
