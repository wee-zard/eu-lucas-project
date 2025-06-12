import { RootState } from "@redux/store";

export const selectIsUserListLoading = (state: RootState) => state.userStore.isUserListLoading;

export const selectListOfUsers = (state: RootState) => state.userStore.listOfUsers;

export const selectAuthenticatedUser = (state: RootState) => state.userStore.authenticatedUser;
