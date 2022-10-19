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
  Req,
  Res,
} from '@nestjs/common';
import { AddRestaurantDTO, UpdateRestaurantDTO } from './model/restaurant.dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Get('/')
  //   @UseGuards(AuthGuard('jwt'))
  getRestaurant(@Query() query, @Res() res) {
    try {
      const result = this.restaurantService.fetchRestaurant(query);
      res.status(HttpStatus.OK).send(result);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.toString() });
    }
  }

  @Get('/:id')
  //   @UseGuards(AuthGuard('jwt'))
  getRestaurantByID(@Param('id') restaurantID, @Res() res) {
    try {
      const result = this.restaurantService.getRestaurantById(restaurantID);
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
  createRestaurant(@Req() req, @Res() res, @Body() data: AddRestaurantDTO) {
    try {
      //data.userID = user.id;
      const result = this.restaurantService.addRestaurant(data);
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
  editRestaurant(
    @Res() res,
    @Param('id') restaurantID,
    @Body() data: UpdateRestaurantDTO,
  ) {
    try {
      const result = this.restaurantService.updateRestaurant(
        restaurantID,
        data,
      );
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
  deleteRestaurant(@Res() res, @Param('id') restaurantID) {
    try {
      const result = this.restaurantService.deleteRestaurant(restaurantID);
      res.status(HttpStatus.OK).send({ message: result });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.toString() });
    }
  }
}
