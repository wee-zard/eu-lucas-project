import { useSelector } from "react-redux";
import { selectListOfCreationYears } from "../redux/selectors/creationYearSelector";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { requestCreationYears } from "../redux/actions/creationYearActions";
import { selectListOfCreationCountry } from "../redux/selectors/creationCountrySelector";
import { requestCreationCountries } from "../redux/actions/creationCountryActions";
import { selectListOfCreationDirection } from "../redux/selectors/creationDirectionSelecor";
import { requestCreationDirectiones } from "../redux/actions/creationDirectionActions";
import { selectListOfCoordinateY } from "../redux/selectors/coordinateYSelector";
import { selectListOfCoordinateX } from "../redux/selectors/coordinateXSelector";
import { requestCoordinateXList } from "../redux/actions/coordinateXActions";
import { requestCoordinateYList } from "../redux/actions/coordinateYActions";
import { selectListOfExifKeys } from "../redux/selectors/exifKeySelector";
import { requestExifKeys } from "../redux/actions/exifKeyActions";

const isDataCanBeRequested = (listLength: number, isDataRequested: boolean) => {
  return listLength === 0 && !isDataRequested;
}

export const useCreationYearStorageInit = () => {
  const [isDataRequested, setDataRequested] = useState(false);
  const list = useSelector(selectListOfCreationYears);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDataCanBeRequested(list.length, isDataRequested)) {
      requestCreationYears(dispatch);
      setDataRequested(true);
    }
    // eslint-disable-next-line
  }, [list, isDataRequested]);

  return list;
};

export const useCreationCountryStorageInit = () => {
  const [isDataRequested, setDataRequested] = useState(false);
  const list = useSelector(selectListOfCreationCountry);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDataCanBeRequested(list.length, isDataRequested)) {
      requestCreationCountries(dispatch);
      setDataRequested(true);
    }
    // eslint-disable-next-line
  }, [list, isDataRequested]);

  return list;
};

export const useCreationDirectionStorageInit = () => {
  const [isDataRequested, setDataRequested] = useState(false);
  const list = useSelector(selectListOfCreationDirection);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDataCanBeRequested(list.length, isDataRequested)) {
      requestCreationDirectiones(dispatch);
      setDataRequested(true);
    }
    // eslint-disable-next-line
  }, [list, isDataRequested]);

  return list;
};

export const useCoordinateXStorageInit = () => {
  const [isDataRequested, setDataRequested] = useState(false);
  const list = useSelector(selectListOfCoordinateX);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDataCanBeRequested(list.length, isDataRequested)) {
      requestCoordinateXList(dispatch);
      setDataRequested(true);
    }
    // eslint-disable-next-line
  }, [list, isDataRequested]);

  return list;
};

export const useCoordinateYStorageInit = () => {
  const [isDataRequested, setDataRequested] = useState(false);
  const list = useSelector(selectListOfCoordinateY);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDataCanBeRequested(list.length, isDataRequested)) {
      requestCoordinateYList(dispatch);
      setDataRequested(true);
    }
    // eslint-disable-next-line
  }, [list, isDataRequested]);

  return list;
}

export const useExifKeyStorageInit = () => {
  const [isDataRequested, setDataRequested] = useState(false);
  const list = useSelector(selectListOfExifKeys);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDataCanBeRequested(list.length, isDataRequested)) {
      requestExifKeys(dispatch);
      setDataRequested(true);
    }
    // eslint-disable-next-line
  }, [list, isDataRequested]);

  return list;
}
