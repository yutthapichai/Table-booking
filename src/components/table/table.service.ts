import { Injectable } from '@nestjs/common';
import { DynamicSort } from 'src/utils/dynamicSort';
import {
  AddTableState,
  tableState,
  UpdateTableState,
} from './model/table.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TableService {
  tables: tableState[] = [];

  fetchTable(query) {
    const pageSize = +query.pagesize;
    const currentPage = +query.page;
    const message = query.message;
    let sorting;
    let result = this.tables;

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

    return { tables: data, count: maxCount };
  }

  getTableById(tableID: string) {
    return this.tables.find((item) => item.id === tableID);
  }

  addTable(data: AddTableState) {
    const dataCreate: tableState = {
      ...data,
      id: uuidv4(),
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.tables.push(dataCreate);
    return 'Table was added';
  }

  updateTable(tableID: string, data: UpdateTableState) {
    const index = this.tables.findIndex((item) => item.id === tableID);
    this.tables[index] = {
      ...this.tables[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return 'Table was updated';
  }

  deleteTable(tableID: string) {
    const index = this.tables.findIndex((item) => item.id === tableID);
    this.tables.splice(index, 1);
    return 'Table was deleted';
  }
}
