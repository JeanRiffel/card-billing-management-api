import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './presentation/http/users/users.module';
import { AuthModule } from './old/auth/auth.module';
import { CardsModule } from './v2/modules/cards/cards.module';
import { PurchasesModule } from './v2/modules/purchases/purchases.module';
import { ChatModule } from './old/artificial-inteligence/artificial-inteligence.modules';

@Module({
  imports: [UsersModule, AuthModule, CardsModule, PurchasesModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
