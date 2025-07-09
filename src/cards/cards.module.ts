import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [CardsService, PrismaService],
  controllers: [CardsController]
})
export class CardsModule {}
