import { Injectable } from '@nestjs/common';
import { Card } from 'src/domain/card/card.entity';
import { PrismaService } from 'src/infra/orm/prisma/prisma.service';
import { CardRepository } from 'src/domain/repositories/card-repository';

@Injectable()
export class PrismaCardRepository implements CardRepository {
  constructor(private prisma: PrismaService) {}

  findByUserId(userId: string): Promise<Card[]> {
    return this.prisma.card.findMany({ where: { userId } });
  }

  findById(_id: string): Promise<Card> {
    throw new Error('Method not implemented.');
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

  delete(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  update(_id: string, _data: Partial<Card>): Promise<Card> {
    throw new Error('Method not implemented.');
  }
}
