abstract class DateHelper {
  public static convertISOStringToDateTimeFormat = (isoString: string) => {
    return isoString.split(".")[0].replaceAll("-", ".").replace("T", ". ").replace("Z", "");
  };
}

export default DateHelper;
