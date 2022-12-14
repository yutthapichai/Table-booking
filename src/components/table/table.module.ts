import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';

@Module({
  providers: [TableService],
  controllers: [TableController],
  exports: [TableService],
})
export class TableModule {}
