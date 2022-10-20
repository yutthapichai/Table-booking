import { Injectable } from '@nestjs/common';
import { DynamicSort } from '../../utils/dynamicSort';
import { RestaurantState } from './model/restaurant.interface';
import { v4 as uuidv4 } from 'uuid';
import {
  AddRestaurantState,
  UpdateRestaurantState,
} from './model/restaurant.interface';
@Injectable()
export class RestaurantService {
  restaurants: RestaurantState[] = [];

  fetchRestaurant(query) {
    const pageSize = +query.pagesize;
    const currentPage = +query.page;
    const message = query.message;
    let sorting;
    let result = this.restaurants;

    if (message !== 'undefined') {
      result = result.filter((item) => {
        return (
          item.name.toLowerCase().includes(message.toLowerCase()) ||
          item.detail.toLowerCase().includes(message.toLowerCase())
        );
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

  getRestaurantById(restaurantID: string) {
    return this.restaurants.find((item) => item.id === restaurantID);
  }

  addRestaurant(data: AddRestaurantState) {
    const dataCreate: RestaurantState = {
      ...data,
      id: uuidv4(),
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.restaurants.push(dataCreate);
    return 'Restaurant was added';
  }

  updateRestaurant(restaurantID: string, data: UpdateRestaurantState) {
    const index = this.restaurants.findIndex(
      (item) => item.id === restaurantID,
    );
    this.restaurants[index] = {
      ...this.restaurants[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return 'Restaurant was updated';
  }

  deleteRestaurant(restaurantID: string) {
    const index = this.restaurants.findIndex(
      (item) => item.id === restaurantID,
    );
    this.restaurants.splice(index, 1);
    return 'Restaurant was deleted';
  }
}
