import { IsDateString, IsString } from "class-validator";

export class CreateSessionDto {
  @IsString()
  movie!: string;

  @IsDateString()
  showtime!: string;

  @IsString()
  room!: string;
}