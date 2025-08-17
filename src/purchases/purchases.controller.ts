import { Controller, Get, Post, Body } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreatePurchasesDTO } from './dto/create-purchases.dto';


@Controller('purchases')
export class PurchasesController {

  constructor(private readonly purchaseService: PurchasesService){}

  @Get()
  async getCustomerPurchases(@CurrentUser() user: { userId: string}){
    return this.purchaseService.findByCustomerId(user.userId);
  }

  @Post()
  async createPurchase(@Body() createPurchaseDTO: CreatePurchasesDTO){
    return this.purchaseService.createPurchase(createPurchaseDTO);
  }

}
