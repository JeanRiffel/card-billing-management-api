import { Injectable } from "@nestjs/common";
import { Purchase } from "src/v2/domain/entities/purchase/purchase.entity";
import { PurchaseRepository } from "src/v2/domain/repositories/purchase-repository";
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismaPurchaseRepository implements PurchaseRepository{
  
  constructor(private prisma: PrismaService) {}

  async findByCardId(cardId: string): Promise<Purchase[]> {
    return  await this.prisma.purchase.findMany({
      where: { cardId },
    });
  }

  findById(id: string): Promise<Purchase> {
    throw new Error("Method not implemented.");
  }
  
  async create(data: Purchase): Promise<Purchase | null> {
    
    const purchase = await this.prisma.purchase.create({
      data: {
        date: data.date,
        totalAmount: data.totalAmount,
        description: data.description,
        installments: data.installments,
        cardId: data.cardId,
        invoiceId: data.invoiceId,
      }
    });

    return purchase;

  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: Partial<Purchase>): Promise<Purchase> {
    throw new Error("Method not implemented.");
  }

}