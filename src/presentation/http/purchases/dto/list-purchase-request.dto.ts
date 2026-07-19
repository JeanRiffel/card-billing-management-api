import {
  IsNotEmpty,
  IsUUID,
} from 'class-validator'

export class ListPurchasesDTO {

  @IsNotEmpty()
  cardId: string;

}