import { useEffect, useState } from "react";
import FilteringQueryBuilder from "./FilteringQueryBuilder";
import { LocalStorageUtils } from "@helper/localStorageUtil";
import { selectFilterMenuActions } from "@redux/selectors/imageSelector";
import { useSelector } from "react-redux";
import { GenericHandlerType } from "@model/types/GenericHandlerType";
import { MenuActions } from "@model/enum";
import { useDispatch } from "react-redux";
import { setFilterMenuAction } from "@redux/actions/imageActions";
import { initFirstQueryParent, initQueryBuilderObj } from "@model/QueryBuilderModel";

type Props = {
  handleClose: () => void;
};

const FilteringMenuContent = ({ handleClose }: Props) => {
  console.log("[FilteringMenuContent]: RENDERED");

  const filterMenuAction = useSelector(selectFilterMenuActions);
  const [element, setElement] = useState<JSX.Element>();
  const dispatch = useDispatch();

  const renderComponent = () => (
    <FilteringQueryBuilder id={LocalStorageUtils.getQueryBuilderModel().id} />
  );

  useEffect(() => {
    if (!element) {
      setElement(renderComponent());
    }
  }, [element]);

  useEffect(() => {
    if (!filterMenuAction) {
      return;
    }

    const handle: GenericHandlerType<MenuActions, () => void> = {
      [MenuActions.CANCEL]: () => {
        dispatch(setFilterMenuAction(undefined));
        handleClose();
      },
      [MenuActions.SUBMIT]: () => handleClose(),
      [MenuActions.CLEAR_ALL]: () => {
        const defaultBuilder = initQueryBuilderObj(initFirstQueryParent);
        LocalStorageUtils.setQueryBuilderModelLocalStorage(defaultBuilder);
        setElement(undefined);
        dispatch(setFilterMenuAction(undefined));
      },
      [MenuActions.PAGINATION_CHANGE]: () => null,
    };

    handle[filterMenuAction]();
  }, [dispatch, filterMenuAction]);

  return <>{element}</>;
};

export default FilteringMenuContent;
