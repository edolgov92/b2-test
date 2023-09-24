import { Expose, Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class DataDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(1000000)
  id: string;

  @Expose()
  @IsDefined()
  @IsNumber()
  @Min(-1000000)
  @Max(1000000)
  int: number;

  @Expose()
  @IsDefined()
  @IsNumber()
  @Min(-1000000)
  @Max(1000000)
  float: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  color: string;

  @Expose()
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ChildDto)
  child: ChildDto;

  constructor(id: string, int: number, float: number, color: string, child: ChildDto) {
    this.id = id;
    this.int = int;
    this.float = float;
    this.color = color;
    this.child = child;
  }
}

export class ChildDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(1000000)
  id: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  color: string;

  constructor(id: string, color: string) {
    this.id = id;
    this.color = color;
  }
}
