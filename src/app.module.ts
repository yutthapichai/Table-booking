import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReserveModule } from './components/reserve/reserve.module';
import { TableModule } from './components/table/table.module';
import { RestaurantModule } from './components/restaurant/restaurant.module';

@Module({
  imports: [ReserveModule, TableModule, RestaurantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
