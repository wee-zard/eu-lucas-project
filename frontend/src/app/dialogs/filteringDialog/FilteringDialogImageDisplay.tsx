import { LocalStorageUtils } from "@helper/localStorageUtil";
import { MenuActions } from "@model/enum";
import { setFilterMenuAction } from "@redux/actions/imageActions";
import { selectFilterMenuActions } from "@redux/selectors/imageSelector";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const FilteringDialogImageDisplay = () => {
  const filterMenuAction = useSelector(selectFilterMenuActions);
  const dispatch = useDispatch();

  useEffect(() => {
    if (filterMenuAction === MenuActions.SUBMIT) {
        console.log("IMAGES ARE RENDERED!", LocalStorageUtils.getQueryBuilderModel());
        dispatch(setFilterMenuAction());
    }
  }, [filterMenuAction])

  return (
    <div>

    </div>
  );
};

export default FilteringDialogImageDisplay;
