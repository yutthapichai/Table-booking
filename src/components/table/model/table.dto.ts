import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { AddTableState, UpdateTableState } from './table.interface';

export class AddTableDTO implements AddTableState {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly capacity: number;
  @IsBoolean()
  @IsNotEmpty()
  readonly isAvailable: boolean;
  @IsBoolean()
  @IsNotEmpty()
  readonly location: string;
  @IsBoolean()
  @IsNotEmpty()
  readonly restaurantID: string;
}

export class UpdateTableDTO implements UpdateTableState {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly capacity: number;
  @IsBoolean()
  @IsNotEmpty()
  readonly isAvailable: boolean;
  @IsBoolean()
  @IsNotEmpty()
  readonly location: string;
}
