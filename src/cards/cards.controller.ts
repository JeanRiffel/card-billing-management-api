import { Controller, Post, Body } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('cards')
export class CardsController {

  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async createCard(
    @Body() dto: CreateCardDto,
    @CurrentUser() user: { userId: string }
  ) {
    
    return this.cardsService.createCard(dto, user.userId);
  }

}
