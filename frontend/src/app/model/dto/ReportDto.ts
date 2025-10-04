export default class ReportDto {
  constructor(
    public id: number,
    public type: string,
    public title: string,
    public description: string,
    public reporter: string,
    public status: string,
  ) {}
}
