import { Injectable, Inject } from "@nestjs/common";
import { Card } from "src/domain/card/card.entity";
import { CardRepository, CARD_REPOSITORY } from "src/domain/repositories/card-repository";

import { CreateCardDto } from "src/presentation/http/cards/dto/create-card-request.dto";

@Injectable()
export class CreateCardUseCase {
  
  constructor(
    @Inject(CARD_REPOSITORY)
    private readonly cardRepository: CardRepository
  ) {}

  async execute(dto: CreateCardDto, userId: string): Promise<Card>{

    const card = new Card(
      '',
      dto.name,
      dto.brand,
      dto.limit,
      dto.closingDay,
      dto.dueDay,
      userId,
    );
    

    const createdCard = await this.cardRepository.create(card);
    if (!createdCard) {
      throw new Error("Failed to create card");
    }
    return createdCard;
  }   
  

}