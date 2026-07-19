import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { PrismaService } from 'src/infra/orm/prisma/prisma.service';

import { CreateCardUseCase } from 'src/application/cards/create-card.usecase';
import { ListCardsUseCase } from 'src/application/cards/list-cards-by-user.usecase';
import { PrismaCardRepository, } from 'src/infra/orm/repository/cards/prisma.cards.repository';
import { CARD_REPOSITORY } from 'src/domain/repositories/card-repository';

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
