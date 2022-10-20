import { Injectable } from '@nestjs/common';
import { DynamicSort } from '../../utils/dynamicSort';
import {
  AddTableState,
  tableState,
  UpdateTableState,
} from './model/table.interface';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class TableService {
  tables: tableState[] = [];

  constructor() {
    this.generateTable();
    console.log(this.tables.length);
  }

  generateTable() {
    if (!this.tables.length) {
      try {
        const tableData = fs.readFileSync(
          join(__dirname + '../../../../' + 'tableFake.json'),
        );
        this.tables = JSON.parse(tableData.toString()).tables;
      } catch (error) {
        const fakeTables = this.generateFakeData();
        this.tables = fakeTables;
        const data = JSON.stringify({
          tables: fakeTables,
        });
        fs.writeFileSync(
          join(__dirname + '../../../../' + 'tableFake.json'),
          data,
        );
      }
    }
  }

  generateFakeData() {
    const fakeData = [];
    for (let i = 0; i < 50; i++) {
      const name = `Table ${i}`;
      const chairs = Math.floor(Math.random() * 5) + 2;
      const location = [
        'หน้าบ้าน',
        'ด้านใน',
        'บาร์',
        'ริมน้ำ',
        'ระเบียง',
        'หลังคาบ้าน',
      ][Math.floor(Math.random() * 6)];
      fakeData.push({
        name: name,
        capacity: chairs,
        isAvailable: true,
        location: location,
        id: uuidv4(),
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    return fakeData;
  }

  fetchTable(query) {
    console.log(query);
    const pageSize = +query.pagesize || 10;
    const currentPage = +query.page || 1;
    const message = query.message || 'undefined';
    const sort = query.sort || 'undefined';
    let sorting;
    let result = this.tables;

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
