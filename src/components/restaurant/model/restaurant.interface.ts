export interface RestaurantState extends AddRestaurantState {
  id: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  userID?: string;
}

export interface AddRestaurantState {
  name: string;
  detail: string;
}

export interface UpdateRestaurantState {
  name: string;
  detail: string;
}
