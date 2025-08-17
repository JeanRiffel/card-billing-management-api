import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService){}

  async findById(id: string){
    const purchases = await this.prisma.purchase.findUnique({
      where: { id },
    });

    if (!purchases){
      return null;
    }

    return purchases
  }  

}
