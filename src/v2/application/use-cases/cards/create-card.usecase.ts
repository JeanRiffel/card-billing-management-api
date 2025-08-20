import { Injectable } from "@nestjs/common";
import { Card } from "src/v2/domain/entities/card/card.entity";
import { CardRepository } from "src/v2/infra/prisma/cards/prisma.cards.repository";
import { CreateCardDto } from "src/v2/modules/cards/dto/create-card.dto";

@Injectable()
export class CreateCardUseCase {
  
  constructor(private readonly cardRepository: CardRepository) {}

  async run(dto: CreateCardDto, userId: string): Promise<Card>{

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