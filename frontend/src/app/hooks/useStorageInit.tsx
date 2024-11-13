import { useSelector } from "react-redux";
import { selectListOfCreationYears } from "../redux/selectors/creationYearSelector";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { requestCreationYears } from "../redux/actions/creationYearActions";

export const useCreationYearStorageInit = () => {
  const listOfCreationYears = useSelector(selectListOfCreationYears);
  const dispatch = useDispatch();

  useEffect(() => {
    if (listOfCreationYears.length === 0) {
      requestCreationYears(dispatch);
    }
  // eslint-disable-next-line
  }, [listOfCreationYears]);

  return listOfCreationYears;
};
