import { Inject, Injectable } from "@nestjs/common";
import { Purchase } from "src/domain/purchase/purchase.entity";
import { PURCHASE_REPOSITORY, PurchaseRepository } from "src/domain/repositories/purchase-repository";
import { CreatePurchasesDTO } from "src/presentation/http/purchases/dto/create-purchases-request.dto";

@Injectable()
export class CreatePurchaseUseCase {

  constructor(
    @Inject(PURCHASE_REPOSITORY)
    private readonly purchaseRepository: PurchaseRepository
  ){}

  async execute(dto: CreatePurchasesDTO): Promise<Purchase | null>{

    const data = new Purchase(
      '',
      dto.date,
      dto.total_amount,
      dto.description,
      dto.installments,
      dto.cardId,
      dto.invoiceId
    )

    const createdPurchase = await this.purchaseRepository.create(
      data
    )

    if (!createdPurchase) {
      throw new Error("Failed to create purchase");
    }

    return createdPurchase

  }

}