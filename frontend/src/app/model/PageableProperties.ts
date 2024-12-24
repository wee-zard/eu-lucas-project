export default class PageableProperties {
  constructor(
    public pageNo: number,
    public pageSize: number
  ) {}

  public getHeader = () => ({ "X-Pageable-Properties": `pageNo=${this.pageNo};pageSize=${this.pageSize}` });
}
