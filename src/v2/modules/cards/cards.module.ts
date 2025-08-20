import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CardRepository } from 'src/v2/infra/prisma/cards/prisma.cards.repository';
import { CreateCardUseCase } from 'src/v2/application/use-cases/cards/create-card.usecase';

@Module({
  controllers: [CardsController],
  providers: [
    CreateCardUseCase,    
    PrismaService,
    {
      provide: CardRepository,
      useClass: CardRepository
    }
  ],
  
})
export class CardsModule {}
