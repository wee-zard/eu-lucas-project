export default class PageableResponse<T> {
  constructor(
    public content: T[] = [],
    /**
     * Based on the number of all records, tells the total number of
     * pages which still can be fetched from the database.
     */
    public totalPages: number,
    /**
     * Total number of elements of the records without the pagination.
     */
    public totalElements: number,
    /**
     * The size of the pagination.
     */
    public size: number,
    /**
     * The current page.
     */
    public page: number,
    /**
     * Tells whether the content is empty or not.
     */
    public empty: boolean,
  ) {}
}
