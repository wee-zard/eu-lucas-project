import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "@redux/reducers/imageReducer";
import dialogReducer from "@redux/reducers/dialogReducer";
import creationYearReducer from "@redux/reducers/creationYearReducer";
import creationCountryReducer from "@redux/reducers/creationCountryReducer";
import creationDirectionReducer from "@redux/reducers/creationDirectionReducer";
import coordinateXReducer from "@redux/reducers/coordinateXReducer";
import coordinateYReducer from "@redux/reducers/coordinateYReducer";
import exifKeyReducer from "@redux/reducers/exifKeyReducer";
import procedureReducer from "@redux/reducers/procedureReducer";
import plantReducer from "@redux/reducers/plantReducer";
import plantSpeciesReducer from "@redux/reducers/plantSpeciesReducer";
import procedureLogParamReducer from "@redux/reducers/procedureLogParamReducer";

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
