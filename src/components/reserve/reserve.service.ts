import { Injectable } from '@nestjs/common';
import { DynamicSort } from '../../utils/dynamicSort';
import {
  AddReserveState,
  ReserveState,
  UpdateReserveState,
} from './model/reserve.interface';
import { v4 as uuidv4 } from 'uuid';
import { TableService } from '../table/table.service';

@Injectable()
export class ReserveService {
  reserve: ReserveState[] = [];

  constructor(private readonly tableService: TableService) {}

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
      throw new Error('This table is already reserved');
    }

    const dataCreate: ReserveState = {
      ...data,
      id: uuidv4(),
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.reserve.push(dataCreate);
    return { message: 'Reserve was created', data: dataCreate };
  }

  checkTableAvailable(data: AddReserveState) {
    // 4 is max number of chairs in a table
    const chairs = 4;
    const people = data.numberCustomers;
    if (data.numberCustomers > chairs) {
      const amoutTable =
        Math.floor(data.numberCustomers / chairs) +
        Math.ceil((data.numberCustomers % chairs) * 0.1); // maybe 0 or 1
      const dateRes = [];
      for (let i = 1; i <= amoutTable; i++) {
        if (i * chairs <= people) {
          data.numberCustomers = chairs;
          const result = this.reservationByDate(data);
          dateRes.push(result.data);
        } else {
          data.numberCustomers = people % chairs;
          const result = this.reservationByDate(data);
          dateRes.push(result.data);
        }
      }
      return { message: 'Reserve was created', data: dateRes };
    } else {
      const result = this.reservationByDate(data);
      return { message: result.message, data: [result.data] };
    }
  }

  reservationByDate(data: AddReserveState) {
    const reserveByDate = this.reserve.filter(
      (item) => item.date === data.date,
    );
    const tableAvailable =
      this.tableService.joinTableWithReserve(reserveByDate);
    const FindTable = tableAvailable.find((item) => item.isAvailable === true);

    if (FindTable) {
      const reuslt = this.addReserve({
        ...data,
        tableID: FindTable.id,
      });
      return reuslt;
    } else {
      throw new Error('No table available');
    }
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
