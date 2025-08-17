import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePurchasesDTO } from './dto/create-purchases.dto';

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService){}

  async findById(id: string){
    const purchases = await this.prisma.purchase.findUnique({
      where: { id },
    });

    if (!purchases){
      return null;
    }

    return purchases
  }  

  async createPurchase(createPurchaseDTO: CreatePurchasesDTO){

    let invoice = await this.prisma.invoice.findFirst({
      where: {
        cardId: createPurchaseDTO.cardId
      }
    })


    if(!invoice){
      invoice= await this.prisma.invoice.create({
        data: {
          cardId: createPurchaseDTO.cardId,
          month: 8,
          year: 2025,
          totalAmount: 0,
          status: 'open'
        }
      })
    }

    const purchase = await this.prisma.purchase.create({
      data: {
        date: createPurchaseDTO.date,
        totalAmount: createPurchaseDTO.total_amount,
        description: createPurchaseDTO.description,
        installments: createPurchaseDTO.installments,
        cardId: createPurchaseDTO.cardId,
        invoiceId: invoice.id,
      }
    });

    return purchase;
  }

}
