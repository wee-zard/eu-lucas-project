export default class PageableResponse<T> {
    constructor(
        public pageSize: number,
        public pageNu: number,
        public pageItems: T[] = [],
    ){}
}