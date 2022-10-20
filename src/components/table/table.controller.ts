import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { AddTableDTO, UpdateTableDTO } from './model/table.dto';
import { TableService } from './table.service';

@Controller('table')
export class TableController {
  constructor(private tableService: TableService) {}

  @Get('/')
  //   @UseGuards(AuthGuard('jwt'))
  getAllTable(@Query() query, @Res() res) {
    try {
      const result = this.tableService.fetchTable(query);
      res.status(HttpStatus.OK).send(result);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.toString() });
    }
  }

  @Get('/:id')
  //   @UseGuards(AuthGuard('jwt'))
  getTableByID(@Param('id') tableID, @Res() res) {
    try {
      const result = this.tableService.getTableById(tableID);
      res.status(HttpStatus.OK).send({ data: result });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.toString() });
    }
  }

  @Post('/')
  //   @Roles('2') // 2 is admin role
  //   @UseGuards(AuthGuard('jwt'), RolesGuard)
  createTable(@Res() res, @Body() data: AddTableDTO) {
    try {
      //data.userID = user.id;
      const result = this.tableService.addTable(data);
      res.status(HttpStatus.CREATED).send({ message: result });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.toString() });
    }
  }

  @Put('/:id')
  //   @Roles('2') // 2 is admin role
  //   @UseGuards(AuthGuard('jwt'), RolesGuard)
  editTable(@Res() res, @Param('id') tableID, @Body() data: UpdateTableDTO) {
    try {
      const result = this.tableService.updateTable(tableID, data);
      res.status(HttpStatus.OK).send({ message: result });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.toString() });
    }
  }

  @Delete('/:id')
  //   @Roles('2') // 2 is admin role
  //   @UseGuards(AuthGuard('jwt'), RolesGuard)
  deleteTable(@Res() res, @Param('id') tableID) {
    try {
      const result = this.tableService.deleteTable(tableID);
      res.status(HttpStatus.OK).send({ message: result });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.toString() });
    }
  }
}
