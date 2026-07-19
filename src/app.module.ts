import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './presentation/http/users/users.module';
import { AuthModule } from './old-structure/auth/auth.module';
import { CardsModule } from './presentation/http/cards/cards.module';
import { PurchasesModule } from './presentation/http/purchases/purchases.module';
import { ChatModule } from './old-structure/artificial-inteligence/artificial-inteligence.modules';

@Module({
  imports: [UsersModule, AuthModule, CardsModule, PurchasesModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
