import { IsNotEmpty, IsString, IsNumber, IsInt, IsUUID } from 'class-validator';

export class ListCardDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  limit: number;

  @IsString()
  brand: string;

  @IsInt()
  closingDay: number;

  @IsInt()
  dueDay: number;


}
