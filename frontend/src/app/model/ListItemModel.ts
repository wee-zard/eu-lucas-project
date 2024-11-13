import { FilterDialogFilterOptions } from "./enum";

export default class ListItemModel {
  constructor(
    public name: FilterDialogFilterOptions,
    public icon: JSX.Element,
  ) {}
}
