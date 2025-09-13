import CreationYearDto from "@model/dto/CreationYearDto";

interface CreationYearReducerStateType {
  isCreationListLoading: boolean;
  listOfCreationYears?: CreationYearDto[];
}

export default CreationYearReducerStateType;
