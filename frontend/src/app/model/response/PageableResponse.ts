import PageableProperties from "@model/PageableProperties";

export default class PageableResponse<T> {
    constructor(
        public properties: PageableProperties,
        public pageItems: T[] = [],
    ){}
}