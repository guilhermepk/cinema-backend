import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class SeatData {
  @IsNotEmpty()
  @IsString()
  code!: string;
}

export class CreateSessionDto {
  @IsNotEmpty()
  @IsString()
  movie!: string;

  @IsNotEmpty()
  @IsDateString()
  datetime!: string;

  @IsNotEmpty()
  @IsString()
  room!: string;

  @IsNotEmpty()
  @IsArray()
  @Type(() => SeatData)
  @ValidateNested({ each: true })
  seats!: Array<SeatData>
}