import { useSelector } from "react-redux";
import { selectListOfCreationYears } from "../redux/selectors/creationYearSelector";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { requestCreationYears } from "../redux/actions/creationYearActions";
import { selectListOfCreationCountry } from "../redux/selectors/creationCountrySelector";
import { requestCreationCountries } from "../redux/actions/creationCountryActions";
import { selectListOfCreationDirection } from "../redux/selectors/creationDirectionSelecor";
import { requestCreationDirectiones } from "../redux/actions/creationDirectionActions";
import { selectListOfCoordinateX } from "../redux/selectors/coordinateXSelector";
import { requestCoordinateXList } from "../redux/actions/coordinateXActions";
import { selectListOfCoordinateY } from "../redux/selectors/coordinateYSelector";
import { requestCoordinateYList } from "../redux/actions/coordinateYActions";

export const useCreationYearStorageInit = () => {
  const list = useSelector(selectListOfCreationYears);
  const dispatch = useDispatch();

  useEffect(() => {
    if (list.length === 0) {
      requestCreationYears(dispatch);
    }
    // eslint-disable-next-line
  }, [list]);

  return list;
};

export const useCreationCountryStorageInit = () => {
  const list = useSelector(selectListOfCreationCountry);
  const dispatch = useDispatch();

  useEffect(() => {
    if (list.length === 0) {
      requestCreationCountries(dispatch);
    }
    // eslint-disable-next-line
  }, [list]);

  return list;
};

export const useCreationDirectionStorageInit = () => {
  const list = useSelector(selectListOfCreationDirection);
  const dispatch = useDispatch();

  useEffect(() => {
    if (list.length === 0) {
      requestCreationDirectiones(dispatch);
    }
    // eslint-disable-next-line
  }, [list]);

  return list;
};

export const useCoordinateXStorageInit = () => {
  const list = useSelector(selectListOfCoordinateX);
  const dispatch = useDispatch();

  useEffect(() => {
    if (list.length === 0) {
      requestCoordinateXList(dispatch);
    }
    // eslint-disable-next-line
  }, [list]);

  return list;
};

export const useCoordinateYStorageInit = () => {
  const list = useSelector(selectListOfCoordinateY);
  const dispatch = useDispatch();

  useEffect(() => {
    if (list.length === 0) {
      requestCoordinateYList(dispatch);
    }
    // eslint-disable-next-line
  }, [list]);

  return list;
};
