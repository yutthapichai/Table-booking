import { Module } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { ReserveController } from './reserve.controller';
import { TableModule } from '../table/table.module';

@Module({
  imports: [TableModule],
  providers: [ReserveService],
  controllers: [ReserveController],
})
export class ReserveModule {}
