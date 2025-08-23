import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card-request.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateCardUseCase } from 'src/v2/application/use-cases/cards/create-card.usecase';
import { ListCardsUseCase } from 'src/v2/application/use-cases/cards/list-cards-by-user.usecase';

@Controller('cards')
export class CardsController {

  constructor(
    private readonly createCardUseCase: CreateCardUseCase,
    private readonly listCardsUseCase: ListCardsUseCase
  ) {}

  @Post()
  async createCard(
    @Body() dto: CreateCardDto,
    @CurrentUser() user: { userId: string }
  ) {

    return this.createCardUseCase.execute(dto, user.userId);
  }

  @Get()
  async getCards(@CurrentUser() user: { userId: string }) {
    return this.listCardsUseCase.execute(user.userId);
  }

}
