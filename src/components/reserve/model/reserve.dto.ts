import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { AddReserveState, UpdateReserveState } from './reserve.interface';
export class AddReserveDTO implements AddReserveState {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly phone: string;
  @IsString()
  @IsNotEmpty()
  readonly date: string;
  @IsString()
  @IsNotEmpty()
  readonly tableID: string;
  @IsNumber()
  @IsNotEmpty()
  readonly numberCustomers: number;
}

export class UpdateReserveDTO implements UpdateReserveState {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly phone: string;
}
