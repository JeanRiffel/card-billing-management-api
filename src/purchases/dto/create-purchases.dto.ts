import {
  IsNotEmpty,
  IsUUID,
} from 'class-validator'

export class CreatePurchasesDTO {
  
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  total_amount: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  installments: number;

  @IsUUID()
  @IsNotEmpty()
  cardId: string;
}
