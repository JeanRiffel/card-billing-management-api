import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './presentation/http/users/users.module';
import { AuthModule } from './presentation/http/login/auth.module';
import { CardsModule } from './presentation/http/cards/cards.module';
import { PurchasesModule } from './presentation/http/purchases/purchases.module';

@Module({
  imports: [UsersModule, AuthModule, CardsModule, PurchasesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
