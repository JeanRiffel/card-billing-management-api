import { Module } from '@nestjs/common';
import { PurchasesController } from './purchases.controller';
import { PrismaService } from 'src/infra/orm/prisma/prisma.service';
import { ListPurchaseUseCase } from 'src/application/purchase/list-purchase.usecase';
import { CreatePurchaseUseCase } from 'src/application/purchase/create-purchase.usecase';
import { PURCHASE_REPOSITORY } from 'src/domain/repositories/purchase-repository';
import { PrismaPurchaseRepository } from 'src/infra/orm/repository/purchases/prisma.purchase.repository';

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
