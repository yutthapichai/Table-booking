import { IsString, IsNotEmpty } from 'class-validator';
import {
  AddRestaurantState,
  UpdateRestaurantState,
} from './restaurant.interface';

export class AddRestaurantDTO implements AddRestaurantState {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly detail: string;
}

export class UpdateRestaurantDTO implements UpdateRestaurantState {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly detail: string;
}
