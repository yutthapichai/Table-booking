import { Injectable } from '@nestjs/common';
import { DynamicSort } from '../../utils/dynamicSort';
import {
  AddReserveState,
  ReserveState,
  UpdateReserveState,
} from './model/reserve.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ReserveService {
  reserve: ReserveState[] = [];

  constructor() {
    this.addReserve({
      name: 'somsak kong',
      phone: '0812345678',
      date: '2022-10-20T11:00:00.234Z',
      tableID: 'c4c3dac7-c7b1-433d-8055-745dca8f595f',
    });
  }

  fetchReserve(query) {
    const pageSize = +query.pagesize || 10;
    const currentPage = +query.page || 1;
    const message = query.message || 'undefined';
    const sort = query.sort || 'undefined';
    let sorting;
    let result = this.reserve;

    if (message !== 'undefined') {
      result = result.filter((item) => {
        return item.name.toLowerCase().includes(message.toLowerCase());
      });
    }

    if (sort !== 'undefined') {
      sorting = DynamicSort(sort);
    } else {
      sorting = DynamicSort('-createdAt');
    }

    const maxCount = result.length;
    const data = result
      .sort(sorting)
      .slice(pageSize * (currentPage - 1), pageSize * currentPage);

    return { reserve: data, count: maxCount };
  }

  getReserveById(reserveID: string) {
    return this.reserve.find((item) => item.id === reserveID);
  }

  addReserve(data: AddReserveState) {
    const check = this.reserve.find(
      (item) => item.date === data.date && item.tableID === data.tableID,
    );

    if (check) {
      return 'This table is already reserved';
    }

    const dataCreate: ReserveState = {
      ...data,
      id: uuidv4(),
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.reserve.push(dataCreate);
    return 'Reserve was added';
  }

  updateReserve(reserveID: string, data: UpdateReserveState) {
    const index = this.reserve.findIndex((item) => item.id === reserveID);
    this.reserve[index] = {
      ...this.reserve[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return 'Reserve was updated';
  }

  deleteReserve(reserveID: string) {
    const index = this.reserve.findIndex((item) => item.id === reserveID);
    this.reserve.splice(index, 1);
    return 'Reserve was deleted';
  }

  // active = false
  cancelReserve(reserveID: string) {
    const index = this.reserve.findIndex((item) => item.id === reserveID);
    this.reserve[index] = {
      ...this.reserve[index],
      active: false,
      updatedAt: new Date().toISOString(),
    };
    return 'Reserve was canceled';
  }
}
