import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  async createCard(dto: { 
      name: string; 
      limit: number, 
      brand: string,
      closingDay: number,
      dueDay: number  
    }, userId: string
  ) {
    
    
    return this.prisma.card.create({
      data: {
        name: dto.name,
        creditLimit: dto.limit,
        userId,
        brand: dto.brand, 
        closingDay: dto.closingDay, 
        dueDay: dto.dueDay,
      },
    });
  }


}
