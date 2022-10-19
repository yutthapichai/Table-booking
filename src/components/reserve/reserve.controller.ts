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
import { AddReserveDTO, UpdateReserveDTO } from './model/reserve.dto';
import { ReserveService } from './reserve.service';

@Controller('reserve')
export class ReserveController {
  constructor(private reserveService: ReserveService) {}

  @Get('/')
  //   @UseGuards(AuthGuard('jwt'))
  getReserve(@Query() query, @Res() res) {
    try {
      const result = this.reserveService.fetchReserve(query);
      res.status(HttpStatus.OK).send(result);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.toString() });
    }
  }

  @Get('/:id')
  //   @UseGuards(AuthGuard('jwt'))
  getReserveByID(@Param('id') reserveID, @Res() res) {
    try {
      const result = this.reserveService.getReserveById(reserveID);
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
  createReserve(@Res() res, @Body() data: AddReserveDTO) {
    try {
      //data.userID = user.id;
      const result = this.reserveService.addReserve(data);
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
  editReserve(
    @Res() res,
    @Param('id') reserveID,
    @Body() data: UpdateReserveDTO,
  ) {
    try {
      const result = this.reserveService.updateReserve(reserveID, data);
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
  deleteReserve(@Res() res, @Param('id') reserveID) {
    try {
      const result = this.reserveService.deleteReserve(reserveID);
      res.status(HttpStatus.OK).send({ message: result });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.toString() });
    }
  }
}
