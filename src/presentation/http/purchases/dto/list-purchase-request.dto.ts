import { IsNotEmpty } from 'class-validator';

export class ListPurchasesDTO {
  @IsNotEmpty()
  cardId: string;
}
