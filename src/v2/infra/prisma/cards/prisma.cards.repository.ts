import { Injectable } from '@nestjs/common';
import { Card } from "src/v2/domain/entities/card/card.entity";
import { Repository } from "src/v2/domain/repositories/repository";
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCardDto } from 'src/v2/modules/cards/dto/create-card-request.dto';
import { CardRepository, CARD_REPOSITORY } from 'src/v2/domain/repositories/card-repository';


@Injectable()
export class PrismaCardRepository implements CardRepository{

  constructor(private prisma: PrismaService) {}
  
  findByUserId(userId: string): Promise<Card[]> {
    return this.prisma.card.findMany({ where: { userId } });
  }
  
  async findById(id: string): Promise<Card> {
     throw new Error("Method not implemented.");
  }

  async create(data: Card): Promise<Card | null> {
   
    return this.prisma.card.create({
      data: {
        name: data.name,
        creditLimit: data.creditLimit,
        userId: data.userId,
        brand: data.brand, 
        closingDay: data.closingDay,
        dueDay: data.dueDay,
      },
    });
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  update(id: string, data: Partial<Card>): Promise<Card> {
    throw new Error("Method not implemented.");
  }

}