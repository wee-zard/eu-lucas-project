import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./reducers/imageReducer";
import dialogReducer from "./reducers/dialogReducer";
import creationYearReducer from "./reducers/creationYearReducer";
import creationCountryReducer from "./reducers/creationCountryReducer";
import creationDirectionReducer from "./reducers/creationDirectionReducer";

const store = configureStore({
  reducer: {
    imageStore: imageReducer,
    dialogStore: dialogReducer,
    creationYearStore: creationYearReducer,
    creationCountryStore: creationCountryReducer,
    creationDirectionStore: creationDirectionReducer,
  },
});

export default store;
// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
