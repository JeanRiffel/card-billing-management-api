import { Inject, Injectable } from "@nestjs/common";
import { Purchase } from "src/v2/domain/entities/purchase/purchase.entity";
import { PURCHASE_REPOSITORY, PurchaseRepository } from "src/v2/domain/repositories/purchase-repository";
import { ListPurchasesDTO } from "src/v2/modules/purchases/dto/list-purchase-request.dto";
import { ListPurchasesDTOResponse } from "src/v2/modules/purchases/dto/list-purchase-response.dto";

@Injectable()
export class ListPurchaseUseCase {

  constructor(
    @Inject(PURCHASE_REPOSITORY)
    private purchaseRepository: PurchaseRepository
  ){}

  async execute(dto: ListPurchasesDTO): Promise<ListPurchasesDTOResponse[]>{
    const cardId = dto.cardId;
    
    const purchases = await this.purchaseRepository.findByCardId(
      cardId
    )
    return this.mapper(purchases)
  }

  private mapper(purchases: Purchase[]): ListPurchasesDTOResponse[] {
    return purchases.map( purchase => {
      const item = new ListPurchasesDTOResponse()
      item.cardId = purchase.cardId;
      item.totalAmount = purchase.totalAmount
      return item;
    })
  }

}
