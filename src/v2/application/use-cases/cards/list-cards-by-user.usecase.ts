
import { Card } from "src/v2/domain/entities/card/card.entity";
import { ListCardDto } from "src/v2/modules/cards/dto/list-cards-response.dto";
import { Injectable, Inject } from "@nestjs/common";
import { CARD_REPOSITORY, CardRepository } from "src/v2/domain/repositories/card-repository";

@Injectable()
export class ListCardsUseCase {

  constructor(
    @Inject(CARD_REPOSITORY)
    private readonly cardRepository: CardRepository
  ) {}

  async execute(userId : string): Promise<ListCardDto[]>{


    const listCards = await this.cardRepository.findByUserId(userId);
    console.log(listCards)

    return this.mapperReturn(listCards);

  }

  private mapperReturn(listCards: Card[]): ListCardDto[]{
    return listCards.map(card => {
      const cardItem = new ListCardDto()
      cardItem.name = card.name;
      cardItem.brand = card.brand;
      return cardItem;
    })
  }


} 