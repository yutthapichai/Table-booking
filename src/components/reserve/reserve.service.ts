import { Injectable } from '@nestjs/common';
import { DynamicSort } from 'src/utils/dynamicSort';
import {
  AddReserveState,
  ReserveState,
  UpdateReserveState,
} from './model/reserve.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ReserveService {
  reserve: ReserveState[] = [];

  fetchReserve(query) {
    const pageSize = +query.pagesize;
    const currentPage = +query.page;
    const message = query.message;
    let sorting;
    let result = this.reserve;

    if (message !== 'undefined') {
      result = result.filter((item) => {
        return item.name.toLowerCase().includes(message.toLowerCase());
      });
    }

    if (query.sort !== 'undefined') {
      sorting = DynamicSort(query.sort);
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
}
