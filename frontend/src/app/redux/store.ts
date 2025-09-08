import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
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
import logParamReducer from "@redux/reducers/logParamReducer";
import procedureLogReducer from "@redux/reducers/procedureLogReducer";
import procedureUploadReducer from "@redux/reducers/procedureUploadReducer";
import backgroundReducer from "@redux/reducers/backgroundReducer";
import userReducer from "@redux/reducers/userReducer";
import filteringReducer from "@redux/reducers/filteringReducer";
import boundingBoxReducer from "@redux/reducers/boundingBoxReducer";
import folderCreationReducer from "./reducers/folderCreationReducer";
import folderReducer from "./reducers/folderReducer";
import confirmationDialogReducer from "./reducers/confirmationDialogReducer";

const rootReducer = combineReducers({
  // Reducer Action type and Action setter type processed:
  imageStore: imageReducer,
  dialogStore: dialogReducer,
  filteringStore: filteringReducer,
  boundingBoxStore: boundingBoxReducer,
  folderCreationStore: folderCreationReducer,
  folderStore: folderReducer,
  confirmationDialogStore: confirmationDialogReducer,
  backgroundStore: backgroundReducer,

  // Processed:
  procedureUploadStorage: procedureUploadReducer,
  userStore: userReducer,

  // Not processed yet:
  creationYearStore: creationYearReducer,
  creationCountryStore: creationCountryReducer,
  creationDirectionStore: creationDirectionReducer,
  coordinateXStore: coordinateXReducer,
  coordinateYStore: coordinateYReducer,
  exifKeyStore: exifKeyReducer,
  procedureStore: procedureReducer,
  procedureLogStore: procedureLogReducer,
  procedureLogParamStore: logParamReducer,
  plantStore: plantReducer,
  plantSpeciesReducer: plantSpeciesReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
