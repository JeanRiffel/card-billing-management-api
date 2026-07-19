import {
  isNotEmpty,
  IsNotEmpty,
  IsUUID,
} from 'class-validator'

export class ListPurchasesDTOResponse {

  @IsNotEmpty()
  cardId: string;

  @IsNotEmpty()
  totalAmount: number
}