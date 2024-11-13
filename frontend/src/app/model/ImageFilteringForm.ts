import CreationYearDto from "./CreationYearDto";

export default class ImageFilteringForm {
    constructor(
        public creationYearForm: CreationYearDto[] = [],
        public creationCountryForm: any[] = [],
        public coordinateForm: any[] = [],
        public creationDirectionForm: any[] = [],
        public exifDataForm: any[] = [],
    ) {}
}