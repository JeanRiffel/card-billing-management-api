import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { PurchasesModule } from './purchases/purchases.module';
import { InvoicesModule } from './invoices/invoices.module';
import { CategoriesModule } from './categories/categories.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [UsersModule, AuthModule, CardsModule, PurchasesModule, InvoicesModule, CategoriesModule, PaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
