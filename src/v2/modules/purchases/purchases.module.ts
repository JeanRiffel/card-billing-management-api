import { Module } from '@nestjs/common';
import { PurchasesController } from './purchases.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ListPurchaseUseCase } from 'src/v2/application/use-cases/purchase/list-purchase.usecase';
import { CreatePurchaseUseCase } from 'src/v2/application/use-cases/purchase/create-purchase.usecase';
import { PURCHASE_REPOSITORY } from 'src/v2/domain/repositories/purchase-repository';
import { PrismaPurchaseRepository } from 'src/v2/infra/prisma/purchases/prisma.purchase.repository';

@Module({
  controllers: [PurchasesController],
  providers: 
  [
    ListPurchaseUseCase,
    CreatePurchaseUseCase, 
    PrismaService,
    {
      provide: PURCHASE_REPOSITORY,
      useClass: PrismaPurchaseRepository
    }
  ],

})

export class PurchasesModule {}
