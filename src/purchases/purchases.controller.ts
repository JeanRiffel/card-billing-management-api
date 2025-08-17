import { Controller, Get } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('purchases')
export class PurchasesController {

  constructor(private readonly purchaseService: PurchasesService){}

  @Get()
  async getCustomerPurchases(@CurrentUser() user: { userId: string}){
    return this.purchaseService.findById(user.userId);
  }


}
