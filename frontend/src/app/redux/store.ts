import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./reducers/imageReducer";
import dialogReducer from "./reducers/dialogReducer";
import creationYearReducer from "./reducers/creationYearReducer";
import creationCountryReducer from "./reducers/creationCountryReducer";
import creationDirectionReducer from "./reducers/creationDirectionReducer";
import coordinateXReducer from "./reducers/coordinateXReducer";
import coordinateYReducer from "./reducers/coordinateYReducer";
import exifKeyReducer from "./reducers/exifKeyReducer";
import procedureReducer from "./reducers/procedureReducer";
import procedureLogParamReducer from "./reducers/procedureLogParamReducer";
import plantReducer from "./reducers/plantReducer";
import plantSpeciesReducer from "./reducers/plantSpeciesReducer";

const store = configureStore({
  reducer: {
    imageStore: imageReducer,
    dialogStore: dialogReducer,
    creationYearStore: creationYearReducer,
    creationCountryStore: creationCountryReducer,
    creationDirectionStore: creationDirectionReducer,
    coordinateXStore: coordinateXReducer,
    coordinateYStore: coordinateYReducer,
    exifKeyStore: exifKeyReducer,
    procedureStore: procedureReducer,
    procedureLogParamStore: procedureLogParamReducer,
    plantStore: plantReducer,
    plantSpeciesReducer: plantSpeciesReducer,
  },
});

export default store;
// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
