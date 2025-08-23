import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCardUseCase } from 'src/v2/application/use-cases/cards/create-card.usecase';
import { ListCardsUseCase } from 'src/v2/application/use-cases/cards/list-cards-by-user.usecase';
import { PrismaCardRepository, } from 'src/v2/infra/prisma/cards/prisma.cards.repository';
import { CARD_REPOSITORY } from 'src/v2/domain/repositories/card-repository';

@Module({
  controllers: [CardsController],
  providers: [
    CreateCardUseCase, 
    ListCardsUseCase,
    PrismaService,
    {
      provide: CARD_REPOSITORY,
      useClass: PrismaCardRepository
    }
  ],
  
})
export class CardsModule {}
