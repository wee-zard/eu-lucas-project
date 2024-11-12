import { DialogToOpens } from "../../model/enum";
import { RootState } from "../store";

export const selectDialogToOpen = (state: RootState) => state.dialogStore.dialogToOpen;

export const selectIsDialogOpen = (state: RootState, dialogToOpen: DialogToOpens) => selectDialogToOpen(state) === dialogToOpen;