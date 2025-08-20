import { Controller, Post, Body, Get } from '@nestjs/common';
import { CardsService } from '../../../cards/cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CardRepository } from 'src/v2/infra/prisma/cards/prisma.cards.repository';
import { CreateCardUseCase } from 'src/v2/application/use-cases/cards/create-card.usecase';

@Controller('cards')
export class CardsController {

  constructor(private readonly createCardUseCase: CreateCardUseCase) {}

  @Post()
  async createCard(
    @Body() dto: CreateCardDto,
    @CurrentUser() user: { userId: string }
  ) {

    return this.createCardUseCase.run(dto, user.userId) 

  }

  @Get()
  async getCards(@CurrentUser() user: { userId: string }) {
    //return this.cardsService.getCards(user.userId);
  }

}
