import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

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
}