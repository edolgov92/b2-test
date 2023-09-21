export class DataDto {
  constructor(
    public id: string,
    public int: number,
    public float: number,
    public color: string,
    public child: ChildDto
  ) {}
}

export class ChildDto {
  constructor(public id: string, public color: string) {}
}
