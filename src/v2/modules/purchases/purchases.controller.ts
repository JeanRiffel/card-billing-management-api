import { Controller, Get, Post, Body } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreatePurchasesDTO } from './dto/create-purchases-request.dto';
import { CreatePurchaseUseCase } from 'src/v2/application/use-cases/purchase/create-purchase.usecase';
import { ListPurchaseUseCase } from 'src/v2/application/use-cases/purchase/list-purchase.usecase';
import { ListPurchasesDTO } from './dto/list-purchase-request.dto';


@Controller('purchases')
export class PurchasesController {

  constructor(
    private readonly createPurchaseUseCase: CreatePurchaseUseCase,
    private readonly listPurchaseUseCase: ListPurchaseUseCase,
  ){}

  @Get()
  async getCustomerPurchases(@Body() listPurchaseDTO: ListPurchasesDTO ){
    return this.listPurchaseUseCase.execute(listPurchaseDTO);
  }

  @Post()
  async createPurchase(@Body() createPurchaseDTO: CreatePurchasesDTO){
    return this.createPurchaseUseCase.execute(createPurchaseDTO);
  }

}
